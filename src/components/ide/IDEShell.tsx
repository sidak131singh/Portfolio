"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { hydrateIdeFromEnvironment, useIdeStore } from "@/store/ideStore";
import { useKeyboardShortcuts } from "@/hooks/useKeyboardShortcuts";
import MenuBar from "@/components/ide/MenuBar";
import ActivityBar from "@/components/ide/ActivityBar";
import Sidebar from "@/components/ide/Sidebar";
import EditorArea from "@/components/ide/EditorArea";
import StatusBar from "@/components/ide/StatusBar";
import CommandPalette from "@/components/ide/CommandPalette";
import MobileNavigation from "@/components/ide/MobileNavigation";
import LoadingScreen from "@/components/ui/LoadingScreen";
import CustomCursor from "@/components/ui/CustomCursor";
import Modal from "@/components/ui/Modal";
import { personalInfo } from "@/data/portfolio";

// Lazy-load heavy optional features so the first paint stays fast
const Terminal = dynamic(() => import("@/components/ide/Terminal"), { ssr: false });
const PortfolioAssistant = dynamic(
  () => import("@/components/chatbot/PortfolioAssistant"),
  { ssr: false }
);
const DinoGame = dynamic(() => import("@/components/game/DinoGame"), { ssr: false });

const shortcuts: [string, string][] = [
  ["Ctrl/Cmd + B", "Toggle Explorer sidebar"],
  ["Ctrl/Cmd + J", "Toggle Terminal"],
  ["Ctrl/Cmd + P", "Quick file open"],
  ["Ctrl/Cmd + Shift + P", "Command Palette"],
  ["Escape", "Close menus, palettes, and overlays"],
  ["Arrow keys", "Navigate palette results and terminal history"],
  ["Enter", "Select / execute"],
];

export default function IDEShell() {
  const {
    sidebarOpen,
    mobileDrawerOpen,
    setMobileDrawerOpen,
    terminalOpen,
    booted,
    setBooted,
  } = useIdeStore();
  const [shortcutsOpen, setShortcutsOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);

  useKeyboardShortcuts();

  useEffect(() => {
    hydrateIdeFromEnvironment();
  }, []);

  return (
    <div className="flex h-dvh flex-col overflow-hidden">
      <CustomCursor />
      <AnimatePresence>{!booted && <LoadingScreen onDone={setBooted} />}</AnimatePresence>

      <MenuBar
        onShowShortcuts={() => setShortcutsOpen(true)}
        onShowAbout={() => setAboutOpen(true)}
      />

      <div className="relative flex min-h-0 flex-1">
        <ActivityBar />

        {/* Desktop sidebar */}
        {sidebarOpen && (
          <aside className="hidden w-64 shrink-0 border-r border-border bg-sidebar md:block">
            <Sidebar />
          </aside>
        )}

        {/* Mobile drawer */}
        {mobileDrawerOpen && (
          <div className="absolute inset-0 z-50 flex md:hidden">
            <aside className="w-72 max-w-[85vw] border-r border-border bg-sidebar shadow-2xl">
              <Sidebar />
            </aside>
            <button
              className="flex-1 bg-black/50"
              aria-label="Close navigation drawer"
              onClick={() => setMobileDrawerOpen(false)}
            />
          </div>
        )}

        <div className="flex min-h-0 min-w-0 flex-1 flex-col">
          <EditorArea />
          <AnimatePresence>{terminalOpen && <Terminal />}</AnimatePresence>
        </div>

        <PortfolioAssistant />
      </div>

      <MobileNavigation />
      <StatusBar />

      <CommandPalette />
      <DinoGame />

      <Modal open={shortcutsOpen} onClose={() => setShortcutsOpen(false)} title="Keyboard Shortcuts">
        <table className="w-full text-left text-sm">
          <thead className="sr-only">
            <tr>
              <th>Shortcut</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {shortcuts.map(([keys, action]) => (
              <tr key={keys} className="border-b border-border last:border-0">
                <td className="px-4 py-2.5 font-mono text-xs text-cyan">{keys}</td>
                <td className="px-4 py-2.5 text-xs text-text-2">{action}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Modal>

      <Modal open={aboutOpen} onClose={() => setAboutOpen(false)} title="About This Portfolio">
        <div className="space-y-3 p-4 text-sm leading-relaxed text-text-2">
          <p>
            A VS Code-inspired interactive portfolio for{" "}
            <span className="text-text-1">{personalInfo.name}</span> — explore it like a
            developer workspace: open files from the Explorer, run commands in the terminal,
            try the command palette (Ctrl/Cmd+Shift+P), chat with the assistant, or find the
            hidden Dino game.
          </p>
          <p className="font-mono text-xs text-text-3">
            Built with Next.js, TypeScript, Tailwind CSS, Framer Motion, and Zustand. Original
            implementation; content lives in src/data/portfolio.ts.
          </p>
        </div>
      </Modal>
    </div>
  );
}
