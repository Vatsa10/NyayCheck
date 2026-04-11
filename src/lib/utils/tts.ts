import type { Language } from "@/types";

/**
 * Check if browser TTS supports the given language.
 */
export function isTTSAvailable(lang: Language): boolean {
  if (typeof window === "undefined" || !("speechSynthesis" in window))
    return false;

  const voices = speechSynthesis.getVoices();
  const targetLang = lang === "hi" ? "hi" : "en";
  return voices.some((v) => v.lang.startsWith(targetLang));
}
