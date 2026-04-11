import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { legalKnowledge } from "@/lib/db/schema";
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

// Map common Hindi query terms to English keywords for cross-language matching
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

/**
 * Build a query embedding by detecting category/topic from the query text.
 * Matches keywords (English and Hindi) against the embedding feature space.
 */
function buildQueryEmbedding(query: string): number[] {
  const queryLower = query.toLowerCase();

  // Collect matched English keywords from the query
  const matchedKeywords: string[] = [];

  // Direct English keyword extraction
  const queryWords = queryLower.split(/\s+/);
  matchedKeywords.push(...queryWords.filter((w) => w.length > 2));

  // Hindi → English keyword expansion
  for (const [hindiTerm, englishKeys] of Object.entries(HINDI_TO_KEYWORD)) {
    if (query.includes(hindiTerm)) {
      matchedKeywords.push(...englishKeys);
    }
  }

  // Detect likely category from keywords
  let category = "";
  const catKeywords: Record<string, string[]> = {
    rent: ["rent", "tenant", "landlord", "deposit", "eviction", "lease", "agreement"],
    property: ["property", "land", "RERA", "builder", "flat", "sale", "deed", "mutation", "encumbrance"],
    consumer: ["consumer", "complaint", "defective", "refund", "product", "service", "warranty"],
    employment: ["employment", "salary", "termination", "PF", "EPF", "harassment", "posh", "job", "fired"],
    family: ["divorce", "custody", "maintenance", "marriage", "violence", "domestic", "will", "alimony"],
    ecommerce: ["ecommerce", "online", "shopping", "data", "privacy", "DPDP", "return"],
    "cyber-fraud": ["fraud", "UPI", "scam", "phishing", "cybercrime", "1930", "identity"],
  };

  let bestCatScore = 0;
  for (const [cat, kws] of Object.entries(catKeywords)) {
    const score = kws.filter((kw) =>
      matchedKeywords.some((mk) => mk.includes(kw.toLowerCase()))
    ).length;
    if (score > bestCatScore) {
      bestCatScore = score;
      category = cat;
    }
  }

  return generateKnowledgeEmbedding(category, matchedKeywords.join(","));
}

export async function POST(request: NextRequest) {
  try {
    const { query, language = "en" } = await request.json();

    if (!query || typeof query !== "string") {
      return NextResponse.json(
        { error: "Missing query" },
        { status: 400 }
      );
    }

    // Step 1: Fetch all knowledge entries
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

    // Step 2: Hybrid scoring — keywords + vector similarity
    const queryLower = query.toLowerCase();
    const queryWords = queryLower.split(/\s+/).filter((w) => w.length > 2);
    const queryEmbedding = buildQueryEmbedding(query);

    const scored = allKnowledge.map((entry) => {
      // ── Keyword score ──
      let keywordScore = 0;
      const entryText =
        `${entry.keywords} ${entry.title} ${entry.content} ${entry.titleHi} ${entry.contentHi}`.toLowerCase();

      for (const word of queryWords) {
        if (entryText.includes(word)) keywordScore += 1;
      }

      // Boost exact keyword matches
      const entryKeywords = (entry.keywords || "")
        .toLowerCase()
        .split(",")
        .map((k) => k.trim());
      for (const kw of entryKeywords) {
        if (queryLower.includes(kw) && kw.length > 2) keywordScore += 3;
      }

      // Hindi keyword expansion matching
      for (const [hindiTerm, englishKeys] of Object.entries(HINDI_TO_KEYWORD)) {
        if (query.includes(hindiTerm)) {
          for (const ek of englishKeys) {
            if (entryText.includes(ek.toLowerCase())) keywordScore += 2;
          }
        }
      }

      // ── Vector similarity score ──
      let vectorScore = 0;
      if (entry.embedding) {
        try {
          const entryVec = JSON.parse(entry.embedding as string);
          vectorScore = cosineSimilarity(queryEmbedding, entryVec) * 5;
        } catch {
          // Skip if embedding parse fails
        }
      }

      return {
        ...entry,
        score: keywordScore + vectorScore,
      };
    });

    // Step 3: Top 3 results
    const topResults = scored
      .filter((r) => r.score > 0.5) // Filter out very low matches
      .sort((a, b) => b.score - a.score)
      .slice(0, 3);

    // Step 4: LLM answer — only if rate limit allows
    let answer = "";

    if (topResults.length > 0 && canMakeLLMRequest()) {
      const lang = language === "hi" ? "Hindi" : "English";
      const context = topResults
        .slice(0, 2)
        .map((r) => `${r.title}: ${r.content.slice(0, 400)}`)
        .join("\n\n");

      try {
        recordLLMRequest();
        const response = await getOpenAI().chat.completions.create({
          model: getModel(),
          messages: [
            {
              role: "system",
              content: `Legal awareness assistant for India. Answer in ${lang}, 2-3 sentences max. Cite acts. Add disclaimer. Use ONLY the context provided.`,
            },
            {
              role: "user",
              content: `${context}\n\nQ: ${query.slice(0, 200)}`,
            },
          ],
          temperature: 0.3,
          max_tokens: 300,
        });
        answer = response.choices[0]?.message?.content || "";
      } catch (error: unknown) {
        const statusCode = (error as { status?: number })?.status;
        if (statusCode === 429) {
          console.log(
            "OpenRouter 429 on search — falling back to knowledge base"
          );
        } else {
          console.error("LLM search answer failed:", error);
        }
        const top = topResults[0];
        answer =
          language === "hi"
            ? top.contentHi || top.content
            : top.content;
      }
    } else if (topResults.length > 0) {
      // No LLM budget — return top result content directly
      const top = topResults[0];
      answer =
        language === "hi"
          ? top.contentHi || top.content
          : top.content;
    }

    return NextResponse.json({
      results: topResults.map((r) => ({
        id: r.id,
        category: r.category,
        title: language === "hi" ? r.titleHi : r.title,
        content:
          language === "hi" ? r.contentHi || r.content : r.content,
        applicableActs: r.applicableActs,
        score: r.score,
      })),
      answer,
    });
  } catch (error) {
    console.error("Search error:", error);
    return NextResponse.json(
      { error: "Search failed" },
      { status: 500 }
    );
  }
}
