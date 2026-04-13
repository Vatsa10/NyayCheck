import { NextRequest, NextResponse } from "next/server";
import { multiSearch } from "@/lib/search/web-search";
import { crawlPages } from "@/lib/search/web-crawl";
import {
  getOpenAI,
  getModel,
  canMakeLLMRequest,
  recordLLMRequest,
} from "@/lib/llm/client";

/**
 * Lawyer Search Agent Pipeline:
 *
 * 1. INTENT   → Build smart queries from case type + location
 * 2. SEARCH   → DuckDuckGo (3 queries, 10s total)
 * 3. CRAWL    → Fetch actual page content from top URLs (5 pages, 8s total)
 * 4. THINK    → LLM reads crawled text → extracts top 10 real lawyers
 * 5. FALLBACK → Rule-based extraction from crawled text + snippets
 *
 * Total budget: ~15-20s
 */

export interface LawyerResult {
  name: string;
  specialization: string;
  location: string;
  phone?: string;
  address?: string;
  experience?: string;
  rating?: string;
  sourceUrl: string;
  sourceName: string;
}

const CASE_SEARCH_TERMS: Record<string, string> = {
  rent: "tenant landlord rent dispute property",
  property: "property real estate RERA land",
  consumer: "consumer protection forum complaint",
  employment: "labour employment industrial dispute workplace",
  family: "family divorce custody maintenance matrimonial",
  ecommerce: "consumer protection ecommerce IT Act",
  "cyber-fraud": "cyber crime IT Act fraud",
  other: "lawyer advocate legal consultant",
};

export async function POST(request: NextRequest) {
  try {
    const {
      caseType = "consumer",
      customCaseType = "",
      city = "",
      state = "",
      budget = "",
      language = "en",
    } = await request.json();

    const locationStr = city || state || "India";
    const isCustom = caseType === "other" && customCaseType;
    const searchTerm = isCustom
      ? customCaseType
      : CASE_SEARCH_TERMS[caseType] || "legal";

    // ── 1. INTENT — smart queries targeting directories with contact info ──
    const queries = [
      `top lawyer ${searchTerm} in ${locationStr} contact number address`,
      `best advocate ${searchTerm} ${locationStr} phone office reviews`,
      `${searchTerm} lawyer ${locationStr} lawrato vakkilsearch directory ${budget ? "affordable" : ""}`.trim(),
    ];

    // ── 2. SEARCH — DuckDuckGo (3 queries parallel, 10s total cap) ──
    const searchResults = await multiSearch(queries, 6, 10_000);

    if (searchResults.length === 0) {
      return NextResponse.json({
        lawyers: [],
        sources: [],
        message:
          language === "hi"
            ? "कोई वकील नहीं मिला। अलग स्थान या श्रेणी आज़माएं।"
            : "No lawyers found. Try a different location or category.",
      });
    }

    // Filter legal-relevant results
    const relevant = searchResults.filter((r) => {
      const text = `${r.title} ${r.snippet}`.toLowerCase();
      return (
        text.includes("lawyer") ||
        text.includes("advocate") ||
        text.includes("attorney") ||
        text.includes("legal") ||
        text.includes("law firm") ||
        text.includes("वकील") ||
        r.source.includes("lawrato") ||
        r.source.includes("vakkilsearch") ||
        r.source.includes("justdial") ||
        r.source.includes("sulekha")
      );
    });

    // ── 3. CRAWL — fetch actual page content (top 5 URLs, 8s total) ──
    const urlsToCrawl = relevant.slice(0, 5).map((r) => r.url);
    const crawledPages = await crawlPages(urlsToCrawl, 1200, 5000, 8000);
    const crawledWithContent = crawledPages.filter((p) => p.wordCount > 20);

    // Build combined context: crawled pages + DDG snippets
    const crawledContext = crawledWithContent
      .map(
        (p) =>
          `--- SOURCE: ${p.url} ---\n${p.text.slice(0, 1500)}`
      )
      .join("\n\n");

    const snippetContext = relevant
      .slice(0, 8)
      .map((r) => `[${r.source}] ${r.title}: ${r.snippet}`)
      .join("\n");

    const fullContext = crawledContext
      ? `${crawledContext}\n\n--- SNIPPETS ---\n${snippetContext}`
      : snippetContext;

    // ── 4. THINK — LLM reads crawled content, extracts real lawyer data ──
    let lawyers: LawyerResult[] = [];

    if (fullContext.length > 100 && canMakeLLMRequest()) {
      lawyers = await llmExtract(
        fullContext,
        searchTerm,
        locationStr,
        relevant.map((r) => ({ url: r.url, source: r.source }))
      );
    }

    // ── 5. FALLBACK — rule-based extraction from crawled text + snippets ──
    if (lawyers.length === 0) {
      lawyers = ruleBasedExtract(relevant, crawledWithContent, locationStr, searchTerm);
    }

    return NextResponse.json({
      lawyers: lawyers.slice(0, 10),
      sources: relevant.slice(0, 8).map((r) => ({
        title: r.title,
        url: r.url,
        source: r.source,
      })),
      crawledCount: crawledWithContent.length,
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
 * LLM THINK step — reads crawled web content and extracts real lawyer data.
 * The LLM only extracts/augments — all data must come from the crawled text.
 */
async function llmExtract(
  crawledText: string,
  specialization: string,
  location: string,
  sources: { url: string; source: string }[]
): Promise<LawyerResult[]> {
  try {
    recordLLMRequest();
    const response = await getOpenAI().chat.completions.create({
      model: getModel(),
      messages: [
        {
          role: "system",
          content: `You extract lawyer profiles from crawled web pages. STRICT RULES:
- ONLY use data that EXISTS in the text below. NEVER invent names, phones, or addresses.
- Extract: name, phone number, office address, years of experience, rating.
- If a field is not in the text, set it to null.
- Return max 10 lawyers as a JSON array.
- Each must have a sourceUrl from the provided source URLs.`,
        },
        {
          role: "user",
          content: `Find ${specialization} lawyers near ${location}.

Source URLs: ${sources.slice(0, 5).map((s) => s.url).join(" | ")}

Crawled content:
${crawledText.slice(0, 3500)}

JSON array only:
[{"name":"real name","phone":"real number or null","address":"office address or null","experience":"X years or null","rating":"X/5 or null","sourceUrl":"matching URL","sourceName":"domain"}]`,
        },
      ],
      temperature: 0.1,
      max_tokens: 1000,
    });

    const content = response.choices[0]?.message?.content || "";
    const jsonStr = content.replace(/```json?\n?/g, "").replace(/```/g, "").trim();
    const parsed = JSON.parse(jsonStr);

    return parsed.map((l: Record<string, string | null>) => ({
      name: l.name || "Unknown",
      specialization,
      location: l.address || location,
      phone: l.phone || undefined,
      address: l.address || undefined,
      experience: l.experience || undefined,
      rating: l.rating || undefined,
      sourceUrl: l.sourceUrl || sources[0]?.url || "",
      sourceName: l.sourceName || sources[0]?.source || "",
    }));
  } catch (error) {
    console.error("LLM lawyer extraction failed:", error);
    return [];
  }
}

/**
 * Rule-based fallback — extracts from crawled pages + DDG snippets via regex.
 */
function ruleBasedExtract(
  searchResults: { title: string; url: string; snippet: string; source: string }[],
  crawledPages: { url: string; text: string }[],
  location: string,
  specialization: string
): LawyerResult[] {
  const lawyers: LawyerResult[] = [];
  const seenNames = new Set<string>();

  // Pass 1: crawled pages — richer data
  for (const page of crawledPages) {
    if (page.text.length < 50) continue;

    const phones = page.text.match(/(?:\+91[-\s]?)?[6-9]\d{4}[-\s]?\d{5}/g) || [];
    const nameMatches =
      page.text.match(
        /(?:Adv\.?|Advocate|Lawyer|Attorney)\s+([A-Z][a-z]+(?:\s+[A-Z][a-z]+){1,3})/g
      ) || [];

    for (const raw of nameMatches.slice(0, 3)) {
      const name = raw.replace(/^(?:Adv\.?|Advocate|Lawyer|Attorney)\s+/i, "").trim();
      if (name.length < 3 || name.length > 50 || seenNames.has(name)) continue;
      seenNames.add(name);

      lawyers.push({
        name,
        specialization,
        location,
        phone: phones[0] || undefined,
        sourceUrl: page.url,
        sourceName: new URL(page.url).hostname.replace("www.", ""),
      });
    }
  }

  // Pass 2: DDG snippets
  for (const r of searchResults) {
    if (lawyers.length >= 10) break;
    const text = `${r.title} ${r.snippet}`;

    let name: string | null = null;
    for (const pat of [
      /(?:Adv\.?|Advocate|Dr\.?)\s+([A-Z][a-z]+(?:\s+[A-Z][a-z]+){1,3})/,
      /^([A-Z][a-z]+(?:\s+[A-Z][a-z]+){1,3})\s*[-|–,]/,
    ]) {
      const m = r.title.match(pat);
      if (m) { name = m[1].trim(); break; }
    }

    const finalName = name || r.title.slice(0, 60).replace(/\s*[-|].*$/, "");
    if (seenNames.has(finalName)) continue;
    seenNames.add(finalName);

    const phoneMatch = text.match(/(?:\+91[-\s]?)?[6-9]\d{4}[-\s]?\d{5}/);
    const expMatch = text.match(/(\d+)\+?\s*(?:years?|yrs?)/i);
    const ratingMatch = text.match(/(\d\.\d)\s*(?:\/\s*5|stars?)/i);

    lawyers.push({
      name: finalName,
      specialization,
      location,
      phone: phoneMatch?.[0] || undefined,
      experience: expMatch ? `${expMatch[1]}+ years` : undefined,
      rating: ratingMatch ? `${ratingMatch[1]}/5` : undefined,
      sourceUrl: r.url,
      sourceName: r.source,
    });
  }

  return lawyers.slice(0, 10);
}
