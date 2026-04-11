import type { Question, ScoreResult, RiskLevel } from "@/types";

export function evaluateScore(
  questions: Question[],
  answers: Record<string, string | string[]>
): ScoreResult {
  let totalRiskWeight = 0;
  const activeFlags: string[] = [];

  for (const q of questions) {
    const answer = answers[q.id];
    if (!answer || !q.options) continue;

    const selectedValues = Array.isArray(answer) ? answer : [answer];
    for (const val of selectedValues) {
      const opt = q.options.find((o) => o.value === val);
      if (opt?.scoreWeight) totalRiskWeight += opt.scoreWeight;
      if (opt?.checklistFlags) activeFlags.push(...opt.checklistFlags);
    }
  }

  const score = Math.max(0, Math.min(100, 100 - totalRiskWeight));
  const riskLevel: RiskLevel =
    score >= 80
      ? "low"
      : score >= 60
        ? "medium"
        : score >= 40
          ? "high"
          : "critical";

  return { score, riskLevel, activeFlags };
}
