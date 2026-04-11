import { NextRequest, NextResponse } from "next/server";
import { eq, ne, and } from "drizzle-orm";
import { db } from "@/lib/db";
import { reports } from "@/lib/db/schema";
import { cosineSimilarity } from "@/lib/engine/embeddings";

export async function POST(request: NextRequest) {
  try {
    const { reportId } = await request.json();

    if (!reportId) {
      return NextResponse.json(
        { error: "Missing reportId" },
        { status: 400 }
      );
    }

    // Get the current report
    const [currentReport] = await db
      .select()
      .from(reports)
      .where(eq(reports.id, reportId))
      .limit(1);

    if (!currentReport || !currentReport.embedding) {
      return NextResponse.json({ similarCases: [], totalInCategory: 0 });
    }

    const currentVec = JSON.parse(currentReport.embedding as string);

    // Get all other reports in the same category
    const otherReports = await db
      .select({
        id: reports.id,
        category: reports.category,
        score: reports.score,
        riskLevel: reports.riskLevel,
        embedding: reports.embedding,
        createdAt: reports.createdAt,
      })
      .from(reports)
      .where(
        and(
          eq(reports.category, currentReport.category),
          ne(reports.id, reportId)
        )
      );

    // Compute similarity with each
    const similarities = otherReports
      .filter((r) => r.embedding)
      .map((r) => {
        const vec = JSON.parse(r.embedding as string);
        const similarity = cosineSimilarity(currentVec, vec);
        return {
          score: r.score,
          riskLevel: r.riskLevel,
          similarity: Math.round(similarity * 100),
        };
      })
      .filter((r) => r.similarity > 30) // Only show >30% similar
      .sort((a, b) => b.similarity - a.similarity)
      .slice(0, 5);

    // Aggregate stats for the category
    const allInCategory = otherReports.length + 1; // Include current
    const avgScore =
      otherReports.length > 0
        ? Math.round(
            otherReports.reduce((sum, r) => sum + (r.score ?? 0), 0) /
              otherReports.length
          )
        : currentReport.score;

    return NextResponse.json({
      similarCases: similarities,
      totalInCategory: allInCategory,
      categoryAvgScore: avgScore,
    });
  } catch (error) {
    console.error("Similar cases error:", error);
    return NextResponse.json(
      { error: "Failed to find similar cases" },
      { status: 500 }
    );
  }
}
