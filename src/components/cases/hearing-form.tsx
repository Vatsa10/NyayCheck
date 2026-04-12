"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/hooks/use-language";
import { Plus } from "lucide-react";

interface HearingFormProps {
  onSubmit: (hearing: {
    date: string;
    purpose: string;
    outcome?: string;
    judgeName?: string;
  }) => void;
}

const PURPOSES = [
  "Arguments",
  "Evidence",
  "Order",
  "Judgment",
  "Appearance",
  "Mediation",
  "Miscellaneous",
];

export function HearingForm({ onSubmit }: HearingFormProps) {
  const language = useLanguage((s) => s.language);
  const [date, setDate] = useState("");
  const [purpose, setPurpose] = useState("Arguments");
  const [outcome, setOutcome] = useState("");
  const [judgeName, setJudgeName] = useState("");

  function handleSubmit() {
    if (!date) return;
    onSubmit({
      date,
      purpose,
      outcome: outcome || undefined,
      judgeName: judgeName || undefined,
    });
    setDate("");
    setPurpose("Arguments");
    setOutcome("");
    setJudgeName("");
  }

  return (
    <div className="space-y-3 p-4 bg-gray-50 rounded-xl">
      <h4 className="text-sm font-semibold">
        {language === "hi" ? "सुनवाई जोड़ें" : "Add Hearing"}
      </h4>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="text-xs text-muted block mb-1">
            {language === "hi" ? "तारीख" : "Date"}
          </label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full p-2 rounded-lg border border-gray-200 text-sm focus:border-primary focus:ring-1 focus:ring-primary/20 outline-none"
          />
        </div>
        <div>
          <label className="text-xs text-muted block mb-1">
            {language === "hi" ? "उद्देश्य" : "Purpose"}
          </label>
          <select
            value={purpose}
            onChange={(e) => setPurpose(e.target.value)}
            className="w-full p-2 rounded-lg border border-gray-200 text-sm focus:border-primary focus:ring-1 focus:ring-primary/20 outline-none bg-white"
          >
            {PURPOSES.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className="text-xs text-muted block mb-1">
          {language === "hi" ? "न्यायाधीश का नाम" : "Judge Name"}{" "}
          <span className="opacity-50">
            ({language === "hi" ? "वैकल्पिक" : "optional"})
          </span>
        </label>
        <input
          type="text"
          value={judgeName}
          onChange={(e) => setJudgeName(e.target.value)}
          className="w-full p-2 rounded-lg border border-gray-200 text-sm focus:border-primary focus:ring-1 focus:ring-primary/20 outline-none"
        />
      </div>

      <div>
        <label className="text-xs text-muted block mb-1">
          {language === "hi" ? "क्या हुआ / परिणाम" : "Outcome / What happened"}{" "}
          <span className="opacity-50">
            ({language === "hi" ? "वैकल्पिक" : "optional"})
          </span>
        </label>
        <textarea
          value={outcome}
          onChange={(e) => setOutcome(e.target.value)}
          rows={2}
          className="w-full p-2 rounded-lg border border-gray-200 text-sm focus:border-primary focus:ring-1 focus:ring-primary/20 outline-none resize-none"
        />
      </div>

      <Button onClick={handleSubmit} disabled={!date} size="sm" className="w-full">
        <Plus className="w-4 h-4" />
        {language === "hi" ? "सुनवाई जोड़ें" : "Add Hearing"}
      </Button>
    </div>
  );
}
