"use client";

import { useMemo } from "react";
import Link from "next/link";
import { Landmark, ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/hooks/use-language";
import { useSchemeProfile } from "@/hooks/use-scheme-profile";
import { matchSchemes } from "@/lib/engine/scheme-matcher";
import { governmentSchemes } from "@/lib/legal/schemes";
import type { RiskLevel } from "@/types";

interface MatchedSchemesProps {
  category: string;
  riskLevel: RiskLevel;
  activeFlags: string[];
}

export function MatchedSchemes({
  category,
  riskLevel,
  activeFlags,
}: MatchedSchemesProps) {
  const t = useLanguage((s) => s.t);
  const language = useLanguage((s) => s.language);
  const profile = useSchemeProfile((s) => s.getProfile);

  const matches = useMemo(() => {
    const p = profile();
    if (!p) {
      // Even without full profile, match by legal context
      return matchSchemes(governmentSchemes, {
        gender: "male",
        incomeBracket: "below_5l",
        casteCategory: "general",
        state: "",
        legalCategory: category,
        riskLevel,
        activeFlags,
      }).slice(0, 3);
    }
    return matchSchemes(governmentSchemes, {
      ...p,
      legalCategory: category,
      riskLevel,
      activeFlags,
    }).slice(0, 3);
  }, [profile, category, riskLevel, activeFlags]);

  if (matches.length === 0) return null;

  return (
    <div>
      <div className="flex items-center gap-2 mb-4">
        <Landmark className="w-5 h-5 text-emerald-600" />
        <h2 className="text-xl font-semibold">
          {language === "hi"
            ? "आपके लिए सरकारी योजनाएं"
            : "Government Schemes For You"}
        </h2>
      </div>

      <div className="space-y-3">
        {matches.map(({ scheme }) => (
          <Card key={scheme.id}>
            <CardContent className="py-3">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h3 className="font-semibold text-sm">{t(scheme.name)}</h3>
                  <p className="text-xs text-muted mt-0.5 line-clamp-1">
                    {t(scheme.description)}
                  </p>
                </div>
                {scheme.isPopular && (
                  <Badge variant="low">
                    {language === "hi" ? "लोकप्रिय" : "Popular"}
                  </Badge>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Link href={`/schemes?category=${category}&risk=${riskLevel}`}>
        <Button variant="outline" size="sm" className="w-full mt-3">
          {language === "hi" ? "सभी योजनाएं देखें" : "See All Schemes"}
          <ArrowRight className="w-3.5 h-3.5" />
        </Button>
      </Link>
    </div>
  );
}
