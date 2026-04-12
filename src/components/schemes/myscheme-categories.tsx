"use client";

import {
  Wheat,
  Landmark,
  Briefcase,
  GraduationCap,
  HeartPulse,
  Home,
  Shield,
  Cpu,
  Wrench,
  Users,
  Trophy,
  Car,
  Plane,
  Droplets,
  Baby,
} from "lucide-react";
import { useLanguage } from "@/hooks/use-language";

interface MySchemeCategory {
  name: string;
  nameHi: string;
  count: number;
  slug: string; // URL-encoded category for myscheme.gov.in
  icon: React.ElementType;
  color: string;
}

const MYSCHEME_CATEGORIES: MySchemeCategory[] = [
  {
    name: "Social Welfare & Empowerment",
    nameHi: "सामाजिक कल्याण और सशक्तिकरण",
    count: 1450,
    slug: "Social%20welfare%20%26%20Empowerment",
    icon: Users,
    color: "bg-rose-500",
  },
  {
    name: "Education & Learning",
    nameHi: "शिक्षा और सीखना",
    count: 1088,
    slug: "Education%20%26%20Learning",
    icon: GraduationCap,
    color: "bg-blue-500",
  },
  {
    name: "Agriculture, Rural & Environment",
    nameHi: "कृषि, ग्रामीण और पर्यावरण",
    count: 838,
    slug: "Agriculture,Rural%20%26%20Environment",
    icon: Wheat,
    color: "bg-green-500",
  },
  {
    name: "Business & Entrepreneurship",
    nameHi: "व्यापार और उद्यमिता",
    count: 736,
    slug: "Business%20%26%20Entrepreneurship",
    icon: Briefcase,
    color: "bg-amber-500",
  },
  {
    name: "Women and Child",
    nameHi: "महिला और बाल",
    count: 464,
    slug: "Women%20and%20Child",
    icon: Baby,
    color: "bg-pink-500",
  },
  {
    name: "Skills & Employment",
    nameHi: "कौशल और रोज़गार",
    count: 391,
    slug: "Skills%20%26%20Employment",
    icon: Wrench,
    color: "bg-indigo-500",
  },
  {
    name: "Banking & Financial Services",
    nameHi: "बैंकिंग और वित्तीय सेवाएं",
    count: 324,
    slug: "Banking,Financial%20Services%20and%20Insurance",
    icon: Landmark,
    color: "bg-emerald-500",
  },
  {
    name: "Health & Wellness",
    nameHi: "स्वास्थ्य और कल्याण",
    count: 287,
    slug: "Health%20%26%20Wellness",
    icon: HeartPulse,
    color: "bg-red-500",
  },
  {
    name: "Sports & Culture",
    nameHi: "खेल और संस्कृति",
    count: 259,
    slug: "Sports%20%26%20Culture",
    icon: Trophy,
    color: "bg-orange-500",
  },
  {
    name: "Housing & Shelter",
    nameHi: "आवास और आश्रय",
    count: 133,
    slug: "Housing%20%26%20Shelter",
    icon: Home,
    color: "bg-cyan-500",
  },
  {
    name: "Science, IT & Communications",
    nameHi: "विज्ञान, IT और संचार",
    count: 108,
    slug: "Science,%20IT%20%26%20Communications",
    icon: Cpu,
    color: "bg-violet-500",
  },
  {
    name: "Transport & Infrastructure",
    nameHi: "परिवहन और बुनियादी ढांचा",
    count: 99,
    slug: "Transport%20%26%20Infrastructure",
    icon: Car,
    color: "bg-slate-500",
  },
  {
    name: "Travel & Tourism",
    nameHi: "यात्रा और पर्यटन",
    count: 97,
    slug: "Travel%20%26%20Tourism",
    icon: Plane,
    color: "bg-sky-500",
  },
  {
    name: "Utility & Sanitation",
    nameHi: "उपयोगिता और स्वच्छता",
    count: 58,
    slug: "Utility%20%26%20Sanitation",
    icon: Droplets,
    color: "bg-teal-500",
  },
  {
    name: "Public Safety, Law & Justice",
    nameHi: "सार्वजनिक सुरक्षा, कानून और न्याय",
    count: 33,
    slug: "Public%20Safety,Law%20%26%20Justice",
    icon: Shield,
    color: "bg-primary",
  },
];

export function MySchemeCategoryGrid() {
  const language = useLanguage((s) => s.language);

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-lg font-semibold">
            {language === "hi"
              ? "सभी सरकारी योजनाएं ब्राउज़ करें"
              : "Browse All Government Schemes"}
          </h2>
          <p className="text-xs text-muted mt-0.5">
            {language === "hi"
              ? "myScheme.gov.in से 5,000+ योजनाएं"
              : "5,000+ schemes via myScheme.gov.in"}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
        {MYSCHEME_CATEGORIES.map((cat) => {
          const Icon = cat.icon;
          return (
            <a
              key={cat.slug}
              href={`https://www.myscheme.gov.in/search/category/${cat.slug}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-start gap-2.5 p-3 rounded-xl border border-gray-100 bg-white transition-[transform,box-shadow,border-color] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] hover:shadow-md hover:shadow-gray-200/50 hover:-translate-y-0.5 hover:border-gray-200 active:scale-[0.97]"
            >
              <div
                className={`w-8 h-8 rounded-lg ${cat.color} flex items-center justify-center flex-shrink-0 transition-transform duration-200 group-hover:scale-110`}
              >
                <Icon className="w-4 h-4 text-white" />
              </div>
              <div className="min-w-0">
                <p className="text-xs font-mono text-emerald-600">
                  {cat.count} {language === "hi" ? "योजनाएं" : "schemes"}
                </p>
                <p className="text-sm font-medium leading-tight truncate">
                  {language === "hi" ? cat.nameHi : cat.name}
                </p>
              </div>
            </a>
          );
        })}
      </div>
    </div>
  );
}
