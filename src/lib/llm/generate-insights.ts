import { getOpenAI, getModel } from "./client";
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
  const prompt = buildInsightsPrompt(
    params.category,
    params.answers,
    params.score,
    params.riskLevel,
    params.checklist,
    params.language
  );

  // Retry up to 2 times for rate limit errors
  for (let attempt = 0; attempt < 3; attempt++) {
    try {
      const response = await getOpenAI().chat.completions.create({
        model: getModel(),
        messages: [{ role: "user", content: prompt }],
        temperature: 0.3,
        max_tokens: 1500,
      });

      const content = response.choices[0]?.message?.content;
      if (!content) return [];

      // Extract JSON from response (handle markdown code blocks)
      const jsonStr = content.replace(/```json?\n?/g, "").replace(/```/g, "").trim();
      const insights: AIInsight[] = JSON.parse(jsonStr);
      return insights;
    } catch (error: unknown) {
      const statusCode = (error as { status?: number })?.status;
      if (statusCode === 429 && attempt < 2) {
        // Wait before retry: 2s, then 5s
        await new Promise((r) => setTimeout(r, (attempt + 1) * 2500));
        continue;
      }
      console.error("AI insights generation failed:", error);
      return [];
    }
  }
  return [];
}
