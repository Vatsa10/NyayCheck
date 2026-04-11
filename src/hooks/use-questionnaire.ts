"use client";

import { create } from "zustand";

interface QuestionnaireState {
  category: string | null;
  answers: Record<string, string | string[]>;
  currentStep: number;
  setCategory: (category: string) => void;
  setAnswer: (questionId: string, value: string | string[]) => void;
  nextStep: () => void;
  prevStep: () => void;
  goToStep: (step: number) => void;
  reset: () => void;
}

export const useQuestionnaire = create<QuestionnaireState>()((set) => ({
  category: null,
  answers: {},
  currentStep: 0,
  setCategory: (category) => set({ category, answers: {}, currentStep: 0 }),
  setAnswer: (questionId, value) =>
    set((state) => ({
      answers: { ...state.answers, [questionId]: value },
    })),
  nextStep: () => set((state) => ({ currentStep: state.currentStep + 1 })),
  prevStep: () =>
    set((state) => ({
      currentStep: Math.max(0, state.currentStep - 1),
    })),
  goToStep: (step) => set({ currentStep: step }),
  reset: () => set({ category: null, answers: {}, currentStep: 0 }),
}));
