/**
 * Web content crawler — fetches a URL and extracts readable text.
 * Strips HTML tags, scripts, styles, and returns clean text.
 */

const HEADERS = {
  "User-Agent":
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36",
  Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
  "Accept-Language": "en-US,en;q=0.9",
};

export interface CrawledPage {
  url: string;
  title: string;
  text: string; // cleaned readable text
  wordCount: number;
}

/**
 * Fetch a URL and extract readable text content.
 * Has a hard timeout — returns empty on failure.
 */
export async function crawlPage(
  url: string,
  maxWords: number = 1500,
  timeoutMs: number = 5000
): Promise<CrawledPage> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const resp = await fetch(url, {
      headers: HEADERS,
      redirect: "follow",
      signal: controller.signal,
    });
    clearTimeout(timeout);

    if (!resp.ok) return emptyPage(url);

    const html = await resp.text();
    const title = extractTitle(html);
    const text = htmlToText(html, maxWords);

    return {
      url,
      title,
      text,
      wordCount: text.split(/\s+/).length,
    };
  } catch {
    clearTimeout(timeout);
    return emptyPage(url);
  }
}

/**
 * Crawl multiple URLs in parallel with a total time budget.
 * Returns whatever pages completed within the budget.
 */
export async function crawlPages(
  urls: string[],
  maxPerPage: number = 1500,
  perPageTimeoutMs: number = 5000,
  totalTimeoutMs: number = 8000
): Promise<CrawledPage[]> {
  const results: CrawledPage[] = [];

  const crawlPromises = urls.map((url) =>
    crawlPage(url, maxPerPage, perPageTimeoutMs).then((page) => {
      if (page.wordCount > 10) results.push(page);
      return page;
    })
  );

  const totalTimeout = new Promise<"timeout">((resolve) =>
    setTimeout(() => resolve("timeout"), totalTimeoutMs)
  );

  await Promise.race([Promise.all(crawlPromises), totalTimeout]);

  return results;
}

function emptyPage(url: string): CrawledPage {
  return { url, title: "", text: "", wordCount: 0 };
}

function extractTitle(html: string): string {
  const m = html.match(/<title[^>]*>([^<]+)<\/title>/i);
  return m ? m[1].trim().slice(0, 200) : "";
}

/**
 * Convert HTML to readable text.
 * Strips scripts, styles, tags, and normalizes whitespace.
 */
function htmlToText(html: string, maxWords: number): string {
  let text = html;

  // Remove scripts and styles entirely
  text = text.replace(/<script[\s\S]*?<\/script>/gi, " ");
  text = text.replace(/<style[\s\S]*?<\/style>/gi, " ");
  text = text.replace(/<noscript[\s\S]*?<\/noscript>/gi, " ");

  // Replace block elements with newlines for readability
  text = text.replace(/<\/?(p|div|br|h[1-6]|li|tr|td|th|section|article|header|footer)[^>]*>/gi, "\n");

  // Strip all remaining tags
  text = text.replace(/<[^>]+>/g, " ");

  // Decode common HTML entities
  text = text
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, " ")
    .replace(/&#\d+;/g, " ");

  // Normalize whitespace
  text = text.replace(/[ \t]+/g, " ");
  text = text.replace(/\n\s*\n/g, "\n");
  text = text.trim();

  // Truncate
  const words = text.split(/\s+/);
  if (words.length > maxWords) {
    return words.slice(0, maxWords).join(" ");
  }
  return text;
}
