import { NextRequest, NextResponse } from "next/server";
import { multiSearch, type SearchResult } from "@/lib/search/web-search";
import {
  getOpenAI,
  getModel,
  canMakeLLMRequest,
  recordLLMRequest,
} from "@/lib/llm/client";

export interface LawyerResult {
  name: string;
  specialization: string;
  location: string;
  experience?: string;
  contact?: string;
  rating?: string;
  sourceUrl: string;
  sourceName: string;
  snippet: string;
}

// Map our legal categories to lawyer search terms
const CATEGORY_TO_SEARCH: Record<string, string[]> = {
  rent: ["tenant landlord rent dispute", "property rental civil"],
  property: ["property real estate RERA", "land dispute civil"],
  consumer: ["consumer protection forum", "consumer rights"],
  employment: ["labour employment industrial dispute", "labour law workplace"],
  family: ["family divorce custody maintenance", "matrimonial domestic violence"],
  ecommerce: ["consumer protection ecommerce", "IT Act cyber consumer"],
  "cyber-fraud": ["cyber crime IT Act", "cyber fraud online scam"],
};

export async function POST(request: NextRequest) {
  try {
    const {
      caseType = "consumer",
      location = "",
      city = "",
      state = "",
      budget = "",
      language = "en",
    } = await request.json();

    // Build the location string
    const locationStr = city || location || state || "India";

    // Build targeted search queries (like the Python agent's dynamic approach)
    const searchTerms = CATEGORY_TO_SEARCH[caseType] || ["legal"];
    const queries: string[] = [];

    // Primary queries: lawyer directories and legal platforms
    for (const term of searchTerms.slice(0, 2)) {
      queries.push(`best lawyer ${term} ${locationStr} India contact`);
      queries.push(`advocate ${term} near ${locationStr} reviews`);
    }

    // Platform-specific queries for fact-grounded results
    queries.push(`site:lawrato.com lawyer ${searchTerms[0]} ${locationStr}`);
    queries.push(`site:vakkilsearch.com advocate ${locationStr} ${searchTerms[0]}`);

    // Budget-aware query
    if (budget) {
      queries.push(`affordable lawyer ${searchTerms[0]} ${locationStr} fees ${budget}`);
    }

    // Run all searches in parallel (max 6 queries)
    const rawResults = await multiSearch(queries.slice(0, 6), 5);

    if (rawResults.length === 0) {
      return NextResponse.json({
        lawyers: [],
        sources: [],
        message:
          language === "hi"
            ? "कोई वकील नहीं मिला। अलग स्थान या श्रेणी आज़माएं।"
            : "No lawyers found. Try a different location or category.",
      });
    }

    // Filter out irrelevant results (ads, generic pages)
    const relevant = rawResults.filter((r) => {
      const text = `${r.title} ${r.snippet}`.toLowerCase();
      // Must mention lawyer/advocate/attorney/legal
      return (
        text.includes("lawyer") ||
        text.includes("advocate") ||
        text.includes("attorney") ||
        text.includes("legal") ||
        text.includes("law firm") ||
        text.includes("वकील")
      );
    });

    // Try LLM structuring (optional — if rate limit allows)
    let structuredLawyers: LawyerResult[] = [];

    if (relevant.length > 0 && canMakeLLMRequest()) {
      structuredLawyers = await structureWithLLM(
        relevant.slice(0, 10),
        caseType,
        locationStr,
        language
      );
    }

    // If LLM failed or rate limited, do rule-based extraction
    if (structuredLawyers.length === 0) {
      structuredLawyers = extractLawyersRuleBased(relevant.slice(0, 10), locationStr);
    }

    return NextResponse.json({
      lawyers: structuredLawyers.slice(0, 8),
      sources: relevant.slice(0, 10).map((r) => ({
        title: r.title,
        url: r.url,
        source: r.source,
      })),
      searchQueries: queries.slice(0, 3), // Show what was searched for transparency
    });
  } catch (error) {
    console.error("Lawyer search error:", error);
    return NextResponse.json(
      { error: "Search failed", lawyers: [], sources: [] },
      { status: 500 }
    );
  }
}

/**
 * Use LLM to structure raw search results into lawyer profiles.
 * The LLM ONLY extracts from the provided data — never generates.
 */
async function structureWithLLM(
  results: SearchResult[],
  caseType: string,
  location: string,
  language: string
): Promise<LawyerResult[]> {
  const resultsText = results
    .map(
      (r, i) =>
        `[${i + 1}] ${r.title}\nURL: ${r.url}\nSource: ${r.source}\nSnippet: ${r.snippet}`
    )
    .join("\n\n");

  try {
    recordLLMRequest();
    const response = await getOpenAI().chat.completions.create({
      model: getModel(),
      messages: [
        {
          role: "system",
          content: `You extract lawyer information from search results. You MUST ONLY use information present in the search results — NEVER invent names, numbers, or details. If a field is not found, use null. Return JSON array only.`,
        },
        {
          role: "user",
          content: `Extract lawyer profiles from these search results for "${caseType}" lawyers near "${location}".

Search Results:
${resultsText}

Return a JSON array (max 8 entries):
[{"name":"actual name from results or null","specialization":"from results","location":"from results","experience":"if mentioned","contact":"phone/email if found","rating":"if mentioned","sourceUrl":"actual URL","sourceName":"domain","snippet":"relevant excerpt from snippet"}]

CRITICAL: Only extract what IS in the search results. No fabrication. If unsure, use null.`,
        },
      ],
      temperature: 0.1, // Very low — extraction, not generation
      max_tokens: 800,
    });

    const content = response.choices[0]?.message?.content || "";
    const jsonStr = content
      .replace(/```json?\n?/g, "")
      .replace(/```/g, "")
      .trim();
    return JSON.parse(jsonStr);
  } catch (error) {
    console.error("LLM structuring failed:", error);
    return [];
  }
}

/**
 * Rule-based extraction when LLM is not available.
 * Extracts what we can from titles and snippets directly.
 */
function extractLawyersRuleBased(
  results: SearchResult[],
  location: string
): LawyerResult[] {
  return results.map((r) => {
    // Try to extract a name from the title
    // Common patterns: "Adv. Name - Specialization" or "Name | Lawyer in City"
    let name: string | null = null;
    const namePatterns = [
      /^(?:Adv\.?|Advocate|Dr\.?)\s+([A-Z][a-z]+(?:\s+[A-Z][a-z]+){1,3})/,
      /^([A-Z][a-z]+(?:\s+[A-Z][a-z]+){1,3})\s*[-|–]/,
    ];
    for (const pat of namePatterns) {
      const m = r.title.match(pat);
      if (m) {
        name = m[1].trim();
        break;
      }
    }

    return {
      name: name || r.title.slice(0, 60),
      specialization: "",
      location,
      sourceUrl: r.url,
      sourceName: r.source,
      snippet: r.snippet.slice(0, 200),
    };
  });
}
