"use client";

import { Blocks, CheckCircle2 } from "lucide-react";
import { techExtensions } from "@/data/portfolio";
import { useIdeStore } from "@/store/ideStore";

export default function ExtensionsPanel() {
  const openFile = useIdeStore((s) => s.openFile);

  return (
    <div className="flex h-full flex-col overflow-y-auto pb-4">
      <div className="px-4 pb-2 pt-3 text-[11px] font-semibold uppercase tracking-wider text-text-2">
        Extensions · Technologies
      </div>
      <div className="space-y-2 px-3">
        {techExtensions.map((ext) => (
          <div
            key={ext.name}
            className="rounded border border-border bg-editor p-2.5 transition-colors hover:border-cyan/40"
          >
            <div className="flex items-center gap-2">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded bg-surface">
                <Blocks size={16} className="text-cyan" aria-hidden />
              </span>
              <div className="min-w-0">
                <p className="truncate text-xs font-semibold text-text-1">{ext.name}</p>
                <p className="truncate text-[10px] text-text-3">{ext.category}</p>
              </div>
              <span className="ml-auto flex items-center gap-1 text-[10px] text-success">
                <CheckCircle2 size={11} aria-hidden /> Installed
              </span>
            </div>
            <p className="mt-1.5 text-[11px] leading-snug text-text-2">{ext.description}</p>
            <p className="mt-1 truncate text-[10px] text-text-3">
              Used in: {ext.relatedProjects.join(", ")}
            </p>
          </div>
        ))}
      </div>
      <button
        onClick={() => openFile("skills")}
        className="mx-3 mt-3 rounded border border-border px-3 py-1.5 text-xs text-text-2 hover:bg-surface-hover hover:text-text-1"
      >
        Open full skills.json
      </button>
    </div>
  );
}
