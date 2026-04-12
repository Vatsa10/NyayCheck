"use client";

import Link from "next/link";
import { Gavel, Calendar, ChevronRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useLanguage } from "@/hooks/use-language";
import type { TrackedCase } from "@/types/case-tracker";

function daysUntil(dateStr: string): number {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const target = new Date(dateStr);
  return Math.ceil((target.getTime() - today.getTime()) / 86400000);
}

export function CaseCard({ caseData }: { caseData: TrackedCase }) {
  const language = useLanguage((s) => s.language);

  const today = new Date().toISOString().split("T")[0];
  const nextHearing = caseData.hearings
    .filter((h) => h.date >= today)
    .sort((a, b) => a.date.localeCompare(b.date))[0];

  const days = nextHearing ? daysUntil(nextHearing.date) : null;

  const courtLabels: Record<string, { en: string; hi: string }> = {
    district: { en: "District Court", hi: "जिला अदालत" },
    high: { en: "High Court", hi: "उच्च न्यायालय" },
    supreme: { en: "Supreme Court", hi: "सर्वोच्च न्यायालय" },
    tribunal: { en: "Tribunal", hi: "न्यायाधिकरण" },
    consumer: { en: "Consumer Forum", hi: "उपभोक्ता फोरम" },
  };

  return (
    <Link href={`/cases/${caseData.id}`}>
      <Card hover>
        <CardContent className="py-4">
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <Gavel className="w-4 h-4 text-primary flex-shrink-0" />
                <h3 className="font-semibold text-sm truncate">
                  {caseData.petitioner} vs {caseData.respondent}
                </h3>
              </div>
              <p className="text-xs text-muted">
                {courtLabels[caseData.courtType]?.[language] || caseData.courtType}{" "}
                {caseData.courtName ? `· ${caseData.courtName}` : ""}
              </p>
              {caseData.cnrNumber && (
                <p className="text-xs text-muted mt-0.5 font-mono">
                  CNR: {caseData.cnrNumber}
                </p>
              )}
            </div>
            <div className="flex flex-col items-end gap-1 flex-shrink-0">
              {nextHearing && (
                <Badge
                  variant={
                    days !== null && days <= 0
                      ? "critical"
                      : days !== null && days <= 3
                        ? "high"
                        : days !== null && days <= 7
                          ? "medium"
                          : "low"
                  }
                >
                  <Calendar className="w-3 h-3 inline mr-1" />
                  {days === 0
                    ? language === "hi"
                      ? "आज!"
                      : "Today!"
                    : days === 1
                      ? language === "hi"
                        ? "कल"
                        : "Tomorrow"
                      : `${days}d`}
                </Badge>
              )}
              <ChevronRight className="w-4 h-4 text-muted" />
            </div>
          </div>
          <div className="mt-2 flex items-center gap-2">
            <span className="text-xs px-2 py-0.5 bg-gray-100 rounded-full text-muted">
              {caseData.caseStage}
            </span>
            <span className="text-xs text-muted">
              {caseData.hearings.length}{" "}
              {language === "hi" ? "सुनवाई" : "hearings"}
            </span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
