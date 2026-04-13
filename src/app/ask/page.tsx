"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import {
  Scale,
  Search,
  ArrowLeft,
  BookOpen,
  Sparkles,
  Loader2,
  User,
  Trash2,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AudioButton } from "@/components/ui/audio-button";
import { LanguageToggle } from "@/components/ui/language-toggle";
import { useLanguage } from "@/hooks/use-language";

interface SearchResult {
  id: string;
  category: string;
  title: string;
  content: string;
  applicableActs: string;
  score: number;
}

interface ConversationTurn {
  query: string;
  answer: string;
  results: SearchResult[];
}

const SUGGESTED_QUESTIONS = {
  en: [
    "How do I file a consumer complaint?",
    "What are my rights if my landlord won't return my deposit?",
    "How to report UPI fraud?",
    "Can I get free legal aid in India?",
    "How to send a legal notice?",
    "What is RERA and how does it protect homebuyers?",
  ],
  hi: [
    "उपभोक्ता शिकायत कैसे दर्ज करें?",
    "मकान मालिक जमा राशि नहीं लौटा रहा तो क्या करें?",
    "UPI धोखाधड़ी की रिपोर्ट कैसे करें?",
    "भारत में मुफ्त कानूनी सहायता कैसे मिलेगी?",
    "कानूनी नोटिस कैसे भेजें?",
    "RERA क्या है और गृह खरीदारों की कैसे रक्षा करता है?",
  ],
};

// Stable session key per browser tab — survives re-renders, not page refreshes
function getSessionKey(): string {
  if (typeof window === "undefined") return "";
  let key = sessionStorage.getItem("nyaycheck-ask-session");
  if (!key) {
    key = `ask-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
    sessionStorage.setItem("nyaycheck-ask-session", key);
  }
  return key;
}

export default function AskPage() {
  const language = useLanguage((s) => s.language);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [conversation, setConversation] = useState<ConversationTurn[]>([]);
  const bottomRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages appear
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [conversation, loading]);

  async function handleSearch(searchQuery?: string) {
    const q = searchQuery || query;
    if (!q.trim()) return;

    setLoading(true);
    setQuery("");

    try {
      const res = await fetch("/api/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query: q,
          language,
          sessionKey: getSessionKey(),
          // Send last 3 turns as conversation history
          history: conversation.slice(-3).map((t) => ({
            query: t.query,
            answer: t.answer,
          })),
        }),
      });
      const data = await res.json();

      setConversation((prev) => [
        ...prev,
        {
          query: q,
          answer: data.answer || "",
          results: data.results || [],
        },
      ]);
    } catch {
      setConversation((prev) => [
        ...prev,
        {
          query: q,
          answer:
            language === "hi"
              ? "खोज में त्रुटि हुई। कृपया दोबारा कोशिश करें।"
              : "Search failed. Please try again.",
          results: [],
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  function clearConversation() {
    setConversation([]);
    sessionStorage.removeItem("nyaycheck-ask-session");
  }

  const hasConversation = conversation.length > 0;

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-100/80">
        <div className="max-w-4xl mx-auto px-5 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="p-1 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-muted" />
            </Link>
            <div className="flex items-center gap-2">
              <Scale className="w-5 h-5 text-primary" />
              <span className="font-semibold text-[15px] tracking-tight">
                NyayCheck
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {hasConversation && (
              <button
                onClick={clearConversation}
                className="p-1.5 rounded-lg text-muted hover:text-red-500 hover:bg-red-50 transition-colors"
                title={language === "hi" ? "बातचीत मिटाएं" : "Clear chat"}
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
            <LanguageToggle />
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-2xl w-full mx-auto px-5 pt-20 pb-24 flex flex-col">
        {/* Empty state */}
        {!hasConversation && !loading && (
          <div className="flex-1 flex flex-col items-center justify-center">
            <div className="text-center mb-8">
              <div className="w-14 h-14 rounded-2xl bg-purple-50 flex items-center justify-center mx-auto mb-4">
                <BookOpen className="w-7 h-7 text-purple-600" />
              </div>
              <h1 className="text-2xl font-bold tracking-tight mb-2">
                {language === "hi"
                  ? "कानूनी सवाल पूछें"
                  : "Ask a Legal Question"}
              </h1>
              <p className="text-muted text-sm">
                {language === "hi"
                  ? "सवाल पूछें, फिर फॉलो-अप करें — AI संदर्भ याद रखता है"
                  : "Ask a question, then follow up — AI remembers the context"}
              </p>
            </div>

            <div className="w-full">
              <p className="text-sm text-muted mb-3 font-medium">
                {language === "hi"
                  ? "सुझाए गए प्रश्न:"
                  : "Suggested questions:"}
              </p>
              <div className="flex flex-wrap gap-2">
                {SUGGESTED_QUESTIONS[language].map((q, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      setQuery(q);
                      handleSearch(q);
                    }}
                    className="text-sm px-3 py-1.5 rounded-full border border-gray-200 hover:border-primary hover:text-primary transition-colors text-left"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Conversation thread */}
        {hasConversation && (
          <div className="flex-1 space-y-5 mb-4">
            {conversation.map((turn, idx) => (
              <div key={idx} className="space-y-3">
                {/* User message */}
                <div className="flex gap-2.5 justify-end">
                  <div className="bg-primary text-white rounded-2xl rounded-tr-md px-4 py-2.5 max-w-[80%]">
                    <p className="text-sm">{turn.query}</p>
                  </div>
                  <div className="w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
                    <User className="w-3.5 h-3.5 text-muted" />
                  </div>
                </div>

                {/* AI answer */}
                <div className="flex gap-2.5">
                  <div className="w-7 h-7 rounded-full bg-purple-50 flex items-center justify-center flex-shrink-0">
                    <Sparkles className="w-3.5 h-3.5 text-purple-600" />
                  </div>
                  <div className="flex-1 max-w-[85%]">
                    <Card>
                      <CardContent className="py-3">
                        <p className="text-sm leading-relaxed whitespace-pre-line">
                          {turn.answer}
                        </p>
                        <div className="mt-2">
                          <AudioButton text={turn.answer} />
                        </div>
                      </CardContent>
                    </Card>

                    {/* Knowledge results (collapsed) */}
                    {turn.results.length > 0 && (
                      <details className="mt-2">
                        <summary className="text-xs text-muted cursor-pointer hover:text-primary">
                          {language === "hi"
                            ? `${turn.results.length} संबंधित स्रोत`
                            : `${turn.results.length} related sources`}
                        </summary>
                        <div className="mt-2 space-y-1.5">
                          {turn.results.map((r) => (
                            <div
                              key={r.id}
                              className="p-2.5 rounded-lg bg-gray-50 text-xs"
                            >
                              <div className="flex items-center gap-1.5 mb-0.5">
                                <span className="font-semibold">
                                  {r.title}
                                </span>
                                <Badge variant="default">{r.category}</Badge>
                              </div>
                              <p className="text-muted line-clamp-2">
                                {r.content}
                              </p>
                              <p className="text-primary font-medium mt-0.5">
                                {r.applicableActs}
                              </p>
                            </div>
                          ))}
                        </div>
                      </details>
                    )}
                  </div>
                </div>
              </div>
            ))}

            {/* Loading indicator */}
            {loading && (
              <div className="flex gap-2.5">
                <div className="w-7 h-7 rounded-full bg-purple-50 flex items-center justify-center flex-shrink-0">
                  <Loader2 className="w-3.5 h-3.5 text-purple-600 animate-spin" />
                </div>
                <div className="bg-gray-50 rounded-2xl rounded-tl-md px-4 py-2.5">
                  <p className="text-sm text-muted">
                    {language === "hi" ? "सोच रहा हूं..." : "Thinking..."}
                  </p>
                </div>
              </div>
            )}

            <div ref={bottomRef} />
          </div>
        )}

        {/* Follow-up hint */}
        {hasConversation && !loading && (
          <p className="text-xs text-center text-muted/60 mb-2">
            {language === "hi"
              ? "फॉलो-अप सवाल पूछें — AI पिछली बातचीत याद रखता है"
              : "Ask a follow-up — AI remembers the conversation"}
          </p>
        )}
      </main>

      {/* Fixed input at bottom */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-lg border-t border-gray-100 p-4">
        <div className="max-w-2xl mx-auto relative">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            placeholder={
              hasConversation
                ? language === "hi"
                  ? "फॉलो-अप सवाल पूछें..."
                  : "Ask a follow-up question..."
                : language === "hi"
                  ? "अपना कानूनी सवाल टाइप करें..."
                  : "Type your legal question..."
            }
            className="w-full p-3.5 pr-14 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none text-sm transition-all"
          />
          <button
            onClick={() => handleSearch()}
            disabled={loading || !query.trim()}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-lg bg-primary text-white hover:bg-primary-light disabled:opacity-50 transition-colors active:scale-[0.95]"
          >
            {loading ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Search className="w-4 h-4" />
            )}
          </button>
        </div>

        <p className="text-[10px] text-center text-muted/50 mt-1.5">
          {language === "hi"
            ? "कानूनी सलाह नहीं। वकील से परामर्श करें।"
            : "Not legal advice. Consult a lawyer."}
        </p>
      </div>
    </div>
  );
}
