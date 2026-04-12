"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Scale, ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { RadioGroup } from "@/components/ui/radio-group";
import { LanguageToggle } from "@/components/ui/language-toggle";
import { useCaseTracker } from "@/hooks/use-case-tracker";
import { useLanguage } from "@/hooks/use-language";
import { indianStates } from "@/lib/utils/indian-states";
import type { CourtType } from "@/types/case-tracker";

export default function AddCasePage() {
  const router = useRouter();
  const language = useLanguage((s) => s.language);
  const t = useLanguage((s) => s.t);
  const addCase = useCaseTracker((s) => s.addCase);

  const [cnrNumber, setCnrNumber] = useState("");
  const [caseNumber, setCaseNumber] = useState("");
  const [courtType, setCourtType] = useState<CourtType>("district");
  const [courtName, setCourtName] = useState("");
  const [state, setState] = useState("");
  const [petitioner, setPetitioner] = useState("");
  const [respondent, setRespondent] = useState("");
  const [caseType, setCaseType] = useState("");
  const [advocate, setAdvocate] = useState("");
  const [caseStage, setCaseStage] = useState("Pending");

  function handleSubmit() {
    if (!petitioner || !respondent || !courtType) return;
    const id = addCase({
      cnrNumber,
      caseNumber: caseNumber || undefined,
      courtType,
      courtName,
      state,
      petitioner,
      respondent,
      caseType: caseType || undefined,
      advocate: advocate || undefined,
      caseStage,
    });
    router.push(`/cases/${id}`);
  }

  const canSubmit = petitioner.trim() && respondent.trim();

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

      <main className="max-w-xl mx-auto px-5 pt-24 pb-12">
        <h1 className="text-2xl font-bold tracking-tight mb-6 animate-fade-up delay-0">
          {language === "hi" ? "नया केस जोड़ें" : "Add New Case"}
        </h1>

        <div className="space-y-5 animate-fade-up delay-1">
          {/* CNR Number */}
          <div>
            <label className="block text-sm font-semibold mb-1.5">
              {language === "hi" ? "CNR नंबर" : "CNR Number"}
              <span className="text-muted font-normal text-xs ml-1">
                ({language === "hi" ? "वैकल्पिक" : "optional"})
              </span>
            </label>
            <input
              type="text"
              value={cnrNumber}
              onChange={(e) => setCnrNumber(e.target.value.toUpperCase())}
              placeholder="e.g. DLCT010012342024"
              className="w-full p-3 rounded-xl border-2 border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none text-sm font-mono"
            />
          </div>

          {/* Court Type */}
          <div>
            <label className="block text-sm font-semibold mb-1.5">
              {language === "hi" ? "अदालत का प्रकार" : "Court Type"}
            </label>
            <RadioGroup
              name="courtType"
              options={[
                { value: "district", label: language === "hi" ? "जिला अदालत" : "District Court" },
                { value: "high", label: language === "hi" ? "उच्च न्यायालय" : "High Court" },
                { value: "consumer", label: language === "hi" ? "उपभोक्ता फोरम" : "Consumer Forum" },
                { value: "tribunal", label: language === "hi" ? "न्यायाधिकरण" : "Tribunal" },
              ]}
              value={courtType}
              onChange={(v) => setCourtType(v as CourtType)}
            />
          </div>

          {/* Court Name + State */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-semibold mb-1.5">
                {language === "hi" ? "अदालत का नाम" : "Court Name"}
              </label>
              <input
                type="text"
                value={courtName}
                onChange={(e) => setCourtName(e.target.value)}
                placeholder={language === "hi" ? "जैसे तीस हजारी" : "e.g. Tis Hazari"}
                className="w-full p-3 rounded-xl border-2 border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1.5">
                {language === "hi" ? "राज्य" : "State"}
              </label>
              <select
                value={state}
                onChange={(e) => setState(e.target.value)}
                className="w-full p-3 rounded-xl border-2 border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none text-sm bg-white"
              >
                <option value="">
                  {language === "hi" ? "चुनें..." : "Select..."}
                </option>
                {indianStates.map((s) => (
                  <option key={s.code} value={s.code}>
                    {t(s.name)}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Parties */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-semibold mb-1.5">
                {language === "hi" ? "याचिकाकर्ता" : "Petitioner"} *
              </label>
              <input
                type="text"
                value={petitioner}
                onChange={(e) => setPetitioner(e.target.value)}
                className="w-full p-3 rounded-xl border-2 border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1.5">
                {language === "hi" ? "प्रतिवादी" : "Respondent"} *
              </label>
              <input
                type="text"
                value={respondent}
                onChange={(e) => setRespondent(e.target.value)}
                className="w-full p-3 rounded-xl border-2 border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none text-sm"
              />
            </div>
          </div>

          {/* Advocate + Stage */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-semibold mb-1.5">
                {language === "hi" ? "वकील" : "Advocate"}
                <span className="text-muted font-normal text-xs ml-1">
                  ({language === "hi" ? "वैकल्पिक" : "optional"})
                </span>
              </label>
              <input
                type="text"
                value={advocate}
                onChange={(e) => setAdvocate(e.target.value)}
                className="w-full p-3 rounded-xl border-2 border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1.5">
                {language === "hi" ? "केस की स्थिति" : "Case Stage"}
              </label>
              <select
                value={caseStage}
                onChange={(e) => setCaseStage(e.target.value)}
                className="w-full p-3 rounded-xl border-2 border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none text-sm bg-white"
              >
                {[
                  "Pending",
                  "Arguments",
                  "Evidence",
                  "Orders Reserved",
                  "Disposed",
                ].map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Submit */}
          <Button
            onClick={handleSubmit}
            disabled={!canSubmit}
            className="w-full"
            size="lg"
          >
            {language === "hi" ? "केस सेव करें" : "Save Case"}
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </main>
    </div>
  );
}
