"use client";

import { useState } from "react";
import {
  Home,
  ShieldAlert,
  Gavel,
  ShieldX,
  RotateCcw,
  Briefcase,
  HeartHandshake,
  Smartphone,
  Lock,
  DoorOpen,
  Scale,
  Building,
  FileSearch,
  Users,
  Monitor,
  ChevronDown,
  Share2,
  type LucideIcon,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AudioButton } from "@/components/ui/audio-button";
import { useLanguage } from "@/hooks/use-language";
import { getWhatsAppShareUrl } from "@/lib/utils/share";
import type { RightsCard as RightsCardType } from "@/lib/legal/rights-cards";

const iconMap: Record<string, LucideIcon> = {
  Home,
  ShieldAlert,
  Gavel,
  ShieldX,
  RotateCcw,
  Briefcase,
  HeartHandshake,
  Smartphone,
  Lock,
  DoorOpen,
  Scale,
  Building,
  FileSearch,
  Users,
  Monitor,
};

const categoryColors: Record<string, string> = {
  rent: "bg-blue-100 text-blue-700",
  consumer: "bg-amber-100 text-amber-700",
  employment: "bg-violet-100 text-violet-700",
  family: "bg-pink-100 text-pink-700",
  "cyber-fraud": "bg-red-100 text-red-700",
  ecommerce: "bg-teal-100 text-teal-700",
  legal: "bg-emerald-100 text-emerald-700",
  property: "bg-orange-100 text-orange-700",
  emergency: "bg-red-100 text-red-700",
};

const categoryLabels: Record<string, { en: string; hi: string }> = {
  rent: { en: "Rent", hi: "किराया" },
  consumer: { en: "Consumer", hi: "उपभोक्ता" },
  employment: { en: "Employment", hi: "रोजगार" },
  family: { en: "Family", hi: "परिवार" },
  "cyber-fraud": { en: "Cyber", hi: "साइबर" },
  ecommerce: { en: "E-Commerce", hi: "ई-कॉमर्स" },
  legal: { en: "Legal", hi: "कानूनी" },
  property: { en: "Property", hi: "संपत्ति" },
  emergency: { en: "Emergency", hi: "आपातकालीन" },
};

interface RightsCardProps {
  card: RightsCardType;
}

export function RightsCardComponent({ card }: RightsCardProps) {
  const [expanded, setExpanded] = useState(false);
  const language = useLanguage((s) => s.language);
  const t = useLanguage((s) => s.t);

  const Icon = iconMap[card.icon] || Scale;
  const catColor = categoryColors[card.category] || "bg-gray-100 text-gray-700";
  const catLabel = categoryLabels[card.category];

  const allPointsText = card.points.map((p) => t(p)).join(". ");

  return (
    <Card className="overflow-hidden">
      <CardContent className="py-4">
        {/* Header — always visible */}
        <button
          onClick={() => setExpanded((prev) => !prev)}
          className="w-full flex items-start gap-3 text-left transition-transform duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] active:scale-[0.97]"
        >
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
            <Icon className="w-5 h-5 text-primary" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-sm leading-snug">{t(card.title)}</h3>
            <div className="mt-1.5">
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${catColor}`}>
                {catLabel ? t(catLabel) : card.category}
              </span>
            </div>
          </div>
          <ChevronDown
            className={`w-5 h-5 text-muted flex-shrink-0 transition-transform duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] ${
              expanded ? "rotate-180" : ""
            }`}
          />
        </button>

        {/* Expanded content */}
        {expanded && (
          <div className="mt-4 animate-fade-up delay-0">
            <ul className="space-y-2.5 mb-4">
              {card.points.map((point, i) => (
                <li key={i} className="flex items-start gap-2.5 text-sm">
                  <span className="w-5 h-5 rounded-full bg-primary/10 text-primary text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                    {i + 1}
                  </span>
                  <span className="text-foreground/90 leading-relaxed">{t(point)}</span>
                </li>
              ))}
            </ul>

            <div className="px-3 py-2 rounded-lg bg-gray-50 mb-4">
              <p className="text-xs text-muted">
                <span className="font-medium text-foreground">
                  {language === "hi" ? "लागू कानून:" : "Applicable Act:"}
                </span>{" "}
                {card.applicableAct}
              </p>
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              <a
                href={getWhatsAppShareUrl(t(card.shareText))}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#25D366] text-white text-sm font-medium transition-transform duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] active:scale-[0.97] hover:bg-[#20bd5a]"
              >
                <Share2 className="w-4 h-4" />
                <span>WhatsApp</span>
              </a>
              <AudioButton text={allPointsText} />
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
