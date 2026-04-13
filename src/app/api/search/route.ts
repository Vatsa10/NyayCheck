import { NextRequest, NextResponse } from "next/server";
import { eq, desc } from "drizzle-orm";
import { nanoid } from "nanoid";
import { db } from "@/lib/db";
import { legalKnowledge, conversations } from "@/lib/db/schema";
import {
  cosineSimilarity,
  generateKnowledgeEmbedding,
} from "@/lib/engine/embeddings";
import {
  getOpenAI,
  getModel,
  canMakeLLMRequest,
  recordLLMRequest,
} from "@/lib/llm/client";
import type { Language } from "@/types";

// ── Hindi → English keyword map ──
const HINDI_TO_KEYWORD: Record<string, string[]> = {
  किराया: ["rent", "tenant", "landlord"],
  मकान: ["rent", "landlord", "eviction", "house"],
  बेदखल: ["eviction", "tenant rights"],
  जमा: ["deposit", "security deposit", "refund"],
  नोटिस: ["legal notice", "notice"],
  वेतन: ["salary", "wages", "payment"],
  नौकरी: ["employment", "termination", "job"],
  तलाक: ["divorce", "separation"],
  शिकायत: ["complaint", "consumer", "grievance"],
  धोखाधड़ी: ["fraud", "scam", "cybercrime", "UPI"],
  रिफंड: ["refund", "ecommerce", "return"],
  संपत्ति: ["property", "land", "sale deed"],
  बिल्डर: ["builder", "RERA", "flat", "possession"],
  हिंसा: ["violence", "domestic violence", "DV Act"],
  PF: ["PF", "EPF", "provident fund"],
  RTI: ["RTI", "right to information"],
};

const CAT_KEYWORDS: Record<string, string[]> = {
  rent: ["rent", "tenant", "landlord", "deposit", "eviction", "lease", "agreement"],
  property: ["property", "land", "RERA", "builder", "flat", "sale", "deed", "mutation", "encumbrance"],
  consumer: ["consumer", "complaint", "defective", "refund", "product", "service", "warranty"],
  employment: ["employment", "salary", "termination", "PF", "EPF", "harassment", "posh", "job", "fired"],
  family: ["divorce", "custody", "maintenance", "marriage", "violence", "domestic", "will", "alimony"],
  ecommerce: ["ecommerce", "online", "shopping", "data", "privacy", "DPDP", "return"],
  "cyber-fraud": ["fraud", "UPI", "scam", "phishing", "cybercrime", "1930", "identity"],
};

function expandQuery(query: string): string[] {
  const keywords: string[] = [];
  const queryLower = query.toLowerCase();
  keywords.push(...queryLower.split(/\s+/).filter((w) => w.length > 2));

  for (const [hindiTerm, englishKeys] of Object.entries(HINDI_TO_KEYWORD)) {
    if (query.includes(hindiTerm)) keywords.push(...englishKeys);
  }
  return keywords;
}

function detectCategory(keywords: string[]): string {
  let bestCat = "";
  let bestScore = 0;
  for (const [cat, kws] of Object.entries(CAT_KEYWORDS)) {
    const score = kws.filter((kw) =>
      keywords.some((mk) => mk.includes(kw.toLowerCase()))
    ).length;
    if (score > bestScore) {
      bestScore = score;
      bestCat = cat;
    }
  }
  return bestCat;
}

function buildQueryEmbedding(keywords: string[], category: string): number[] {
  return generateKnowledgeEmbedding(category, keywords.join(","));
}

export async function POST(request: NextRequest) {
  try {
    const {
      query,
      language = "en",
      sessionKey, // client sends a stable session ID
      history = [], // array of { query, answer } from previous turns
    } = await request.json();

    if (!query || typeof query !== "string") {
      return NextResponse.json({ error: "Missing query" }, { status: 400 });
    }

    // ── Step 1: Build enriched query using conversation history ──
    // If this is a follow-up, merge context from previous turns
    let enrichedKeywords = expandQuery(query);
    let conversationContext = "";

    if (history.length > 0) {
      // Take last 3 turns max for context
      const recentHistory = history.slice(-3);

      // Extract keywords from previous queries to boost relevance
      for (const turn of recentHistory) {
        if (turn.query) {
          enrichedKeywords.push(...expandQuery(turn.query));
        }
      }
      // Deduplicate
      enrichedKeywords = [...new Set(enrichedKeywords)];

      // Build conversation summary for LLM context
      conversationContext = recentHistory
        .map(
          (turn: { query: string; answer: string }) =>
            `Q: ${turn.query}\nA: ${turn.answer?.slice(0, 200) || ""}`
        )
        .join("\n\n");
    }

    // Also fetch stored conversation history from Turso for this session
    let storedHistory: { query: string; answer: string }[] = [];
    if (sessionKey && history.length === 0) {
      // Client didn't send history but has a session — fetch from DB
      const stored = await db
        .select({ query: conversations.query, answer: conversations.answer })
        .from(conversations)
        .where(eq(conversations.sessionKey, sessionKey))
        .orderBy(desc(conversations.createdAt))
        .limit(3);

      if (stored.length > 0) {
        storedHistory = stored.reverse();
        for (const turn of storedHistory) {
          enrichedKeywords.push(...expandQuery(turn.query));
        }
        enrichedKeywords = [...new Set(enrichedKeywords)];

        conversationContext = storedHistory
          .map((t) => `Q: ${t.query}\nA: ${t.answer?.slice(0, 200) || ""}`)
          .join("\n\n");
      }
    }

    const detectedCategory = detectCategory(enrichedKeywords);

    // ── Step 2: Fetch knowledge + hybrid scoring ──
    const allKnowledge = await db.select().from(legalKnowledge);

    if (allKnowledge.length === 0) {
      return NextResponse.json({
        results: [],
        answer:
          language === "hi"
            ? "ज्ञान आधार अभी तक तैयार नहीं है।"
            : "Knowledge base is not seeded yet.",
      });
    }

    const queryEmbedding = buildQueryEmbedding(enrichedKeywords, detectedCategory);
    const queryLower = query.toLowerCase();

    const scored = allKnowledge.map((entry) => {
      let keywordScore = 0;
      const entryText =
        `${entry.keywords} ${entry.title} ${entry.content} ${entry.titleHi} ${entry.contentHi}`.toLowerCase();

      // Score against BOTH current query words AND enriched keywords from history
      for (const word of enrichedKeywords) {
        if (entryText.includes(word.toLowerCase())) keywordScore += 1;
      }

      // Boost exact keyword matches against current query
      const entryKeywords = (entry.keywords || "")
        .toLowerCase()
        .split(",")
        .map((k) => k.trim());
      for (const kw of entryKeywords) {
        if (queryLower.includes(kw) && kw.length > 2) keywordScore += 3;
      }

      // Hindi expansion
      for (const [hindiTerm, englishKeys] of Object.entries(HINDI_TO_KEYWORD)) {
        if (query.includes(hindiTerm)) {
          for (const ek of englishKeys) {
            if (entryText.includes(ek.toLowerCase())) keywordScore += 2;
          }
        }
      }

      // Vector similarity
      let vectorScore = 0;
      if (entry.embedding) {
        try {
          const entryVec = JSON.parse(entry.embedding as string);
          vectorScore = cosineSimilarity(queryEmbedding, entryVec) * 5;
        } catch { /* skip */ }
      }

      return { ...entry, score: keywordScore + vectorScore };
    });

    // ── Step 3: Also search past conversations via vector similarity ──
    // Find similar questions other users have asked for cross-session learning
    let similarPastQA = "";
    if (sessionKey) {
      try {
        const pastConversations = await db
          .select({
            query: conversations.query,
            answer: conversations.answer,
            embedding: conversations.embedding,
          })
          .from(conversations)
          .limit(50);

        const similar = pastConversations
          .filter((c) => c.embedding)
          .map((c) => {
            const vec = JSON.parse(c.embedding as string);
            return {
              query: c.query,
              answer: c.answer,
              similarity: cosineSimilarity(queryEmbedding, vec),
            };
          })
          .filter((c) => c.similarity > 0.6) // Only highly similar
          .sort((a, b) => b.similarity - a.similarity)
          .slice(0, 2);

        if (similar.length > 0) {
          similarPastQA = similar
            .map((s) => `Previous Q: ${s.query}\nA: ${s.answer?.slice(0, 150)}`)
            .join("\n\n");
        }
      } catch { /* non-critical, skip */ }
    }

    const topResults = scored
      .filter((r) => r.score > 0.5)
      .sort((a, b) => b.score - a.score)
      .slice(0, 3);

    // ── Step 4: LLM answer with full conversation context ──
    let answer = "";

    if (topResults.length > 0 && canMakeLLMRequest()) {
      const lang = language === "hi" ? "Hindi" : "English";
      const knowledgeContext = topResults
        .slice(0, 2)
        .map((r) => `${r.title}: ${r.content.slice(0, 400)}`)
        .join("\n\n");

      // Build the full context for the LLM
      let fullContext = knowledgeContext;
      if (similarPastQA) {
        fullContext += `\n\n--- Similar past questions ---\n${similarPastQA}`;
      }

      // Build messages array with conversation history
      const messages: { role: "system" | "user" | "assistant"; content: string }[] = [
        {
          role: "system",
          content: `Legal awareness assistant for India. Answer in ${lang}, 2-3 sentences max. Cite acts. Add disclaimer. Use the knowledge context provided. If this is a follow-up question, use the conversation history to understand what the user is referring to.`,
        },
      ];

      // Add conversation history as prior turns
      if (conversationContext) {
        messages.push({
          role: "user",
          content: `[Previous conversation for context]\n${conversationContext}`,
        });
        messages.push({
          role: "assistant",
          content: "[I have the conversation context. I'll use it to answer follow-up questions accurately.]",
        });
      }

      // Current question with knowledge
      messages.push({
        role: "user",
        content: `Knowledge:\n${fullContext}\n\nQ: ${query.slice(0, 200)}`,
      });

      try {
        recordLLMRequest();
        const response = await getOpenAI().chat.completions.create({
          model: getModel(),
          messages,
          temperature: 0.3,
          max_tokens: 300,
        });
        answer = response.choices[0]?.message?.content || "";
      } catch (error: unknown) {
        const statusCode = (error as { status?: number })?.status;
        if (statusCode === 429) {
          console.log("OpenRouter 429 on search — falling back");
        } else {
          console.error("LLM search answer failed:", error);
        }
        const top = topResults[0];
        answer = language === "hi" ? (top.contentHi || top.content) : top.content;
      }
    } else if (topResults.length > 0) {
      const top = topResults[0];
      answer = language === "hi" ? (top.contentHi || top.content) : top.content;
    }

    // ── Step 5: Store this turn in Turso for future context ──
    if (sessionKey && answer) {
      try {
        await db.insert(conversations).values({
          id: nanoid(10),
          sessionKey,
          createdAt: new Date(),
          query,
          answer: answer.slice(0, 1000),
          category: detectedCategory || null,
          language: language as string,
          embedding: JSON.stringify(queryEmbedding),
        });
      } catch { /* non-critical */ }
    }

    return NextResponse.json({
      results: topResults.map((r) => ({
        id: r.id,
        category: r.category,
        title: language === "hi" ? r.titleHi : r.title,
        content: language === "hi" ? (r.contentHi || r.content) : r.content,
        applicableActs: r.applicableActs,
        score: r.score,
      })),
      answer,
      detectedCategory,
    });
  } catch (error) {
    console.error("Search error:", error);
    return NextResponse.json({ error: "Search failed" }, { status: 500 });
  }
}
