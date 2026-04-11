import { NextRequest, NextResponse } from "next/server";
import { nanoid } from "nanoid";
import { eq } from "drizzle-orm";
import { db } from "@/lib/db";
import { reports, sessions, documents } from "@/lib/db/schema";
import { generateDocument } from "@/lib/llm/generate-document";
import type { Language, ChecklistItem } from "@/types";

export async function POST(request: NextRequest) {
  try {
    const { reportId, documentType, language } = await request.json();

    if (!reportId || !documentType) {
      return NextResponse.json(
        { error: "Missing reportId or documentType" },
        { status: 400 }
      );
    }

    // Fetch report
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

    // Fetch session for answers
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
    const lang = (language || report.language || "en") as Language;

    const doc = await generateDocument({
      documentType,
      category: report.category,
      answers,
      checklist,
      language: lang,
    });

    if (!doc) {
      return NextResponse.json(
        { error: "Failed to generate document" },
        { status: 500 }
      );
    }

    // Save to Turso
    const docId = nanoid(10);
    await db.insert(documents).values({
      id: docId,
      reportId,
      createdAt: new Date(),
      type: documentType,
      title: doc.title,
      contentHtml: doc.contentHtml,
      contentText: doc.contentText,
      language: lang,
    });

    return NextResponse.json({
      documentId: docId,
      title: doc.title,
      contentHtml: doc.contentHtml,
      contentText: doc.contentText,
    });
  } catch (error) {
    console.error("Document generation error:", error);
    return NextResponse.json(
      { error: "Failed to generate document" },
      { status: 500 }
    );
  }
}
