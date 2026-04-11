"use client";

import { useLanguage } from "@/hooks/use-language";
import { Globe } from "lucide-react";

export function LanguageToggle() {
  const { language, setLanguage } = useLanguage();

  return (
    <button
      onClick={() => setLanguage(language === "en" ? "hi" : "en")}
      className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium text-muted hover:text-foreground hover:bg-gray-50 transition-[color,background-color] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)]"
      aria-label="Toggle language"
    >
      <Globe className="w-3.5 h-3.5" />
      <span>{language === "en" ? "हिंदी" : "English"}</span>
    </button>
  );
}
