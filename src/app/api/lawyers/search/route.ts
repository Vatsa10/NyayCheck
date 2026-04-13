import { NextRequest, NextResponse } from "next/server";
import { multiSearch } from "@/lib/search/web-search";

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
  other: ["lawyer advocate general practice", "legal consultant"],
};

export async function POST(request: NextRequest) {
  try {
    const {
      caseType = "consumer",
      customCaseType = "",
      location = "",
      city = "",
      state = "",
      budget = "",
      language = "en",
    } = await request.json();

    // Build the location string
    const locationStr = city || location || state || "India";

    // For "other" with custom input, use the user's description directly as search terms
    const isCustom = caseType === "other" && customCaseType;
    const searchTerms = isCustom
      ? [customCaseType, `${customCaseType} legal`]
      : CATEGORY_TO_SEARCH[caseType] || ["legal"];

    // Build 3 focused queries (down from 6 — each DDG fetch takes 2-4s)
    const primaryTerm = isCustom ? customCaseType : searchTerms[0];
    const queries = [
      `lawyer ${primaryTerm} ${locationStr} India contact reviews`,
      `advocate ${primaryTerm} near ${locationStr} lawrato vakkilsearch`,
      budget
        ? `affordable lawyer ${primaryTerm} ${locationStr} fees`
        : `best ${primaryTerm} lawyer ${locationStr}`,
    ];

    // Run all 3 in parallel with 10s total timeout
    const rawResults = await multiSearch(queries, 6, 10_000);

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

    // Rule-based extraction only — no LLM call, instant results
    const structuredLawyers = extractLawyersRuleBased(
      relevant.slice(0, 10),
      locationStr,
      primaryTerm
    );

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
 * Rule-based extraction — fast, no LLM call.
 * Extracts lawyer info from titles and snippets using regex patterns.
 */
function extractLawyersRuleBased(
  results: { title: string; url: string; snippet: string; source: string }[],
  location: string,
  specialization: string
): LawyerResult[] {
  return results.map((r) => {
    const text = `${r.title} ${r.snippet}`;

    // Extract name from title patterns
    let name: string | null = null;
    const namePatterns = [
      /(?:Adv\.?|Advocate|Dr\.?|Atty\.?)\s+([A-Z][a-z]+(?:\s+[A-Z][a-z]+){1,3})/,
      /^([A-Z][a-z]+(?:\s+[A-Z][a-z]+){1,3})\s*[-|–,]/,
      /(?:Lawyer|Attorney)\s*[-:]\s*([A-Z][a-z]+(?:\s+[A-Z][a-z]+){1,3})/i,
    ];
    for (const pat of namePatterns) {
      const m = r.title.match(pat);
      if (m) { name = m[1].trim(); break; }
    }

    // Extract experience ("X years", "X+ years")
    const expMatch = text.match(/(\d+)\+?\s*(?:years?|yrs?)\s*(?:of\s+)?(?:experience|exp)?/i);
    const experience = expMatch ? `${expMatch[1]}+ years experience` : undefined;

    // Extract rating ("4.5/5", "4.8 stars", "rated 4.7")
    const ratingMatch = text.match(/(\d\.\d)\s*(?:\/\s*5|stars?|rating)/i)
      || text.match(/rated\s+(\d\.\d)/i);
    const rating = ratingMatch ? `${ratingMatch[1]}/5` : undefined;

    // Extract phone (Indian: 10 digits, or +91)
    const phoneMatch = text.match(/(?:\+91[-\s]?)?[6-9]\d{9}/);
    const contact = phoneMatch ? phoneMatch[0] : undefined;

    return {
      name: name || r.title.slice(0, 60).replace(/\s*[-|].*$/, ""),
      specialization,
      location,
      experience,
      contact,
      rating,
      sourceUrl: r.url,
      sourceName: r.source,
      snippet: r.snippet.slice(0, 200),
    };
  });
}
