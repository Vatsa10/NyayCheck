"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Scale,
  Search,
  ArrowLeft,
  BookOpen,
  Sparkles,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AudioButton } from "@/components/ui/audio-button";
import { LanguageToggle } from "@/components/ui/language-toggle";
import { useStrings, useLanguage } from "@/hooks/use-language";

interface SearchResult {
  id: string;
  category: string;
  title: string;
  content: string;
  applicableActs: string;
  score: number;
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

export default function AskPage() {
  const strings = useStrings();
  const language = useLanguage((s) => s.language);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<SearchResult[]>([]);
  const [answer, setAnswer] = useState("");
  const [hasSearched, setHasSearched] = useState(false);

  async function handleSearch(searchQuery?: string) {
    const q = searchQuery || query;
    if (!q.trim()) return;

    setLoading(true);
    setHasSearched(true);
    setResults([]);
    setAnswer("");

    try {
      const res = await fetch("/api/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: q, language }),
      });
      const data = await res.json();
      setResults(data.results || []);
      setAnswer(data.answer || "");
    } catch {
      setAnswer(
        language === "hi"
          ? "खोज में त्रुटि हुई। कृपया दोबारा कोशिश करें।"
          : "Search failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="p-1 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-muted" />
            </Link>
            <div className="flex items-center gap-2">
              <Scale className="w-5 h-5 text-primary" />
              <span className="font-bold text-primary">{strings.app.name}</span>
            </div>
          </div>
          <LanguageToggle />
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <div className="w-14 h-14 rounded-2xl bg-purple-100 flex items-center justify-center mx-auto mb-4">
            <BookOpen className="w-7 h-7 text-purple-600" />
          </div>
          <h1 className="text-2xl font-bold mb-2">
            {language === "hi"
              ? "कानूनी सवाल पूछें"
              : "Ask a Legal Question"}
          </h1>
          <p className="text-muted">
            {language === "hi"
              ? "भारतीय कानून के बारे में सरल भाषा में जवाब पाएं"
              : "Get plain-language answers about Indian law"}
          </p>
        </div>

        {/* Search Input */}
        <div className="relative mb-6">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            placeholder={
              language === "hi"
                ? "अपना कानूनी सवाल टाइप करें..."
                : "Type your legal question..."
            }
            className="w-full p-4 pr-14 rounded-2xl border-2 border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-base"
          />
          <button
            onClick={() => handleSearch()}
            disabled={loading || !query.trim()}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-xl bg-primary text-white hover:bg-primary-light disabled:opacity-50 transition-colors"
          >
            {loading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <Search className="w-5 h-5" />
            )}
          </button>
        </div>

        {/* Suggested Questions */}
        {!hasSearched && (
          <div className="mb-8">
            <p className="text-sm text-muted mb-3 font-medium">
              {language === "hi" ? "सुझाए गए प्रश्न:" : "Suggested questions:"}
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
        )}

        {/* AI Answer */}
        {answer && (
          <Card className="mb-6">
            <CardContent className="py-5">
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="w-4 h-4 text-purple-600" />
                <span className="text-sm font-semibold text-purple-600">
                  {language === "hi" ? "AI उत्तर" : "AI Answer"}
                </span>
              </div>
              <p className="text-base leading-relaxed whitespace-pre-line">
                {answer}
              </p>
              <div className="mt-3">
                <AudioButton text={answer} />
              </div>
              <p className="text-xs text-muted mt-3 italic">
                {language === "hi"
                  ? "* यह कानूनी सलाह नहीं है। कृपया वकील से परामर्श करें।"
                  : "* This is not legal advice. Please consult a lawyer."}
              </p>
            </CardContent>
          </Card>
        )}

        {/* Knowledge Results */}
        {results.length > 0 && (
          <div>
            <h2 className="text-lg font-semibold mb-3">
              {language === "hi" ? "संबंधित कानूनी जानकारी" : "Related Legal Knowledge"}
            </h2>
            <div className="space-y-3">
              {results.map((result) => (
                <Card key={result.id}>
                  <CardContent className="py-4">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h3 className="font-semibold text-sm">{result.title}</h3>
                      <Badge variant="default">{result.category}</Badge>
                    </div>
                    <p className="text-sm text-muted leading-relaxed line-clamp-3">
                      {result.content}
                    </p>
                    <p className="text-xs text-primary font-medium mt-2">
                      {result.applicableActs}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* No Results */}
        {hasSearched && !loading && results.length === 0 && !answer && (
          <div className="text-center py-12">
            <p className="text-muted">
              {language === "hi"
                ? "कोई परिणाम नहीं मिला। कृपया अलग शब्दों में पूछें।"
                : "No results found. Try different keywords."}
            </p>
          </div>
        )}

        {/* CTA */}
        <div className="mt-8 text-center">
          <p className="text-sm text-muted mb-3">
            {language === "hi"
              ? "अपनी कानूनी स्थिति का विस्तृत विश्लेषण चाहते हैं?"
              : "Want a detailed analysis of your legal situation?"}
          </p>
          <Link href="/check">
            <Button>
              {language === "hi"
                ? "मुफ्त कानूनी जांच करें"
                : "Take the Free Legal Check"}
            </Button>
          </Link>
        </div>
      </main>
    </div>
  );
}
