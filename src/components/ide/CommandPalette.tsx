"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { files } from "@/data/fileSystem";
import { socialLinks } from "@/data/portfolio";
import { useIdeStore } from "@/store/ideStore";
import { openExternal } from "@/lib/utils";
import FileIcon from "@/components/ide/FileIcon";

interface PaletteCommand {
  id: string;
  label: string;
  action: () => void;
}

/** Simple subsequence fuzzy match, e.g. "opb" matches "Open Product Browser". */
function fuzzyMatch(query: string, target: string): boolean {
  const q = query.toLowerCase().replace(/\s/g, "");
  const t = target.toLowerCase();
  let qi = 0;
  for (let ti = 0; ti < t.length && qi < q.length; ti++) {
    if (t[ti] === q[qi]) qi++;
  }
  return qi === q.length;
}

function buildCommands(mode: "commands" | "files"): PaletteCommand[] {
  const s = () => useIdeStore.getState();
  if (mode === "files") {
    return Object.values(files).map((f) => ({
      id: f.id,
      label: f.name,
      action: () => s().openFile(f.id),
    }));
  }
  return [
    { id: "home", label: "Go to Home", action: () => s().openFile("home") },
    { id: "about", label: "Open About", action: () => s().openFile("about") },
    { id: "experience", label: "Open Experience", action: () => s().openFile("experience") },
    { id: "projects", label: "Open Projects", action: () => s().openFile("projects-overview") },
    { id: "skills", label: "Open Skills", action: () => s().openFile("skills") },
    { id: "education", label: "Open Education", action: () => s().openFile("education") },
    { id: "achievements", label: "Open Achievements", action: () => s().openFile("achievements") },
    { id: "contact", label: "Open Contact", action: () => s().openFile("contact") },
    { id: "resume", label: "Open Resume", action: () => s().openFile("resume") },
    { id: "toggle-explorer", label: "Toggle Explorer", action: () => s().toggleSidebar() },
    { id: "toggle-terminal", label: "Toggle Terminal", action: () => s().toggleTerminal() },
    { id: "toggle-theme", label: "Toggle Theme", action: () => s().toggleTheme() },
    { id: "assistant", label: "Open Portfolio Assistant", action: () => s().setAssistantOpen(true) },
    { id: "dino", label: "Start Dino Game", action: () => s().setDinoOpen(true) },
    {
      id: "download-resume",
      label: "Download Resume",
      action: () => {
        const a = document.createElement("a");
        a.href = "/resume.pdf";
        a.download = "Sidak-Singh-Chahal-Resume.pdf";
        a.click();
      },
    },
    { id: "github", label: "Open GitHub", action: () => openExternal(socialLinks.github) },
    { id: "linkedin", label: "Open LinkedIn", action: () => openExternal(socialLinks.linkedin) },
  ];
}

/** Inner content is remounted every time the palette opens, so state resets naturally. */
function PaletteContent({
  mode,
  onClose,
}: {
  mode: "commands" | "files";
  onClose: () => void;
}) {
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(0);
  const listRef = useRef<HTMLDivElement>(null);

  const commands = useMemo(() => buildCommands(mode), [mode]);
  const filtered = useMemo(
    () => (query ? commands.filter((c) => fuzzyMatch(query, c.label)) : commands),
    [commands, query]
  );
  const activeIndex = Math.min(selected, Math.max(filtered.length - 1, 0));

  useEffect(() => {
    listRef.current
      ?.querySelector('[data-selected="true"]')
      ?.scrollIntoView({ block: "nearest" });
  }, [activeIndex]);

  const run = (cmd: PaletteCommand) => {
    onClose();
    cmd.action();
  };

  return (
    <>
      <input
        autoFocus
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setSelected(0);
        }}
        onKeyDown={(e) => {
          if (e.key === "ArrowDown") {
            e.preventDefault();
            setSelected(Math.min(activeIndex + 1, filtered.length - 1));
          } else if (e.key === "ArrowUp") {
            e.preventDefault();
            setSelected(Math.max(activeIndex - 1, 0));
          } else if (e.key === "Enter" && filtered[activeIndex]) {
            run(filtered[activeIndex]);
          }
        }}
        placeholder={mode === "files" ? "Search files by name..." : "> Type a command..."}
        aria-label="Palette input"
        className="w-full border-b border-border bg-transparent px-4 py-3 font-mono text-sm text-text-1 placeholder:text-text-3 focus:outline-none"
      />
      <div ref={listRef} role="listbox" aria-label="Results" className="max-h-72 overflow-y-auto py-1">
        {filtered.length === 0 && (
          <p className="px-4 py-3 text-sm text-text-3">No matching commands.</p>
        )}
        {filtered.map((cmd, i) => {
          const file = mode === "files" ? files[cmd.id] : undefined;
          return (
            <button
              key={cmd.id}
              role="option"
              aria-selected={i === activeIndex}
              data-selected={i === activeIndex}
              onClick={() => run(cmd)}
              onMouseEnter={() => setSelected(i)}
              className={`flex w-full items-center gap-2 px-4 py-1.5 text-left font-mono text-[13px] ${
                i === activeIndex ? "bg-blue text-white" : "text-text-2"
              }`}
            >
              {file ? (
                <FileIcon language={file.language} size={14} />
              ) : (
                <ChevronRight size={13} className="shrink-0 opacity-60" aria-hidden />
              )}
              {cmd.label}
            </button>
          );
        })}
      </div>
    </>
  );
}

export default function CommandPalette() {
  const { paletteOpen, paletteMode, closePalette } = useIdeStore();

  return (
    <AnimatePresence>
      {paletteOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.12 }}
          className="fixed inset-0 z-[70] bg-black/40"
          onClick={closePalette}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.98, y: -8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: -8 }}
            transition={{ duration: 0.12 }}
            role="dialog"
            aria-modal="true"
            aria-label={paletteMode === "files" ? "Quick file open" : "Command palette"}
            className="mx-auto mt-[10vh] w-[min(600px,92vw)] overflow-hidden rounded-lg border border-border bg-surface shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <PaletteContent mode={paletteMode} onClose={closePalette} />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
