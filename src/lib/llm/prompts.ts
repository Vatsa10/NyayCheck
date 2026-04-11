import type { ChecklistItem, Language } from "@/types";

export function buildInsightsPrompt(
  category: string,
  answers: Record<string, string | string[]>,
  score: number,
  riskLevel: string,
  checklist: ChecklistItem[],
  language: Language
): string {
  // Compact checklist — just titles and acts
  const checklistCompact = checklist
    .slice(0, 4) // Max 4 items to limit tokens
    .map((item) => `${item.title[language]} (${item.applicableAct})`)
    .join("; ");

  // Compact answers — only key-value, no formatting
  const answersCompact = Object.entries(answers)
    .map(([k, v]) => `${k}=${Array.isArray(v) ? v.join(",") : v}`)
    .join("; ");

  const lang = language === "hi" ? "Hindi" : "English";

  return `Legal awareness assistant for Indian citizens. NOT a lawyer.

Category: ${category}, Score: ${score}/100 (${riskLevel})
Answers: ${answersCompact}
Checklist: ${checklistCompact}

Generate exactly 3 personalized insights in ${lang}. JSON array only:
[{"title":"short","insight":"1-2 sentences","action":"one step","relevantLaw":"Act/Section","urgency":"high|medium|low"}]

Rules: simple language, accurate Indian laws, no legal advice, JSON only.`;
}

export function buildDocumentPrompt(
  documentType: string,
  category: string,
  answers: Record<string, string | string[]>,
  checklist: ChecklistItem[],
  language: Language
): string {
  const lang = language === "hi" ? "Hindi" : "English";
  const acts = checklist
    .slice(0, 3)
    .map((c) => c.applicableAct)
    .join(", ");

  const answersCompact = Object.entries(answers)
    .map(([k, v]) => `${k}=${Array.isArray(v) ? v.join(",") : v}`)
    .join("; ");

  const docLabel =
    documentType === "legal_notice"
      ? "Legal Notice"
      : documentType === "complaint"
        ? "Complaint"
        : "Application";

  return `Draft a ${docLabel} in ${lang} for category: ${category}.

Facts: ${answersCompact}
Acts: ${acts}

JSON only:
{"title":"title","contentHtml":"HTML with <h2><p><strong> tags, proper legal format: To/From/Subject/Date/Body/Signature, cite law sections, [YOUR NAME] [YOUR ADDRESS] [OPPOSITE PARTY] as placeholders, 15-30 day response timeline","contentText":"Plain text summary, max 500 chars"}

End with: "Draft document. Consult a lawyer before sending."`;
}
