"use client";

import { Volume2, VolumeX } from "lucide-react";
import { useTTS } from "@/hooks/use-tts";
import { useLanguage } from "@/hooks/use-language";

interface AudioButtonProps {
  text: string;
}

export function AudioButton({ text }: AudioButtonProps) {
  const { speak, stop, isSpeaking } = useTTS();
  const language = useLanguage((s) => s.language);

  return (
    <button
      onClick={() => (isSpeaking ? stop() : speak(text, language))}
      className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-gray-200 text-sm font-medium text-muted hover:bg-gray-50 transition-colors"
      aria-label={isSpeaking ? "Stop listening" : "Listen"}
    >
      {isSpeaking ? (
        <>
          <VolumeX className="w-4 h-4" />
          <span>Stop</span>
        </>
      ) : (
        <>
          <Volume2 className="w-4 h-4" />
          <span>{language === "hi" ? "सुनें" : "Listen"}</span>
        </>
      )}
    </button>
  );
}
