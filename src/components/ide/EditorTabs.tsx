"use client";

import { X } from "lucide-react";
import { files } from "@/data/fileSystem";
import { useIdeStore } from "@/store/ideStore";
import FileIcon from "@/components/ide/FileIcon";

export default function EditorTabs() {
  const { openTabs, activeTabId, setActiveTab, closeTab } = useIdeStore();

  return (
    <div
      role="tablist"
      aria-label="Open editors"
      className="flex h-9 shrink-0 items-stretch overflow-x-auto border-b border-border bg-sidebar [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
    >
      {openTabs.map((id) => {
        const file = files[id];
        if (!file) return null;
        const active = id === activeTabId;
        return (
          <div
            key={id}
            className={`group relative flex shrink-0 items-stretch border-r border-border ${
              active ? "bg-editor" : "bg-sidebar hover:bg-surface-hover/50"
            }`}
          >
            {active && <span className="absolute inset-x-0 top-0 h-px bg-cyan" aria-hidden />}
            <button
              role="tab"
              aria-selected={active}
              onClick={() => setActiveTab(id)}
              onAuxClick={(e) => {
                if (e.button === 1) closeTab(id);
              }}
              className={`flex items-center gap-1.5 py-1 pl-3 pr-1 font-mono text-xs ${
                active ? "text-text-1" : "text-text-2"
              }`}
            >
              <FileIcon language={file.language} size={13} />
              <span className="max-w-40 truncate">{file.name}</span>
            </button>
            <button
              aria-label={`Close ${file.name}`}
              onClick={(e) => {
                e.stopPropagation();
                closeTab(id);
              }}
              className={`mr-1.5 self-center rounded p-0.5 text-text-3 hover:bg-surface-hover hover:text-text-1 ${
                active ? "" : "opacity-0 group-hover:opacity-100 focus-visible:opacity-100"
              }`}
            >
              <X size={13} aria-hidden />
            </button>
          </div>
        );
      })}
    </div>
  );
}
