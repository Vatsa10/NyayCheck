import type { ReactNode } from "react";

type BadgeVariant = "low" | "medium" | "high" | "critical" | "default";

interface BadgeProps {
  variant?: BadgeVariant;
  children: ReactNode;
}

const variantClasses: Record<BadgeVariant, string> = {
  low: "bg-emerald-100 text-emerald-700",
  medium: "bg-amber-100 text-amber-700",
  high: "bg-red-100 text-red-700",
  critical: "bg-red-200 text-red-800 font-bold",
  default: "bg-gray-100 text-gray-700",
};

export function Badge({ variant = "default", children }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${variantClasses[variant]}`}
    >
      {children}
    </span>
  );
}
