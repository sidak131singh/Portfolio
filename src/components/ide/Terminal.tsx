"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import { asciiTree, fileIdFromName, rootListing } from "@/data/fileSystem";
import {
  achievements,
  education,
  experience,
  personalInfo,
  projects,
  skills,
  socialLinks,
} from "@/data/portfolio";
import { isTheme, themeOptions, useIdeStore } from "@/store/ideStore";
import { openExternal } from "@/lib/utils";

type LineKind = "input" | "output" | "error" | "success";

interface TerminalLine {
  id: number;
  kind: LineKind;
  text: string;
}

const PROMPT = "sidak@portfolio:~$";

const welcome: TerminalLine[] = [
  { id: -2, kind: "success", text: "Sidak Chahal Portfolio Terminal" },
  { id: -1, kind: "output", text: 'Type "help" to see available commands.' },
];

const helpText = `Available commands:
  help          show this list
  about         open about.html
  whoami        short professional introduction
  education     open education.md
  experience    list experience and open the section
  projects      list all projects
  skills        list skill categories
  achievements  list achievements
  contact       print email and social links
  resume        open resume.pdf
  github        open GitHub in a new tab
  linkedin      open LinkedIn in a new tab
  open <file>   open a file (e.g. open about.html)
  ls            list root files
  tree          print the portfolio file structure
  pwd           print working directory
  echo <text>   print text
  date          print the current date
  theme [name]  toggle theme, or set one ("theme list" shows all)
  clear         clear terminal (Ctrl+L)
  dino          launch the Dino mini-game`;

const staticTabs = {
  OUTPUT: [
    "[portfolio] Compiled successfully.",
    "[portfolio] All sections loaded from src/data/portfolio.ts",
    "[portfolio] 0 errors, 0 warnings.",
  ],
  "DEBUG CONSOLE": [
    "No active debug session.",
    'Tip: run the "dino" command in TERMINAL to start one.',
  ],
  PORTS: ["3000  portfolio  http://localhost:3000  (this site)"],
};

export default function Terminal() {
  const [lines, setLines] = useState<TerminalLine[]>(welcome);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [historyIdx, setHistoryIdx] = useState(-1);
  const [activeTab, setActiveTab] = useState<"TERMINAL" | keyof typeof staticTabs>("TERMINAL");
  const nextId = useRef(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const { openFile, setTerminalOpen, toggleTheme, setTheme, setDinoOpen, theme } = useIdeStore();

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [lines, activeTab]);

  useEffect(() => {
    const clear = () => setLines([]);
    window.addEventListener("sc-terminal-clear", clear);
    return () => window.removeEventListener("sc-terminal-clear", clear);
  }, []);

  const print = (text: string, kind: LineKind = "output") => {
    setLines((prev) => [
      ...prev,
      ...text.split("\n").map((t) => ({ id: nextId.current++, kind, text: t })),
    ]);
  };

  const runCommand = (raw: string) => {
    const trimmed = raw.trim();
    print(`${PROMPT} ${trimmed}`, "input");
    if (!trimmed) return;

    setHistory((h) => [trimmed, ...h]);
    setHistoryIdx(-1);

    const [cmd, ...args] = trimmed.split(/\s+/);
    const arg = args.join(" ");

    switch (cmd.toLowerCase()) {
      case "help":
        print(helpText);
        break;
      case "whoami":
        print(
          `${personalInfo.name} — ${personalInfo.roles.join(" · ")}\n${personalInfo.degree}, ${personalInfo.university} (graduating ${personalInfo.graduationYear})\n${personalInfo.availability}.`
        );
        break;
      case "about":
        print("Opening about.html ...", "success");
        print(personalInfo.introPrimary);
        openFile("about");
        break;
      case "education":
        print("Opening education.md ...", "success");
        print(
          education
            .map((e) => `${e.institution} — ${e.degree} (${e.scoreLabel}: ${e.score})`)
            .join("\n")
        );
        openFile("education");
        break;
      case "experience":
        print(
          experience.map((e) => `• ${e.role} @ ${e.organization} (${e.dates})`).join("\n")
        );
        print("Opening experience section ...", "success");
        openFile("experience");
        break;
      case "projects":
        print(
          projects
            .map((p) => `• ${p.title} [${p.status}] — ${p.technologies.join(", ")}`)
            .join("\n")
        );
        break;
      case "skills":
        print(
          Object.entries(skills)
            .map(([cat, list]) => `${cat}: ${list.join(", ")}`)
            .join("\n")
        );
        break;
      case "achievements":
        print(achievements.map((a) => `✓ ${a.text}`).join("\n"));
        break;
      case "contact":
        print(
          `email:    ${personalInfo.email}\ngithub:   ${socialLinks.github}\nlinkedin: ${socialLinks.linkedin}`
        );
        break;
      case "resume":
        print("Opening resume.pdf ...", "success");
        openFile("resume");
        break;
      case "github":
        print(`Opening ${socialLinks.github} in a new tab ...`, "success");
        openExternal(socialLinks.github);
        break;
      case "linkedin":
        print(`Opening ${socialLinks.linkedin} in a new tab ...`, "success");
        openExternal(socialLinks.linkedin);
        break;
      case "theme": {
        if (!arg) {
          toggleTheme();
          print(`theme ${theme === "light" ? "sidak-dark" : "light"}`, "success");
        } else if (arg === "list") {
          print(themeOptions.map((t) => `${t.id === theme ? "●" : "○"} ${t.id}`).join("\n"));
        } else if (isTheme(arg)) {
          setTheme(arg);
          print(`theme ${arg}`, "success");
        } else {
          print(
            `theme: unknown theme: ${arg}\nRun "theme list" to see available themes.`,
            "error"
          );
        }
        break;
      }
      case "open": {
        if (!arg) {
          print("usage: open <filename>   e.g. open about.html", "error");
          break;
        }
        const fileId = fileIdFromName(arg);
        if (fileId) {
          print(`Opening ${arg} ...`, "success");
          openFile(fileId);
        } else {
          print(`open: file not found: ${arg}\nRun "ls" or "tree" to see available files.`, "error");
        }
        break;
      }
      case "ls":
        print(rootListing.join("  "));
        break;
      case "tree":
        print(asciiTree);
        break;
      case "pwd":
        print("/home/sidak/portfolio");
        break;
      case "echo":
        print(arg);
        break;
      case "date":
        print(new Date().toString());
        break;
      case "clear":
        setLines([]);
        break;
      case "dino":
        print("Launching Dino mini-game ... good luck!", "success");
        setDinoOpen(true);
        break;
      default:
        print(
          `command not found: ${cmd}\nType "help" for available commands.`,
          "error"
        );
    }
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      runCommand(input);
      setInput("");
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      const next = Math.min(historyIdx + 1, history.length - 1);
      if (history[next] !== undefined) {
        setHistoryIdx(next);
        setInput(history[next]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      const next = historyIdx - 1;
      if (next < 0) {
        setHistoryIdx(-1);
        setInput("");
      } else {
        setHistoryIdx(next);
        setInput(history[next]);
      }
    } else if (e.key === "l" && e.ctrlKey) {
      e.preventDefault();
      setLines([]);
    }
  };

  const lineColor: Record<LineKind, string> = {
    input: "text-text-1",
    output: "text-text-2",
    error: "text-string",
    success: "text-success",
  };

  return (
    <motion.section
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: "auto", opacity: 1 }}
      exit={{ height: 0, opacity: 0 }}
      transition={{ duration: 0.18 }}
      aria-label="Integrated terminal"
      className="shrink-0 overflow-hidden border-t border-border bg-editor"
    >
      <div className="flex h-[45vh] flex-col md:h-[220px]">
        <div className="flex items-center justify-between border-b border-border px-2">
          <div className="flex items-center overflow-x-auto">
            {(["TERMINAL", "OUTPUT", "DEBUG CONSOLE", "PORTS"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                aria-selected={activeTab === tab}
                role="tab"
                className={`shrink-0 border-b-2 px-3 py-1.5 text-[11px] font-medium tracking-wide ${
                  activeTab === tab
                    ? "border-cyan text-text-1"
                    : "border-transparent text-text-3 hover:text-text-2"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
          <button
            onClick={() => setTerminalOpen(false)}
            aria-label="Close terminal"
            className="rounded p-1 text-text-3 hover:bg-surface-hover hover:text-text-1"
          >
            <X size={14} aria-hidden />
          </button>
        </div>

        {activeTab === "TERMINAL" ? (
          <div
            ref={scrollRef}
            className="flex-1 cursor-text overflow-y-auto px-3 py-2 font-mono text-xs leading-relaxed"
            onClick={() => inputRef.current?.focus()}
          >
            {lines.map((line) => (
              <p key={line.id} className={`whitespace-pre-wrap ${lineColor[line.kind]}`}>
                {line.text}
              </p>
            ))}
            <div className="flex items-center gap-1.5">
              <span className="shrink-0 text-success">{PROMPT}</span>
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={onKeyDown}
                aria-label="Terminal input"
                autoCapitalize="off"
                autoComplete="off"
                autoCorrect="off"
                spellCheck={false}
                className="min-w-0 flex-1 bg-transparent font-mono text-xs text-text-1 focus:outline-none"
              />
            </div>
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto px-3 py-2 font-mono text-xs leading-relaxed text-text-2">
            {staticTabs[activeTab].map((line) => (
              <p key={line}>{line}</p>
            ))}
          </div>
        )}
      </div>
    </motion.section>
  );
}
