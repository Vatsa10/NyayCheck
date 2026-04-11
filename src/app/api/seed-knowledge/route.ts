import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { legalKnowledge } from "@/lib/db/schema";
import { knowledgeBase } from "@/lib/legal/knowledge-base";
import { generateKnowledgeEmbedding } from "@/lib/engine/embeddings";
import { sql } from "drizzle-orm";

export async function POST() {
  try {
    // Clear existing knowledge
    await db.delete(legalKnowledge).where(sql`1=1`);

    // Insert all knowledge entries with embeddings
    for (const entry of knowledgeBase) {
      const embedding = generateKnowledgeEmbedding(
        entry.category,
        entry.keywords
      );

      await db.insert(legalKnowledge).values({
        id: entry.id,
        category: entry.category,
        title: entry.title,
        titleHi: entry.titleHi,
        content: entry.content,
        contentHi: entry.contentHi,
        applicableActs: entry.applicableActs,
        keywords: entry.keywords,
        embedding: JSON.stringify(embedding),
      });
    }

    return NextResponse.json({
      success: true,
      count: knowledgeBase.length,
      message: `Seeded ${knowledgeBase.length} legal knowledge entries with embeddings`,
    });
  } catch (error) {
    console.error("Seed error:", error);
    return NextResponse.json(
      { error: "Failed to seed knowledge base" },
      { status: 500 }
    );
  }
}
