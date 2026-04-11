import type { Language, BilingualText } from "@/types";

export const SUPPORTED_LANGUAGES: Language[] = ["en", "hi"];
export const DEFAULT_LANGUAGE: Language = "en";

export function t(text: BilingualText, lang: Language): string {
  return text[lang] || text.en;
}
