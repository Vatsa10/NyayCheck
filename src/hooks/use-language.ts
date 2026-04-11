"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Language, BilingualText } from "@/types";
import { en } from "@/lib/i18n/en";
import { hi } from "@/lib/i18n/hi";

interface LanguageState {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (text: BilingualText) => string;
}

const strings = { en, hi } as const;

export const useLanguage = create<LanguageState>()(
  persist(
    (set, get) => ({
      language: "en",
      setLanguage: (lang: Language) => set({ language: lang }),
      t: (text: BilingualText) => text[get().language] || text.en,
    }),
    {
      name: "nyaycheck-language",
    }
  )
);

export function useStrings() {
  const language = useLanguage((s) => s.language);
  return strings[language];
}
