"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { nanoid } from "nanoid";
import type { TrackedCase, Hearing } from "@/types/case-tracker";

interface CaseTrackerState {
  cases: TrackedCase[];
  addCase: (
    data: Omit<TrackedCase, "id" | "createdAt" | "updatedAt" | "hearings">
  ) => string;
  updateCase: (id: string, updates: Partial<TrackedCase>) => void;
  deleteCase: (id: string) => void;
  addHearing: (caseId: string, hearing: Omit<Hearing, "id">) => void;
  deleteHearing: (caseId: string, hearingId: string) => void;
}

export const useCaseTracker = create<CaseTrackerState>()(
  persist(
    (set, get) => ({
      cases: [],

      addCase: (data) => {
        const id = nanoid(10);
        const now = new Date().toISOString();
        set((s) => ({
          cases: [
            ...s.cases,
            { ...data, id, hearings: [], createdAt: now, updatedAt: now },
          ],
        }));
        return id;
      },

      updateCase: (id, updates) => {
        set((s) => ({
          cases: s.cases.map((c) =>
            c.id === id
              ? { ...c, ...updates, updatedAt: new Date().toISOString() }
              : c
          ),
        }));
      },

      deleteCase: (id) => {
        set((s) => ({ cases: s.cases.filter((c) => c.id !== id) }));
      },

      addHearing: (caseId, hearing) => {
        const hearingWithId = { ...hearing, id: nanoid(8) };
        set((s) => ({
          cases: s.cases.map((c) =>
            c.id === caseId
              ? {
                  ...c,
                  hearings: [...c.hearings, hearingWithId],
                  updatedAt: new Date().toISOString(),
                }
              : c
          ),
        }));
      },

      deleteHearing: (caseId, hearingId) => {
        set((s) => ({
          cases: s.cases.map((c) =>
            c.id === caseId
              ? {
                  ...c,
                  hearings: c.hearings.filter((h) => h.id !== hearingId),
                  updatedAt: new Date().toISOString(),
                }
              : c
          ),
        }));
      },
    }),
    { name: "nyaycheck-cases" }
  )
);

/** Get all upcoming hearings across all cases, sorted by date. */
export function useUpcomingHearings() {
  const cases = useCaseTracker((s) => s.cases);
  const today = new Date().toISOString().split("T")[0];

  return cases
    .flatMap((c) =>
      c.hearings
        .filter((h) => h.date >= today)
        .map((h) => ({ caseData: c, hearing: h }))
    )
    .sort((a, b) => a.hearing.date.localeCompare(b.hearing.date));
}
