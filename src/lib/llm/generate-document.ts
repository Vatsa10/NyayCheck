import { getOpenAI, getModel } from "./client";
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
  const prompt = buildDocumentPrompt(
    params.documentType,
    params.category,
    params.answers,
    params.checklist,
    params.language
  );

  for (let attempt = 0; attempt < 3; attempt++) {
    try {
      const response = await getOpenAI().chat.completions.create({
        model: getModel(),
        messages: [{ role: "user", content: prompt }],
        temperature: 0.3,
        max_tokens: 3000,
      });

      const content = response.choices[0]?.message?.content;
      if (!content) return null;

      const jsonStr = content.replace(/```json?\n?/g, "").replace(/```/g, "").trim();
      const doc: GeneratedDoc = JSON.parse(jsonStr);
      return doc;
    } catch (error: unknown) {
      const statusCode = (error as { status?: number })?.status;
      if (statusCode === 429 && attempt < 2) {
        await new Promise((r) => setTimeout(r, (attempt + 1) * 2500));
        continue;
      }
      console.error("Document generation failed:", error);
      return null;
    }
  }
  return null;
}
