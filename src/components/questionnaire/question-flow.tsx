"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import type { Question } from "@/types";
import { resolveVisibleQuestions } from "@/lib/engine/flow-resolver";
import { useQuestionnaire } from "@/hooks/use-questionnaire";
import { useLanguage } from "@/hooks/use-language";
import { useStrings } from "@/hooks/use-language";
import { AnswerInput } from "./answer-input";
import { ProgressBar } from "@/components/ui/progress-bar";
import { Button } from "@/components/ui/button";
import { AudioButton } from "@/components/ui/audio-button";
import { ChevronLeft, ChevronRight, Send } from "lucide-react";

interface QuestionFlowProps {
  questions: Question[];
  category: string;
}

export function QuestionFlow({ questions, category }: QuestionFlowProps) {
  const router = useRouter();
  const t = useLanguage((s) => s.t);
  const strings = useStrings();
  const { answers, currentStep, setAnswer, nextStep, prevStep } =
    useQuestionnaire();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const visibleQuestions = useMemo(
    () => resolveVisibleQuestions(questions, answers),
    [questions, answers]
  );

  const currentQuestion = visibleQuestions[currentStep];
  const isFirstStep = currentStep === 0;
  const isLastStep = currentStep === visibleQuestions.length - 1;
  const currentAnswer = currentQuestion ? answers[currentQuestion.id] : undefined;
  const canProceed = currentQuestion?.required ? !!currentAnswer : true;

  async function handleSubmit() {
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/questionnaire", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          category,
          answers,
          language: useLanguage.getState().language,
        }),
      });
      const data = await res.json();
      if (data.reportId) {
        sessionStorage.setItem(`report-${data.reportId}`, JSON.stringify(data));
        router.push(`/report/${data.reportId}`);
      }
    } catch {
      alert("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  if (!currentQuestion) return null;

  return (
    <div className="max-w-xl mx-auto">
      <ProgressBar current={currentStep + 1} total={visibleQuestions.length} />

      <div className="mt-8 mb-6">
        <h2 className="text-xl font-semibold mb-2">
          {t(currentQuestion.question)}
        </h2>
        {currentQuestion.helpText && (
          <p className="text-sm text-muted mb-1">
            {t(currentQuestion.helpText)}
          </p>
        )}
        <AudioButton text={t(currentQuestion.question)} />
      </div>

      <div className="mb-8">
        <AnswerInput
          question={currentQuestion}
          value={currentAnswer}
          onChange={(val) => setAnswer(currentQuestion.id, val)}
        />
      </div>

      <div className="flex justify-between gap-4">
        {!isFirstStep && (
          <Button variant="outline" onClick={prevStep}>
            <ChevronLeft className="w-4 h-4" />
            {strings.check.back}
          </Button>
        )}
        <div className="ml-auto">
          {isLastStep ? (
            <Button
              onClick={handleSubmit}
              disabled={!canProceed || isSubmitting}
            >
              {isSubmitting ? strings.common.loading : strings.check.submit}
              <Send className="w-4 h-4" />
            </Button>
          ) : (
            <Button onClick={nextStep} disabled={!canProceed}>
              {strings.check.next}
              <ChevronRight className="w-4 h-4" />
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
