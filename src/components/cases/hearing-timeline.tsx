"use client";

import { Calendar, Trash2 } from "lucide-react";
import { useLanguage } from "@/hooks/use-language";
import type { Hearing } from "@/types/case-tracker";

interface HearingTimelineProps {
  hearings: Hearing[];
  onDelete?: (hearingId: string) => void;
}

export function HearingTimeline({ hearings, onDelete }: HearingTimelineProps) {
  const language = useLanguage((s) => s.language);
  const today = new Date().toISOString().split("T")[0];

  const sorted = [...hearings].sort((a, b) =>
    b.date.localeCompare(a.date)
  );

  if (sorted.length === 0) {
    return (
      <p className="text-sm text-muted text-center py-6">
        {language === "hi"
          ? "अभी तक कोई सुनवाई नहीं जोड़ी गई"
          : "No hearings added yet"}
      </p>
    );
  }

  return (
    <div className="relative pl-6">
      {/* Vertical line */}
      <div className="absolute left-[9px] top-2 bottom-2 w-px bg-gray-200" />

      <div className="space-y-4">
        {sorted.map((h) => {
          const isUpcoming = h.date >= today;
          return (
            <div key={h.id} className="relative">
              {/* Dot */}
              <div
                className={`absolute -left-6 top-1.5 w-[10px] h-[10px] rounded-full border-2 ${
                  isUpcoming
                    ? "bg-primary border-primary"
                    : "bg-white border-gray-300"
                }`}
              />

              <div className="flex items-start justify-between gap-2">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-3.5 h-3.5 text-muted" />
                    <span
                      className={`text-sm font-medium ${
                        isUpcoming ? "text-primary" : "text-foreground"
                      }`}
                    >
                      {new Date(h.date).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </span>
                    {isUpcoming && (
                      <span className="text-[10px] px-1.5 py-0.5 bg-primary-50 text-primary rounded-full font-medium">
                        {language === "hi" ? "आगामी" : "Upcoming"}
                      </span>
                    )}
                  </div>
                  <p className="text-sm mt-0.5">
                    <span className="font-medium">{h.purpose}</span>
                    {h.judgeName && (
                      <span className="text-muted">
                        {" "}
                        · {language === "hi" ? "न्यायाधीश" : "Judge"}: {h.judgeName}
                      </span>
                    )}
                  </p>
                  {h.outcome && (
                    <p className="text-xs text-muted mt-0.5">{h.outcome}</p>
                  )}
                </div>
                {onDelete && (
                  <button
                    onClick={() => onDelete(h.id)}
                    className="p-1 text-muted hover:text-red-500 transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
