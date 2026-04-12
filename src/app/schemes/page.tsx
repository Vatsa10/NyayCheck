"use client";

import { useState, useMemo, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Scale, ArrowLeft, Landmark, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LanguageToggle } from "@/components/ui/language-toggle";
import { SchemeProfileForm } from "@/components/schemes/scheme-profile-form";
import { SchemeCard } from "@/components/schemes/scheme-card";
import { useStrings, useLanguage } from "@/hooks/use-language";
import { useSchemeProfile } from "@/hooks/use-scheme-profile";
import { matchSchemes } from "@/lib/engine/scheme-matcher";
import { governmentSchemes } from "@/lib/legal/schemes";
import { getWhatsAppShareUrl } from "@/lib/utils/share";
import type { RiskLevel } from "@/types";

export default function SchemesPage() {
  return (
    <Suspense>
      <SchemesContent />
    </Suspense>
  );
}

function SchemesContent() {
  const strings = useStrings();
  const language = useLanguage((s) => s.language);
  const searchParams = useSearchParams();
  const profile = useSchemeProfile((s) => s.getProfile);
  const isComplete = useSchemeProfile((s) => s.isComplete);

  const [showResults, setShowResults] = useState(false);

  // Get context from URL params (if coming from report page)
  const contextCategory = searchParams.get("category") || undefined;
  const contextRisk = (searchParams.get("risk") as RiskLevel) || undefined;

  const matches = useMemo(() => {
    const p = profile();
    if (!p) return [];
    return matchSchemes(governmentSchemes, {
      ...p,
      legalCategory: contextCategory,
      riskLevel: contextRisk,
    });
  }, [profile, contextCategory, contextRisk]);

  const shareAllText = matches
    .slice(0, 5)
    .map((m) => `${m.scheme.name[language]}: ${m.scheme.officialLink}`)
    .join("\n\n");

  return (
    <div className="min-h-screen bg-white">
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-100/80">
        <div className="max-w-4xl mx-auto px-5 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="p-1 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-muted" />
            </Link>
            <div className="flex items-center gap-2">
              <Scale className="w-5 h-5 text-primary" />
              <span className="font-semibold text-[15px] tracking-tight">
                NyayCheck
              </span>
            </div>
          </div>
          <LanguageToggle />
        </div>
      </header>

      <main className="max-w-xl mx-auto px-5 pt-24 pb-12">
        <div className="text-center mb-8 animate-fade-up delay-0">
          <div className="w-14 h-14 rounded-2xl bg-emerald-50 flex items-center justify-center mx-auto mb-4">
            <Landmark className="w-7 h-7 text-emerald-600" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight">
            {language === "hi"
              ? "सरकारी योजनाएं खोजें"
              : "Find Government Schemes"}
          </h1>
          <p className="text-muted text-sm mt-2">
            {language === "hi"
              ? "4 सवालों का जवाब दें और जानें आप किन योजनाओं के पात्र हैं"
              : "Answer 4 questions to discover schemes you're eligible for"}
          </p>
        </div>

        {!showResults ? (
          <div className="animate-fade-up delay-1">
            <SchemeProfileForm onComplete={() => setShowResults(true)} />
          </div>
        ) : (
          <div>
            {/* Results count */}
            <div className="flex items-center justify-between mb-4 animate-fade-up delay-0">
              <p className="text-sm font-medium">
                {language === "hi"
                  ? `${matches.length} योजनाएं मिलीं`
                  : `${matches.length} schemes found`}
              </p>
              <button
                onClick={() => setShowResults(false)}
                className="text-xs text-primary hover:underline"
              >
                {language === "hi" ? "प्रोफ़ाइल बदलें" : "Change profile"}
              </button>
            </div>

            {/* Scheme cards */}
            {matches.length > 0 ? (
              <div className="space-y-3">
                {matches.map((scored, i) => (
                  <div
                    key={scored.scheme.id}
                    className={`animate-fade-up delay-${Math.min(i, 7)}`}
                  >
                    <SchemeCard scored={scored} />
                  </div>
                ))}

                {/* Share all */}
                <div className="pt-4">
                  <a
                    href={getWhatsAppShareUrl(
                      `${language === "hi" ? "NyayCheck पर मिली सरकारी योजनाएं:" : "Government schemes found on NyayCheck:"}\n\n${shareAllText}`
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button variant="outline" className="w-full">
                      <Share2 className="w-4 h-4" />
                      {language === "hi"
                        ? "सभी WhatsApp पर शेयर करें"
                        : "Share All on WhatsApp"}
                    </Button>
                  </a>
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-muted">
                  {language === "hi"
                    ? "कोई मिलान करने वाली योजना नहीं मिली। प्रोफ़ाइल बदलकर देखें।"
                    : "No matching schemes found. Try changing your profile."}
                </p>
              </div>
            )}

            {/* CTA */}
            <div className="mt-8 text-center">
              <Link href="/check">
                <Button variant="ghost" size="sm">
                  {language === "hi"
                    ? "कानूनी स्वास्थ्य जांच भी करें"
                    : "Also take the Legal Health Check"}
                </Button>
              </Link>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
