"use client";

import { use, useEffect } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Scale, ArrowLeft } from "lucide-react";
import { getCategoryById } from "@/lib/legal/categories";
import { QuestionFlow } from "@/components/questionnaire/question-flow";
import { LanguageToggle } from "@/components/ui/language-toggle";
import { useQuestionnaire } from "@/hooks/use-questionnaire";
import { useLanguage, useStrings } from "@/hooks/use-language";

export default function CategoryQuestionnairePage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category: categoryId } = use(params);
  const category = getCategoryById(categoryId);
  const t = useLanguage((s) => s.t);
  const strings = useStrings();
  const setCategory = useQuestionnaire((s) => s.setCategory);

  useEffect(() => {
    if (category) {
      setCategory(category.id);
    }
  }, [category, setCategory]);

  if (!category) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link
              href="/check"
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

      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-2xl font-bold">{t(category.name)}</h1>
          <p className="text-muted">{t(category.description)}</p>
        </div>

        <QuestionFlow questions={category.questions} category={category.id} />
      </main>
    </div>
  );
}
