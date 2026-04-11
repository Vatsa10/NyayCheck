import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { legalKnowledge } from "@/lib/db/schema";
import { cosineSimilarity } from "@/lib/engine/embeddings";
import { getOpenAI, getModel } from "@/lib/llm/client";
import type { Language } from "@/types";

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
        answer: language === "hi"
          ? "ज्ञान आधार अभी तक तैयार नहीं है।"
          : "Knowledge base is not seeded yet.",
      });
    }

    // Step 2: Keyword-based scoring
    const queryLower = query.toLowerCase();
    const queryWords = queryLower
      .split(/\s+/)
      .filter((w) => w.length > 2);

    const scored = allKnowledge.map((entry) => {
      let keywordScore = 0;
      const entryText =
        `${entry.keywords} ${entry.title} ${entry.content}`.toLowerCase();

      for (const word of queryWords) {
        if (entryText.includes(word)) {
          keywordScore += 1;
        }
      }

      // Boost exact keyword matches
      const entryKeywords = (entry.keywords || "")
        .toLowerCase()
        .split(",")
        .map((k) => k.trim());
      for (const kw of entryKeywords) {
        if (queryLower.includes(kw) && kw.length > 2) {
          keywordScore += 3;
        }
      }

      // Vector similarity (if embeddings exist)
      let vectorScore = 0;
      if (entry.embedding) {
        try {
          const entryVec = JSON.parse(entry.embedding as string);
          // Generate a simple query vector from keyword matching
          const queryVec = new Array(64).fill(0);
          // Just use keyword overlap as a rough vector proxy
          vectorScore = keywordScore > 0 ? 0.5 : 0;
        } catch {
          // Skip vector scoring if parse fails
        }
      }

      return {
        ...entry,
        score: keywordScore + vectorScore,
      };
    });

    // Step 3: Sort by score, take top 5
    const topResults = scored
      .filter((r) => r.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 5);

    // Step 4: Use LLM to generate a contextual answer from the top results
    let answer = "";
    if (topResults.length > 0) {
      const lang = language === "hi" ? "Hindi" : "English";
      const context = topResults
        .map(
          (r) =>
            `[${r.title}]\n${r.content}\nApplicable Acts: ${r.applicableActs}`
        )
        .join("\n\n---\n\n");

      try {
        const response = await getOpenAI().chat.completions.create({
          model: getModel(),
          messages: [
            {
              role: "system",
              content: `You are a legal awareness assistant for Indian citizens. Answer the user's question in ${lang} using ONLY the provided legal knowledge context. Be concise (3-5 sentences), cite specific acts/sections, and add a disclaimer that this is not legal advice. If the context doesn't fully answer the question, say what you can and suggest consulting a lawyer.`,
            },
            {
              role: "user",
              content: `Context:\n${context}\n\nQuestion: ${query}`,
            },
          ],
          temperature: 0.3,
          max_tokens: 500,
        });

        answer = response.choices[0]?.message?.content || "";
      } catch (error) {
        console.error("LLM answer generation failed:", error);
        // Fallback: return the top result's content
        const topEntry = topResults[0];
        answer =
          language === "hi"
            ? topEntry.contentHi || topEntry.content
            : topEntry.content;
      }
    }

    return NextResponse.json({
      results: topResults.map((r) => ({
        id: r.id,
        category: r.category,
        title: language === "hi" ? r.titleHi : r.title,
        content:
          language === "hi"
            ? r.contentHi || r.content
            : r.content,
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
