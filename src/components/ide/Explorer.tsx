"use client";

import { ChevronDown, ChevronRight } from "lucide-react";
import { useState } from "react";
import { explorerTree, rootFolderName } from "@/data/fileSystem";
import { useIdeStore } from "@/store/ideStore";
import FileIcon from "@/components/ide/FileIcon";
import type { PortfolioFile } from "@/types/portfolio";

function FileRow({ file, depth }: { file: PortfolioFile; depth: number }) {
  const { activeTabId, openFile } = useIdeStore();
  const selected = activeTabId === file.id;

  return (
    <button
      role="treeitem"
      aria-selected={selected}
      onClick={() => openFile(file.id)}
      style={{ paddingLeft: `${depth * 14 + 22}px` }}
      className={`flex w-full items-center gap-1.5 py-1 pr-2 text-left text-[13px] leading-none ${
        selected
          ? "bg-surface-hover text-text-1"
          : "text-text-2 hover:bg-surface-hover/60 hover:text-text-1"
      }`}
    >
      <FileIcon language={file.language} size={14} />
      <span className="truncate font-mono">{file.name}</span>
    </button>
  );
}

export default function Explorer() {
  const { expandedFolders, toggleFolder } = useIdeStore();
  const [rootExpanded, setRootExpanded] = useState(true);

  return (
    <div className="flex h-full flex-col overflow-hidden">
      <div className="px-4 pb-1 pt-3 text-[11px] font-semibold uppercase tracking-wider text-text-2">
        Explorer
      </div>
      <div role="tree" aria-label="Portfolio files" className="flex-1 overflow-y-auto pb-4">
        <button
          role="treeitem"
          aria-expanded={rootExpanded}
          aria-selected={false}
          onClick={() => setRootExpanded(!rootExpanded)}
          className="flex w-full items-center gap-1 px-1.5 py-1 text-left text-[11px] font-bold uppercase tracking-wide text-text-1 hover:bg-surface-hover/60"
        >
          <ChevronDown
            size={14}
            className={`shrink-0 transition-transform duration-150 ${rootExpanded ? "" : "-rotate-90"}`}
            aria-hidden
          />
          <span className="truncate">{rootFolderName}</span>
        </button>

        {rootExpanded &&
          explorerTree.map((node) =>
            node.kind === "file" ? (
              <FileRow key={node.file.id} file={node.file} depth={0} />
            ) : (
              <div key={node.folder.id} role="group">
                <button
                  role="treeitem"
                  aria-expanded={!!expandedFolders[node.folder.id]}
                  aria-selected={false}
                  onClick={() => toggleFolder(node.folder.id)}
                  className="flex w-full items-center gap-1 py-1 pl-3 pr-2 text-left text-[13px] leading-none text-text-2 hover:bg-surface-hover/60 hover:text-text-1"
                >
                  <ChevronRight
                    size={14}
                    className={`shrink-0 transition-transform duration-150 ${
                      expandedFolders[node.folder.id] ? "rotate-90" : ""
                    }`}
                    aria-hidden
                  />
                  <span className="truncate font-mono font-medium">{node.folder.name}</span>
                </button>
                {expandedFolders[node.folder.id] &&
                  node.folder.children.map((file) => (
                    <FileRow key={file.id} file={file} depth={1} />
                  ))}
              </div>
            )
          )}
      </div>
    </div>
  );
}
