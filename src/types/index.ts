// ─── Core Types for NyayCheck ───

export type Language = "en" | "hi";

export type BilingualText = {
  en: string;
  hi: string;
};

export type AnswerType =
  | "single_choice"
  | "multi_choice"
  | "text"
  | "number"
  | "date"
  | "yes_no";

export interface QuestionOption {
  value: string;
  label: BilingualText;
  scoreWeight?: number;
  triggersQuestions?: string[];
  checklistFlags?: string[];
}

export interface Question {
  id: string;
  category: string;
  order: number;
  type: AnswerType;
  question: BilingualText;
  helpText?: BilingualText;
  options?: QuestionOption[];
  required: boolean;
  condition?: {
    questionId: string;
    values: string[];
  };
}

export interface CategoryDefinition {
  id: string;
  name: BilingualText;
  description: BilingualText;
  icon: string;
  color: string;
  relevantActs: string[];
  questions: Question[];
}

export type RiskLevel = "low" | "medium" | "high" | "critical";

export interface ScoreResult {
  score: number;
  riskLevel: RiskLevel;
  activeFlags: string[];
}

export interface ChecklistItem {
  id: string;
  title: BilingualText;
  description: BilingualText;
  urgency: "low" | "medium" | "high";
  applicableAct: string;
  documentType: string | null;
}

export interface Report {
  id: string;
  sessionId: string;
  createdAt: Date;
  category: string;
  score: number;
  riskLevel: RiskLevel;
  checklist: ChecklistItem[];
  summary: BilingualText;
  language: Language;
}

export interface GeneratedDocument {
  id: string;
  reportId: string;
  createdAt: Date;
  type: "legal_notice" | "complaint" | "application";
  title: string;
  contentHtml: string;
  contentText: string;
  language: Language;
}
