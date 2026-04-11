"use client";

import Link from "next/link";
import {
  Scale,
  ArrowRight,
  ClipboardCheck,
  MessageSquare,
  FileText,
  Home,
  Building2,
  ShoppingBag,
  Briefcase,
  Heart,
  ShoppingCart,
  Shield,
  Search,
  Sparkles,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { LanguageToggle } from "@/components/ui/language-toggle";
import { useStrings, useLanguage } from "@/hooks/use-language";
import { categories } from "@/lib/legal/categories";

const iconMap: Record<string, React.ElementType> = {
  Home,
  Building2,
  ShoppingBag,
  Briefcase,
  Heart,
  ShoppingCart,
  Shield,
};

export default function LandingPage() {
  const strings = useStrings();
  const t = useLanguage((s) => s.t);
  const language = useLanguage((s) => s.language);

  return (
    <div className="min-h-screen bg-white">
      {/* ── Nav ── */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-100/80">
        <div className="max-w-5xl mx-auto px-5 h-14 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Scale className="w-5 h-5 text-primary" />
            <span className="font-semibold text-[15px] tracking-tight">
              NyayCheck
            </span>
          </Link>
          <div className="flex items-center gap-2">
            <Link
              href="/ask"
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-sm text-muted hover:text-foreground transition-colors duration-200"
            >
              <Search className="w-3.5 h-3.5" />
              {language === "hi" ? "सवाल पूछें" : "Ask"}
            </Link>
            <LanguageToggle />
            <Link href="/check">
              <Button size="sm">
                {language === "hi" ? "शुरू करें" : "Get Started"}
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* ── Hero ── */}
      <section className="pt-32 pb-20 sm:pt-40 sm:pb-28 px-5">
        <div className="max-w-2xl mx-auto text-center">
          <div className="animate-fade-up delay-0">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary-50 text-primary text-xs font-medium tracking-wide">
              <Scale className="w-3 h-3" />
              {strings.app.tagline}
            </span>
          </div>

          <h1 className="mt-8 text-4xl sm:text-5xl font-bold tracking-tight leading-[1.1] animate-fade-up delay-1">
            {language === "hi" ? (
              <>
                आपका कानूनी स्वास्थ्य,
                <br />
                <span className="text-gradient">सरल भाषा में</span>
              </>
            ) : (
              <>
                Your Legal Health,
                <br />
                <span className="text-gradient">Simplified</span>
              </>
            )}
          </h1>

          <p className="mt-5 text-lg text-muted leading-relaxed max-w-lg mx-auto animate-fade-up delay-2">
            {strings.landing.hero.subtitle}
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3 animate-fade-up delay-3">
            <Link href="/check">
              <Button size="lg">
                {strings.landing.hero.cta}
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <Link href="/ask">
              <Button variant="outline" size="lg">
                <Search className="w-4 h-4" />
                {language === "hi"
                  ? "कानूनी सवाल पूछें"
                  : "Ask a Legal Question"}
              </Button>
            </Link>
          </div>

          {/* Trust indicator */}
          <p className="mt-6 text-xs text-muted/60 animate-fade-in delay-5">
            {language === "hi"
              ? "100% मुफ्त   ·   हिंदी और अंग्रेजी   ·   कोई साइन-अप नहीं"
              : "100% Free   ·   Hindi & English   ·   No sign-up required"}
          </p>
        </div>
      </section>

      {/* ── How it Works ── */}
      <section className="py-20 px-5 bg-gray-50/50">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold tracking-tight text-center animate-fade-up delay-0">
            {strings.landing.howItWorks.title}
          </h2>

          <div className="mt-14 grid grid-cols-1 sm:grid-cols-3 gap-10 sm:gap-6">
            {[
              {
                icon: MessageSquare,
                step: strings.landing.howItWorks.step1,
                num: "1",
                delay: "delay-1",
              },
              {
                icon: ClipboardCheck,
                step: strings.landing.howItWorks.step2,
                num: "2",
                delay: "delay-2",
              },
              {
                icon: FileText,
                step: strings.landing.howItWorks.step3,
                num: "3",
                delay: "delay-3",
              },
            ].map(({ icon: Icon, step, num, delay }) => (
              <div
                key={num}
                className={`text-center animate-fade-up ${delay}`}
              >
                <div className="relative w-12 h-12 rounded-xl bg-primary-50 flex items-center justify-center mx-auto">
                  <Icon className="w-5 h-5 text-primary" />
                  <span className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-primary text-white text-[10px] font-bold flex items-center justify-center">
                    {num}
                  </span>
                </div>
                <h3 className="mt-4 font-semibold text-[15px]">
                  {step.title}
                </h3>
                <p className="mt-1.5 text-sm text-muted leading-relaxed">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Categories ── */}
      <section className="py-20 px-5">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold tracking-tight text-center animate-fade-up delay-0">
            {strings.landing.categories.title}
          </h2>

          <div className="mt-10 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {categories.map((cat, i) => {
              const Icon = iconMap[cat.icon] || Shield;
              return (
                <Link
                  key={cat.id}
                  href={`/check/${cat.id}`}
                  className={`group animate-scale-in delay-${Math.min(i, 7)}`}
                >
                  <div className="flex flex-col items-center gap-3 p-5 rounded-xl border border-gray-100 bg-white transition-[transform,box-shadow,border-color] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] hover:shadow-md hover:shadow-gray-200/60 hover:-translate-y-0.5 hover:border-gray-200 active:scale-[0.97]">
                    <div
                      className={`w-10 h-10 rounded-lg ${cat.color} flex items-center justify-center transition-transform duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-110`}
                    >
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-sm font-medium text-center leading-tight">
                      {t(cat.name)}
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── AI Features ── */}
      <section className="py-20 px-5 bg-gray-50/50">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold tracking-tight text-center animate-fade-up delay-0">
            {language === "hi" ? "AI की शक्ति, आपकी भाषा में" : "AI-Powered, In Your Language"}
          </h2>
          <p className="mt-3 text-muted text-center text-sm max-w-lg mx-auto animate-fade-up delay-1">
            {language === "hi"
              ? "उन्नत AI जो आपकी विशिष्ट स्थिति को समझता है और व्यक्तिगत मार्गदर्शन देता है"
              : "Advanced AI that understands your specific situation and gives personalized guidance"}
          </p>

          <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              {
                icon: Sparkles,
                title: language === "hi" ? "स्मार्ट अंतर्दृष्टि" : "Smart Insights",
                desc:
                  language === "hi"
                    ? "AI आपके जवाबों का विश्लेषण करके व्यक्तिगत सलाह देता है"
                    : "AI analyzes your answers and gives personalized advice",
                delay: "delay-2",
              },
              {
                icon: FileText,
                title: language === "hi" ? "दस्तावेज़ बनाएं" : "Generate Documents",
                desc:
                  language === "hi"
                    ? "कानूनी नोटिस और शिकायत पत्र AI द्वारा हिंदी/अंग्रेजी में"
                    : "Legal notices and complaints drafted by AI in Hindi/English",
                delay: "delay-3",
              },
              {
                icon: Users,
                title: language === "hi" ? "समुदाय डेटा" : "Community Data",
                desc:
                  language === "hi"
                    ? "देखें कि समान स्थिति वाले अन्य लोगों का अनुभव कैसा रहा"
                    : "See how others with similar situations scored",
                delay: "delay-4",
              },
            ].map(({ icon: Icon, title, desc, delay }) => (
              <div
                key={title}
                className={`p-5 rounded-xl border border-gray-100 bg-white animate-fade-up ${delay}`}
              >
                <div className="w-9 h-9 rounded-lg bg-primary-50 flex items-center justify-center">
                  <Icon className="w-4.5 h-4.5 text-primary" />
                </div>
                <h3 className="mt-3 font-semibold text-[15px]">{title}</h3>
                <p className="mt-1 text-sm text-muted leading-relaxed">
                  {desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-24 px-5">
        <div className="max-w-xl mx-auto text-center animate-fade-up delay-0">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">
            {language === "hi"
              ? "अपने कानूनी अधिकार जानें"
              : "Know Your Legal Rights"}
          </h2>
          <p className="mt-3 text-muted max-w-md mx-auto">
            {language === "hi"
              ? "5 मिनट में मुफ्त कानूनी स्वास्थ्य जांच। कोई साइन-अप नहीं।"
              : "Free legal health check in 5 minutes. No sign-up needed."}
          </p>
          <div className="mt-6">
            <Link href="/check">
              <Button size="lg">
                {strings.landing.hero.cta}
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="py-8 px-5 border-t border-gray-100">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-muted">
          <div className="flex items-center gap-1.5">
            <Scale className="w-3.5 h-3.5" />
            <span className="font-medium">NyayCheck</span>
          </div>
          <p>
            {language === "hi"
              ? "यह पेशेवर कानूनी सलाह का विकल्प नहीं है।"
              : "Not a substitute for professional legal advice."}
          </p>
        </div>
      </footer>
    </div>
  );
}
