export interface TrackedCase {
  id: string;
  cnrNumber: string;
  caseNumber?: string;
  courtType: "district" | "high" | "supreme" | "tribunal" | "consumer";
  courtName: string;
  state: string;
  petitioner: string;
  respondent: string;
  caseType?: string;
  advocate?: string;
  filingDate?: string;
  caseStage: string;
  notes?: string;
  hearings: Hearing[];
  createdAt: string;
  updatedAt: string;
}

export interface Hearing {
  id: string;
  date: string;
  purpose: string;
  outcome?: string;
  nextDate?: string;
  judgeName?: string;
}

export type CourtType = TrackedCase["courtType"];
