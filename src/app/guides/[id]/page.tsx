"use client";

import { use } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Scale, ArrowLeft, Phone, Clock, Coins, Lightbulb, Share2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AudioButton } from "@/components/ui/audio-button";
import { LanguageToggle } from "@/components/ui/language-toggle";
import { StepChecklist } from "@/components/guides/step-checklist";
import { useLanguage } from "@/hooks/use-language";
import { getGuideById } from "@/lib/legal/guides";
import { getWhatsAppShareUrl } from "@/lib/utils/share";

export default function GuidePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const language = useLanguage((s) => s.language);
  const t = useLanguage((s) => s.t);

  const guide = getGuideById(id);
  if (!guide) notFound();

  const shareText = `${t(guide.title)}\n\n${guide.steps.map((s) => `${s.order}. ${t(s.title)}`).join("\n")}\n\n— NyayCheck`;

  return (
    <div className="min-h-screen bg-white">
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-100/80">
        <div className="max-w-4xl mx-auto px-5 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/guides" className="p-1 rounded-lg hover:bg-gray-50 transition-colors">
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

      <main className="max-w-xl mx-auto px-5 pt-24 pb-12 space-y-6">
        {/* Header */}
        <div className="animate-fade-up delay-0">
          <h1 className="text-xl font-bold">{t(guide.title)}</h1>
          <p className="text-sm text-muted mt-1">{t(guide.description)}</p>
          <div className="flex items-center gap-3 mt-2">
            <span className="text-xs text-muted flex items-center gap-0.5">
              <Clock className="w-3 h-3" /> {guide.estimatedTime}
            </span>
            <span className="text-xs text-muted flex items-center gap-0.5">
              <Coins className="w-3 h-3" /> {guide.estimatedCost}
            </span>
            <Badge variant="default">{guide.category}</Badge>
          </div>
          <div className="mt-2">
            <AudioButton text={`${t(guide.title)}. ${guide.steps.map((s) => `Step ${s.order}: ${t(s.title)}`).join(". ")}`} />
          </div>
        </div>

        {/* Related helpline */}
        {guide.relatedHelpline && (
          <a href={`tel:${guide.relatedHelpline}`}>
            <Card hover>
              <CardContent className="py-3 flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-red-50 flex items-center justify-center">
                  <Phone className="w-4 h-4 text-red-500" />
                </div>
                <div className="flex-1">
                  <p className="text-xs text-muted">
                    {language === "hi" ? "संबंधित हेल्पलाइन" : "Related Helpline"}
                  </p>
                  <p className="font-semibold text-sm">{guide.relatedHelpline}</p>
                </div>
                <Phone className="w-4 h-4 text-primary" />
              </CardContent>
            </Card>
          </a>
        )}

        {/* Steps */}
        <div className="animate-fade-up delay-1">
          <h2 className="text-lg font-semibold mb-4">
            {language === "hi" ? "चरण" : "Steps"}
          </h2>
          <StepChecklist guideId={guide.id} steps={guide.steps} />
        </div>

        {/* Tips */}
        {guide.tips.length > 0 && (
          <Card>
            <CardContent className="py-4">
              <h3 className="font-semibold text-sm flex items-center gap-1.5 mb-2">
                <Lightbulb className="w-4 h-4 text-amber-500" />
                {language === "hi" ? "उपयोगी सुझाव" : "Useful Tips"}
              </h3>
              <ul className="space-y-1.5">
                {guide.tips.map((tip, i) => (
                  <li key={i} className="text-sm text-muted flex gap-2">
                    <span className="text-amber-500 flex-shrink-0">•</span>
                    {t(tip)}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        )}

        {/* Share */}
        <a
          href={getWhatsAppShareUrl(shareText)}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Button variant="outline" className="w-full">
            <Share2 className="w-4 h-4" />
            {language === "hi" ? "WhatsApp पर शेयर करें" : "Share on WhatsApp"}
          </Button>
        </a>
      </main>
    </div>
  );
}
