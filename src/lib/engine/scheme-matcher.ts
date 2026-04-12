import type {
  GovernmentScheme,
  SchemeMatchProfile,
  ScoredScheme,
} from "@/types/schemes";
import type { BilingualText } from "@/types";

export function matchSchemes(
  schemes: GovernmentScheme[],
  profile: SchemeMatchProfile
): ScoredScheme[] {
  const results: ScoredScheme[] = [];

  for (const scheme of schemes) {
    const { tags } = scheme;
    const reasons: BilingualText[] = [];
    let score = 0;

    // ── Hard filters: skip if explicitly excluded ──
    if (tags.gender && tags.gender.length > 0 && !tags.gender.includes(profile.gender)) {
      continue;
    }
    if (
      tags.incomeBracket &&
      tags.incomeBracket.length > 0 &&
      !tags.incomeBracket.includes(profile.incomeBracket)
    ) {
      continue;
    }
    if (
      tags.casteCategory &&
      tags.casteCategory.length > 0 &&
      !tags.casteCategory.includes(profile.casteCategory)
    ) {
      continue;
    }
    if (
      tags.states &&
      tags.states.length > 0 &&
      !tags.states.includes(profile.state)
    ) {
      continue;
    }

    // ── Scoring ──
    if (
      profile.legalCategory &&
      tags.legalCategories?.includes(profile.legalCategory)
    ) {
      score += 30;
      reasons.push({
        en: `Relevant to your ${profile.legalCategory} situation`,
        hi: `आपकी ${profile.legalCategory} स्थिति से संबंधित`,
      });
    }

    if (profile.activeFlags && tags.checklistFlags) {
      const overlap = tags.checklistFlags.filter((f) =>
        profile.activeFlags!.includes(f)
      );
      if (overlap.length > 0) {
        score += 25;
        reasons.push({
          en: "Matches your specific legal needs",
          hi: "आपकी विशिष्ट कानूनी ज़रूरतों से मेल खाता है",
        });
      }
    }

    if (profile.riskLevel && tags.riskLevels?.includes(profile.riskLevel)) {
      score += 20;
      reasons.push({
        en: "Recommended for your risk level",
        hi: "आपके जोखिम स्तर के लिए अनुशंसित",
      });
    }

    if (tags.casteCategory?.includes(profile.casteCategory)) {
      score += 15;
      reasons.push({
        en: `Available for ${profile.casteCategory.toUpperCase()} category`,
        hi: `${profile.casteCategory.toUpperCase()} वर्ग के लिए उपलब्ध`,
      });
    }

    if (tags.incomeBracket?.includes(profile.incomeBracket)) {
      score += 10;
      reasons.push({
        en: "Matches your income bracket",
        hi: "आपकी आय वर्ग से मेल खाता है",
      });
    }

    if (!tags.states || tags.states.length === 0) {
      score += 5; // Central scheme — available everywhere
    }

    if (scheme.isPopular) {
      score += 5;
    }

    // Only include if score > 0 (at least one match)
    if (score > 0) {
      results.push({ scheme, relevanceScore: score, matchReasons: reasons });
    }
  }

  return results.sort((a, b) => b.relevanceScore - a.relevanceScore).slice(0, 15);
}
