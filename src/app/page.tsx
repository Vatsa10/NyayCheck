"use client";

import Link from "next/link";
import {
  Scale,
  ChevronRight,
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
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
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

  return (
    <div className="min-h-screen bg-background">
      {/* Nav */}
      <header className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Scale className="w-6 h-6 text-primary" />
            <span className="font-bold text-xl text-primary">
              {strings.app.name}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/ask"
              className="text-sm font-medium text-muted hover:text-primary transition-colors hidden sm:block"
            >
              {strings.landing.hero.cta === "Start Free Check"
                ? "Ask a Question"
                : "सवाल पूछें"}
            </Link>
            <LanguageToggle />
            <Link href="/check">
              <Button size="sm">{strings.landing.hero.cta}</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="py-16 sm:py-24 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
            <Scale className="w-4 h-4" />
            {strings.app.tagline}
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold leading-tight mb-6">
            {strings.landing.hero.title}
          </h1>
          <p className="text-lg text-muted max-w-xl mx-auto mb-8 leading-relaxed">
            {strings.landing.hero.subtitle}
          </p>
          <Link href="/check">
            <Button size="lg">
              {strings.landing.hero.cta}
              <ChevronRight className="w-5 h-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-12">
            {strings.landing.howItWorks.title}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {[
              {
                icon: MessageSquare,
                step: strings.landing.howItWorks.step1,
                num: "1",
              },
              {
                icon: ClipboardCheck,
                step: strings.landing.howItWorks.step2,
                num: "2",
              },
              {
                icon: FileText,
                step: strings.landing.howItWorks.step3,
                num: "3",
              },
            ].map(({ icon: Icon, step, num }) => (
              <div key={num} className="text-center">
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <Icon className="w-8 h-8 text-primary" />
                </div>
                <div className="text-sm font-bold text-primary mb-2">
                  {num}
                </div>
                <h3 className="font-semibold text-lg mb-2">{step.title}</h3>
                <p className="text-sm text-muted">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-12">
            {strings.landing.categories.title}
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {categories.map((cat) => {
              const Icon = iconMap[cat.icon] || Shield;
              return (
                <Link key={cat.id} href={`/check/${cat.id}`}>
                  <Card hover className="h-full">
                    <CardContent className="flex flex-col items-center text-center gap-2 p-5">
                      <div
                        className={`w-12 h-12 rounded-xl ${cat.color} flex items-center justify-center`}
                      >
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <h3 className="font-semibold text-sm">
                        {t(cat.name)}
                      </h3>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 bg-primary text-white">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">
            {strings.landing.hero.title}
          </h2>
          <p className="text-lg opacity-90 mb-8">
            {strings.landing.hero.subtitle}
          </p>
          <Link href="/check">
            <Button variant="secondary" size="lg">
              {strings.landing.hero.cta}
              <ChevronRight className="w-5 h-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-gray-100">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted">
          <div className="flex items-center gap-2">
            <Scale className="w-4 h-4" />
            <span>NyayCheck</span>
          </div>
          <p>
            {new Date().getFullYear()} NyayCheck. Not a substitute for
            professional legal advice.
          </p>
        </div>
      </footer>
    </div>
  );
}
