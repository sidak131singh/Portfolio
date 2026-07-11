"use client";

import { useEffect } from "react";
import { useIdeStore } from "@/store/ideStore";

/**
 * Global IDE shortcuts:
 *  Ctrl/Cmd+B  toggle explorer sidebar
 *  Ctrl/Cmd+J  toggle terminal
 *  Ctrl/Cmd+P  quick file open
 *  Ctrl/Cmd+Shift+P  command palette
 *  Escape      close palette / assistant / game / drawer
 */
export function useKeyboardShortcuts() {
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      const mod = e.ctrlKey || e.metaKey;
      const store = useIdeStore.getState();

      if (mod && e.shiftKey && e.key.toLowerCase() === "p") {
        e.preventDefault();
        if (store.paletteOpen && store.paletteMode === "commands") {
          store.closePalette();
        } else {
          store.openPalette("commands");
        }
        return;
      }
      if (mod && !e.shiftKey && e.key.toLowerCase() === "p") {
        e.preventDefault();
        if (store.paletteOpen && store.paletteMode === "files") {
          store.closePalette();
        } else {
          store.openPalette("files");
        }
        return;
      }
      if (mod && e.key.toLowerCase() === "b") {
        e.preventDefault();
        store.toggleSidebar();
        return;
      }
      if (mod && e.key.toLowerCase() === "j") {
        e.preventDefault();
        store.toggleTerminal();
        return;
      }
      if (e.key === "Escape") {
        if (store.paletteOpen) store.closePalette();
        else if (store.dinoOpen) store.setDinoOpen(false);
        else if (store.assistantOpen) store.setAssistantOpen(false);
        else if (store.mobileDrawerOpen) store.setMobileDrawerOpen(false);
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);
}
