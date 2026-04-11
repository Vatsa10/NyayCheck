"use client";

import { useState, useEffect } from "react";
import { Users, TrendingUp } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/hooks/use-language";
import type { RiskLevel } from "@/types";

interface SimilarCase {
  score: number;
  riskLevel: RiskLevel;
  similarity: number;
}

interface SimilarCasesData {
  similarCases: SimilarCase[];
  totalInCategory: number;
  categoryAvgScore: number;
}

export function SimilarCases({ reportId }: { reportId: string }) {
  const [data, setData] = useState<SimilarCasesData | null>(null);
  const language = useLanguage((s) => s.language);

  useEffect(() => {
    fetch("/api/similar", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ reportId }),
    })
      .then((res) => res.json())
      .then(setData)
      .catch(() => {});
  }, [reportId]);

  if (!data || data.totalInCategory <= 1) return null;

  return (
    <Card>
      <CardContent className="py-5">
        <div className="flex items-center gap-2 mb-4">
          <Users className="w-5 h-5 text-indigo-600" />
          <h3 className="font-semibold">
            {language === "hi" ? "समुदाय अंतर्दृष्टि" : "Community Insights"}
          </h3>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="text-center p-3 bg-indigo-50 rounded-xl">
            <p className="text-2xl font-bold text-indigo-600">
              {data.totalInCategory}
            </p>
            <p className="text-xs text-muted">
              {language === "hi" ? "कुल जांच" : "Total checks"}
            </p>
          </div>
          <div className="text-center p-3 bg-indigo-50 rounded-xl">
            <p className="text-2xl font-bold text-indigo-600">
              {data.categoryAvgScore}
              <span className="text-sm font-normal">/100</span>
            </p>
            <p className="text-xs text-muted">
              {language === "hi" ? "औसत स्कोर" : "Avg score"}
            </p>
          </div>
        </div>

        {data.similarCases.length > 0 && (
          <div>
            <p className="text-sm font-medium mb-2">
              <TrendingUp className="w-4 h-4 inline mr-1" />
              {language === "hi"
                ? "समान स्थिति वाले लोग:"
                : "People with similar situations:"}
            </p>
            <div className="space-y-2">
              {data.similarCases.slice(0, 3).map((c, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between text-sm p-2 bg-gray-50 rounded-lg"
                >
                  <span className="text-muted">
                    {c.similarity}%{" "}
                    {language === "hi" ? "मिलता-जुलता" : "similar"}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{c.score}/100</span>
                    <Badge variant={c.riskLevel as RiskLevel}>
                      {c.riskLevel}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <p className="text-xs text-muted mt-3 italic">
          {language === "hi"
            ? "* गुमनाम और एकत्रित डेटा। कोई व्यक्तिगत जानकारी साझा नहीं की जाती।"
            : "* Anonymous, aggregated data. No personal information is shared."}
        </p>
      </CardContent>
    </Card>
  );
}
