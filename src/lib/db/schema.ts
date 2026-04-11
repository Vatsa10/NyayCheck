import { sqliteTable, text, integer, real } from "drizzle-orm/sqlite-core";

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
