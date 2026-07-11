"use client";

import { Check } from "lucide-react";
import { themeOptions, useIdeStore } from "@/store/ideStore";

export default function SettingsPanel() {
  const { theme, setTheme, terminalOpen, toggleTerminal, sidebarOpen } = useIdeStore();

  return (
    <div className="flex h-full flex-col overflow-y-auto pb-4">
      <div className="px-4 pb-2 pt-3 text-[11px] font-semibold uppercase tracking-wider text-text-2">
        Settings
      </div>

      <div className="px-4">
        <p className="mb-1.5 text-xs font-medium text-text-1">Color Theme</p>
        <div className="space-y-1" role="radiogroup" aria-label="Color theme">
          {themeOptions.map((t) => (
            <button
              key={t.id}
              role="radio"
              aria-checked={theme === t.id}
              onClick={() => setTheme(t.id)}
              className={`flex w-full items-center gap-2 rounded border px-3 py-2 text-left text-xs ${
                theme === t.id
                  ? "border-cyan bg-surface-hover text-text-1"
                  : "border-border text-text-2 hover:bg-surface-hover"
              }`}
            >
              <span
                className="h-3 w-3 shrink-0 rounded-full"
                style={{ backgroundColor: t.dot }}
                aria-hidden
              />
              <span className="flex-1">{t.label}</span>
              {theme === t.id && <Check size={13} className="text-cyan" aria-hidden />}
            </button>
          ))}
        </div>

        <p className="mb-1.5 mt-4 text-xs font-medium text-text-1">Panels</p>
        <label className="flex items-center justify-between rounded border border-border px-3 py-2 text-xs text-text-2">
          Integrated terminal
          <input
            type="checkbox"
            checked={terminalOpen}
            onChange={toggleTerminal}
            className="accent-[var(--accent-primary)]"
            aria-label="Toggle integrated terminal"
          />
        </label>

        <p className="mt-4 text-[11px] leading-relaxed text-text-3">
          Theme preference is saved to your browser. Sidebar is currently{" "}
          {sidebarOpen ? "visible" : "hidden"} — toggle it with Ctrl/Cmd+B. You can also switch
          themes from the status bar or with the terminal command{" "}
          <span className="font-mono text-cyan">theme list</span>.
        </p>
      </div>
    </div>
  );
}
