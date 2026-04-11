import { NextRequest, NextResponse } from "next/server";
import { eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { reports, sessions } from "@/lib/db/schema";
import { generateInsights } from "@/lib/llm/generate-insights";
import type { Language, ChecklistItem } from "@/types";

export async function POST(request: NextRequest) {
  try {
    const { reportId } = await request.json();

    if (!reportId) {
      return NextResponse.json(
        { error: "Missing reportId" },
        { status: 400 }
      );
    }

    // Fetch the report
    const [report] = await db
      .select()
      .from(reports)
      .where(eq(reports.id, reportId))
      .limit(1);

    if (!report) {
      return NextResponse.json(
        { error: "Report not found" },
        { status: 404 }
      );
    }

    // If insights already exist, return cached
    if (report.aiInsights) {
      try {
        return NextResponse.json({
          insights: JSON.parse(report.aiInsights),
        });
      } catch {
        // Continue to regenerate
      }
    }

    // Fetch the session for answers
    const [session] = await db
      .select()
      .from(sessions)
      .where(eq(sessions.id, report.sessionId))
      .limit(1);

    if (!session) {
      return NextResponse.json(
        { error: "Session not found" },
        { status: 404 }
      );
    }

    const answers = JSON.parse(session.answers as string);
    const checklist: ChecklistItem[] = JSON.parse(report.checklist as string);

    const insights = await generateInsights({
      category: report.category,
      answers,
      score: report.score,
      riskLevel: report.riskLevel,
      checklist,
      language: (report.language as Language) || "en",
    });

    // Cache insights in Turso
    if (insights.length > 0) {
      await db
        .update(reports)
        .set({ aiInsights: JSON.stringify(insights) })
        .where(eq(reports.id, reportId));
    }

    return NextResponse.json({ insights });
  } catch (error) {
    console.error("Insights generation error:", error);
    return NextResponse.json(
      { error: "Failed to generate insights" },
      { status: 500 }
    );
  }
}
