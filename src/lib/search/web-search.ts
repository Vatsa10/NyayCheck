/**
 * Web search via DuckDuckGo HTML — no API key needed.
 * Equivalent to the Python ddgs.text() but runs in Node.js.
 *
 * Strategy: fetch DuckDuckGo's HTML lite endpoint, parse results.
 * Fallback: DuckDuckGo JSON API if HTML fails.
 */

export interface SearchResult {
  title: string;
  url: string;
  snippet: string;
  source: string; // domain name
}

const HEADERS = {
  "User-Agent":
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36",
  Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
  "Accept-Language": "en-US,en;q=0.9",
};

/**
 * Search DuckDuckGo and return structured results.
 * Uses the HTML lite version which is more reliable than the API.
 */
export async function webSearch(
  query: string,
  maxResults: number = 8
): Promise<SearchResult[]> {
  // Try DuckDuckGo HTML lite first
  try {
    const results = await searchDDGHtml(query, maxResults);
    if (results.length > 0) return results;
  } catch (e) {
    console.log("DDG HTML search failed, trying API:", e);
  }

  // Fallback: DuckDuckGo API
  try {
    return await searchDDGApi(query, maxResults);
  } catch (e) {
    console.log("DDG API search also failed:", e);
    return [];
  }
}

async function searchDDGHtml(
  query: string,
  maxResults: number
): Promise<SearchResult[]> {
  const url = `https://html.duckduckgo.com/html/?q=${encodeURIComponent(query)}`;
  const resp = await fetch(url, {
    headers: HEADERS,
    redirect: "follow",
  });

  if (!resp.ok) throw new Error(`DDG HTML returned ${resp.status}`);
  const html = await resp.text();

  return parseDDGHtml(html, maxResults);
}

function parseDDGHtml(html: string, maxResults: number): SearchResult[] {
  const results: SearchResult[] = [];

  // DDG HTML lite uses <a class="result__a" href="...">title</a>
  // and <a class="result__snippet" ...>snippet</a>
  const resultBlocks = html.split(/class="result\s/);

  for (let i = 1; i < resultBlocks.length && results.length < maxResults; i++) {
    const block = resultBlocks[i];

    // Extract URL
    const urlMatch = block.match(/class="result__a"[^>]*href="([^"]+)"/);
    if (!urlMatch) continue;

    let resultUrl = urlMatch[1];
    // DDG wraps URLs in a redirect — extract the actual URL
    if (resultUrl.includes("uddg=")) {
      const decoded = decodeURIComponent(
        resultUrl.split("uddg=")[1]?.split("&")[0] || ""
      );
      if (decoded) resultUrl = decoded;
    }

    // Skip non-http URLs
    if (!resultUrl.startsWith("http")) continue;

    // Extract title
    const titleMatch = block.match(
      /class="result__a"[^>]*>([^<]+(?:<[^>]+>[^<]*)*)/
    );
    const title = titleMatch
      ? titleMatch[1].replace(/<[^>]+>/g, "").trim()
      : "";

    // Extract snippet
    const snippetMatch = block.match(
      /class="result__snippet"[^>]*>([^<]+(?:<[^>]+>[^<]*)*)/
    );
    const snippet = snippetMatch
      ? snippetMatch[1].replace(/<[^>]+>/g, "").trim()
      : "";

    if (!title && !snippet) continue;

    const source = new URL(resultUrl).hostname.replace("www.", "");

    results.push({ title, url: resultUrl, snippet, source });
  }

  return results;
}

async function searchDDGApi(
  query: string,
  maxResults: number
): Promise<SearchResult[]> {
  // DuckDuckGo instant answer API (limited but works as fallback)
  const url = `https://api.duckduckgo.com/?q=${encodeURIComponent(query)}&format=json&no_html=1`;
  const resp = await fetch(url, { headers: HEADERS });
  if (!resp.ok) return [];

  const data = await resp.json();
  const results: SearchResult[] = [];

  // Related topics
  if (data.RelatedTopics) {
    for (
      const topic of data.RelatedTopics.slice(0, maxResults)
    ) {
      if (topic.FirstURL && topic.Text) {
        results.push({
          title: topic.Text.slice(0, 100),
          url: topic.FirstURL,
          snippet: topic.Text,
          source: new URL(topic.FirstURL).hostname.replace("www.", ""),
        });
      }
    }
  }

  return results;
}

/**
 * Run multiple search queries in parallel and deduplicate results.
 */
export async function multiSearch(
  queries: string[],
  maxPerQuery: number = 5
): Promise<SearchResult[]> {
  const allResults = await Promise.all(
    queries.map((q) => webSearch(q, maxPerQuery))
  );

  // Deduplicate by URL
  const seen = new Set<string>();
  const deduped: SearchResult[] = [];

  for (const results of allResults) {
    for (const r of results) {
      const normalized = r.url.replace(/\/+$/, "").toLowerCase();
      if (!seen.has(normalized)) {
        seen.add(normalized);
        deduped.push(r);
      }
    }
  }

  return deduped;
}
