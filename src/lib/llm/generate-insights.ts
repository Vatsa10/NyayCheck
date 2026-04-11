import { getOpenAI, getModel, canMakeLLMRequest, recordLLMRequest } from "./client";
import { buildInsightsPrompt } from "./prompts";
import type { ChecklistItem, Language } from "@/types";

export interface AIInsight {
  title: string;
  insight: string;
  action: string;
  relevantLaw: string;
  urgency: "high" | "medium" | "low";
}

export async function generateInsights(params: {
  category: string;
  answers: Record<string, string | string[]>;
  score: number;
  riskLevel: string;
  checklist: ChecklistItem[];
  language: Language;
}): Promise<AIInsight[]> {
  // Rate limit gate — skip entirely if over budget
  if (!canMakeLLMRequest()) {
    console.log("LLM rate limit reached, skipping insights generation");
    return [];
  }

  const prompt = buildInsightsPrompt(
    params.category,
    params.answers,
    params.score,
    params.riskLevel,
    params.checklist,
    params.language
  );

  try {
    recordLLMRequest();
    const response = await getOpenAI().chat.completions.create({
      model: getModel(),
      messages: [{ role: "user", content: prompt }],
      temperature: 0.3,
      max_tokens: 800, // Tight budget: ~3 insights fit in 800 tokens
    });

    const content = response.choices[0]?.message?.content;
    if (!content) return [];

    const jsonStr = content
      .replace(/```json?\n?/g, "")
      .replace(/```/g, "")
      .trim();
    const insights: AIInsight[] = JSON.parse(jsonStr);
    return insights;
  } catch (error: unknown) {
    const statusCode = (error as { status?: number })?.status;
    if (statusCode === 429) {
      console.log("OpenRouter 429 — free tier rate limited");
    } else {
      console.error("AI insights generation failed:", error);
    }
    return [];
  }
}
