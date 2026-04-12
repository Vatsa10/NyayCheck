import { NextRequest, NextResponse } from "next/server";
import { matchSchemes } from "@/lib/engine/scheme-matcher";
import { governmentSchemes } from "@/lib/legal/schemes";
import type { SchemeMatchProfile, Gender, IncomeBracket, CasteCategory } from "@/types/schemes";
import type { RiskLevel } from "@/types";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  const profile: SchemeMatchProfile = {
    gender: (searchParams.get("gender") as Gender) || "male",
    incomeBracket: (searchParams.get("income") as IncomeBracket) || "below_5l",
    casteCategory: (searchParams.get("caste") as CasteCategory) || "general",
    state: searchParams.get("state") || "",
    legalCategory: searchParams.get("category") || undefined,
    riskLevel: (searchParams.get("risk") as RiskLevel) || undefined,
    activeFlags: searchParams.get("flags")?.split(",").filter(Boolean) || undefined,
  };

  const matches = matchSchemes(governmentSchemes, profile);

  return NextResponse.json({
    schemes: matches,
    count: matches.length,
    totalSchemes: governmentSchemes.length,
  });
}
