"use client";

import Link from "next/link";
import { Scale, ArrowLeft, FileText, ChevronRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { LanguageToggle } from "@/components/ui/language-toggle";
import { useLanguage } from "@/hooks/use-language";
import { documentTemplates } from "@/lib/legal/templates";

export default function TemplatesPage() {
  const language = useLanguage((s) => s.language);
  const t = useLanguage((s) => s.t);

  return (
    <div className="min-h-screen bg-white">
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-100/80">
        <div className="max-w-4xl mx-auto px-5 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" className="p-1 rounded-lg hover:bg-gray-50 transition-colors">
              <ArrowLeft className="w-5 h-5 text-muted" />
            </Link>
            <div className="flex items-center gap-2">
              <Scale className="w-5 h-5 text-primary" />
              <span className="font-semibold text-[15px] tracking-tight">NyayCheck</span>
            </div>
          </div>
          <LanguageToggle />
        </div>
      </header>

      <main className="max-w-xl mx-auto px-5 pt-24 pb-12">
        <div className="mb-6 animate-fade-up delay-0">
          <div className="w-12 h-12 rounded-xl bg-amber-50 flex items-center justify-center mb-3">
            <FileText className="w-6 h-6 text-amber-600" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight">
            {language === "hi" ? "दस्तावेज़ टेम्पलेट" : "Document Templates"}
          </h1>
          <p className="text-sm text-muted mt-1">
            {language === "hi"
              ? "अपनी जानकारी भरें और तैयार दस्तावेज़ पाएं"
              : "Fill in your details, get a ready document"}
          </p>
        </div>

        <div className="space-y-3">
          {documentTemplates.map((tmpl, i) => (
            <Link
              key={tmpl.id}
              href={`/templates/${tmpl.id}`}
              className={`block animate-fade-up delay-${Math.min(i, 7)}`}
            >
              <Card hover>
                <CardContent className="py-4 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-amber-50 flex items-center justify-center flex-shrink-0">
                    <FileText className="w-5 h-5 text-amber-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-sm">{t(tmpl.title)}</h3>
                    <p className="text-xs text-muted mt-0.5">{t(tmpl.description)}</p>
                    <Badge variant="default">{tmpl.category}</Badge>
                  </div>
                  <ChevronRight className="w-4 h-4 text-muted flex-shrink-0" />
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        <div className="mt-6 p-3 bg-amber-50 rounded-xl text-xs text-amber-800">
          {language === "hi"
            ? "* ये टेम्पलेट हैं, कानूनी दस्तावेज़ नहीं। उपयोग से पहले वकील से परामर्श करें।"
            : "* These are templates, not legal documents. Consult a lawyer before using."}
        </div>
      </main>
    </div>
  );
}
