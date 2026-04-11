import { drizzle } from "drizzle-orm/better-sqlite3";
import Database from "better-sqlite3";
import * as schema from "./schema";
import path from "path";
import fs from "fs";

const dataDir = path.join(process.cwd(), "data");
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

const dbPath = path.join(dataDir, "nyaycheck.db");
const sqlite = new Database(dbPath);
sqlite.pragma("journal_mode = WAL");

// Auto-create tables if they don't exist
sqlite.exec(`
  CREATE TABLE IF NOT EXISTS sessions (
    id text PRIMARY KEY NOT NULL,
    created_at integer NOT NULL,
    language text DEFAULT 'en' NOT NULL,
    category text NOT NULL,
    answers text NOT NULL,
    completed integer DEFAULT 0
  );
  CREATE TABLE IF NOT EXISTS reports (
    id text PRIMARY KEY NOT NULL,
    session_id text NOT NULL,
    created_at integer NOT NULL,
    category text NOT NULL,
    score real NOT NULL,
    risk_level text NOT NULL,
    checklist text NOT NULL,
    summary text NOT NULL,
    language text NOT NULL,
    FOREIGN KEY (session_id) REFERENCES sessions(id)
  );
  CREATE TABLE IF NOT EXISTS documents (
    id text PRIMARY KEY NOT NULL,
    report_id text NOT NULL,
    created_at integer NOT NULL,
    type text NOT NULL,
    title text NOT NULL,
    content_html text NOT NULL,
    content_text text NOT NULL,
    language text NOT NULL,
    pdf_generated integer DEFAULT 0,
    FOREIGN KEY (report_id) REFERENCES reports(id)
  );
`);

export const db = drizzle(sqlite, { schema });
