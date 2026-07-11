"use client";

import { create } from "zustand";
import { fileIdFromSlug, files } from "@/data/fileSystem";

export type SidebarPanel =
  | "explorer"
  | "search"
  | "source-control"
  | "extensions"
  | "profile"
  | "settings";

export type Theme =
  | "sidak-dark"
  | "light"
  | "rose-pine"
  | "tokyo-night"
  | "catppuccin"
  | "nord"
  | "gruvbox";

export interface ThemeOption {
  id: Theme;
  label: string;
  /** Swatch color shown in the theme picker. */
  dot: string;
}

export const themeOptions: ThemeOption[] = [
  { id: "sidak-dark", label: "Sidak Dark", dot: "#22d3ee" },
  { id: "light", label: "Sidak Light", dot: "#005fb8" },
  { id: "rose-pine", label: "Rosé Pine", dot: "#eb6f92" },
  { id: "tokyo-night", label: "Tokyo Night", dot: "#7aa2f7" },
  { id: "catppuccin", label: "Catppuccin", dot: "#cba6f7" },
  { id: "nord", label: "Nord", dot: "#88c0d0" },
  { id: "gruvbox", label: "Gruvbox", dot: "#fabd2f" },
];

export function isTheme(value: string): value is Theme {
  return themeOptions.some((t) => t.id === value);
}

interface IdeState {
  openTabs: string[];
  activeTabId: string;
  sidebarPanel: SidebarPanel;
  sidebarOpen: boolean;
  /** Mobile-only drawer visibility for the sidebar. */
  mobileDrawerOpen: boolean;
  terminalOpen: boolean;
  paletteOpen: boolean;
  paletteMode: "commands" | "files";
  assistantOpen: boolean;
  dinoOpen: boolean;
  theme: Theme;
  expandedFolders: Record<string, boolean>;
  booted: boolean;

  openFile: (fileId: string) => void;
  closeTab: (fileId: string) => void;
  setActiveTab: (fileId: string) => void;
  toggleFolder: (folderId: string) => void;
  setSidebarPanel: (panel: SidebarPanel) => void;
  toggleSidebar: () => void;
  setMobileDrawerOpen: (open: boolean) => void;
  toggleTerminal: () => void;
  setTerminalOpen: (open: boolean) => void;
  openPalette: (mode: "commands" | "files") => void;
  closePalette: () => void;
  setAssistantOpen: (open: boolean) => void;
  setDinoOpen: (open: boolean) => void;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
  setBooted: () => void;
}

function syncHash(fileId: string) {
  if (typeof window === "undefined") return;
  const slug = files[fileId]?.slug;
  if (slug) {
    // replaceState avoids polluting history on every tab switch
    window.history.replaceState(null, "", `#${slug}`);
  }
}

function applyTheme(theme: Theme) {
  if (typeof document === "undefined") return;
  document.documentElement.dataset.theme = theme;
  try {
    window.localStorage.setItem("sc-theme", theme);
  } catch {
    // localStorage unavailable (private mode etc.) — theme just won't persist
  }
}

export const useIdeStore = create<IdeState>((set, get) => ({
  openTabs: ["home"],
  activeTabId: "home",
  sidebarPanel: "explorer",
  sidebarOpen: true,
  mobileDrawerOpen: false,
  terminalOpen: false,
  paletteOpen: false,
  paletteMode: "commands",
  assistantOpen: false,
  dinoOpen: false,
  theme: "sidak-dark",
  expandedFolders: { experience: true, projects: true },
  booted: false,

  openFile: (fileId) => {
    if (!files[fileId]) return;
    const { openTabs } = get();
    set({
      openTabs: openTabs.includes(fileId) ? openTabs : [...openTabs, fileId],
      activeTabId: fileId,
      mobileDrawerOpen: false,
    });
    syncHash(fileId);
  },

  closeTab: (fileId) => {
    const { openTabs, activeTabId } = get();
    const idx = openTabs.indexOf(fileId);
    if (idx === -1) return;
    const next = openTabs.filter((id) => id !== fileId);
    let nextActive = activeTabId;
    if (activeTabId === fileId) {
      nextActive = next[Math.min(idx, next.length - 1)] ?? "home";
    }
    // home.tsx remains available as a fallback if everything is closed
    set({
      openTabs: next.length > 0 ? next : ["home"],
      activeTabId: nextActive,
    });
    syncHash(nextActive);
  },

  setActiveTab: (fileId) => {
    if (!get().openTabs.includes(fileId)) return;
    set({ activeTabId: fileId });
    syncHash(fileId);
  },

  toggleFolder: (folderId) =>
    set((s) => ({
      expandedFolders: {
        ...s.expandedFolders,
        [folderId]: !s.expandedFolders[folderId],
      },
    })),

  setSidebarPanel: (panel) => {
    const { sidebarPanel, sidebarOpen } = get();
    if (panel === sidebarPanel && sidebarOpen) {
      set({ sidebarOpen: false });
    } else {
      set({ sidebarPanel: panel, sidebarOpen: true });
    }
  },

  toggleSidebar: () => set((s) => ({ sidebarOpen: !s.sidebarOpen })),
  setMobileDrawerOpen: (open) => set({ mobileDrawerOpen: open }),
  toggleTerminal: () => set((s) => ({ terminalOpen: !s.terminalOpen })),
  setTerminalOpen: (open) => set({ terminalOpen: open }),
  openPalette: (mode) => set({ paletteOpen: true, paletteMode: mode }),
  closePalette: () => set({ paletteOpen: false }),
  setAssistantOpen: (open) => set({ assistantOpen: open }),
  setDinoOpen: (open) => set({ dinoOpen: open }),

  toggleTheme: () => {
    const next: Theme = get().theme === "light" ? "sidak-dark" : "light";
    applyTheme(next);
    set({ theme: next });
  },

  setTheme: (theme) => {
    applyTheme(theme);
    set({ theme });
  },

  setBooted: () => set({ booted: true }),
}));

/** Restore persisted theme + deep-linked file from the URL hash. Call once on mount. */
export function hydrateIdeFromEnvironment() {
  let theme: Theme = "sidak-dark";
  try {
    const saved = window.localStorage.getItem("sc-theme");
    if (saved && isTheme(saved)) theme = saved;
  } catch {
    // ignore
  }
  useIdeStore.getState().setTheme(theme);

  const hash = window.location.hash.replace(/^#/, "");
  if (hash) {
    const fileId = fileIdFromSlug(decodeURIComponent(hash));
    if (fileId) useIdeStore.getState().openFile(fileId);
  }
}
