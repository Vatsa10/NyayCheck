"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Scale,
  ArrowRight,
  ClipboardCheck,
  MessageSquare,
  FileText,
  Landmark,
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
  Gavel,
  Phone,
  ShieldCheck,
  BookOpen,
  MapPin,
  UserCheck,
  ChevronDown,
  Menu,
  X,
  Banknote,
  Siren,
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
  Banknote,
  Siren,
};

export default function LandingPage() {
  const strings = useStrings();
  const t = useLanguage((s) => s.t);
  const language = useLanguage((s) => s.language);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { href: "/check", icon: ClipboardCheck, label: language === "hi" ? "कानूनी जांच" : "Legal Check", desc: language === "hi" ? "7 श्रेणियों में जांच" : "Check across 7 categories", primary: true },
    { href: "/ask", icon: Search, label: language === "hi" ? "सवाल पूछें" : "Ask a Question", desc: language === "hi" ? "AI कानूनी Q&A" : "AI legal Q&A" },
    { href: "/helplines", icon: Phone, label: language === "hi" ? "हेल्पलाइन" : "Helplines", desc: language === "hi" ? "112, 181, 1930" : "112, 181, 1930" },
    { href: "/rights", icon: ShieldCheck, label: language === "hi" ? "अधिकार कार्ड" : "Know Your Rights", desc: language === "hi" ? "शेयर करने योग्य कार्ड" : "Shareable cards" },
    { href: "/guides", icon: BookOpen, label: language === "hi" ? "प्रक्रिया गाइड" : "Legal Guides", desc: language === "hi" ? "FIR, RTI, शिकायत" : "FIR, RTI, complaint" },
    { href: "/templates", icon: FileText, label: language === "hi" ? "टेम्पलेट" : "Templates", desc: language === "hi" ? "किराया, नोटिस, RTI" : "Rent, notice, RTI" },
    { href: "/schemes", icon: Landmark, label: language === "hi" ? "सरकारी योजनाएं" : "Gov Schemes", desc: language === "hi" ? "5,000+ योजनाएं" : "5,000+ schemes" },
    { href: "/lawyers", icon: UserCheck, label: language === "hi" ? "वकील खोजें" : "Find a Lawyer", desc: language === "hi" ? "वेब खोज से" : "From web search" },
    { href: "/cases", icon: Gavel, label: language === "hi" ? "केस ट्रैकर" : "Case Tracker", desc: language === "hi" ? "सुनवाई ट्रैक करें" : "Track hearings" },
    { href: "/nearby", icon: MapPin, label: language === "hi" ? "नज़दीकी सहायता" : "Nearby Help", desc: language === "hi" ? "DLSA, पुलिस, कोर्ट" : "DLSA, police, court" },
  ];

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

          {/* Desktop nav */}
          <div className="hidden sm:flex items-center gap-2">
            <Link
              href="/ask"
              className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-muted hover:text-foreground transition-colors duration-200"
            >
              <Search className="w-3.5 h-3.5" />
              {language === "hi" ? "सवाल पूछें" : "Ask"}
            </Link>

            {/* Tools dropdown — desktop only */}
            <div className="relative group">
              <button className="flex items-center gap-1 px-3 py-1.5 text-sm text-muted hover:text-foreground transition-colors duration-200">
                {language === "hi" ? "उपकरण" : "Tools"}
                <ChevronDown className="w-3.5 h-3.5 transition-transform duration-200 group-hover:rotate-180" />
              </button>
              <div className="absolute right-0 top-full pt-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-[opacity,visibility] duration-200">
                <div className="w-56 bg-white rounded-xl border border-gray-100 shadow-lg shadow-gray-200/50 py-1.5 overflow-hidden">
                  {navItems
                    .filter((item) => !item.primary && item.href !== "/ask")
                    .map(({ href, icon: Icon, label, desc }) => (
                      <Link
                        key={href}
                        href={href}
                        className="flex items-center gap-3 px-3.5 py-2 hover:bg-gray-50 transition-colors duration-150"
                      >
                        <Icon className="w-4 h-4 text-muted flex-shrink-0" />
                        <div className="min-w-0">
                          <p className="text-sm font-medium leading-tight">{label}</p>
                          <p className="text-[11px] text-muted leading-tight">{desc}</p>
                        </div>
                      </Link>
                    ))}
                </div>
              </div>
            </div>

            <LanguageToggle />
            <Link href="/check">
              <Button size="sm">
                {language === "hi" ? "शुरू करें" : "Get Started"}
              </Button>
            </Link>
          </div>

          {/* Mobile: language + hamburger */}
          <div className="flex sm:hidden items-center gap-2">
            <LanguageToggle />
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="p-1.5 rounded-lg hover:bg-gray-50 transition-colors"
              aria-label="Open menu"
            >
              <Menu className="w-5 h-5 text-foreground" />
            </button>
          </div>
        </div>
      </header>

      {/* ── Mobile full-screen menu ── */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-[100] bg-white flex flex-col">
          {/* Mobile menu header */}
          <div className="flex items-center justify-between px-5 h-14 border-b border-gray-100">
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 text-muted hover:text-foreground transition-colors"
              aria-label="Close menu"
            >
              <X className="w-5 h-5" />
              <span className="text-sm font-medium">
                {language === "hi" ? "बंद करें" : "Close"}
              </span>
            </button>
            <Link href="/" className="flex items-center gap-2" onClick={() => setMobileMenuOpen(false)}>
              <Scale className="w-5 h-5 text-primary" />
              <span className="font-semibold text-[15px] tracking-tight">NyayCheck</span>
            </Link>
          </div>

          {/* Mobile menu items */}
          <div className="flex-1 overflow-y-auto px-5 py-4">
            <div className="space-y-1">
              {navItems.map(({ href, icon: Icon, label, desc, primary }, i) => (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-3.5 px-3 py-3 rounded-xl transition-colors duration-150 active:scale-[0.98] ${
                    primary
                      ? "bg-primary text-white"
                      : "hover:bg-gray-50"
                  }`}
                  style={{ animationDelay: `${i * 40}ms` }}
                >
                  <Icon className={`w-5 h-5 flex-shrink-0 ${primary ? "text-white" : "text-muted"}`} />
                  <div className="min-w-0">
                    <p className={`text-[15px] font-medium leading-tight ${primary ? "text-white" : ""}`}>
                      {label}
                    </p>
                    <p className={`text-xs leading-tight mt-0.5 ${primary ? "text-white/70" : "text-muted"}`}>
                      {desc}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Mobile menu footer */}
          <div className="px-5 py-4 border-t border-gray-100 space-y-2">
            <div className="flex items-center justify-center gap-4 text-xs text-muted">
              <a
                href="https://www.linkedin.com/in/vatsa-joshi"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-foreground transition-colors font-medium"
              >
                {language === "hi" ? "Vatsa द्वारा निर्मित" : "Made by Vatsa"}
              </a>
              <a
                href="https://github.com/Vatsa10/NyayCheck"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-foreground transition-colors"
                aria-label="GitHub"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
              </a>
            </div>
            <p className="text-xs text-center text-muted">
              {language === "hi"
                ? "पेशेवर कानूनी सलाह का विकल्प नहीं है।"
                : "Not a substitute for professional legal advice."}
            </p>
          </div>
        </div>
      )}

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

      {/* ── Legal Tools ── */}
      <section className="py-20 px-5">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold tracking-tight text-center animate-fade-up delay-0">
            {language === "hi" ? "कानूनी उपकरण" : "Legal Tools"}
          </h2>
          <p className="mt-2 text-muted text-center text-sm animate-fade-up delay-1">
            {language === "hi"
              ? "आपकी रोज़मर्रा की कानूनी ज़रूरतों के लिए"
              : "For your everyday legal needs"}
          </p>

          <div className="mt-10 grid grid-cols-2 sm:grid-cols-3 gap-3">
            {[
              {
                href: "/helplines",
                icon: Phone,
                title: language === "hi" ? "हेल्पलाइन" : "Helplines",
                desc: language === "hi" ? "112, 181, 1930 — एक टैप में कॉल" : "112, 181, 1930 — one tap to call",
                color: "bg-red-500",
              },
              {
                href: "/rights",
                icon: ShieldCheck,
                title: language === "hi" ? "अपने अधिकार जानें" : "Know Your Rights",
                desc: language === "hi" ? "शेयर करने योग्य अधिकार कार्ड" : "Shareable rights cards",
                color: "bg-emerald-500",
              },
              {
                href: "/guides",
                icon: BookOpen,
                title: language === "hi" ? "प्रक्रिया गाइड" : "Procedure Guides",
                desc: language === "hi" ? "FIR, RTI, शिकायत — चरणबद्ध" : "FIR, RTI, complaint — step by step",
                color: "bg-indigo-500",
              },
              {
                href: "/templates",
                icon: FileText,
                title: language === "hi" ? "दस्तावेज़ टेम्पलेट" : "Templates",
                desc: language === "hi" ? "किराया अनुबंध, नोटिस, RTI" : "Rent agreement, notice, RTI",
                color: "bg-amber-500",
              },
              {
                href: "/schemes",
                icon: Landmark,
                title: language === "hi" ? "सरकारी योजनाएं" : "Gov Schemes",
                desc: language === "hi" ? "5,000+ योजनाएं खोजें" : "Find 5,000+ schemes",
                color: "bg-cyan-500",
              },
              {
                href: "/lawyers",
                icon: UserCheck,
                title: language === "hi" ? "वकील खोजें" : "Find a Lawyer",
                desc: language === "hi" ? "वेब से सत्यापित वकील खोजें" : "Real lawyers from web search",
                color: "bg-blue-500",
              },
              {
                href: "/nearby",
                icon: MapPin,
                title: language === "hi" ? "नज़दीकी सहायता" : "Nearby Help",
                desc: language === "hi" ? "DLSA, पुलिस, कोर्ट खोजें" : "Find DLSA, police, courts",
                color: "bg-violet-500",
              },
            ].map(({ href, icon: Icon, title, desc, color }, i) => (
              <Link
                key={href}
                href={href}
                className={`group animate-scale-in delay-${Math.min(i, 7)}`}
              >
                <div className="flex flex-col gap-2.5 p-4 rounded-xl border border-gray-100 bg-white transition-[transform,box-shadow,border-color] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] hover:shadow-md hover:shadow-gray-200/60 hover:-translate-y-0.5 hover:border-gray-200 active:scale-[0.97] h-full">
                  <div
                    className={`w-9 h-9 rounded-lg ${color} flex items-center justify-center transition-transform duration-200 group-hover:scale-110`}
                  >
                    <Icon className="w-4.5 h-4.5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm">{title}</h3>
                    <p className="text-xs text-muted mt-0.5">{desc}</p>
                  </div>
                </div>
              </Link>
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
        <div className="max-w-5xl mx-auto flex flex-col items-center gap-3 text-xs text-muted">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5">
              <Scale className="w-3.5 h-3.5" />
              <span className="font-medium">NyayCheck</span>
            </div>
            <span className="text-gray-300">|</span>
            <a
              href="https://www.linkedin.com/in/vatsa-joshi"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground transition-colors"
            >
              {language === "hi" ? "Vatsa द्वारा निर्मित" : "Made by Vatsa"}
            </a>
            <a
              href="https://github.com/Vatsa10/NyayCheck"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground transition-colors"
              aria-label="GitHub"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
            </a>
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
