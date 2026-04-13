# NyayCheck

**Know Your Legal Rights in 5 Minutes.**

A free, mobile-first legal health check and legal OS for Indian citizens. NyayCheck guides non-lawyers through simple questionnaires, delivers a personalized Legal Health Score, generates ready-to-use legal documents, finds lawyers, tracks court cases, matches government schemes, and provides instant legal Q&A — all in Hindi and English.

## Why NyayCheck?

Existing AI legal tools (SCC Online, Manupatra, VIDUR, Jhana) are built for lawyers, cost tens of thousands per year, and are English-only. **1.4 billion Indians** have no accessible way to understand their legal rights. NyayCheck fills that gap.

---

## Features

### Legal Health Check
- **7 categories**: Rent, Property, Consumer, Employment, Family, E-Commerce, Cyber Fraud
- **Guided questionnaire** — simple yes/no and multiple choice, no legal jargon
- **Legal Health Score** (0-100) with risk level (low / medium / high / critical)
- **Actionable checklist** — what to do, which law applies, urgency level

### Legal Tools
- **Emergency Helplines** — 18 Indian helplines (112, 181, 1930, 1098, etc.) with one-tap calling, filtered by category
- **Know Your Rights** — 15 shareable visual rights cards ("What To Do If Police Stops You", "Tenant Rights", etc.) with WhatsApp sharing + audio
- **Step-by-Step Guides** — 6 interactive procedure walkthroughs (How to file FIR, RTI, consumer complaint, etc.) with progress checkboxes saved locally
- **Document Templates** — 4 fill-in-the-blank legal templates (rent agreement, legal notice, RTI application, salary demand) with live preview + copy to clipboard
- **Government Scheme Matcher** — 25 curated Indian schemes + 5,000+ schemes via myScheme.gov.in category browser
- **Find a Lawyer** — web search-powered lawyer finder by case type, city, and budget with real source URLs (no fake data)
- **eCourts Case Tracker** — manual case diary with hearing timeline, upcoming hearing alerts, and eCourts.gov.in deep links
- **Nearby Legal Aid Finder** — browser geolocation → nearest DLSA, police station, consumer forum, district court via Google Maps

### Accessibility
- **Hindi + English** — full bilingual UI, questions, checklist, documents, and voice
- **Sarvam AI Voice** — Bulbul v3 TTS for Hindi/English audio read-out (browser TTS fallback)
- **WhatsApp sharing** — share scores, rights cards, documents, and schemes via wa.me deep links
- **Mobile-first** — designed for low-end Android phones over slow connections
- **Responsive nav** — desktop dropdown + full-screen mobile menu

---

## AI & Intelligence — Under the Hood

NyayCheck uses AI strategically — rule-based where possible, LLM only where it adds irreplaceable value, and web search as a live fallback.

### RAG-Powered Legal Q&A
- **19-entry legal knowledge base** stored in Turso with 64-dimensional vector embeddings
- **Hybrid search**: keyword scoring + Hindi-to-English expansion + cosine vector similarity
- **Conversation memory**: follow-up questions carry context from previous turns (stored in Turso `conversations` table with embeddings)
- **Cross-session learning**: past Q&A pairs are vector-searched to enrich answers for future users
- **Web search fallback**: when RAG confidence is below threshold, fires a DuckDuckGo search for live web context — zero hallucination, sources cited

### AI Smart Insights
- LLM analyzes the user's specific questionnaire answers (not generic advice)
- Cached in Turso after first generation — repeat views are instant, zero API calls
- On-demand (user taps "Get AI Insights") — doesn't block page load
- 10-second AbortController timeout — fails fast, never hangs

### AI Document Generation
- LLM drafts legal notices, complaints, and applications from questionnaire answers
- Cites correct Indian law sections (BNS 2023, Consumer Protection Act 2019, etc.)
- Bilingual: generates in Hindi or English based on user preference
- Stored in Turso for retrieval — same document is never re-generated

### Lawyer Search (Web-Grounded)
- Builds 6 targeted DuckDuckGo queries per search (case type + location + budget)
- Searches lawyer platforms (LawRato, VakilSearch) via `site:` operator
- LLM structures raw search results at `temperature: 0.1` (extraction, not generation)
- Every result has a source URL — users verify on the actual website
- Falls back to rule-based title/snippet parsing when LLM is rate-limited

### Vector Search & Embeddings
- 64-dimensional feature vectors computed from structured questionnaire answers
- Stored in Turso (native SQLite vector support — no extensions)
- Used for: similar case matching, conversation context retrieval, knowledge base search
- Cosine similarity computed in-app — no external embedding API needed

### Rate Limiting & Cost Control (Free Tier Safe)
- Server-side: 10 requests/minute, 120 requests/day hard cap
- Pre-flight `canMakeLLMRequest()` check before every LLM call
- Compact prompts (~40% smaller than naive approach)
- Insights cached in DB, documents cached in DB — repeat views = 0 API calls
- Web search fallback when LLM unavailable — user still gets useful answers
- Sarvam TTS: 30 req/min server-side + 5 req/min client-side, 10-min audio cache

### Rule-Based Engine (Zero AI Cost)
- Questionnaire scoring: deterministic, auditable, free
- Checklist generation: flag-based mapping from answers to actionable items
- Scheme matching: profile → scheme scoring (gender, income, caste, state, legal category)
- All 7 category question sets, 25+ checklist items, 25 government schemes — pure TypeScript data

---

## Tech Stack

| Layer | Choice |
|-------|--------|
| Framework | Next.js 15 (App Router, TypeScript) |
| Styling | Tailwind CSS 4 |
| Database | Turso (libsql cloud) with vector search |
| ORM | Drizzle ORM |
| LLM | OpenRouter (configurable free/paid model) |
| Voice | Sarvam AI Bulbul v3 (Hindi/English TTS) |
| Web Search | DuckDuckGo (no API key needed) |
| State | Zustand (persisted to localStorage) |
| Icons | Lucide React |
| Package Manager | bun |

---

## Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) 18+
- [bun](https://bun.sh/) (recommended) or npm

### Setup

```bash
# Install dependencies
bun install

# Set up environment variables
cp .env.example .env
# Edit .env with your credentials

# Push database schema to Turso
bunx drizzle-kit push

# Start dev server
bun dev

# Seed the legal knowledge base (run once)
curl -X POST http://localhost:3000/api/seed-knowledge

# Open in browser
open http://localhost:3000
```

### Environment Variables

```env
TURSO_URL=libsql://your-db.turso.io
TURSO_TOKEN=your-turso-auth-token
OPENROUTER_API_KEY=your-openrouter-key
MODEL=minimax/minimax-m2.5:free
SARVAM_API_KEY=your-sarvam-api-key
```

---

## All Pages & Routes (26 total)

### User-Facing Pages
| Route | Page | Description |
|-------|------|-------------|
| `/` | Landing | Hero, categories, tools grid, mobile menu |
| `/check` | Category Selection | 7 legal category cards |
| `/check/[category]` | Questionnaire | Guided questions with conditional branching |
| `/report/[id]` | Report | Score ring, checklist, AI insights, similar cases, schemes |
| `/ask` | Legal Q&A | Chat interface with conversation memory + web fallback |
| `/document/[id]` | Document | AI-generated legal document preview |
| `/helplines` | Helplines | 18 emergency numbers with one-tap calling |
| `/rights` | Rights Cards | 15 shareable legal rights cards |
| `/guides` | Legal Guides | 6 step-by-step procedure guides |
| `/guides/[id]` | Guide Detail | Interactive checklist with progress saving |
| `/templates` | Templates | 4 fill-in-the-blank document templates |
| `/templates/[id]` | Template Fill | Form + live preview + copy/share |
| `/schemes` | Scheme Matcher | Profile form → matched schemes + myScheme.gov.in browser |
| `/lawyers` | Lawyer Finder | Case type + location → web-searched lawyer results |
| `/cases` | Case Tracker | Case list + upcoming hearing dashboard |
| `/cases/[id]` | Case Detail | Hearing timeline + eCourts link |
| `/cases/add` | Add Case | Case entry form |
| `/nearby` | Nearby Help | 6 categories → Google Maps nearby search |

### API Routes
| Route | Method | Description |
|-------|--------|-------------|
| `/api/questionnaire` | POST/GET | Submit answers / fetch report |
| `/api/insights` | POST | AI-generated personalized insights |
| `/api/document/generate` | POST | AI legal document generation |
| `/api/search` | POST | RAG search + web fallback + conversation memory |
| `/api/similar` | POST | Vector similarity for similar cases |
| `/api/lawyers/search` | POST | Web-grounded lawyer search |
| `/api/schemes` | GET | Rule-based scheme matching |
| `/api/tts` | POST | Sarvam AI text-to-speech |
| `/api/stats` | GET | Anonymized community statistics |
| `/api/seed-knowledge` | POST | Populate legal knowledge base |

---

## Legal Categories

| Category | Questions | Key Indian Laws |
|----------|-----------|-----------------|
| Rent & Tenancy | 7 | Rent Control Acts, Registration Act 1908 |
| Property & Land | 7 | Transfer of Property Act, RERA 2016 |
| Consumer Rights | 6 | Consumer Protection Act 2019 |
| Employment & Labour | 6 | Industrial Disputes Act, EPF Act, POSH Act |
| Family & Marriage | 6 | DV Act 2005, Hindu Marriage Act, CrPC S.125 |
| E-Commerce & Online | 6 | E-Commerce Rules 2020, DPDP Act 2023 |
| Cyber Fraud & Scams | 6 | IT Act 2000, BNS S.318-320 |

---

## Architecture

```
                    ┌─────────────────────────────────┐
                    │         Landing Page             │
                    │   Legal Check  |  Tools Menu     │
                    └──────────┬──────────────────────┘
                               │
          ┌────────────────────┼────────────────────┐
          ▼                    ▼                     ▼
   ┌─────────────┐    ┌──────────────┐     ┌──────────────┐
   │ Legal Check  │    │   Ask Q&A    │     │  Legal Tools  │
   │ Questionnaire│    │ (Chat + RAG) │     │  8 tools      │
   └──────┬──────┘    └──────┬───────┘     └──────────────┘
          │                   │
          ▼                   ▼
   ┌─────────────┐    ┌──────────────┐
   │   Report     │    │  Knowledge   │──→ Web Search
   │ Score + List │    │  Base (RAG)  │    Fallback
   └──────┬──────┘    └──────────────┘
          │
   ┌──────┼──────────────┐
   ▼      ▼              ▼
 AI     Similar     Gov Scheme
Insights  Cases      Matcher
(LLM)  (Vector)    (Rule-based)
```

**Data flow:**
- Questionnaire → rule-based scoring → report + checklist
- Report → vector embedding stored in Turso → similar case matching
- Q&A → RAG knowledge base (19 entries, vector search) → LLM answer → web fallback if RAG insufficient
- Conversation turns stored with embeddings → cross-session context learning
- Lawyer search → DuckDuckGo multi-query → LLM structuring (extraction only)
- Scheme matching → profile + legal context → rule-based scoring → 25 curated + 5,000+ via myScheme

---

## Disclaimer

NyayCheck provides legal awareness, not legal advice. Always consult a qualified lawyer for your specific situation. AI-generated documents are drafts and must be reviewed by a legal professional before use.
