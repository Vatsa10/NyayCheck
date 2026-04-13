import {
  sqliteTable,
  text,
  integer,
  real,
} from "drizzle-orm/sqlite-core";

export const sessions = sqliteTable("sessions", {
  id: text("id").primaryKey(),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
  language: text("language").notNull().default("en"),
  category: text("category").notNull(),
  answers: text("answers").notNull(), // JSON stringified
  completed: integer("completed", { mode: "boolean" }).default(false),
});

export const reports = sqliteTable("reports", {
  id: text("id").primaryKey(),
  sessionId: text("session_id")
    .notNull()
    .references(() => sessions.id),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
  category: text("category").notNull(),
  score: real("score").notNull(),
  riskLevel: text("risk_level").notNull(),
  checklist: text("checklist").notNull(), // JSON stringified ChecklistItem[]
  summary: text("summary").notNull(),
  language: text("language").notNull(),
  aiInsights: text("ai_insights"), // JSON: AI-generated personalized insights
  embedding: text("embedding"), // JSON float array for vector search (computed from answers)
});

export const documents = sqliteTable("documents", {
  id: text("id").primaryKey(),
  reportId: text("report_id")
    .notNull()
    .references(() => reports.id),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
  type: text("type").notNull(), // "legal_notice" | "complaint" | "application"
  title: text("title").notNull(),
  contentHtml: text("content_html").notNull(),
  contentText: text("content_text").notNull(),
  language: text("language").notNull(),
  pdfGenerated: integer("pdf_generated", { mode: "boolean" }).default(false),
});

// ── Conversation Memory for Q&A follow-ups ──
// Stores Q&A turns so follow-up questions have context + vector for similarity
export const conversations = sqliteTable("conversations", {
  id: text("id").primaryKey(),
  sessionKey: text("session_key").notNull(), // client-generated session ID (per browser tab)
  createdAt: integer("created_at", { mode: "timestamp" }).notNull(),
  query: text("query").notNull(),
  answer: text("answer").notNull(),
  category: text("category"), // detected topic category
  language: text("language").notNull().default("en"),
  embedding: text("embedding"), // JSON float array for vector similarity across sessions
});

// ── Legal Knowledge Base for RAG ──
// Pre-populated with Indian legal knowledge chunks, each with a vector embedding
export const legalKnowledge = sqliteTable("legal_knowledge", {
  id: text("id").primaryKey(),
  category: text("category").notNull(), // rent, property, consumer, etc.
  title: text("title").notNull(),
  titleHi: text("title_hi").notNull(),
  content: text("content").notNull(), // Detailed explanation in English
  contentHi: text("content_hi").notNull(), // Hindi version
  applicableActs: text("applicable_acts").notNull(), // Comma-separated acts
  keywords: text("keywords").notNull(), // Comma-separated search keywords
  embedding: text("embedding"), // JSON float array for vector similarity search
});
