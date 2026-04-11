"use client";

import { useState, useCallback, useRef } from "react";
import type { Language } from "@/types";

// Client-side rate limiter: max 5 requests per minute
const CLIENT_RATE_LIMIT = 5;
const CLIENT_WINDOW_MS = 60_000;
const clientLog: number[] = [];

function isClientRateLimited(): boolean {
  const now = Date.now();
  while (clientLog.length > 0 && clientLog[0] < now - CLIENT_WINDOW_MS) {
    clientLog.shift();
  }
  return clientLog.length >= CLIENT_RATE_LIMIT;
}

export function useTTS() {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const stop = useCallback(() => {
    // Stop Sarvam audio
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      audioRef.current = null;
    }
    // Stop browser TTS
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      speechSynthesis.cancel();
    }
    setIsSpeaking(false);
    setIsLoading(false);
  }, []);

  const speakWithBrowserTTS = useCallback(
    (text: string, lang: Language) => {
      if (!("speechSynthesis" in window)) return;
      speechSynthesis.cancel();

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = lang === "hi" ? "hi-IN" : "en-IN";
      utterance.rate = 0.9;

      const voices = speechSynthesis.getVoices();
      const targetLang = lang === "hi" ? "hi" : "en";
      const voice = voices.find((v) => v.lang.startsWith(targetLang));
      if (voice) utterance.voice = voice;

      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);

      speechSynthesis.speak(utterance);
    },
    []
  );

  const speak = useCallback(
    async (text: string, lang: Language) => {
      stop();

      // Skip very short text
      if (!text || text.length < 3) return;

      // Client-side rate limit check
      if (isClientRateLimited()) {
        // Fall back to browser TTS silently
        speakWithBrowserTTS(text, lang);
        return;
      }

      // Try Sarvam API first
      setIsLoading(true);
      clientLog.push(Date.now());

      try {
        const res = await fetch("/api/tts", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ text, language: lang }),
        });

        if (!res.ok) {
          throw new Error(`TTS API returned ${res.status}`);
        }

        const data = await res.json();
        if (!data.audio) throw new Error("No audio data");

        // Play base64 audio
        const audio = new Audio(`data:audio/wav;base64,${data.audio}`);
        audioRef.current = audio;

        audio.onplay = () => {
          setIsLoading(false);
          setIsSpeaking(true);
        };
        audio.onended = () => {
          setIsSpeaking(false);
          audioRef.current = null;
        };
        audio.onerror = () => {
          setIsSpeaking(false);
          setIsLoading(false);
          audioRef.current = null;
          // Fall back to browser TTS
          speakWithBrowserTTS(text, lang);
        };

        await audio.play();
      } catch {
        setIsLoading(false);
        // Fall back to browser TTS
        speakWithBrowserTTS(text, lang);
      }
    },
    [stop, speakWithBrowserTTS]
  );

  return { speak, stop, isSpeaking, isLoading };
}
