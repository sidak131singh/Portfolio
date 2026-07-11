"use client";

import { useEffect, useRef, useState } from "react";
import { Moon, PanelsTopLeft, Search, Sun } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/BrandIcons";
import { useIdeStore } from "@/store/ideStore";
import { openExternal } from "@/lib/utils";
import { socialLinks } from "@/data/portfolio";
import Tooltip from "@/components/ui/Tooltip";

interface MenuItem {
  label: string;
  action: () => void;
}

export default function MenuBar({
  onShowShortcuts,
  onShowAbout,
}: {
  onShowShortcuts: () => void;
  onShowAbout: () => void;
}) {
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const {
    openFile,
    toggleSidebar,
    toggleTerminal,
    setTerminalOpen,
    openPalette,
    toggleTheme,
    theme,
  } = useIdeStore();

  useEffect(() => {
    function onOutside(e: MouseEvent) {
      if (barRef.current && !barRef.current.contains(e.target as Node)) {
        setOpenMenu(null);
      }
    }
    function onEscape(e: KeyboardEvent) {
      if (e.key === "Escape") setOpenMenu(null);
    }
    document.addEventListener("mousedown", onOutside);
    document.addEventListener("keydown", onEscape);
    return () => {
      document.removeEventListener("mousedown", onOutside);
      document.removeEventListener("keydown", onEscape);
    };
  }, []);

  const downloadResume = () => {
    const a = document.createElement("a");
    a.href = "/resume.pdf";
    a.download = "Sidak-Singh-Chahal-Resume.pdf";
    a.click();
  };

  const menus: Record<string, MenuItem[]> = {
    File: [
      { label: "Open Home", action: () => openFile("home") },
      { label: "Open Resume", action: () => openFile("resume") },
      { label: "Open Projects", action: () => openFile("projects-overview") },
      { label: "Download Resume", action: downloadResume },
    ],
    Edit: [
      { label: "Find in Portfolio", action: () => useIdeStore.getState().setSidebarPanel("search") },
      { label: "Copy Email", action: () => navigator.clipboard?.writeText("sidak99273@gmail.com").catch(() => undefined) },
    ],
    Selection: [
      { label: "Select Featured Projects", action: () => openFile("projects-overview") },
      { label: "Select All Skills", action: () => openFile("skills") },
    ],
    View: [
      { label: "Toggle Explorer", action: toggleSidebar },
      { label: "Toggle Terminal", action: toggleTerminal },
      { label: "Open Command Palette", action: () => openPalette("commands") },
      { label: "Toggle Theme", action: toggleTheme },
    ],
    Go: [
      { label: "Home", action: () => openFile("home") },
      { label: "About", action: () => openFile("about") },
      { label: "Experience", action: () => openFile("experience") },
      { label: "Projects", action: () => openFile("projects-overview") },
      { label: "Skills", action: () => openFile("skills") },
      { label: "Contact", action: () => openFile("contact") },
    ],
    Run: [
      { label: "Start Dino Game", action: () => useIdeStore.getState().setDinoOpen(true) },
      { label: "Open Live SheStarts", action: () => openExternal("https://careercompass-chi-two.vercel.app/") },
      { label: "Open Live Product Browser", action: () => openExternal("https://product-browser-k1p7.onrender.com/") },
    ],
    Terminal: [
      { label: "New Terminal", action: () => setTerminalOpen(true) },
      { label: "Clear Terminal", action: () => window.dispatchEvent(new CustomEvent("sc-terminal-clear")) },
      { label: "Close Terminal", action: () => setTerminalOpen(false) },
    ],
    Help: [
      { label: "About This Portfolio", action: onShowAbout },
      { label: "GitHub Profile", action: () => openExternal(socialLinks.github) },
      { label: "LinkedIn Profile", action: () => openExternal(socialLinks.linkedin) },
      { label: "Keyboard Shortcuts", action: onShowShortcuts },
    ],
  };

  return (
    <header
      ref={barRef}
      className="relative z-40 flex h-8 shrink-0 items-center justify-between border-b border-border bg-sidebar px-2 select-none"
    >
      <div className="flex items-center gap-0.5">
        <span
          className="mr-1 flex h-5 w-5 items-center justify-center rounded bg-gradient-to-br from-cyan to-violet font-mono text-[10px] font-bold text-black"
          aria-hidden
        >
          SC
        </span>
        <nav aria-label="Application menu" className="hidden items-center md:flex">
          {Object.keys(menus).map((name) => (
            <div key={name} className="relative">
              <button
                className={`rounded px-2 py-0.5 text-xs ${
                  openMenu === name
                    ? "bg-surface-hover text-text-1"
                    : "text-text-2 hover:bg-surface-hover hover:text-text-1"
                }`}
                aria-expanded={openMenu === name}
                aria-haspopup="menu"
                onClick={() => setOpenMenu(openMenu === name ? null : name)}
                onMouseEnter={() => openMenu && setOpenMenu(name)}
              >
                {name}
              </button>
              {openMenu === name && (
                <div
                  role="menu"
                  className="absolute left-0 top-full mt-0.5 min-w-52 rounded-md border border-border bg-surface py-1 shadow-xl"
                >
                  {menus[name].map((item) => (
                    <button
                      key={item.label}
                      role="menuitem"
                      className="block w-full px-3 py-1.5 text-left text-xs text-text-2 hover:bg-blue hover:text-white"
                      onClick={() => {
                        setOpenMenu(null);
                        item.action();
                      }}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>
      </div>

      <button
        className="hidden min-w-0 max-w-xs flex-1 items-center justify-center gap-2 rounded border border-border bg-surface px-3 py-0.5 text-xs text-text-2 hover:bg-surface-hover sm:flex md:max-w-sm"
        onClick={() => openPalette("files")}
        aria-label="Search files (Ctrl+P)"
      >
        <Search size={11} aria-hidden />
        <span className="truncate font-mono">sidak-chahal / portfolio</span>
      </button>

      <div className="flex items-center gap-0.5">
        <Tooltip label="Toggle layout" side="bottom">
          <button
            className="rounded p-1.5 text-text-2 hover:bg-surface-hover hover:text-text-1"
            onClick={toggleSidebar}
            aria-label="Toggle sidebar layout"
          >
            <PanelsTopLeft size={14} aria-hidden />
          </button>
        </Tooltip>
        <Tooltip label={theme === "light" ? "Dark theme" : "Light theme"} side="bottom">
          <button
            className="rounded p-1.5 text-text-2 hover:bg-surface-hover hover:text-text-1"
            onClick={toggleTheme}
            aria-label="Toggle color theme"
          >
            {theme === "light" ? <Moon size={14} aria-hidden /> : <Sun size={14} aria-hidden />}
          </button>
        </Tooltip>
        <Tooltip label="GitHub" side="bottom">
          <a
            href={socialLinks.github}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded p-1.5 text-text-2 hover:bg-surface-hover hover:text-text-1"
            aria-label="Open GitHub profile"
          >
            <GithubIcon size={14} aria-hidden />
          </a>
        </Tooltip>
        <Tooltip label="LinkedIn" side="bottom">
          <a
            href={socialLinks.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded p-1.5 text-text-2 hover:bg-surface-hover hover:text-text-1"
            aria-label="Open LinkedIn profile"
          >
            <LinkedinIcon size={14} aria-hidden />
          </a>
        </Tooltip>
      </div>
    </header>
  );
}
