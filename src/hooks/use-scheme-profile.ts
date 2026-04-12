"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Gender, IncomeBracket, CasteCategory, SchemeMatchProfile } from "@/types/schemes";

interface SchemeProfileState {
  gender: Gender | null;
  incomeBracket: IncomeBracket | null;
  casteCategory: CasteCategory | null;
  state: string | null;
  setGender: (g: Gender) => void;
  setIncomeBracket: (i: IncomeBracket) => void;
  setCasteCategory: (c: CasteCategory) => void;
  setState: (s: string) => void;
  isComplete: () => boolean;
  getProfile: () => SchemeMatchProfile | null;
  clear: () => void;
}

export const useSchemeProfile = create<SchemeProfileState>()(
  persist(
    (set, get) => ({
      gender: null,
      incomeBracket: null,
      casteCategory: null,
      state: null,
      setGender: (gender) => set({ gender }),
      setIncomeBracket: (incomeBracket) => set({ incomeBracket }),
      setCasteCategory: (casteCategory) => set({ casteCategory }),
      setState: (state) => set({ state }),
      isComplete: () => {
        const s = get();
        return !!(s.gender && s.incomeBracket && s.casteCategory && s.state);
      },
      getProfile: () => {
        const s = get();
        if (!s.gender || !s.incomeBracket || !s.casteCategory || !s.state)
          return null;
        return {
          gender: s.gender,
          incomeBracket: s.incomeBracket,
          casteCategory: s.casteCategory,
          state: s.state,
        };
      },
      clear: () =>
        set({ gender: null, incomeBracket: null, casteCategory: null, state: null }),
    }),
    { name: "nyaycheck-scheme-profile" }
  )
);
