"use client";

import { useState } from "react";
import { Sparkles, ChevronDown, ChevronUp, Loader2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AudioButton } from "@/components/ui/audio-button";
import { useLanguage } from "@/hooks/use-language";
import type { AIInsight } from "@/lib/llm/generate-insights";

interface AIInsightsProps {
  reportId: string;
}

export function AIInsights({ reportId }: AIInsightsProps) {
  const [insights, setInsights] = useState<AIInsight[]>([]);
  const [loading, setLoading] = useState(false);
  const [fetched, setFetched] = useState(false);
  const [expanded, setExpanded] = useState<number | null>(null);
  const language = useLanguage((s) => s.language);

  async function fetchInsights() {
    setLoading(true);
    setFetched(true);

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 10_000); // 10s timeout

    try {
      const res = await fetch("/api/insights", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reportId }),
        signal: controller.signal,
      });
      clearTimeout(timeout);
      const data = await res.json();
      if (data.insights?.length) setInsights(data.insights);
    } catch {
      // Timeout or network error — silently fail
    } finally {
      clearTimeout(timeout);
      setLoading(false);
    }
  }

  // Not yet fetched — show the "Get Insights" button
  if (!fetched) {
    return (
      <button
        onClick={fetchInsights}
        className="w-full text-left"
      >
        <Card hover>
          <CardContent className="py-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center flex-shrink-0">
              <Sparkles className="w-5 h-5 text-purple-600" />
            </div>
            <div className="flex-1">
              <p className="font-semibold text-sm">
                {language === "hi"
                  ? "AI अंतर्दृष्टि प्राप्त करें"
                  : "Get AI Insights"}
              </p>
              <p className="text-xs text-muted">
                {language === "hi"
                  ? "टैप करें — AI आपकी स्थिति का विश्लेषण करेगा"
                  : "Tap to get personalized analysis of your situation"}
              </p>
            </div>
            <Sparkles className="w-4 h-4 text-purple-400 flex-shrink-0" />
          </CardContent>
        </Card>
      </button>
    );
  }

  // Loading state
  if (loading) {
    return (
      <Card>
        <CardContent className="py-5 flex items-center gap-3">
          <Loader2 className="w-5 h-5 text-purple-600 animate-spin flex-shrink-0" />
          <div>
            <p className="font-semibold text-sm">
              {language === "hi"
                ? "AI विश्लेषण कर रहा है..."
                : "AI is analyzing..."}
            </p>
            <p className="text-xs text-muted">
              {language === "hi" ? "10 सेकंड तक" : "Up to 10 seconds"}
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  // No results
  if (insights.length === 0) {
    return (
      <Card>
        <CardContent className="py-4 text-center">
          <p className="text-sm text-muted">
            {language === "hi"
              ? "AI अंतर्दृष्टि अभी उपलब्ध नहीं है। बाद में कोशिश करें।"
              : "AI insights not available right now. Try again later."}
          </p>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => { setFetched(false); setInsights([]); }}
            className="mt-2"
          >
            {language === "hi" ? "दोबारा कोशिश करें" : "Try Again"}
          </Button>
        </CardContent>
      </Card>
    );
  }

  // Show results
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
