"use client";

import { CategoryGrid } from "@/components/questionnaire/category-grid";
import { LanguageToggle } from "@/components/ui/language-toggle";
import { useStrings } from "@/hooks/use-language";
import { Scale } from "lucide-react";
import Link from "next/link";

export default function CheckPage() {
  const strings = useStrings();

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Scale className="w-6 h-6 text-primary" />
            <span className="font-bold text-lg text-primary">
              {strings.app.name}
            </span>
          </Link>
          <LanguageToggle />
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-2">
          {strings.check.selectCategory}
        </h1>
        <p className="text-muted mb-8">
          {strings.app.description}
        </p>
        <CategoryGrid />
      </main>
    </div>
  );
}
