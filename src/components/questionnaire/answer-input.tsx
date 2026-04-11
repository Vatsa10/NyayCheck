"use client";

import type { Question } from "@/types";
import { RadioGroup } from "@/components/ui/radio-group";
import { useLanguage } from "@/hooks/use-language";

interface AnswerInputProps {
  question: Question;
  value: string | string[] | undefined;
  onChange: (value: string | string[]) => void;
}

export function AnswerInput({ question, value, onChange }: AnswerInputProps) {
  const t = useLanguage((s) => s.t);

  if (
    (question.type === "yes_no" || question.type === "single_choice") &&
    question.options
  ) {
    return (
      <RadioGroup
        name={question.id}
        options={question.options.map((opt) => ({
          value: opt.value,
          label: t(opt.label),
        }))}
        value={typeof value === "string" ? value : undefined}
        onChange={(val) => onChange(val)}
      />
    );
  }

  if (question.type === "multi_choice" && question.options) {
    const selected = Array.isArray(value) ? value : [];
    return (
      <div className="flex flex-col gap-3">
        {question.options.map((opt) => (
          <label
            key={opt.value}
            className={`flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 ${
              selected.includes(opt.value)
                ? "border-primary bg-primary/5"
                : "border-gray-200 hover:border-gray-300 bg-white"
            }`}
          >
            <input
              type="checkbox"
              checked={selected.includes(opt.value)}
              onChange={() => {
                const newVal = selected.includes(opt.value)
                  ? selected.filter((v) => v !== opt.value)
                  : [...selected, opt.value];
                onChange(newVal);
              }}
              className="sr-only"
            />
            <div
              className={`w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 ${
                selected.includes(opt.value)
                  ? "border-primary bg-primary"
                  : "border-gray-300"
              }`}
            >
              {selected.includes(opt.value) && (
                <svg
                  className="w-3 h-3 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={3}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              )}
            </div>
            <span className="text-base">{t(opt.label)}</span>
          </label>
        ))}
      </div>
    );
  }

  if (question.type === "text") {
    return (
      <input
        type="text"
        value={typeof value === "string" ? value : ""}
        onChange={(e) => onChange(e.target.value)}
        className="w-full p-4 rounded-xl border-2 border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-base"
        placeholder={t(question.question)}
      />
    );
  }

  if (question.type === "number") {
    return (
      <input
        type="number"
        value={typeof value === "string" ? value : ""}
        onChange={(e) => onChange(e.target.value)}
        className="w-full p-4 rounded-xl border-2 border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-base"
      />
    );
  }

  return null;
}
