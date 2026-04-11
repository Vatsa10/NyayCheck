"use client";

import type { RiskLevel } from "@/types";

interface ScoreRingProps {
  score: number;
  riskLevel: RiskLevel;
  size?: number;
}

const riskColors: Record<RiskLevel, string> = {
  low: "#10b981",
  medium: "#f59e0b",
  high: "#ef4444",
  critical: "#dc2626",
};

export function ScoreRing({ score, riskLevel, size = 160 }: ScoreRingProps) {
  const strokeWidth = 10;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;
  const color = riskColors[riskLevel];

  return (
    <div className="relative inline-flex items-center justify-center">
      <svg width={size} height={size} className="-rotate-90">
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#e5e7eb"
          strokeWidth={strokeWidth}
          fill="none"
        />
        {/* Score arc */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={color}
          strokeWidth={strokeWidth}
          fill="none"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className="transition-all duration-1000 ease-out"
          style={{ animation: "score-fill 1.2s ease-out" }}
        />
      </svg>
      {/* Score number */}
      <div className="absolute flex flex-col items-center">
        <span className="text-4xl font-bold" style={{ color }}>
          {score}
        </span>
        <span className="text-sm text-muted">/100</span>
      </div>
    </div>
  );
}
