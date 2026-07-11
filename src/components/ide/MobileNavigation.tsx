"use client";

import {
  Bug,
  Files,
  Search,
  Sparkles,
  SquareTerminal,
} from "lucide-react";
import { useIdeStore } from "@/store/ideStore";

/** Compact bottom navigation bar for narrow screens (replaces the activity bar). */
export default function MobileNavigation() {
  const {
    setSidebarPanel,
    mobileDrawerOpen,
    setMobileDrawerOpen,
    sidebarPanel,
    toggleTerminal,
    terminalOpen,
    setAssistantOpen,
    assistantOpen,
    setDinoOpen,
  } = useIdeStore();

  const openDrawerPanel = (panel: "explorer" | "search") => {
    if (mobileDrawerOpen && sidebarPanel === panel) {
      setMobileDrawerOpen(false);
    } else {
      setSidebarPanel(panel);
      setMobileDrawerOpen(true);
    }
  };

  const items = [
    {
      id: "explorer",
      label: "Explorer",
      Icon: Files,
      active: mobileDrawerOpen && sidebarPanel === "explorer",
      action: () => openDrawerPanel("explorer"),
    },
    {
      id: "search",
      label: "Search",
      Icon: Search,
      active: mobileDrawerOpen && sidebarPanel === "search",
      action: () => openDrawerPanel("search"),
    },
    {
      id: "terminal",
      label: "Terminal",
      Icon: SquareTerminal,
      active: terminalOpen,
      action: toggleTerminal,
    },
    {
      id: "assistant",
      label: "Assistant",
      Icon: Sparkles,
      active: assistantOpen,
      action: () => setAssistantOpen(!assistantOpen),
    },
    {
      id: "game",
      label: "Debug",
      Icon: Bug,
      active: false,
      action: () => setDinoOpen(true),
    },
  ];

  return (
    <nav
      aria-label="Mobile navigation"
      className="flex h-12 shrink-0 items-stretch justify-around border-t border-border bg-activity md:hidden"
    >
      {items.map((item) => (
        <button
          key={item.id}
          onClick={item.action}
          aria-label={item.label}
          aria-current={item.active ? "true" : undefined}
          className={`flex min-w-11 flex-1 flex-col items-center justify-center gap-0.5 ${
            item.active ? "text-cyan" : "text-text-3"
          }`}
        >
          <item.Icon size={18} aria-hidden />
          <span className="text-[9px]">{item.label}</span>
        </button>
      ))}
    </nav>
  );
}
