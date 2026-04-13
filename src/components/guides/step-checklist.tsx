"use client";

import { useState, useEffect } from "react";
import {
  CheckCircle2,
  Circle,
  MapPin,
  FileText,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { useLanguage } from "@/hooks/use-language";
import type { GuideStep } from "@/lib/legal/guides";

interface StepChecklistProps {
  guideId: string;
  steps: GuideStep[];
}

export function StepChecklist({ guideId, steps }: StepChecklistProps) {
  const t = useLanguage((s) => s.t);
  const language = useLanguage((s) => s.language);

  const storageKey = `nyaycheck-guide-${guideId}`;

  const [completed, setCompleted] = useState<number[]>([]);
  const [expandedStep, setExpandedStep] = useState<number | null>(0);

  useEffect(() => {
    const stored = localStorage.getItem(storageKey);
    if (stored) setCompleted(JSON.parse(stored));
  }, [storageKey]);

  function toggleStep(order: number) {
    const updated = completed.includes(order)
      ? completed.filter((o) => o !== order)
      : [...completed, order];
    setCompleted(updated);
    localStorage.setItem(storageKey, JSON.stringify(updated));
  }

  return (
    <div className="relative pl-8">
      {/* Vertical line */}
      <div className="absolute left-[15px] top-4 bottom-4 w-px bg-gray-200" />

      <div className="space-y-3">
        {steps.map((step) => {
          const isDone = completed.includes(step.order);
          const isExpanded = expandedStep === step.order;

          return (
            <div key={step.order} className="relative">
              {/* Checkbox circle */}
              <button
                onClick={() => toggleStep(step.order)}
                className="absolute -left-8 top-1 z-10"
              >
                {isDone ? (
                  <CheckCircle2 className="w-[22px] h-[22px] text-primary" />
                ) : (
                  <Circle className="w-[22px] h-[22px] text-gray-300" />
                )}
              </button>

              <button
                onClick={() =>
                  setExpandedStep(isExpanded ? null : step.order)
                }
                className="w-full text-left"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <p className="text-xs font-mono text-primary mb-0.5">
                      {language === "hi" ? `चरण ${step.order}` : `Step ${step.order}`}
                    </p>
                    <h3
                      className={`font-semibold text-sm ${
                        isDone ? "line-through text-muted" : ""
                      }`}
                    >
                      {t(step.title)}
                    </h3>
                  </div>
                  {isExpanded ? (
                    <ChevronUp className="w-4 h-4 text-muted flex-shrink-0 mt-1" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-muted flex-shrink-0 mt-1" />
                  )}
                </div>
              </button>

              {isExpanded && (
                <div className="mt-2 space-y-2 animate-fade-up delay-0">
                  <p className="text-sm text-muted leading-relaxed">
                    {t(step.description)}
                  </p>

                  {step.where && (
                    <div className="flex items-center gap-1.5 text-xs text-primary">
                      <MapPin className="w-3.5 h-3.5" />
                      {t(step.where)}
                    </div>
                  )}

                  {step.documents && step.documents.length > 0 && (
                    <div className="bg-gray-50 rounded-lg p-2.5">
                      <p className="text-xs font-semibold text-muted mb-1 flex items-center gap-1">
                        <FileText className="w-3 h-3" />
                        {language === "hi" ? "दस्तावेज़:" : "Documents:"}
                      </p>
                      <ul className="text-xs text-muted space-y-0.5">
                        {step.documents.map((doc, i) => (
                          <li key={i}>• {t(doc)}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
