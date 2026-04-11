"use client";

import { use } from "react";
import Link from "next/link";
import { Scale, ArrowLeft, Download, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { LanguageToggle } from "@/components/ui/language-toggle";
import { useStrings, useLanguage } from "@/hooks/use-language";

export default function DocumentPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const strings = useStrings();
  const language = useLanguage((s) => s.language);

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link
              href={`/report/${id}`}
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
        <Card>
          <CardContent className="py-12 text-center">
            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <Download className="w-8 h-8 text-primary" />
            </div>
            <h2 className="text-xl font-bold mb-2">
              {language === "hi"
                ? "दस्तावेज़ जनरेशन जल्द आ रहा है"
                : "Document Generation Coming Soon"}
            </h2>
            <p className="text-muted mb-6 max-w-md mx-auto">
              {language === "hi"
                ? "AI-संचालित कानूनी नोटिस, शिकायत पत्र, और आवेदन जल्द ही हिंदी और अंग्रेजी में उपलब्ध होंगे।"
                : "AI-powered legal notices, complaint letters, and applications in Hindi & English will be available soon."}
            </p>
            <Link href={`/report/${id}`}>
              <Button variant="outline">
                <ArrowLeft className="w-4 h-4" />
                {language === "hi" ? "रिपोर्ट पर वापस" : "Back to Report"}
              </Button>
            </Link>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
