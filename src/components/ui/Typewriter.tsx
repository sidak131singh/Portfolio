"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";

interface TypewriterProps {
  lines: string[];
  typeDelayMs?: number;
  deleteDelayMs?: number;
  holdMs?: number;
}

/**
 * Types a sentence word by word, holds it, then deletes it word by word
 * before moving to the next line. Shows the first line statically when
 * the user prefers reduced motion.
 */
export default function Typewriter({
  lines,
  typeDelayMs = 220,
  deleteDelayMs = 90,
  holdMs = 1800,
}: TypewriterProps) {
  const reduced = useReducedMotion();
  const [lineIndex, setLineIndex] = useState(0);
  const [wordCount, setWordCount] = useState(0);
  const [phase, setPhase] = useState<"typing" | "holding" | "deleting">("typing");

  const words = lines[lineIndex]?.split(" ") ?? [];

  useEffect(() => {
    if (reduced || lines.length === 0) return;

    let timeout: number;
    if (phase === "typing") {
      if (wordCount < words.length) {
        timeout = window.setTimeout(() => setWordCount((c) => c + 1), typeDelayMs);
      } else {
        timeout = window.setTimeout(() => setPhase("deleting"), holdMs);
      }
    } else if (phase === "deleting") {
      if (wordCount > 0) {
        timeout = window.setTimeout(() => setWordCount((c) => c - 1), deleteDelayMs);
      } else {
        timeout = window.setTimeout(() => {
          setLineIndex((i) => (i + 1) % lines.length);
          setPhase("typing");
        }, 350);
      }
    }
    return () => window.clearTimeout(timeout);
  }, [phase, wordCount, words.length, lines.length, reduced, typeDelayMs, deleteDelayMs, holdMs]);

  const text = reduced ? lines[0] : words.slice(0, wordCount).join(" ");

  return (
    <p className="flex min-h-6 items-baseline gap-1 font-mono text-sm text-text-2" aria-live="off">
      <span className="text-comment select-none" aria-hidden>
        {">"}
      </span>
      <span>
        <span className="text-text-1">{text}</span>
        <span className="cursor-blink ml-0.5 inline-block h-4 w-2 translate-y-0.5 bg-cyan" aria-hidden />
      </span>
    </p>
  );
}
