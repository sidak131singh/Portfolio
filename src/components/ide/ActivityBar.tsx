"use client";

import {
  Blocks,
  Bug,
  Files,
  GitBranch,
  Search,
  Settings,
  Sparkles,
  UserCircle2,
} from "lucide-react";
import { useIdeStore, type SidebarPanel } from "@/store/ideStore";
import Tooltip from "@/components/ui/Tooltip";

interface ActivityItem {
  id: string;
  label: string;
  Icon: typeof Files;
  panel?: SidebarPanel;
  action?: () => void;
}

export default function ActivityBar() {
  const { sidebarPanel, sidebarOpen, setSidebarPanel, setAssistantOpen, setDinoOpen, assistantOpen } =
    useIdeStore();

  const top: ActivityItem[] = [
    { id: "explorer", label: "Explorer (Ctrl+B)", Icon: Files, panel: "explorer" },
    { id: "search", label: "Search", Icon: Search, panel: "search" },
    { id: "source-control", label: "Source Control", Icon: GitBranch, panel: "source-control" },
    { id: "run-debug", label: "Run and Debug (Dino Game)", Icon: Bug, action: () => setDinoOpen(true) },
    { id: "extensions", label: "Extensions (Skills)", Icon: Blocks, panel: "extensions" },
    { id: "assistant", label: "Portfolio Assistant", Icon: Sparkles, action: () => setAssistantOpen(!assistantOpen) },
  ];

  const bottom: ActivityItem[] = [
    { id: "profile", label: "Account", Icon: UserCircle2, panel: "profile" },
    { id: "settings", label: "Settings", Icon: Settings, panel: "settings" },
  ];

  const renderItem = (item: ActivityItem) => {
    const active =
      (item.panel && sidebarOpen && sidebarPanel === item.panel) ||
      (item.id === "assistant" && assistantOpen);
    return (
      <Tooltip key={item.id} label={item.label} side="right">
        <button
          aria-label={item.label}
          aria-current={active ? "true" : undefined}
          onClick={() => (item.panel ? setSidebarPanel(item.panel) : item.action?.())}
          className={`relative flex h-11 w-12 items-center justify-center transition-colors ${
            active ? "text-text-1" : "text-text-3 hover:text-text-1"
          }`}
        >
          {active && (
            <span
              className="absolute left-0 top-1/2 h-6 w-0.5 -translate-y-1/2 bg-cyan"
              aria-hidden
            />
          )}
          <item.Icon size={22} strokeWidth={1.5} aria-hidden />
        </button>
      </Tooltip>
    );
  };

  return (
    <nav
      aria-label="Activity bar"
      className="hidden w-12 shrink-0 flex-col justify-between border-r border-border bg-activity md:flex"
    >
      <div className="flex flex-col">{top.map(renderItem)}</div>
      <div className="flex flex-col pb-1">{bottom.map(renderItem)}</div>
    </nav>
  );
}
