import { NextRequest, NextResponse } from "next/server";
import { nanoid } from "nanoid";
import { eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { sessions, reports } from "@/lib/db/schema";
import { getCategoryById } from "@/lib/legal/categories";
import { resolveVisibleQuestions } from "@/lib/engine/flow-resolver";
import { evaluateScore } from "@/lib/engine/evaluator";
import { mapFlagsToChecklist } from "@/lib/engine/checklist-mapper";
import type { Language, RiskLevel } from "@/types";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const reportId = searchParams.get("reportId");

    if (!reportId) {
      return NextResponse.json({ error: "Missing reportId" }, { status: 400 });
    }

    const rows = await db
      .select()
      .from(reports)
      .where(eq(reports.id, reportId))
      .limit(1);
    const report = rows[0];

    if (!report) {
      return NextResponse.json({ error: "Report not found" }, { status: 404 });
    }

    let checklist;
    try {
      checklist = JSON.parse(report.checklist as string);
    } catch {
      checklist = report.checklist;
    }

    let summaryText = "";
    try {
      const summaryObj = JSON.parse(report.summary as string);
      summaryText =
        summaryObj[report.language as string] ||
        summaryObj.en ||
        report.summary;
    } catch {
      summaryText = report.summary as string;
    }

    return NextResponse.json({
      reportId: report.id,
      score: report.score,
      riskLevel: report.riskLevel,
      checklist,
      summary: summaryText,
      category: report.category,
    });
  } catch (error) {
    console.error("Report fetch error:", error);
    return NextResponse.json(
      { error: "Failed to fetch report" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { category: categoryId, answers, language = "en" } = body;

    const category = getCategoryById(categoryId);
    if (!category) {
      return NextResponse.json(
        { error: "Invalid category" },
        { status: 400 }
      );
    }

    // Resolve visible questions and evaluate
    const visibleQuestions = resolveVisibleQuestions(
      category.questions,
      answers
    );
    const { score, riskLevel, activeFlags } = evaluateScore(
      visibleQuestions,
      answers
    );
    const checklist = mapFlagsToChecklist(activeFlags);

    // Generate summary
    const summaryEn = generateSummary(
      score,
      riskLevel as RiskLevel,
      checklist.length,
      categoryId
    );
    const summaryHi = generateSummaryHi(
      score,
      riskLevel as RiskLevel,
      checklist.length,
      categoryId
    );

    // Save session
    const sessionId = nanoid();
    const now = new Date();
    await db.insert(sessions).values({
      id: sessionId,
      createdAt: now,
      language: language as Language,
      category: categoryId,
      answers: JSON.stringify(answers),
      completed: true,
    });

    // Save report
    const reportId = nanoid(10);
    await db.insert(reports).values({
      id: reportId,
      sessionId,
      createdAt: now,
      category: categoryId,
      score,
      riskLevel,
      checklist: JSON.stringify(checklist),
      summary: JSON.stringify({ en: summaryEn, hi: summaryHi }),
      language: language as Language,
    });

    return NextResponse.json({
      reportId,
      score,
      riskLevel,
      checklist,
      summary: language === "hi" ? summaryHi : summaryEn,
    });
  } catch (error) {
    console.error("Questionnaire error:", error);
    return NextResponse.json(
      { error: "Failed to process questionnaire" },
      { status: 500 }
    );
  }
}

function generateSummary(
  score: number,
  riskLevel: RiskLevel,
  checklistCount: number,
  category: string
): string {
  const riskLabels = {
    low: "good shape",
    medium: "some areas that need attention",
    high: "significant legal gaps",
    critical: "critical issues requiring immediate action",
  };

  return `Your legal health score for ${category} is ${score}/100. You are in ${riskLabels[riskLevel]}, with ${checklistCount} action item${checklistCount !== 1 ? "s" : ""} to address.`;
}

function generateSummaryHi(
  score: number,
  riskLevel: RiskLevel,
  checklistCount: number,
  category: string
): string {
  const riskLabels = {
    low: "अच्छी स्थिति में",
    medium: "कुछ क्षेत्रों में ध्यान देने की ज़रूरत है",
    high: "महत्वपूर्ण कानूनी कमियां हैं",
    critical: "गंभीर समस्याएं जिन पर तुरंत कार्रवाई चाहिए",
  };

  return `${category} के लिए आपका कानूनी स्वास्थ्य स्कोर ${score}/100 है। आप ${riskLabels[riskLevel]}, ${checklistCount} कार्य आइटम हैं।`;
}
