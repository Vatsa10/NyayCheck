"use client";

import { useState, useCallback, useEffect } from "react";
import type { Language } from "@/types";

export function useTTS() {
  const [isSpeaking, setIsSpeaking] = useState(false);

  useEffect(() => {
    const handleEnd = () => setIsSpeaking(false);
    speechSynthesis.addEventListener("voiceschanged", () => {});
    return () => {
      speechSynthesis.cancel();
    };
  }, []);

  const speak = useCallback((text: string, lang: Language) => {
    if (!("speechSynthesis" in window)) return;

    speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang === "hi" ? "hi-IN" : "en-IN";
    utterance.rate = 0.9;

    // Try to find a matching voice
    const voices = speechSynthesis.getVoices();
    const targetLang = lang === "hi" ? "hi" : "en";
    const voice = voices.find((v) => v.lang.startsWith(targetLang));
    if (voice) utterance.voice = voice;

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    speechSynthesis.speak(utterance);
  }, []);

  const stop = useCallback(() => {
    speechSynthesis.cancel();
    setIsSpeaking(false);
  }, []);

  return { speak, stop, isSpeaking };
}
