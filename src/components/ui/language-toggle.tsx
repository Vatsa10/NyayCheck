"use client";

import { useLanguage } from "@/hooks/use-language";

export function LanguageToggle() {
  const { language, setLanguage } = useLanguage();

  return (
    <button
      onClick={() => setLanguage(language === "en" ? "hi" : "en")}
      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-gray-200 text-sm font-medium text-muted hover:bg-gray-50 transition-colors"
      aria-label="Toggle language"
    >
      <span className="text-base">🌐</span>
      <span>{language === "en" ? "हिंदी" : "English"}</span>
    </button>
  );
}
