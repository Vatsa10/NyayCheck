"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import {
  Scale,
  ArrowLeft,
  MapPin,
  Landmark,
  ShieldCheck,
  Store,
  Building,
  HeartHandshake,
  Monitor,
  ExternalLink,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LanguageToggle } from "@/components/ui/language-toggle";
import { useLanguage } from "@/hooks/use-language";
import type { LucideIcon } from "lucide-react";
import type { BilingualText } from "@/types";

interface NearbyCategory {
  id: string;
  label: BilingualText;
  description: BilingualText;
  icon: LucideIcon;
  query: string;
  color: string;
}

const categories: NearbyCategory[] = [
  {
    id: "dlsa",
    label: { en: "Legal Aid (DLSA)", hi: "कानूनी सहायता (DLSA)" },
    description: { en: "Free legal aid and Lok Adalat services", hi: "मुफ्त कानूनी सहायता और लोक अदालत सेवाएं" },
    icon: Landmark,
    query: "legal+aid+DLSA+near+me",
    color: "bg-emerald-50 text-emerald-600",
  },
  {
    id: "police",
    label: { en: "Police Station", hi: "पुलिस स्टेशन" },
    description: { en: "File FIR or seek police assistance", hi: "FIR दर्ज करें या पुलिस सहायता लें" },
    icon: ShieldCheck,
    query: "police+station+near+me",
    color: "bg-blue-50 text-blue-600",
  },
  {
    id: "consumer",
    label: { en: "Consumer Forum", hi: "उपभोक्ता फोरम" },
    description: { en: "File consumer complaints and disputes", hi: "उपभोक्ता शिकायतें और विवाद दर्ज करें" },
    icon: Store,
    query: "consumer+forum+near+me",
    color: "bg-amber-50 text-amber-600",
  },
  {
    id: "court",
    label: { en: "District Court", hi: "जिला न्यायालय" },
    description: { en: "Civil and criminal case filings", hi: "सिविल और आपराधिक मामले दर्ज करें" },
    icon: Building,
    query: "district+court+near+me",
    color: "bg-violet-50 text-violet-600",
  },
  {
    id: "women",
    label: { en: "Women's Help Center", hi: "महिला सहायता केंद्र" },
    description: { en: "One Stop Centre for women in distress", hi: "संकट में महिलाओं के लिए वन स्टॉप सेंटर" },
    icon: HeartHandshake,
    query: "one+stop+centre+women+near+me",
    color: "bg-pink-50 text-pink-600",
  },
  {
    id: "cyber",
    label: { en: "Cyber Crime Cell", hi: "साइबर क्राइम सेल" },
    description: { en: "Report online fraud and cyber crime", hi: "ऑनलाइन धोखाधड़ी और साइबर अपराध की रिपोर्ट करें" },
    icon: Monitor,
    query: "cyber+crime+police+near+me",
    color: "bg-red-50 text-red-600",
  },
];

export default function NearbyPage() {
  const language = useLanguage((s) => s.language);
  const t = useLanguage((s) => s.t);
  const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(null);

  useEffect(() => {
    if (typeof navigator !== "undefined" && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setCoords({ lat: pos.coords.latitude, lng: pos.coords.longitude });
        },
        () => {
          // Geolocation denied or unavailable — we'll use URLs without coordinates
        },
        { timeout: 5000 }
      );
    }
  }, []);

  const getMapsUrl = useCallback(
    (query: string) => {
      const base = `https://www.google.com/maps/search/${query}`;
      if (coords) {
        return `${base}/@${coords.lat},${coords.lng},14z`;
      }
      return base;
    },
    [coords]
  );

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
          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-3">
            <MapPin className="w-6 h-6 text-primary" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight">
            {language === "hi" ? "आस-पास कानूनी सहायता" : "Nearby Legal Aid"}
          </h1>
          <p className="text-sm text-muted mt-1">
            {language === "hi"
              ? "Google Maps पर पास के केंद्र खोजें"
              : "Find nearby centres on Google Maps"}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {categories.map((cat, i) => {
            const Icon = cat.icon;
            return (
              <div
                key={cat.id}
                className={`animate-fade-up delay-${Math.min(i, 7)}`}
              >
                <Card hover className="h-full">
                  <CardContent className="py-5 flex flex-col items-center text-center gap-3">
                    <div className={`w-14 h-14 rounded-2xl ${cat.color} flex items-center justify-center`}>
                      <Icon className="w-7 h-7" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-sm">{t(cat.label)}</h3>
                      <p className="text-xs text-muted mt-1">{t(cat.description)}</p>
                    </div>
                    <a
                      href={getMapsUrl(cat.query)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full"
                    >
                      <Button variant="outline" size="sm" className="w-full gap-1.5">
                        <MapPin className="w-3.5 h-3.5" />
                        {language === "hi" ? "पास में खोजें" : "Find Nearby"}
                        <ExternalLink className="w-3 h-3 ml-auto opacity-50" />
                      </Button>
                    </a>
                  </CardContent>
                </Card>
              </div>
            );
          })}
        </div>

        {coords && (
          <p className="text-xs text-muted text-center mt-6 animate-fade-up delay-3">
            {language === "hi"
              ? "आपकी लोकेशन का उपयोग बेहतर परिणामों के लिए किया जा रहा है"
              : "Using your location for better results"}
          </p>
        )}
      </main>
    </div>
  );
}
