"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Scale,
  ArrowLeft,
  Search,
  MapPin,
  ExternalLink,
  Loader2,
  UserCheck,
  Phone,
  Star,
  Briefcase,
  AlertTriangle,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { RadioGroup } from "@/components/ui/radio-group";
import { LanguageToggle } from "@/components/ui/language-toggle";
import { useLanguage } from "@/hooks/use-language";

interface LawyerResult {
  name: string;
  specialization: string;
  location: string;
  phone?: string;
  address?: string;
  experience?: string;
  rating?: string;
  sourceUrl: string;
  sourceName: string;
}

interface SearchSource {
  title: string;
  url: string;
  source: string;
}

const CASE_TYPES = [
  { value: "rent", en: "Rent & Tenancy", hi: "किराया और किरायेदारी" },
  { value: "property", en: "Property & Land", hi: "संपत्ति और भूमि" },
  { value: "consumer", en: "Consumer Rights", hi: "उपभोक्ता अधिकार" },
  { value: "employment", en: "Employment & Labour", hi: "रोज़गार और श्रम" },
  { value: "family", en: "Family & Divorce", hi: "परिवार और तलाक" },
  { value: "cyber-fraud", en: "Cyber Crime", hi: "साइबर अपराध" },
  { value: "other", en: "Other / General", hi: "अन्य / सामान्य" },
];

const BUDGET_OPTIONS = [
  { value: "free", en: "Free Legal Aid", hi: "मुफ्त कानूनी सहायता" },
  { value: "low", en: "Under ₹5,000", hi: "₹5,000 से कम" },
  { value: "medium", en: "₹5,000 - ₹25,000", hi: "₹5,000 - ₹25,000" },
  { value: "high", en: "Above ₹25,000", hi: "₹25,000 से ऊपर" },
];

export default function LawyersPage() {
  const language = useLanguage((s) => s.language);
  const [caseType, setCaseType] = useState("");
  const [customCaseType, setCustomCaseType] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [budget, setBudget] = useState("");
  const [loading, setLoading] = useState(false);
  const [lawyers, setLawyers] = useState<LawyerResult[]>([]);
  const [sources, setSources] = useState<SearchSource[]>([]);
  const [searched, setSearched] = useState(false);
  const [detectingLocation, setDetectingLocation] = useState(false);

  // Auto-detect location on mount
  useEffect(() => {
    if ("geolocation" in navigator) {
      setDetectingLocation(true);
      navigator.geolocation.getCurrentPosition(
        async (pos) => {
          try {
            // Reverse geocode using free API
            const resp = await fetch(
              `https://nominatim.openstreetmap.org/reverse?lat=${pos.coords.latitude}&lon=${pos.coords.longitude}&format=json&addressdetails=1`,
              { headers: { "User-Agent": "NyayCheck/1.0" } }
            );
            if (resp.ok) {
              const data = await resp.json();
              const addr = data.address || {};
              setCity(
                addr.city ||
                  addr.town ||
                  addr.village ||
                  addr.county ||
                  ""
              );
              setState(addr.state || "");
            }
          } catch { /* ignore */ }
          setDetectingLocation(false);
        },
        () => setDetectingLocation(false),
        { timeout: 5000 }
      );
    }
  }, []);

  async function handleSearch() {
    if (!caseType) return;
    if (caseType === "other" && !customCaseType.trim()) return;
    setLoading(true);
    setSearched(true);
    setLawyers([]);
    setSources([]);

    try {
      const res = await fetch("/api/lawyers/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          caseType: caseType === "other" ? "other" : caseType,
          customCaseType: caseType === "other" ? customCaseType.trim() : undefined,
          city,
          state,
          budget,
          language,
        }),
      });
      const data = await res.json();
      setLawyers(data.lawyers || []);
      setSources(data.sources || []);
    } catch {
      // fail silently
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-white">
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
          <LanguageToggle />
        </div>
      </header>

      <main className="max-w-xl mx-auto px-5 pt-24 pb-12">
        <div className="mb-6 animate-fade-up delay-0">
          <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center mb-3">
            <UserCheck className="w-6 h-6 text-blue-600" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight">
            {language === "hi" ? "वकील खोजें" : "Find a Lawyer"}
          </h1>
          <p className="text-sm text-muted mt-1">
            {language === "hi"
              ? "वास्तविक वेब डेटा से — कोई नकली सुझाव नहीं"
              : "From real web data — no fake suggestions"}
          </p>
        </div>

        {!searched ? (
          <div className="space-y-5 animate-fade-up delay-1">
            {/* Case Type */}
            <div>
              <label className="block text-sm font-semibold mb-2">
                {language === "hi"
                  ? "किस तरह का केस है?"
                  : "What type of case?"}
              </label>
              <RadioGroup
                name="caseType"
                options={CASE_TYPES.map((ct) => ({
                  value: ct.value,
                  label: language === "hi" ? ct.hi : ct.en,
                }))}
                value={caseType}
                onChange={(v) => {
                  setCaseType(v);
                  if (v !== "other") setCustomCaseType("");
                }}
              />
              {caseType === "other" && (
                <input
                  type="text"
                  value={customCaseType}
                  onChange={(e) => setCustomCaseType(e.target.value)}
                  placeholder={
                    language === "hi"
                      ? "अपना केस प्रकार लिखें... जैसे चेक बाउंस, बीमा विवाद"
                      : "Describe your case... e.g. cheque bounce, insurance dispute"
                  }
                  className="w-full mt-3 p-3 rounded-xl border-2 border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none text-sm"
                />
              )}
            </div>

            {/* Location */}
            <div>
              <label className="block text-sm font-semibold mb-2">
                <MapPin className="w-4 h-4 inline mr-1" />
                {language === "hi" ? "आपका शहर" : "Your City"}
                {detectingLocation && (
                  <span className="text-xs text-muted ml-2 font-normal">
                    <Loader2 className="w-3 h-3 inline animate-spin mr-1" />
                    {language === "hi" ? "पता लगा रहे..." : "Detecting..."}
                  </span>
                )}
              </label>
              <div className="grid grid-cols-2 gap-3">
                <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder={language === "hi" ? "शहर" : "City"}
                  className="w-full p-3 rounded-xl border-2 border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none text-sm"
                />
                <input
                  type="text"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  placeholder={language === "hi" ? "राज्य" : "State"}
                  className="w-full p-3 rounded-xl border-2 border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none text-sm"
                />
              </div>
            </div>

            {/* Budget */}
            <div>
              <label className="block text-sm font-semibold mb-2">
                {language === "hi" ? "बजट" : "Budget"}
                <span className="text-xs text-muted font-normal ml-1">
                  ({language === "hi" ? "वैकल्पिक" : "optional"})
                </span>
              </label>
              <RadioGroup
                name="budget"
                options={BUDGET_OPTIONS.map((b) => ({
                  value: b.value,
                  label: language === "hi" ? b.hi : b.en,
                }))}
                value={budget}
                onChange={setBudget}
              />
            </div>

            <Button
              onClick={handleSearch}
              disabled={!caseType}
              className="w-full"
              size="lg"
            >
              <Search className="w-4 h-4" />
              {language === "hi" ? "वकील खोजें" : "Search Lawyers"}
            </Button>

            {/* Free legal aid hint */}
            <Link href="/helplines">
              <div className="p-3 bg-emerald-50 rounded-xl text-sm text-emerald-800 flex items-start gap-2 cursor-pointer hover:bg-emerald-100 transition-colors">
                <Phone className="w-4 h-4 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium">
                    {language === "hi"
                      ? "मुफ्त कानूनी सहायता चाहिए?"
                      : "Need free legal aid?"}
                  </p>
                  <p className="text-xs opacity-80">
                    {language === "hi"
                      ? "NALSA हेल्पलाइन 15100 पर कॉल करें"
                      : "Call NALSA helpline 15100"}
                  </p>
                </div>
              </div>
            </Link>
          </div>
        ) : (
          <div>
            {/* Back to search */}
            <button
              onClick={() => {
                setSearched(false);
                setLawyers([]);
              }}
              className="text-xs text-primary hover:underline mb-4 inline-block"
            >
              {language === "hi" ? "← खोज बदलें" : "← Change search"}
            </button>

            {loading && (
              <Card>
                <CardContent className="py-8 text-center">
                  <Loader2 className="w-8 h-8 text-primary animate-spin mx-auto mb-3" />
                  <p className="font-semibold text-sm">
                    {language === "hi"
                      ? "वेब पर वकीलों की खोज हो रही है..."
                      : "Searching the web for lawyers..."}
                  </p>
                  <p className="text-xs text-muted mt-1">
                    {language === "hi"
                      ? "कई स्रोतों से वास्तविक डेटा ला रहे हैं"
                      : "Fetching real data from multiple sources"}
                  </p>
                </CardContent>
              </Card>
            )}

            {/* Results */}
            {!loading && lawyers.length > 0 && (
              <div className="space-y-3">
                <p className="text-sm font-medium">
                  {language === "hi"
                    ? `${lawyers.length} वकील मिले`
                    : `${lawyers.length} lawyers found`}
                </p>

                {lawyers.map((lawyer, i) => (
                  <Card
                    key={i}
                    className={`animate-fade-up delay-${Math.min(i, 7)}`}
                  >
                    <CardContent className="py-4">
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-[15px]">
                            {lawyer.name}
                          </h3>
                          {lawyer.specialization && (
                            <p className="text-xs text-primary mt-0.5">
                              <Briefcase className="w-3 h-3 inline mr-1" />
                              {lawyer.specialization}
                            </p>
                          )}
                        </div>
                        <Badge variant="default">{lawyer.sourceName}</Badge>
                      </div>

                      <div className="mt-2.5 space-y-1">
                        {lawyer.phone && (
                          <a
                            href={`tel:${lawyer.phone.replace(/\s/g, "")}`}
                            className="flex items-center gap-2 text-sm hover:text-primary transition-colors"
                          >
                            <Phone className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0" />
                            <span>{lawyer.phone}</span>
                          </a>
                        )}
                        {lawyer.address && (
                          <p className="flex items-start gap-2 text-xs text-muted">
                            <MapPin className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" />
                            <span>{lawyer.address}</span>
                          </p>
                        )}
                        {!lawyer.address && lawyer.location && (
                          <p className="flex items-center gap-2 text-xs text-muted">
                            <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
                            <span>{lawyer.location}</span>
                          </p>
                        )}
                        {(lawyer.experience || lawyer.rating) && (
                          <div className="flex items-center gap-3 text-xs text-muted">
                            {lawyer.experience && (
                              <span>{lawyer.experience}</span>
                            )}
                            {lawyer.rating && (
                              <span className="text-amber-600">
                                <Star className="w-3 h-3 inline mr-0.5" />
                                {lawyer.rating}
                              </span>
                            )}
                          </div>
                        )}
                      </div>

                      <div className="flex gap-2 mt-3">
                        {lawyer.phone ? (
                          <a
                            href={`tel:${lawyer.phone.replace(/\s/g, "")}`}
                            className="flex-1"
                          >
                            <Button variant="primary" size="sm" className="w-full">
                              <Phone className="w-3.5 h-3.5" />
                              {language === "hi" ? "कॉल करें" : "Call"}
                            </Button>
                          </a>
                        ) : null}
                        <a
                          href={lawyer.sourceUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={lawyer.phone ? "" : "flex-1"}
                        >
                          <Button
                            variant="outline"
                            size="sm"
                            className={lawyer.phone ? "" : "w-full"}
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                            {language === "hi" ? "प्रोफ़ाइल" : "Profile"}
                          </Button>
                        </a>
                      </div>
                    </CardContent>
                  </Card>
                ))}

                {/* Transparency: show sources */}
                {sources.length > 0 && (
                  <details className="mt-4">
                    <summary className="text-xs text-muted cursor-pointer hover:text-primary">
                      {language === "hi"
                        ? `${sources.length} स्रोतों से खोजा गया`
                        : `Searched ${sources.length} sources`}
                    </summary>
                    <div className="mt-2 space-y-1">
                      {sources.map((s, i) => (
                        <a
                          key={i}
                          href={s.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block text-xs text-muted hover:text-primary truncate"
                        >
                          {s.source}: {s.title}
                        </a>
                      ))}
                    </div>
                  </details>
                )}

                {/* Disclaimer */}
                <div className="mt-4 p-3 bg-amber-50 rounded-xl text-xs text-amber-800 flex gap-2">
                  <AlertTriangle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                  <p>
                    {language === "hi"
                      ? "ये परिणाम वेब खोज से हैं। NyayCheck किसी वकील की पुष्टि नहीं करता। कृपया नियुक्त करने से पहले स्वयं सत्यापित करें।"
                      : "These results are from web search. NyayCheck does not verify any lawyer. Please verify independently before hiring."}
                  </p>
                </div>
              </div>
            )}

            {/* No results */}
            {!loading && searched && lawyers.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted text-sm">
                  {language === "hi"
                    ? "कोई वकील नहीं मिला। अलग शहर या श्रेणी आज़माएं।"
                    : "No lawyers found. Try a different city or category."}
                </p>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
