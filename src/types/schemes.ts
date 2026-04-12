import type { BilingualText, RiskLevel } from "./index";

export type Gender = "male" | "female" | "other";
export type IncomeBracket = "bpl" | "below_3l" | "below_5l" | "below_8l" | "above_8l";
export type CasteCategory = "general" | "obc" | "sc" | "st" | "minority";
export type SchemeCategory =
  | "legal_aid"
  | "women_welfare"
  | "sc_st"
  | "labor"
  | "consumer"
  | "housing"
  | "education"
  | "health"
  | "senior_citizen"
  | "disability";

export interface GovernmentScheme {
  id: string;
  name: BilingualText;
  description: BilingualText;
  eligibility: BilingualText;
  howToApply: BilingualText;
  officialLink: string;
  category: SchemeCategory;
  tags: {
    gender?: Gender[];
    incomeBracket?: IncomeBracket[];
    casteCategory?: CasteCategory[];
    states?: string[]; // empty = all-India
    legalCategories?: string[]; // maps to questionnaire categories
    riskLevels?: RiskLevel[];
    checklistFlags?: string[];
  };
  isPopular?: boolean;
}

export interface SchemeMatchProfile {
  gender: Gender;
  incomeBracket: IncomeBracket;
  casteCategory: CasteCategory;
  state: string;
  legalCategory?: string;
  riskLevel?: RiskLevel;
  activeFlags?: string[];
}

export interface ScoredScheme {
  scheme: GovernmentScheme;
  relevanceScore: number;
  matchReasons: BilingualText[];
}
