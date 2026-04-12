"use client";

import { use, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Scale,
  ArrowLeft,
  ExternalLink,
  Trash2,
  Share2,
  Plus,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { LanguageToggle } from "@/components/ui/language-toggle";
import { HearingTimeline } from "@/components/cases/hearing-timeline";
import { HearingForm } from "@/components/cases/hearing-form";
import { useCaseTracker } from "@/hooks/use-case-tracker";
import { useLanguage } from "@/hooks/use-language";
import { getWhatsAppShareUrl } from "@/lib/utils/share";

export default function CaseDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();
  const language = useLanguage((s) => s.language);
  const cases = useCaseTracker((s) => s.cases);
  const deleteCase = useCaseTracker((s) => s.deleteCase);
  const addHearing = useCaseTracker((s) => s.addHearing);
  const deleteHearing = useCaseTracker((s) => s.deleteHearing);

  const [showHearingForm, setShowHearingForm] = useState(false);

  const caseData = cases.find((c) => c.id === id);

  if (!caseData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="font-semibold mb-2">
            {language === "hi" ? "केस नहीं मिला" : "Case not found"}
          </p>
          <Link href="/cases">
            <Button variant="outline">
              {language === "hi" ? "वापस जाएं" : "Go Back"}
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const shareText = `${caseData.petitioner} vs ${caseData.respondent}\nCNR: ${caseData.cnrNumber}\nCourt: ${caseData.courtName}\nStage: ${caseData.caseStage}\n\n— NyayCheck`;

  function handleDelete() {
    if (
      confirm(
        language === "hi"
          ? "क्या आप वाकई इस केस को हटाना चाहते हैं?"
          : "Are you sure you want to delete this case?"
      )
    ) {
      deleteCase(id);
      router.push("/cases");
    }
  }

  return (
    <div className="min-h-screen bg-white">
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-100/80">
        <div className="max-w-4xl mx-auto px-5 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link
              href="/cases"
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

      <main className="max-w-xl mx-auto px-5 pt-24 pb-12 space-y-6">
        {/* Case info */}
        <Card>
          <CardContent className="py-5">
            <h1 className="text-lg font-bold">
              {caseData.petitioner} vs {caseData.respondent}
            </h1>
            <div className="mt-3 space-y-1.5 text-sm">
              {caseData.cnrNumber && (
                <p>
                  <span className="text-muted">CNR:</span>{" "}
                  <span className="font-mono">{caseData.cnrNumber}</span>
                </p>
              )}
              {caseData.caseNumber && (
                <p>
                  <span className="text-muted">
                    {language === "hi" ? "केस नंबर:" : "Case No:"}
                  </span>{" "}
                  {caseData.caseNumber}
                </p>
              )}
              <p>
                <span className="text-muted">
                  {language === "hi" ? "अदालत:" : "Court:"}
                </span>{" "}
                {caseData.courtName}
              </p>
              {caseData.advocate && (
                <p>
                  <span className="text-muted">
                    {language === "hi" ? "वकील:" : "Advocate:"}
                  </span>{" "}
                  {caseData.advocate}
                </p>
              )}
              <div className="pt-1">
                <Badge variant="default">{caseData.caseStage}</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* eCourts link */}
        <a
          href="https://services.ecourts.gov.in/ecourtindia_v6/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Button variant="outline" className="w-full">
            <ExternalLink className="w-4 h-4" />
            {language === "hi"
              ? "eCourts पर स्थिति जांचें"
              : "Check Status on eCourts"}
          </Button>
        </a>

        {/* Timeline */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">
              {language === "hi" ? "सुनवाई टाइमलाइन" : "Hearing Timeline"}
            </h2>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowHearingForm(!showHearingForm)}
            >
              <Plus className="w-4 h-4" />
              {language === "hi" ? "जोड़ें" : "Add"}
            </Button>
          </div>

          {showHearingForm && (
            <div className="mb-4">
              <HearingForm
                onSubmit={(h) => {
                  addHearing(id, h);
                  setShowHearingForm(false);
                }}
              />
            </div>
          )}

          <HearingTimeline
            hearings={caseData.hearings}
            onDelete={(hearingId) => deleteHearing(id, hearingId)}
          />
        </div>

        {/* Actions */}
        <div className="flex gap-3 pt-4">
          <a
            href={getWhatsAppShareUrl(shareText)}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1"
          >
            <Button variant="outline" size="sm" className="w-full">
              <Share2 className="w-4 h-4" />
              {language === "hi" ? "शेयर" : "Share"}
            </Button>
          </a>
          <Button
            variant="danger"
            size="sm"
            onClick={handleDelete}
          >
            <Trash2 className="w-4 h-4" />
            {language === "hi" ? "हटाएं" : "Delete"}
          </Button>
        </div>
      </main>
    </div>
  );
}
