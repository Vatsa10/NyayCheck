"use client";

import Link from "next/link";
import { Scale, ArrowLeft, BookOpen, Clock, Coins, ChevronRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { LanguageToggle } from "@/components/ui/language-toggle";
import { useLanguage } from "@/hooks/use-language";
import { legalGuides } from "@/lib/legal/guides";

export default function GuidesPage() {
  const language = useLanguage((s) => s.language);
  const t = useLanguage((s) => s.t);

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
          <div className="w-12 h-12 rounded-xl bg-indigo-50 flex items-center justify-center mb-3">
            <BookOpen className="w-6 h-6 text-indigo-600" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight">
            {language === "hi" ? "कानूनी प्रक्रिया गाइड" : "Legal Procedure Guides"}
          </h1>
          <p className="text-sm text-muted mt-1">
            {language === "hi"
              ? "चरणबद्ध मार्गदर्शिका — क्या करें, कहां जाएं, कौन से दस्तावेज़ लाएं"
              : "Step-by-step — what to do, where to go, what documents to bring"}
          </p>
        </div>

        <div className="space-y-3">
          {legalGuides.map((guide, i) => (
            <Link
              key={guide.id}
              href={`/guides/${guide.id}`}
              className={`block animate-fade-up delay-${Math.min(i, 7)}`}
            >
              <Card hover>
                <CardContent className="py-4 flex items-center gap-3">
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-sm">{t(guide.title)}</h3>
                    <p className="text-xs text-muted mt-0.5 line-clamp-1">
                      {t(guide.description)}
                    </p>
                    <div className="flex items-center gap-3 mt-1.5">
                      <span className="text-xs text-muted flex items-center gap-0.5">
                        <Clock className="w-3 h-3" />
                        {guide.estimatedTime}
                      </span>
                      <span className="text-xs text-muted flex items-center gap-0.5">
                        <Coins className="w-3 h-3" />
                        {guide.estimatedCost}
                      </span>
                      <Badge variant="default">{guide.category}</Badge>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-muted flex-shrink-0" />
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
