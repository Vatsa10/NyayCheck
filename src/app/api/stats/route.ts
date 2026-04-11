import { NextResponse } from "next/server";
import { sql } from "drizzle-orm";
import { db } from "@/lib/db";
import { reports } from "@/lib/db/schema";

export async function GET() {
  try {
    // Aggregate stats from Turso cloud — anonymized, no PII
    const totalReports = await db
      .select({ count: sql<number>`count(*)` })
      .from(reports);

    const categoryBreakdown = await db
      .select({
        category: reports.category,
        count: sql<number>`count(*)`,
        avgScore: sql<number>`round(avg(${reports.score}), 1)`,
      })
      .from(reports)
      .groupBy(reports.category)
      .orderBy(sql`count(*) desc`);

    const riskDistribution = await db
      .select({
        riskLevel: reports.riskLevel,
        count: sql<number>`count(*)`,
      })
      .from(reports)
      .groupBy(reports.riskLevel);

    return NextResponse.json({
      totalChecks: totalReports[0]?.count || 0,
      categories: categoryBreakdown,
      riskDistribution,
    });
  } catch (error) {
    console.error("Stats error:", error);
    return NextResponse.json(
      { error: "Failed to fetch stats" },
      { status: 500 }
    );
  }
}
