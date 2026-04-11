"use client";

import { use, useEffect, useState } from "react";
import Link from "next/link";
import {
  Scale,
  ArrowLeft,
  FileText,
  Share2,
  ChevronRight,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScoreRing } from "@/components/ui/score-ring";
import { AudioButton } from "@/components/ui/audio-button";
import { LanguageToggle } from "@/components/ui/language-toggle";
import { useLanguage, useStrings } from "@/hooks/use-language";
import { getWhatsAppShareUrl } from "@/lib/utils/share";
import { AIInsights } from "@/components/report/ai-insights";
import { SimilarCases } from "@/components/report/similar-cases";
import type { ChecklistItem, RiskLevel, BilingualText } from "@/types";

interface ReportData {
  reportId: string;
  score: number;
  riskLevel: RiskLevel;
  checklist: ChecklistItem[];
  summary: string;
  category: string;
}

export default function ReportPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const [report, setReport] = useState<ReportData | null>(null);
  const [loading, setLoading] = useState(true);
  const t = useLanguage((s) => s.t);
  const language = useLanguage((s) => s.language);
  const strings = useStrings();

  useEffect(() => {
    // Try to get from sessionStorage first (just submitted), otherwise fetch
    const cached = sessionStorage.getItem(`report-${id}`);
    if (cached) {
      setReport(JSON.parse(cached));
      setLoading(false);
      return;
    }

    fetch(`/api/questionnaire?reportId=${id}`)
      .then((res) => res.json())
      .then((data) => {
        setReport(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-muted">{strings.common.loading}</p>
        </div>
      </div>
    );
  }

  if (!report) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <p className="text-lg font-semibold mb-2">{strings.common.error}</p>
          <Link href="/check">
            <Button variant="outline">{strings.common.retry}</Button>
          </Link>
        </div>
      </div>
    );
  }

  const shareText =
    language === "hi"
      ? `मेरा NyayCheck कानूनी स्वास्थ्य स्कोर: ${report.score}/100\n${report.summary}\n\nअपना मुफ्त चेक करें:`
      : `My NyayCheck Legal Health Score: ${report.score}/100\n${report.summary}\n\nGet your free check:`;

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link
              href="/check"
              className="p-1 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-muted" />
            </Link>
            <div className="flex items-center gap-2">
              <Scale className="w-5 h-5 text-primary" />
              <span className="font-bold text-primary">{strings.app.name}</span>
            </div>
          </div>
          <LanguageToggle />
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-8 space-y-6">
        <h1 className="text-2xl font-bold">{strings.report.title}</h1>

        {/* Score Card */}
        <Card>
          <CardContent className="flex flex-col items-center text-center py-8">
            <ScoreRing score={report.score} riskLevel={report.riskLevel} />
            <div className="mt-4">
              <Badge variant={report.riskLevel}>
                {strings.report.riskLevel[report.riskLevel]}
              </Badge>
            </div>
            <p className="mt-4 text-muted max-w-md">{report.summary}</p>
            <div className="mt-3">
              <AudioButton text={report.summary} />
            </div>
          </CardContent>
        </Card>

        {/* Checklist */}
        {report.checklist.length > 0 && (
          <div>
            <h2 className="text-xl font-semibold mb-4">
              {strings.report.checklist}
            </h2>
            <div className="space-y-3">
              {report.checklist.map((item) => (
                <Card key={item.id}>
                  <CardContent className="py-4">
                    <div className="flex items-start gap-3">
                      <div
                        className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                          item.urgency === "high"
                            ? "bg-red-500"
                            : item.urgency === "medium"
                              ? "bg-amber-500"
                              : "bg-emerald-500"
                        }`}
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold">
                          {t(item.title)}
                        </h3>
                        <p className="text-sm text-muted mt-1">
                          {t(item.description)}
                        </p>
                        <p className="text-xs text-primary mt-2 font-medium">
                          {item.applicableAct}
                        </p>
                        {item.documentType && (
                          <Link
                            href={`/document/${id}?type=${item.documentType}`}
                            className="inline-flex items-center gap-1 text-sm text-primary mt-2 hover:underline"
                          >
                            <FileText className="w-3.5 h-3.5" />
                            {strings.report.generateDoc}
                            <ChevronRight className="w-3 h-3" />
                          </Link>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* AI Insights */}
        <AIInsights reportId={id} />

        {/* Similar Cases */}
        <SimilarCases reportId={id} />

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 pt-4">
          <a
            href={getWhatsAppShareUrl(shareText)}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1"
          >
            <Button variant="secondary" className="w-full">
              <Share2 className="w-4 h-4" />
              {strings.report.share}
            </Button>
          </a>
          <Link href="/check" className="flex-1">
            <Button variant="outline" className="w-full">
              {language === "hi" ? "नई जांच" : "New Check"}
            </Button>
          </Link>
        </div>
      </main>
    </div>
  );
}
