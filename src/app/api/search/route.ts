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
import { webSearch } from "@/lib/search/web-search";
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
    if (score > bestScore) { bestScore = score; bestCat = cat; }
  }
  return bestCat;
}

// Threshold: if the best RAG score is below this, the knowledge base
// doesn't cover the query well enough → fall back to web search.
const RAG_CONFIDENCE_THRESHOLD = 3;

export async function POST(request: NextRequest) {
  try {
    const {
      query,
      language = "en",
      sessionKey,
      history = [],
    } = await request.json();

    if (!query || typeof query !== "string") {
      return NextResponse.json({ error: "Missing query" }, { status: 400 });
    }

    // ── Step 1: Enrich query with conversation history ──
    let enrichedKeywords = expandQuery(query);
    let conversationContext = "";

    if (history.length > 0) {
      const recentHistory = history.slice(-3);
      for (const turn of recentHistory) {
        if (turn.query) enrichedKeywords.push(...expandQuery(turn.query));
      }
      enrichedKeywords = [...new Set(enrichedKeywords)];
      conversationContext = recentHistory
        .map((t: { query: string; answer: string }) => `Q: ${t.query}\nA: ${t.answer?.slice(0, 200) || ""}`)
        .join("\n\n");
    }

    // Also check stored history from Turso
    if (sessionKey && history.length === 0) {
      try {
        const stored = await db
          .select({ query: conversations.query, answer: conversations.answer })
          .from(conversations)
          .where(eq(conversations.sessionKey, sessionKey))
          .orderBy(desc(conversations.createdAt))
          .limit(3);
        if (stored.length > 0) {
          const storedHistory = stored.reverse();
          for (const turn of storedHistory) enrichedKeywords.push(...expandQuery(turn.query));
          enrichedKeywords = [...new Set(enrichedKeywords)];
          conversationContext = storedHistory
            .map((t) => `Q: ${t.query}\nA: ${t.answer?.slice(0, 200) || ""}`)
            .join("\n\n");
        }
      } catch { /* non-critical */ }
    }

    const detectedCategory = detectCategory(enrichedKeywords);
    const queryEmbedding = generateKnowledgeEmbedding(detectedCategory, enrichedKeywords.join(","));

    // ── Step 2: Score RAG knowledge base ──
    const allKnowledge = await db.select().from(legalKnowledge);
    const queryLower = query.toLowerCase();

    const scored = allKnowledge.map((entry) => {
      let keywordScore = 0;
      const entryText = `${entry.keywords} ${entry.title} ${entry.content} ${entry.titleHi} ${entry.contentHi}`.toLowerCase();

      for (const word of enrichedKeywords) {
        if (entryText.includes(word.toLowerCase())) keywordScore += 1;
      }
      const entryKeywords = (entry.keywords || "").toLowerCase().split(",").map((k) => k.trim());
      for (const kw of entryKeywords) {
        if (queryLower.includes(kw) && kw.length > 2) keywordScore += 3;
      }
      for (const [hindiTerm, englishKeys] of Object.entries(HINDI_TO_KEYWORD)) {
        if (query.includes(hindiTerm)) {
          for (const ek of englishKeys) {
            if (entryText.includes(ek.toLowerCase())) keywordScore += 2;
          }
        }
      }
      let vectorScore = 0;
      if (entry.embedding) {
        try {
          const entryVec = JSON.parse(entry.embedding as string);
          vectorScore = cosineSimilarity(queryEmbedding, entryVec) * 5;
        } catch { /* skip */ }
      }
      return { ...entry, score: keywordScore + vectorScore };
    });

    const topRAG = scored
      .filter((r) => r.score > 0.5)
      .sort((a, b) => b.score - a.score)
      .slice(0, 3);

    const bestRAGScore = topRAG[0]?.score || 0;
    const ragIsConfident = bestRAGScore >= RAG_CONFIDENCE_THRESHOLD;

    // ── Step 3: Web search fallback (only if RAG is not confident) ──
    // Fire web search in parallel with conversation lookup to save latency
    let webContext = "";
    let webSources: { title: string; url: string; source: string }[] = [];
    let usedWebFallback = false;

    if (!ragIsConfident) {
      // Build a focused legal search query
      const webQuery = `${query.slice(0, 80)} India law legal rights`;
      try {
        const webResults = await webSearch(webQuery, 4);
        if (webResults.length > 0) {
          usedWebFallback = true;
          webContext = webResults
            .slice(0, 3)
            .map((r) => `[${r.source}] ${r.title}: ${r.snippet.slice(0, 300)}`)
            .join("\n\n");
          webSources = webResults.slice(0, 3).map((r) => ({
            title: r.title,
            url: r.url,
            source: r.source,
          }));
        }
      } catch {
        // Web search failed — will use whatever RAG we have
      }
    }

    // ── Step 4: Conversation vector search (parallel-safe, non-blocking) ──
    let similarPastQA = "";
    if (sessionKey) {
      try {
        const pastConversations = await db
          .select({ query: conversations.query, answer: conversations.answer, embedding: conversations.embedding })
          .from(conversations)
          .limit(50);

        const similar = pastConversations
          .filter((c) => c.embedding)
          .map((c) => ({
            query: c.query,
            answer: c.answer,
            similarity: cosineSimilarity(queryEmbedding, JSON.parse(c.embedding as string)),
          }))
          .filter((c) => c.similarity > 0.6)
          .sort((a, b) => b.similarity - a.similarity)
          .slice(0, 2);

        if (similar.length > 0) {
          similarPastQA = similar
            .map((s) => `Previous Q: ${s.query}\nA: ${s.answer?.slice(0, 150)}`)
            .join("\n\n");
        }
      } catch { /* non-critical */ }
    }

    // ── Step 5: Build answer ──
    // Choose the best context source: RAG (if confident) or web search
    let answer = "";
    const topResults = ragIsConfident
      ? topRAG.map((r) => ({
          id: r.id,
          category: r.category,
          title: language === "hi" ? r.titleHi : r.title,
          content: language === "hi" ? (r.contentHi || r.content) : r.content,
          applicableActs: r.applicableActs,
          score: r.score,
        }))
      : [];

    if (canMakeLLMRequest() && (ragIsConfident || usedWebFallback)) {
      const lang = language === "hi" ? "Hindi" : "English";

      // Pick context based on what's available
      let knowledgeContext: string;
      if (ragIsConfident) {
        knowledgeContext = topRAG
          .slice(0, 2)
          .map((r) => `${r.title}: ${r.content.slice(0, 400)}`)
          .join("\n\n");
      } else {
        // Use web search results as context
        knowledgeContext = webContext;
      }

      if (similarPastQA) {
        knowledgeContext += `\n\n--- Similar past Q&A ---\n${similarPastQA}`;
      }

      const messages: { role: "system" | "user" | "assistant"; content: string }[] = [
        {
          role: "system",
          content: `Legal awareness assistant for India. Answer in ${lang}, 2-3 sentences max. Cite acts/sources. Disclaimer: not legal advice. ${usedWebFallback ? "Context is from live web search — cite the source name." : "Use ONLY the knowledge context provided."}`,
        },
      ];

      if (conversationContext) {
        messages.push({ role: "user", content: `[Prior conversation]\n${conversationContext}` });
        messages.push({ role: "assistant", content: "[Noted, I'll use this context for follow-ups.]" });
      }

      messages.push({
        role: "user",
        content: `Knowledge:\n${knowledgeContext.slice(0, 800)}\n\nQ: ${query.slice(0, 200)}`,
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
      } catch {
        // LLM failed — use raw context
        if (ragIsConfident && topRAG[0]) {
          answer = language === "hi" ? (topRAG[0].contentHi || topRAG[0].content) : topRAG[0].content;
        } else if (usedWebFallback && webSources[0]) {
          answer = webContext.slice(0, 500);
        }
      }
    } else if (ragIsConfident && topRAG[0]) {
      // No LLM budget — return raw RAG
      answer = language === "hi" ? (topRAG[0].contentHi || topRAG[0].content) : topRAG[0].content;
    } else if (usedWebFallback) {
      // No LLM budget — return raw web context
      answer = webContext.slice(0, 500);
    }

    // ── Step 6: Store conversation turn ──
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
      results: usedWebFallback
        ? webSources.map((s) => ({
            id: s.url,
            category: "web",
            title: s.title,
            content: "",
            applicableActs: s.source,
            score: 0,
          }))
        : topResults,
      answer,
      detectedCategory,
      source: usedWebFallback ? "web" : "knowledge_base",
    });
  } catch (error) {
    console.error("Search error:", error);
    return NextResponse.json({ error: "Search failed" }, { status: 500 });
  }
}
