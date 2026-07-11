"use client";

import { useEffect, useRef, useState } from "react";
import {
  Bell,
  Check,
  CircleAlert,
  CircleX,
  GitBranch,
  Palette,
  RefreshCw,
} from "lucide-react";
import { files } from "@/data/fileSystem";
import { themeOptions, useIdeStore } from "@/store/ideStore";
import type { FileLanguage } from "@/types/portfolio";

const languageLabels: Record<FileLanguage, string> = {
  tsx: "TypeScript React",
  ts: "TypeScript",
  js: "JavaScript",
  html: "HTML",
  css: "CSS",
  md: "Markdown",
  json: "JSON",
  java: "Java",
  py: "Python",
  pdf: "PDF",
};

function ThemePicker() {
  const { theme, setTheme } = useIdeStore();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const current = themeOptions.find((t) => t.id === theme) ?? themeOptions[0];

  useEffect(() => {
    if (!open) return;
    function onOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    function onEscape(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("mousedown", onOutside);
    document.addEventListener("keydown", onEscape);
    return () => {
      document.removeEventListener("mousedown", onOutside);
      document.removeEventListener("keydown", onEscape);
    };
  }, [open]);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-label="Select color theme"
        className="flex items-center gap-1 rounded-sm px-1.5 py-0.5 hover:bg-white/15"
      >
        <Palette size={11} aria-hidden />
        <span className="hidden sm:inline">{current.label}</span>
      </button>
      {open && (
        <div
          role="listbox"
          aria-label="Color themes"
          className="absolute bottom-7 right-0 z-50 w-44 rounded-md border border-border bg-surface py-1 font-mono shadow-2xl"
        >
          <p className="px-3 py-1 text-[10px] font-semibold uppercase tracking-wider text-text-3">
            Color Theme
          </p>
          {themeOptions.map((t) => (
            <button
              key={t.id}
              role="option"
              aria-selected={t.id === theme}
              onClick={() => {
                setTheme(t.id);
                setOpen(false);
              }}
              className={`flex w-full items-center gap-2 px-3 py-1.5 text-left text-xs ${
                t.id === theme
                  ? "bg-surface-hover text-text-1"
                  : "text-text-2 hover:bg-surface-hover hover:text-text-1"
              }`}
            >
              <span
                className="h-2.5 w-2.5 shrink-0 rounded-full"
                style={{ backgroundColor: t.dot }}
                aria-hidden
              />
              <span className="flex-1">{t.label}</span>
              {t.id === theme && <Check size={12} className="text-cyan" aria-hidden />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default function StatusBar() {
  const { activeTabId, setSidebarPanel } = useIdeStore();
  const [toast, setToast] = useState<string | null>(null);
  const file = files[activeTabId];
  const language = file ? languageLabels[file.language] : "Plain Text";
  // Decorative line/col derived from the active file id for variety
  const line = file ? (file.id.length % 40) + 1 : 1;

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2200);
  };

  return (
    <footer className="relative z-30 flex h-6 shrink-0 items-center justify-between bg-statusbar px-2 font-mono text-[11px] text-statusbar-text select-none">
      <div className="flex min-w-0 items-center gap-1">
        <button
          onClick={() => setSidebarPanel("source-control")}
          className="flex items-center gap-1 rounded-sm px-1.5 py-0.5 hover:bg-white/15"
          aria-label="Open source control panel"
        >
          <GitBranch size={11} aria-hidden /> main
        </button>
        <button
          onClick={() => showToast("Portfolio is up to date.")}
          className="hidden rounded-sm px-1 py-0.5 hover:bg-white/15 sm:block"
          aria-label="Sync status"
        >
          <RefreshCw size={11} aria-hidden />
        </button>
        <button
          onClick={() => showToast("No problems detected.")}
          className="flex items-center gap-1 rounded-sm px-1.5 py-0.5 hover:bg-white/15"
          aria-label="Errors and warnings"
        >
          <CircleX size={11} aria-hidden /> 0
          <CircleAlert size={11} aria-hidden /> 0
        </button>
      </div>

      <div className="flex items-center gap-0.5">
        <span className="hidden rounded-sm px-1.5 py-0.5 lg:block">Ln {line}, Col 1</span>
        <span className="hidden rounded-sm px-1.5 py-0.5 lg:block">Spaces: 2</span>
        <span className="hidden rounded-sm px-1.5 py-0.5 md:block">UTF-8</span>
        <button
          onClick={() => showToast(`Active language: ${language}`)}
          className="rounded-sm px-1.5 py-0.5 hover:bg-white/15"
          aria-label="Active file language"
        >
          {language}
        </button>
        <span className="hidden rounded-sm px-1.5 py-0.5 sm:block">Port: 3000</span>
        <ThemePicker />
        <button
          onClick={() => showToast("No new notifications.")}
          className="rounded-sm px-1 py-0.5 hover:bg-white/15"
          aria-label="Notifications"
        >
          <Bell size={11} aria-hidden />
        </button>
      </div>

      {toast && (
        <div
          role="status"
          className="absolute bottom-8 right-3 flex items-center gap-1.5 rounded border border-border bg-surface px-3 py-1.5 text-xs text-text-1 shadow-lg"
        >
          <Check size={12} className="text-success" aria-hidden />
          {toast}
        </div>
      )}
    </footer>
  );
}
