import { NextRequest, NextResponse } from "next/server";

const SARVAM_TTS_URL = "https://api.sarvam.ai/text-to-speech";
const MAX_CHARS = 2000; // Stay well under the 2500 limit
const RATE_LIMIT_WINDOW_MS = 60_000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 30; // Half of 60/min limit to stay safe

// Simple in-memory rate limiter
const requestLog: number[] = [];

// Simple in-memory audio cache (avoids re-generating same text)
const audioCache = new Map<string, { audio: string; timestamp: number }>();
const CACHE_TTL_MS = 10 * 60_000; // 10 minutes

function isRateLimited(): boolean {
  const now = Date.now();
  // Remove old entries
  while (requestLog.length > 0 && requestLog[0] < now - RATE_LIMIT_WINDOW_MS) {
    requestLog.shift();
  }
  return requestLog.length >= MAX_REQUESTS_PER_WINDOW;
}

function getCacheKey(text: string, lang: string): string {
  // Simple hash from text + lang
  return `${lang}:${text.slice(0, 100)}:${text.length}`;
}

export async function POST(request: NextRequest) {
  try {
    const { text, language = "en" } = await request.json();

    if (!text || typeof text !== "string") {
      return NextResponse.json({ error: "Missing text" }, { status: 400 });
    }

    if (!process.env.SARVAM_API_KEY) {
      return NextResponse.json(
        { error: "TTS not configured" },
        { status: 503 }
      );
    }

    // Rate limit check
    if (isRateLimited()) {
      return NextResponse.json(
        { error: "Rate limited. Please wait a moment." },
        { status: 429 }
      );
    }

    // Truncate to stay under char limit
    const truncatedText = text.slice(0, MAX_CHARS);

    // Check cache
    const cacheKey = getCacheKey(truncatedText, language);
    const cached = audioCache.get(cacheKey);
    if (cached && Date.now() - cached.timestamp < CACHE_TTL_MS) {
      return NextResponse.json({ audio: cached.audio });
    }

    // Map language to Sarvam language code
    const langCode = language === "hi" ? "hi-IN" : "en-IN";
    // Use female voice for a warm, accessible feel
    const speaker = language === "hi" ? "priya" : "ishita";

    // Call Sarvam API
    requestLog.push(Date.now());

    const response = await fetch(SARVAM_TTS_URL, {
      method: "POST",
      headers: {
        "api-subscription-key": process.env.SARVAM_API_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text: truncatedText,
        target_language_code: langCode,
        model: "bulbul:v3",
        speaker,
        pace: 0.95, // Slightly slower for legal content clarity
        temperature: 0.5, // Lower for more consistent output
        speech_sample_rate: 22050, // Good quality, smaller size
      }),
    });

    if (!response.ok) {
      const errBody = await response.text();
      console.error("Sarvam TTS error:", response.status, errBody);

      if (response.status === 429) {
        return NextResponse.json(
          { error: "TTS rate limited. Please try again later." },
          { status: 429 }
        );
      }
      return NextResponse.json(
        { error: "TTS generation failed" },
        { status: 502 }
      );
    }

    const data = await response.json();
    const audioBase64 = data.audios?.[0];

    if (!audioBase64) {
      return NextResponse.json(
        { error: "No audio returned" },
        { status: 502 }
      );
    }

    // Cache the result
    audioCache.set(cacheKey, { audio: audioBase64, timestamp: Date.now() });

    // Evict old cache entries
    if (audioCache.size > 100) {
      const now = Date.now();
      for (const [key, val] of audioCache) {
        if (now - val.timestamp > CACHE_TTL_MS) audioCache.delete(key);
      }
    }

    return NextResponse.json({ audio: audioBase64 });
  } catch (error) {
    console.error("TTS error:", error);
    return NextResponse.json(
      { error: "TTS generation failed" },
      { status: 500 }
    );
  }
}
