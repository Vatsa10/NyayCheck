"use client";

import Link from "next/link";
import {
  Home,
  Building2,
  ShoppingBag,
  Briefcase,
  Heart,
  ShoppingCart,
  Shield,
  Banknote,
  Siren,
  Car,
  UserRound,
  HandHelping,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { categories } from "@/lib/legal/categories";
import { useLanguage } from "@/hooks/use-language";
import type { CategoryDefinition } from "@/types";

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
  Car,
  UserRound,
  HandHelping,
};

function CategoryCard({ category }: { category: CategoryDefinition }) {
  const t = useLanguage((s) => s.t);
  const Icon = iconMap[category.icon] || Shield;

  return (
    <Link href={`/check/${category.id}`}>
      <Card hover className="h-full">
        <CardContent className="flex flex-col items-center text-center gap-3 p-6">
          <div
            className={`w-14 h-14 rounded-2xl ${category.color} flex items-center justify-center`}
          >
            <Icon className="w-7 h-7 text-white" />
          </div>
          <h3 className="font-semibold text-lg">{t(category.name)}</h3>
          <p className="text-sm text-muted leading-relaxed">
            {t(category.description)}
          </p>
        </CardContent>
      </Card>
    </Link>
  );
}

export function CategoryGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {categories.map((cat) => (
        <CategoryCard key={cat.id} category={cat} />
      ))}
    </div>
  );
}
