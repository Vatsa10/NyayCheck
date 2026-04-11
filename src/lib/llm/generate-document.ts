import { getOpenAI, getModel, canMakeLLMRequest, recordLLMRequest } from "./client";
import { buildDocumentPrompt } from "./prompts";
import type { ChecklistItem, Language } from "@/types";

export interface GeneratedDoc {
  title: string;
  contentHtml: string;
  contentText: string;
}

export async function generateDocument(params: {
  documentType: string;
  category: string;
  answers: Record<string, string | string[]>;
  checklist: ChecklistItem[];
  language: Language;
}): Promise<GeneratedDoc | null> {
  if (!canMakeLLMRequest()) {
    console.log("LLM rate limit reached, skipping document generation");
    return null;
  }

  const prompt = buildDocumentPrompt(
    params.documentType,
    params.category,
    params.answers,
    params.checklist,
    params.language
  );

  try {
    recordLLMRequest();
    const response = await getOpenAI().chat.completions.create({
      model: getModel(),
      messages: [{ role: "user", content: prompt }],
      temperature: 0.3,
      max_tokens: 1500, // Documents need more room but capped at 1500
    });

    const content = response.choices[0]?.message?.content;
    if (!content) return null;

    const jsonStr = content
      .replace(/```json?\n?/g, "")
      .replace(/```/g, "")
      .trim();
    const doc: GeneratedDoc = JSON.parse(jsonStr);
    return doc;
  } catch (error: unknown) {
    const statusCode = (error as { status?: number })?.status;
    if (statusCode === 429) {
      console.log("OpenRouter 429 — free tier rate limited");
    } else {
      console.error("Document generation failed:", error);
    }
    return null;
  }
}
