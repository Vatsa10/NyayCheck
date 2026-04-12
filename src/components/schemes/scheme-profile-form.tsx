"use client";

import { RadioGroup } from "@/components/ui/radio-group";
import { Button } from "@/components/ui/button";
import { useSchemeProfile } from "@/hooks/use-scheme-profile";
import { useLanguage } from "@/hooks/use-language";
import { indianStates } from "@/lib/utils/indian-states";
import { ArrowRight } from "lucide-react";

interface SchemeProfileFormProps {
  onComplete: () => void;
}

export function SchemeProfileForm({ onComplete }: SchemeProfileFormProps) {
  const t = useLanguage((s) => s.t);
  const language = useLanguage((s) => s.language);
  const {
    gender,
    incomeBracket,
    casteCategory,
    state,
    setGender,
    setIncomeBracket,
    setCasteCategory,
    setState,
    isComplete,
  } = useSchemeProfile();

  return (
    <div className="space-y-6">
      {/* Gender */}
      <div>
        <label className="block text-sm font-semibold mb-2">
          {language === "hi" ? "लिंग" : "Gender"}
        </label>
        <RadioGroup
          name="gender"
          options={[
            { value: "male", label: language === "hi" ? "पुरुष" : "Male" },
            { value: "female", label: language === "hi" ? "महिला" : "Female" },
            { value: "other", label: language === "hi" ? "अन्य" : "Other" },
          ]}
          value={gender || undefined}
          onChange={(v) => setGender(v as "male" | "female" | "other")}
        />
      </div>

      {/* Income */}
      <div>
        <label className="block text-sm font-semibold mb-2">
          {language === "hi"
            ? "वार्षिक पारिवारिक आय"
            : "Annual Family Income"}
        </label>
        <RadioGroup
          name="income"
          options={[
            { value: "bpl", label: language === "hi" ? "BPL / ₹1 लाख से कम" : "BPL / Below ₹1 Lakh" },
            { value: "below_3l", label: language === "hi" ? "₹1 - ₹3 लाख" : "₹1 - ₹3 Lakh" },
            { value: "below_5l", label: language === "hi" ? "₹3 - ₹5 लाख" : "₹3 - ₹5 Lakh" },
            { value: "below_8l", label: language === "hi" ? "₹5 - ₹8 लाख" : "₹5 - ₹8 Lakh" },
          ]}
          value={incomeBracket || undefined}
          onChange={(v) =>
            setIncomeBracket(
              v as "bpl" | "below_3l" | "below_5l" | "below_8l"
            )
          }
        />
      </div>

      {/* Category */}
      <div>
        <label className="block text-sm font-semibold mb-2">
          {language === "hi" ? "वर्ग" : "Category"}
        </label>
        <RadioGroup
          name="caste"
          options={[
            { value: "general", label: language === "hi" ? "सामान्य" : "General" },
            { value: "obc", label: "OBC" },
            { value: "sc", label: "SC" },
            { value: "st", label: "ST" },
            { value: "minority", label: language === "hi" ? "अल्पसंख्यक" : "Minority" },
          ]}
          value={casteCategory || undefined}
          onChange={(v) =>
            setCasteCategory(
              v as "general" | "obc" | "sc" | "st" | "minority"
            )
          }
        />
      </div>

      {/* State */}
      <div>
        <label className="block text-sm font-semibold mb-2">
          {language === "hi" ? "राज्य" : "State"}
        </label>
        <select
          value={state || ""}
          onChange={(e) => setState(e.target.value)}
          className="w-full p-3 rounded-xl border-2 border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all text-sm bg-white"
        >
          <option value="">
            {language === "hi" ? "राज्य चुनें..." : "Select state..."}
          </option>
          {indianStates.map((s) => (
            <option key={s.code} value={s.code}>
              {t(s.name)}
            </option>
          ))}
        </select>
      </div>

      <Button
        onClick={onComplete}
        disabled={!isComplete()}
        className="w-full"
        size="lg"
      >
        {language === "hi" ? "योजनाएं खोजें" : "Find Schemes"}
        <ArrowRight className="w-4 h-4" />
      </Button>
    </div>
  );
}
