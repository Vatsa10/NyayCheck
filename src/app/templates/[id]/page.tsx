"use client";

import { use, useState, useMemo } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Scale, ArrowLeft, Copy, Share2, Check } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LanguageToggle } from "@/components/ui/language-toggle";
import { useLanguage } from "@/hooks/use-language";
import { getTemplateById } from "@/lib/legal/templates";
import { getWhatsAppShareUrl } from "@/lib/utils/share";

export default function TemplateFillPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const language = useLanguage((s) => s.language);
  const t = useLanguage((s) => s.t);

  const template = getTemplateById(id);
  if (!template) notFound();

  const [values, setValues] = useState<Record<string, string>>({});
  const [copied, setCopied] = useState(false);

  const filledText = useMemo(() => {
    let text = template.template[language];
    // Replace {{today}} with current date
    text = text.replace(
      /\{\{today\}\}/g,
      new Date().toLocaleDateString("en-IN", {
        day: "numeric",
        month: "long",
        year: "numeric",
      })
    );
    // Replace field placeholders
    for (const field of template.fields) {
      const val = values[field.id] || `[${t(field.label)}]`;
      text = text.replace(new RegExp(`\\{\\{${field.id}\\}\\}`, "g"), val);
    }
    return text;
  }, [values, template, language, t]);

  function handleCopy() {
    navigator.clipboard.writeText(filledText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="min-h-screen bg-white">
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-100/80">
        <div className="max-w-4xl mx-auto px-5 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/templates" className="p-1 rounded-lg hover:bg-gray-50 transition-colors">
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

      <main className="max-w-2xl mx-auto px-5 pt-24 pb-12">
        <h1 className="text-xl font-bold mb-6 animate-fade-up delay-0">
          {t(template.title)}
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Form */}
          <div className="space-y-4 animate-fade-up delay-1">
            <h2 className="text-sm font-semibold text-muted uppercase tracking-wide">
              {language === "hi" ? "अपनी जानकारी भरें" : "Fill Your Details"}
            </h2>
            {template.fields.map((field) => (
              <div key={field.id}>
                <label className="block text-sm font-medium mb-1">
                  {t(field.label)}
                  {field.required && <span className="text-red-500"> *</span>}
                </label>
                {field.type === "textarea" ? (
                  <textarea
                    value={values[field.id] || ""}
                    onChange={(e) =>
                      setValues({ ...values, [field.id]: e.target.value })
                    }
                    placeholder={field.placeholder}
                    rows={3}
                    className="w-full p-2.5 rounded-lg border border-gray-200 text-sm focus:border-primary focus:ring-1 focus:ring-primary/20 outline-none resize-none"
                  />
                ) : (
                  <input
                    type={field.type}
                    value={values[field.id] || ""}
                    onChange={(e) =>
                      setValues({ ...values, [field.id]: e.target.value })
                    }
                    placeholder={field.placeholder}
                    className="w-full p-2.5 rounded-lg border border-gray-200 text-sm focus:border-primary focus:ring-1 focus:ring-primary/20 outline-none"
                  />
                )}
              </div>
            ))}
          </div>

          {/* Preview */}
          <div className="animate-fade-up delay-2">
            <h2 className="text-sm font-semibold text-muted uppercase tracking-wide mb-2">
              {language === "hi" ? "पूर्वावलोकन" : "Preview"}
            </h2>
            <Card>
              <CardContent className="py-4">
                <pre className="whitespace-pre-wrap text-sm leading-relaxed font-sans">
                  {filledText}
                </pre>
              </CardContent>
            </Card>

            <div className="flex gap-2 mt-3">
              <Button
                variant="primary"
                size="sm"
                onClick={handleCopy}
                className="flex-1"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4" />
                    {language === "hi" ? "कॉपी हो गया!" : "Copied!"}
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    {language === "hi" ? "कॉपी करें" : "Copy Text"}
                  </>
                )}
              </Button>
              <a
                href={getWhatsAppShareUrl(filledText.slice(0, 1000))}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1"
              >
                <Button variant="outline" size="sm" className="w-full">
                  <Share2 className="w-4 h-4" />
                  WhatsApp
                </Button>
              </a>
            </div>
          </div>
        </div>

        <div className="mt-6 p-3 bg-amber-50 rounded-xl text-xs text-amber-800">
          {language === "hi"
            ? "* यह एक टेम्पलेट है। उपयोग से पहले कृपया वकील से परामर्श करें।"
            : "* This is a template. Please consult a lawyer before using."}
        </div>
      </main>
    </div>
  );
}
