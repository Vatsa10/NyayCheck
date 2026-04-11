import type { Question } from "@/types";

/**
 * Resolves which questions to show based on current answers.
 * Filters out questions whose conditions are not met.
 */
export function resolveVisibleQuestions(
  allQuestions: Question[],
  answers: Record<string, string | string[]>
): Question[] {
  return allQuestions.filter((q) => {
    if (!q.condition) return true;

    const { questionId, values } = q.condition;
    const answer = answers[questionId];
    if (!answer) return false;

    const answerValues = Array.isArray(answer) ? answer : [answer];
    return values.some((v) => answerValues.includes(v));
  });
}
