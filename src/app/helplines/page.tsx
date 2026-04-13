"use client";

import { useState } from "react";
import Link from "next/link";
import { Scale, Phone, Clock, ArrowLeft } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { LanguageToggle } from "@/components/ui/language-toggle";
import { useLanguage } from "@/hooks/use-language";
import {
  helplines,
  helplineCategories,
  type HelplineCategory,
} from "@/lib/legal/helplines";

export default function HelplinesPage() {
  const language = useLanguage((s) => s.language);
  const t = useLanguage((s) => s.t);
  const [filter, setFilter] = useState<HelplineCategory | "all">("all");

  const filtered =
    filter === "all"
      ? helplines
      : helplines.filter((h) => h.category === filter);

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
          <div className="w-12 h-12 rounded-xl bg-red-50 flex items-center justify-center mb-3">
            <Phone className="w-6 h-6 text-red-500" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight">
            {language === "hi" ? "आपातकालीन हेल्पलाइन" : "Emergency Helplines"}
          </h1>
          <p className="text-sm text-muted mt-1">
            {language === "hi"
              ? "एक टैप में कॉल करें — सभी टोल-फ्री"
              : "One tap to call — all toll-free"}
          </p>
        </div>

        {/* Filter pills */}
        <div className="flex gap-2 overflow-x-auto pb-3 mb-4 -mx-1 px-1 scrollbar-hide animate-fade-up delay-1">
          {helplineCategories.map((cat) => (
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

        {/* Helpline cards */}
        <div className="space-y-2.5">
          {filtered.map((h, i) => (
            <a
              key={h.id}
              href={`tel:${h.number.replace(/-/g, "")}`}
              className={`block animate-fade-up delay-${Math.min(i, 7)}`}
            >
              <Card hover>
                <CardContent className="py-3.5 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-red-50 flex items-center justify-center flex-shrink-0">
                    <span className="text-red-600 font-bold text-sm">
                      {h.number.length <= 4 ? h.number : <Phone className="w-5 h-5" />}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-sm">{t(h.name)}</h3>
                    <p className="text-xs text-muted mt-0.5 line-clamp-1">
                      {t(h.description)}
                    </p>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs text-muted flex items-center gap-0.5">
                        <Clock className="w-3 h-3" />
                        {h.available}
                      </span>
                      {h.tollFree && (
                        <Badge variant="low">
                          {language === "hi" ? "टोल-फ्री" : "Toll-Free"}
                        </Badge>
                      )}
                    </div>
                  </div>
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                      <Phone className="w-4 h-4 text-white" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </a>
          ))}
        </div>
      </main>
    </div>
  );
}
