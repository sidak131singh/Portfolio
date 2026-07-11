"use client";

import { ReactNode } from "react";

interface TooltipProps {
  label: string;
  side?: "right" | "top" | "bottom";
  children: ReactNode;
}

/** Lightweight CSS-only tooltip wrapper (no positioning library needed). */
export default function Tooltip({ label, side = "right", children }: TooltipProps) {
  const position =
    side === "right"
      ? "left-full top-1/2 -translate-y-1/2 ml-2"
      : side === "top"
        ? "bottom-full left-1/2 -translate-x-1/2 mb-2"
        : "top-full left-1/2 -translate-x-1/2 mt-2";

  return (
    <span className="relative inline-flex group/tt">
      {children}
      <span
        role="tooltip"
        className={`pointer-events-none absolute ${position} z-50 whitespace-nowrap rounded border border-border bg-surface px-2 py-1 text-xs text-text-1 opacity-0 shadow-lg transition-opacity duration-100 group-hover/tt:opacity-100 group-focus-within/tt:opacity-100`}
      >
        {label}
      </span>
    </span>
  );
}
