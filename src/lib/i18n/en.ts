export const en = {
  app: {
    name: "NyayCheck",
    tagline: "Know Your Legal Rights in 5 Minutes",
    description:
      "Free legal health check for every Indian. Get a personalized score, actionable checklist, and ready-to-use legal documents in Hindi & English.",
  },
  landing: {
    hero: {
      title: "Your Legal Health, Simplified",
      subtitle:
        "Answer a few simple questions. Get a clear picture of your legal standing — and what to do next.",
      cta: "Start Free Check",
    },
    howItWorks: {
      title: "How It Works",
      step1: { title: "Pick Your Situation", desc: "Choose from rent, property, consumer, employment, family, or more." },
      step2: { title: "Answer Questions", desc: "Simple yes/no and multiple choice — no legal jargon." },
      step3: { title: "Get Your Report", desc: "Legal health score, checklist, and ready-to-use documents." },
    },
    categories: {
      title: "What Can We Help With?",
    },
  },
  check: {
    selectCategory: "What is your situation about?",
    next: "Next",
    back: "Back",
    submit: "Get My Report",
    progress: "Question {{current}} of {{total}}",
  },
  report: {
    title: "Your Legal Health Report",
    score: "Legal Health Score",
    riskLevel: {
      low: "Low Risk",
      medium: "Moderate Risk",
      high: "High Risk",
      critical: "Critical — Act Now",
    },
    checklist: "What You Should Do",
    generateDoc: "Generate Document",
    share: "Share on WhatsApp",
    listen: "Listen",
    download: "Download PDF",
  },
  common: {
    yes: "Yes",
    no: "No",
    loading: "Loading...",
    error: "Something went wrong",
    retry: "Try Again",
    language: "Language",
  },
} as const;
