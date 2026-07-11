"use client";

import { useCallback, useState } from "react";

function readStored<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    return raw !== null ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

/**
 * useState synced to localStorage. Safe when storage is unavailable
 * (SSR, private browsing) — it silently degrades to in-memory state.
 * Intended for client-only components (loaded with ssr: false).
 */
export function useLocalStorage<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(() => readStored(key, initialValue));

  const setAndPersist = useCallback(
    (next: T | ((prev: T) => T)) => {
      setValue((prev) => {
        const resolved = next instanceof Function ? next(prev) : next;
        try {
          window.localStorage.setItem(key, JSON.stringify(resolved));
        } catch {
          // ignore persistence failure
        }
        return resolved;
      });
    },
    [key]
  );

  return [value, setAndPersist] as const;
}
