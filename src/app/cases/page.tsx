"use client";

import Link from "next/link";
import { Scale, Gavel, Plus, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { LanguageToggle } from "@/components/ui/language-toggle";
import { CaseCard } from "@/components/cases/case-card";
import { useCaseTracker, useUpcomingHearings } from "@/hooks/use-case-tracker";
import { useLanguage } from "@/hooks/use-language";

export default function CasesPage() {
  const language = useLanguage((s) => s.language);
  const cases = useCaseTracker((s) => s.cases);
  const upcoming = useUpcomingHearings();

  return (
    <div className="min-h-screen bg-white">
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-100/80">
        <div className="max-w-4xl mx-auto px-5 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Scale className="w-5 h-5 text-primary" />
            <span className="font-semibold text-[15px] tracking-tight">
              NyayCheck
            </span>
          </div>
          <div className="flex items-center gap-2">
            <LanguageToggle />
            <Link href="/cases/add">
              <Button size="sm">
                <Plus className="w-4 h-4" />
                {language === "hi" ? "केस जोड़ें" : "Add Case"}
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-xl mx-auto px-5 pt-24 pb-12">
        <h1 className="text-2xl font-bold tracking-tight mb-6 animate-fade-up delay-0">
          <Gavel className="w-6 h-6 inline mr-2 text-primary" />
          {language === "hi" ? "मेरे मुकदमे" : "My Cases"}
        </h1>

        {/* Upcoming hearings */}
        {upcoming.length > 0 && (
          <div className="mb-6 animate-fade-up delay-1">
            <h2 className="text-sm font-semibold text-muted mb-3 flex items-center gap-1.5">
              <Calendar className="w-4 h-4" />
              {language === "hi" ? "आगामी सुनवाई" : "Upcoming Hearings"}
            </h2>
            <div className="space-y-2">
              {upcoming.slice(0, 5).map(({ caseData, hearing }) => {
                const days = Math.ceil(
                  (new Date(hearing.date).getTime() - Date.now()) / 86400000
                );
                return (
                  <Link
                    key={hearing.id}
                    href={`/cases/${caseData.id}`}
                  >
                    <Card hover>
                      <CardContent className="py-3 flex items-center justify-between gap-2">
                        <div className="min-w-0">
                          <p className="text-sm font-medium truncate">
                            {caseData.petitioner} vs {caseData.respondent}
                          </p>
                          <p className="text-xs text-muted">
                            {hearing.purpose} ·{" "}
                            {new Date(hearing.date).toLocaleDateString("en-IN", {
                              day: "numeric",
                              month: "short",
                            })}
                          </p>
                        </div>
                        <Badge
                          variant={
                            days <= 0
                              ? "critical"
                              : days <= 3
                                ? "high"
                                : days <= 7
                                  ? "medium"
                                  : "low"
                          }
                        >
                          {days <= 0
                            ? language === "hi"
                              ? "आज!"
                              : "Today!"
                            : days === 1
                              ? language === "hi"
                                ? "कल"
                                : "Tomorrow"
                              : `${days} ${language === "hi" ? "दिन" : "days"}`}
                        </Badge>
                      </CardContent>
                    </Card>
                  </Link>
                );
              })}
            </div>
          </div>
        )}

        {/* Case list */}
        {cases.length > 0 ? (
          <div className="space-y-3">
            {cases.map((c, i) => (
              <div
                key={c.id}
                className={`animate-fade-up delay-${Math.min(i + 2, 7)}`}
              >
                <CaseCard caseData={c} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 animate-fade-up delay-1">
            <Gavel className="w-12 h-12 text-muted/30 mx-auto mb-4" />
            <p className="font-semibold mb-1">
              {language === "hi"
                ? "अभी कोई मुकदमा ट्रैक नहीं किया जा रहा"
                : "No cases tracked yet"}
            </p>
            <p className="text-sm text-muted mb-6">
              {language === "hi"
                ? "अपने अदालती मामले की जानकारी जोड़ें और सुनवाई की तारीखें ट्रैक करें"
                : "Add your court case details to track hearing dates"}
            </p>
            <Link href="/cases/add">
              <Button>
                <Plus className="w-4 h-4" />
                {language === "hi" ? "पहला केस जोड़ें" : "Add Your First Case"}
              </Button>
            </Link>
          </div>
        )}
      </main>
    </div>
  );
}
