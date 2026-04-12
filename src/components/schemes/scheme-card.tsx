"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, ExternalLink, Share2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/hooks/use-language";
import { getWhatsAppShareUrl } from "@/lib/utils/share";
import type { ScoredScheme } from "@/types/schemes";

const categoryLabels: Record<string, { en: string; hi: string }> = {
  legal_aid: { en: "Legal Aid", hi: "कानूनी सहायता" },
  women_welfare: { en: "Women", hi: "महिला कल्याण" },
  sc_st: { en: "SC/ST", hi: "SC/ST" },
  labor: { en: "Employment", hi: "रोज़गार" },
  consumer: { en: "Consumer", hi: "उपभोक्ता" },
  housing: { en: "Housing", hi: "आवास" },
  education: { en: "Education", hi: "शिक्षा" },
  health: { en: "Health", hi: "स्वास्थ्य" },
  senior_citizen: { en: "Senior", hi: "वरिष्ठ" },
  disability: { en: "Disability", hi: "विकलांगता" },
};

export function SchemeCard({ scored }: { scored: ScoredScheme }) {
  const [expanded, setExpanded] = useState(false);
  const t = useLanguage((s) => s.t);
  const language = useLanguage((s) => s.language);
  const { scheme, matchReasons } = scored;

  const catLabel = categoryLabels[scheme.category]?.[language] || scheme.category;

  const shareText = `${t(scheme.name)}\n\n${t(scheme.eligibility)}\n\n${t(scheme.howToApply)}\n\n${scheme.officialLink}\n\n— NyayCheck`;

  return (
    <Card>
      <CardContent className="py-4">
        <button
          onClick={() => setExpanded(!expanded)}
          className="w-full text-left"
        >
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <Badge variant="default">{catLabel}</Badge>
                {scheme.isPopular && (
                  <Badge variant="low">
                    {language === "hi" ? "लोकप्रिय" : "Popular"}
                  </Badge>
                )}
              </div>
              <h3 className="font-semibold text-[15px]">{t(scheme.name)}</h3>
              <p className="text-sm text-muted mt-1 line-clamp-2">
                {t(scheme.description)}
              </p>
            </div>
            {expanded ? (
              <ChevronUp className="w-4 h-4 text-muted flex-shrink-0 mt-1" />
            ) : (
              <ChevronDown className="w-4 h-4 text-muted flex-shrink-0 mt-1" />
            )}
          </div>
        </button>

        {expanded && (
          <div className="mt-4 space-y-3 animate-fade-up delay-0">
            {/* Match reasons */}
            {matchReasons.length > 0 && (
              <div className="flex flex-wrap gap-1">
                {matchReasons.map((r, i) => (
                  <span
                    key={i}
                    className="text-xs px-2 py-0.5 bg-primary-50 text-primary rounded-full"
                  >
                    {t(r)}
                  </span>
                ))}
              </div>
            )}

            {/* Eligibility */}
            <div>
              <p className="text-xs font-semibold text-muted uppercase tracking-wide mb-1">
                {language === "hi" ? "पात्रता" : "Eligibility"}
              </p>
              <p className="text-sm leading-relaxed">{t(scheme.eligibility)}</p>
            </div>

            {/* How to apply */}
            <div>
              <p className="text-xs font-semibold text-muted uppercase tracking-wide mb-1">
                {language === "hi" ? "कैसे आवेदन करें" : "How to Apply"}
              </p>
              <p className="text-sm leading-relaxed">{t(scheme.howToApply)}</p>
            </div>

            {/* Actions */}
            <div className="flex gap-2 pt-1">
              <a
                href={scheme.officialLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1"
              >
                <Button variant="outline" size="sm" className="w-full">
                  <ExternalLink className="w-3.5 h-3.5" />
                  {language === "hi" ? "आधिकारिक साइट" : "Official Site"}
                </Button>
              </a>
              <a
                href={getWhatsAppShareUrl(shareText)}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="ghost" size="sm">
                  <Share2 className="w-3.5 h-3.5" />
                </Button>
              </a>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
