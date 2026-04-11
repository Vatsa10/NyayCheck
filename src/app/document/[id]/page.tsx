"use client";

import { use, useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  Scale,
  ArrowLeft,
  Download,
  Share2,
  FileText,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { AudioButton } from "@/components/ui/audio-button";
import { LanguageToggle } from "@/components/ui/language-toggle";
import { useStrings, useLanguage } from "@/hooks/use-language";
import { getWhatsAppShareUrl } from "@/lib/utils/share";

interface DocData {
  documentId: string;
  title: string;
  contentHtml: string;
  contentText: string;
}

export default function DocumentPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id: reportId } = use(params);
  const searchParams = useSearchParams();
  const docType = searchParams.get("type") || "legal_notice";

  const strings = useStrings();
  const language = useLanguage((s) => s.language);

  const [doc, setDoc] = useState<DocData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    fetch("/api/document/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        reportId,
        documentType: docType,
        language,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          setError(data.error);
        } else {
          setDoc(data);
        }
      })
      .catch(() => setError("Failed to generate document"))
      .finally(() => setLoading(false));
  }, [reportId, docType, language]);

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link
              href={`/report/${reportId}`}
              className="p-1 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-muted" />
            </Link>
            <div className="flex items-center gap-2">
              <Scale className="w-5 h-5 text-primary" />
              <span className="font-bold text-primary">{strings.app.name}</span>
            </div>
          </div>
          <LanguageToggle />
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-8">
        {loading && (
          <Card>
            <CardContent className="py-16 text-center">
              <Loader2 className="w-10 h-10 text-primary animate-spin mx-auto mb-4" />
              <h2 className="text-lg font-semibold mb-2">
                {language === "hi"
                  ? "AI दस्तावेज़ जनरेट कर रहा है..."
                  : "AI is generating your document..."}
              </h2>
              <p className="text-sm text-muted">
                {language === "hi"
                  ? "आपकी स्थिति के अनुसार कानूनी दस्तावेज़ तैयार किया जा रहा है"
                  : "Drafting a legal document tailored to your situation"}
              </p>
            </CardContent>
          </Card>
        )}

        {error && (
          <Card>
            <CardContent className="py-12 text-center">
              <p className="text-danger font-semibold mb-4">{error}</p>
              <Link href={`/report/${reportId}`}>
                <Button variant="outline">
                  <ArrowLeft className="w-4 h-4" />
                  {language === "hi" ? "रिपोर्ट पर वापस" : "Back to Report"}
                </Button>
              </Link>
            </CardContent>
          </Card>
        )}

        {doc && (
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <FileText className="w-5 h-5 text-primary" />
                <h1 className="text-xl font-bold">{doc.title}</h1>
              </div>
              <p className="text-xs text-muted">
                {language === "hi"
                  ? "AI-जनित प्रारूप। भेजने से पहले वकील से परामर्श करें।"
                  : "AI-generated draft. Consult a lawyer before sending."}
              </p>
            </div>

            {/* Document Preview */}
            <Card>
              <CardContent className="py-6">
                <div
                  className="prose prose-sm max-w-none"
                  dangerouslySetInnerHTML={{ __html: doc.contentHtml }}
                />
              </CardContent>
            </Card>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href={getWhatsAppShareUrl(doc.contentText)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1"
              >
                <Button variant="secondary" className="w-full">
                  <Share2 className="w-4 h-4" />
                  {strings.report.share}
                </Button>
              </a>
              <div className="flex-1">
                <AudioButton text={doc.contentText} />
              </div>
            </div>

            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
              <p className="text-sm text-amber-800 font-medium">
                {language === "hi"
                  ? "⚠️ यह AI द्वारा बनाया गया प्रारूप है। कृपया भेजने से पहले किसी वकील से जांच करवाएं। [आपका नाम] और [पता] जैसे प्लेसहोल्डर भरना न भूलें।"
                  : "⚠️ This is an AI-generated draft. Please have it reviewed by a lawyer before sending. Don't forget to fill in placeholders like [YOUR NAME] and [ADDRESS]."}
              </p>
            </div>

            <Link href={`/report/${reportId}`}>
              <Button variant="outline" className="w-full">
                <ArrowLeft className="w-4 h-4" />
                {language === "hi" ? "रिपोर्ट पर वापस" : "Back to Report"}
              </Button>
            </Link>
          </div>
        )}
      </main>
    </div>
  );
}
