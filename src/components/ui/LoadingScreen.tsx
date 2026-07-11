"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const bootLines = [
  "Initializing workspace...",
  "Loading sidak-chahal-portfolio...",
  "Resolving dependencies...",
  "Starting dev server on port 3000...",
];

/** Brief IDE-style boot animation shown once while the workspace mounts. */
export default function LoadingScreen({ onDone }: { onDone: () => void }) {
  const [lineCount, setLineCount] = useState(1);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      onDone();
      return;
    }
    const interval = setInterval(() => {
      setLineCount((c) => {
        if (c >= bootLines.length) {
          clearInterval(interval);
          setTimeout(onDone, 250);
          return c;
        }
        return c + 1;
      });
    }, 220);
    return () => clearInterval(interval);
  }, [onDone]);

  return (
    <motion.div
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center gap-6 bg-background"
    >
      <div className="flex h-16 w-16 items-center justify-center rounded-xl border border-border bg-surface font-mono text-2xl font-bold">
        <span className="bg-gradient-to-r from-cyan to-violet bg-clip-text text-transparent">
          SC
        </span>
      </div>
      <div className="w-72 font-mono text-xs text-text-2" aria-live="polite">
        {bootLines.slice(0, lineCount).map((line) => (
          <p key={line} className="py-0.5">
            <span className="text-success">✓</span> {line}
          </p>
        ))}
      </div>
    </motion.div>
  );
}
