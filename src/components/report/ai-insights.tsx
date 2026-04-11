"use client";

import { useState, useEffect } from "react";
import { Sparkles, ChevronDown, ChevronUp } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AudioButton } from "@/components/ui/audio-button";
import { useLanguage } from "@/hooks/use-language";
import type { AIInsight } from "@/lib/llm/generate-insights";

interface AIInsightsProps {
  reportId: string;
}

export function AIInsights({ reportId }: AIInsightsProps) {
  const [insights, setInsights] = useState<AIInsight[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [expanded, setExpanded] = useState<number | null>(null);
  const language = useLanguage((s) => s.language);

  useEffect(() => {
    setLoading(true);
    fetch("/api/insights", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ reportId }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insights) setInsights(data.insights);
        else setError(true);
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, [reportId]);

  if (loading) {
    return (
      <Card>
        <CardContent className="py-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-purple-100 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-purple-600 animate-pulse" />
            </div>
            <div>
              <p className="font-semibold text-sm">
                {language === "hi"
                  ? "AI अंतर्दृष्टि जनरेट हो रही है..."
                  : "Generating AI insights..."}
              </p>
              <p className="text-xs text-muted">
                {language === "hi"
                  ? "आपकी स्थिति का विश्लेषण किया जा रहा है"
                  : "Analyzing your specific situation"}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error || insights.length === 0) return null;

  return (
    <div>
      <div className="flex items-center gap-2 mb-4">
        <Sparkles className="w-5 h-5 text-purple-600" />
        <h2 className="text-xl font-semibold">
          {language === "hi" ? "AI अंतर्दृष्टि" : "AI Insights"}
        </h2>
        <Badge variant="default">
          {language === "hi" ? "AI-संचालित" : "AI-Powered"}
        </Badge>
      </div>

      <div className="space-y-3">
        {insights.map((insight, idx) => (
          <Card key={idx}>
            <CardContent className="py-4">
              <button
                onClick={() => setExpanded(expanded === idx ? null : idx)}
                className="w-full text-left"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3 flex-1">
                    <div
                      className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                        insight.urgency === "high"
                          ? "bg-red-500"
                          : insight.urgency === "medium"
                            ? "bg-amber-500"
                            : "bg-emerald-500"
                      }`}
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold text-sm">
                        {insight.title}
                      </h3>
                      {expanded === idx && (
                        <div className="mt-2 space-y-2">
                          <p className="text-sm text-muted leading-relaxed">
                            {insight.insight}
                          </p>
                          <div className="bg-primary/5 rounded-lg p-3">
                            <p className="text-sm font-medium text-primary">
                              {language === "hi" ? "अगला कदम:" : "Next step:"}
                            </p>
                            <p className="text-sm mt-1">{insight.action}</p>
                          </div>
                          <p className="text-xs text-primary font-medium">
                            {insight.relevantLaw}
                          </p>
                          <AudioButton
                            text={`${insight.title}. ${insight.insight}. ${insight.action}`}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                  {expanded === idx ? (
                    <ChevronUp className="w-4 h-4 text-muted flex-shrink-0 mt-1" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-muted flex-shrink-0 mt-1" />
                  )}
                </div>
              </button>
            </CardContent>
          </Card>
        ))}
      </div>

      <p className="text-xs text-muted mt-3 italic">
        {language === "hi"
          ? "* AI-जनित अंतर्दृष्टि। यह कानूनी सलाह नहीं है। कृपया वकील से परामर्श करें।"
          : "* AI-generated insights. This is not legal advice. Please consult a lawyer."}
      </p>
    </div>
  );
}
