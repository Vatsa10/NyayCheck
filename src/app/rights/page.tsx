"use client";

import { useState } from "react";
import Link from "next/link";
import { Scale, ArrowLeft, BookOpen } from "lucide-react";
import { LanguageToggle } from "@/components/ui/language-toggle";
import { useLanguage } from "@/hooks/use-language";
import { RightsCardComponent } from "@/components/rights/rights-card";
import {
  rightsCards,
  rightsCategories,
  type RightsCategory,
} from "@/lib/legal/rights-cards";

export default function RightsPage() {
  const language = useLanguage((s) => s.language);
  const t = useLanguage((s) => s.t);
  const [filter, setFilter] = useState<RightsCategory>("all");

  const filtered =
    filter === "all"
      ? rightsCards
      : rightsCards.filter((c) => c.category === filter);

  return (
    <div className="min-h-screen bg-white">
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-100/80">
        <div className="max-w-4xl mx-auto px-5 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" className="p-1 rounded-lg hover:bg-gray-50 transition-colors">
              <ArrowLeft className="w-5 h-5 text-muted" />
            </Link>
            <div className="flex items-center gap-2">
              <Scale className="w-5 h-5 text-primary" />
              <span className="font-semibold text-[15px] tracking-tight">NyayCheck</span>
            </div>
          </div>
          <LanguageToggle />
        </div>
      </header>

      <main className="max-w-xl mx-auto px-5 pt-24 pb-12">
        <div className="mb-6 animate-fade-up delay-0">
          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-3">
            <BookOpen className="w-6 h-6 text-primary" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight">
            {language === "hi" ? "अपने अधिकार जानें" : "Know Your Rights"}
          </h1>
          <p className="text-sm text-muted mt-1">
            {language === "hi"
              ? "15 ज़रूरी अधिकार — पढ़ें, सुनें, WhatsApp पर शेयर करें"
              : "15 essential rights — read, listen, share on WhatsApp"}
          </p>
        </div>

        {/* Category filter pills */}
        <div className="flex gap-2 overflow-x-auto pb-3 mb-4 -mx-1 px-1 scrollbar-hide animate-fade-up delay-1">
          {rightsCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setFilter(cat.id)}
              className={`flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-medium transition-[background-color,color] duration-200 ${
                filter === cat.id
                  ? "bg-primary text-white"
                  : "bg-gray-100 text-muted hover:bg-gray-200"
              }`}
            >
              {t(cat.label)}
            </button>
          ))}
        </div>

        {/* Rights cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {filtered.map((card, i) => (
            <div
              key={card.id}
              className={`animate-fade-up delay-${Math.min(i, 7)}`}
            >
              <RightsCardComponent card={card} />
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-12 text-muted text-sm">
            {language === "hi"
              ? "इस श्रेणी में कोई कार्ड नहीं है"
              : "No cards in this category"}
          </div>
        )}
      </main>
    </div>
  );
}
