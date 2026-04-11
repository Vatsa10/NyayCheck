# NyayCheck

**Know Your Legal Rights in 5 Minutes.**

A free, mobile-first legal health check for Indian citizens. NyayCheck guides non-lawyers through simple questionnaires, delivers a personalized Legal Health Score with an actionable checklist, and generates ready-to-use legal documents — all in Hindi and English.

## Why NyayCheck?

Existing AI legal tools (SCC Online, Manupatra, VIDUR, Jhana) are built for lawyers, cost tens of thousands per year, and are English-only. **1.4 billion Indians** have no accessible way to understand their legal rights. NyayCheck fills that gap.

## Features

### Legal Health Check

- **7 categories**: Rent, Property, Consumer, Employment, Family, E-Commerce, Cyber Fraud
- **Guided questionnaire** — simple yes/no and multiple choice, no legal jargon
- **Legal Health Score** (0-100) with risk level (low / medium / high / critical)
- **Actionable checklist** — what to do, which law applies, urgency level

### AI-Powered

- **Smart Insights** — personalized AI analysis of your specific situation (not generic tips)
- **Document Generation** — AI-drafted legal notices, complaints, and applications with correct Indian law citations
- **Legal Q&A** — ask questions about Indian law in plain language, get RAG-powered answers from a curated knowledge base (19 entries covering rent, property, consumer, employment, family, e-commerce, cyber fraud)
- **Similar Cases** — see anonymized community data ("X people had similar situations")

### Accessibility

- **Hindi + English** — full bilingual UI, questions, checklist, and documents
- **Audio read-out** — browser TTS for non-readers
- **WhatsApp sharing** — share your score and documents via wa.me deep links
- **Mobile-first** — designed for low-end Android phones over slow connections

## Tech Stack

| Layer           | Choice                                  |
| --------------- | --------------------------------------- |
| Framework       | Next.js 15 (App Router, TypeScript)     |
| Styling         | Tailwind CSS 4                          |
| Database        | Turso (libsql cloud) with vector search |
| ORM             | Drizzle ORM                             |
| LLM             | OpenRouter (configurable model)         |
| State           | Zustand                                 |
| Icons           | Lucide React                            |
| Package Manager | bun                                     |

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
# Edit .env with your Turso and OpenRouter credentials

# Push database schema to Turso
bunx drizzle-kit push

# Seed the legal knowledge base
# (start dev server first, then hit the seed endpoint)
bun dev
curl -X POST http://localhost:3000/api/seed-knowledge

# Open in browser
open http://localhost:3000
```

### Environment Variables

```env
TURSO_URL=libsql://your-db.turso.io
TURSO_TOKEN=your-turso-auth-token
OPENROUTER_API_KEY=your-openrouter-key
MODEL=google/gemma-4-31b-it:free
```

## Project Structure

```
src/
  app/                    # Next.js App Router pages + API routes
    page.tsx              # Landing page
    check/                # Category selection + questionnaire
    report/[id]/          # Score + checklist + AI insights
    document/[id]/        # AI document generation + preview
    ask/                  # Legal Q&A search page
    api/
      questionnaire/      # POST: submit answers, GET: fetch report
      insights/           # POST: AI-generated personalized insights
      document/generate/  # POST: AI legal document generation
      search/             # POST: RAG-powered legal Q&A
      similar/            # POST: vector similarity for similar cases
      stats/              # GET: anonymized community stats
      seed-knowledge/     # POST: populate legal knowledge base
  components/
    ui/                   # Button, Card, ScoreRing, RadioGroup, etc.
    questionnaire/        # CategoryGrid, QuestionFlow, AnswerInput
    report/               # AIInsights, SimilarCases
  lib/
    db/                   # Drizzle schema + Turso connection
    engine/               # Evaluator, flow resolver, checklist mapper, embeddings
    legal/                # Categories, question sets (7), knowledge base (19 entries)
    llm/                  # OpenRouter client, prompts, insight + document generation
    i18n/                 # English + Hindi string files
    utils/                # WhatsApp share, TTS, formatting
  hooks/                  # useLanguage, useQuestionnaire, useTTS
  types/                  # TypeScript type definitions
```

## Architecture

```
User Flow:
Landing -> Pick Category -> Answer 5-7 Questions -> Legal Health Score + Checklist
                                                        |
                                              AI Insights (LLM)
                                              Similar Cases (Vector Search)
                                              Generate Document (LLM)
                                              Share on WhatsApp
                                              Audio Read-Out (TTS)

Separate Flow:
Ask Page -> Type Question -> RAG Search (Knowledge Base) -> AI Answer (LLM)
```

**Questionnaire engine** is fully rule-based (deterministic, free, fast). LLM is used only for AI insights, document generation, and Q&A answers.

**Vector search** uses 64-dimensional feature embeddings computed from structured answer data. Embeddings are stored in Turso and compared using cosine similarity for finding similar cases.

## Legal Categories

| Category            | Questions | Key Indian Laws                             |
| ------------------- | --------- | ------------------------------------------- |
| Rent & Tenancy      | 7         | Rent Control Acts, Registration Act 1908    |
| Property & Land     | 7         | Transfer of Property Act, RERA 2016         |
| Consumer Rights     | 6         | Consumer Protection Act 2019                |
| Employment & Labour | 6         | Industrial Disputes Act, EPF Act, POSH Act  |
| Family & Marriage   | 6         | DV Act 2005, Hindu Marriage Act, CrPC S.125 |
| E-Commerce & Online | 6         | E-Commerce Rules 2020, DPDP Act 2023        |
| Cyber Fraud & Scams | 6         | IT Act 2000, BNS S.318-320                  |

## Disclaimer

NyayCheck provides legal awareness, not legal advice. Always consult a qualified lawyer for your specific situation. AI-generated documents are drafts and must be reviewed by a legal professional before use.
