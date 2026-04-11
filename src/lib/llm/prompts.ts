import type { ChecklistItem, Language } from "@/types";

export function buildInsightsPrompt(
  category: string,
  answers: Record<string, string | string[]>,
  score: number,
  riskLevel: string,
  checklist: ChecklistItem[],
  language: Language
): string {
  const checklistSummary = checklist
    .map(
      (item) =>
        `- ${item.title[language]} (${item.urgency} urgency, ${item.applicableAct})`
    )
    .join("\n");

  const lang = language === "hi" ? "Hindi" : "English";

  return `You are a legal awareness assistant for Indian citizens. You are NOT a lawyer. Your role is to explain legal concepts in simple, plain language.

The user completed a legal health check for category: "${category}"
Their score: ${score}/100 (${riskLevel} risk)

Their answers:
${JSON.stringify(answers, null, 2)}

Their checklist items:
${checklistSummary}

Generate 3-4 personalized, actionable insights in ${lang}. Each insight should:
1. Reference their specific situation (based on their answers)
2. Explain WHY this matters in plain language
3. Give a concrete next step they can take TODAY
4. Cite the relevant Indian law/act (be accurate)

Format as JSON array:
[
  {
    "title": "short title",
    "insight": "2-3 sentence personalized explanation",
    "action": "specific actionable step",
    "relevantLaw": "Act/Section reference",
    "urgency": "high" | "medium" | "low"
  }
]

IMPORTANT:
- Use simple language a non-lawyer can understand
- Be accurate about Indian laws (BNS 2023, Consumer Protection Act 2019, etc.)
- Do NOT give legal advice — give legal awareness
- Add disclaimer context where appropriate
- Respond ONLY with the JSON array, no other text`;
}

export function buildDocumentPrompt(
  documentType: string,
  category: string,
  answers: Record<string, string | string[]>,
  checklist: ChecklistItem[],
  language: Language
): string {
  const lang = language === "hi" ? "Hindi" : "English";
  const checklistActs = checklist.map((c) => c.applicableAct).join(", ");

  const docTypeLabels: Record<string, string> = {
    legal_notice: "Legal Notice",
    complaint: "Complaint Letter",
    application: "Application/Petition",
  };

  return `You are a legal document drafting assistant for Indian citizens. Generate a first draft ${docTypeLabels[documentType] || documentType} in ${lang}.

Category: ${category}
User's situation (from questionnaire answers):
${JSON.stringify(answers, null, 2)}

Relevant Acts: ${checklistActs}

Generate the document with:
1. Proper legal formatting (To, From, Subject, Date, Body, Signature)
2. Reference to specific Indian law sections
3. Clear statement of facts based on the user's answers
4. Clear demand/relief sought
5. Reasonable timeline for response (typically 15-30 days for legal notices)
6. Professional but accessible language

Return a JSON object:
{
  "title": "Document title",
  "contentHtml": "Full HTML document with proper formatting (<h2>, <p>, <strong>, <br/> tags)",
  "contentText": "Plain text version for WhatsApp sharing (max 1000 chars)"
}

IMPORTANT:
- Use [YOUR NAME] and [YOUR ADDRESS] as placeholders
- Use [OPPOSITE PARTY NAME] and [OPPOSITE PARTY ADDRESS] as placeholders
- Include today's date
- Be accurate about law sections
- Add "This is a draft document. Please consult a lawyer before sending." at the end
- Respond ONLY with the JSON object`;
}
