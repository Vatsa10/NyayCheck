import OpenAI from "openai";

let _client: OpenAI | null = null;

export function getOpenAI(): OpenAI {
  if (!_client) {
    _client = new OpenAI({
      baseURL: "https://openrouter.ai/api/v1",
      apiKey: process.env.OPENROUTER_API_KEY,
    });
  }
  return _client;
}

export function getModel(): string {
  return process.env.MODEL || "minimax/minimax-m2.5:free";
}

// ── Centralized rate limiter for free-tier OpenRouter ──
// Free models: ~20 req/min, ~200 req/day (varies)
// We enforce: 10 req/min, 120 req/day to stay safely under limits

const MINUTE_LIMIT = 10;
const DAILY_LIMIT = 120;
const MINUTE_MS = 60_000;
const DAY_MS = 24 * 60 * 60_000;

const requestTimestamps: number[] = [];

/**
 * Check if we can make an LLM request. Call before every OpenRouter call.
 * Returns true if allowed, false if rate-limited.
 */
export function canMakeLLMRequest(): boolean {
  const now = Date.now();

  // Prune old entries
  while (requestTimestamps.length > 0 && requestTimestamps[0] < now - DAY_MS) {
    requestTimestamps.shift();
  }

  // Check daily limit
  if (requestTimestamps.length >= DAILY_LIMIT) return false;

  // Check per-minute limit
  const recentCount = requestTimestamps.filter(
    (t) => t > now - MINUTE_MS
  ).length;
  if (recentCount >= MINUTE_LIMIT) return false;

  return true;
}

/**
 * Record that an LLM request was made. Call after a successful request.
 */
export function recordLLMRequest(): void {
  requestTimestamps.push(Date.now());
}

/**
 * Get current usage stats (for debugging / monitoring).
 */
export function getLLMUsage(): {
  minuteUsed: number;
  minuteLimit: number;
  dailyUsed: number;
  dailyLimit: number;
} {
  const now = Date.now();
  const minuteUsed = requestTimestamps.filter(
    (t) => t > now - MINUTE_MS
  ).length;
  // Prune for daily count
  const dailyUsed = requestTimestamps.filter(
    (t) => t > now - DAY_MS
  ).length;
  return { minuteUsed, minuteLimit: MINUTE_LIMIT, dailyUsed, dailyLimit: DAILY_LIMIT };
}
