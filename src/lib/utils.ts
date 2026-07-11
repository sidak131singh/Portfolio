/** Small impure helpers kept out of component scope for lint-friendly event handlers. */

export function now(): number {
  return Date.now();
}

export function readLocalStorage(key: string): string | null {
  try {
    return window.localStorage.getItem(key);
  } catch {
    return null;
  }
}

export function writeLocalStorage(key: string, value: string): void {
  try {
    window.localStorage.setItem(key, value);
  } catch {
    // storage unavailable — ignore
  }
}

/**
 * Open an external URL in a new tab via a synthetic anchor click.
 * More reliable than window.open(url, "_blank", "noopener"), which some
 * browsers treat as a popup and silently block.
 */
export function openExternal(url: string): void {
  const a = document.createElement("a");
  a.href = url;
  a.target = "_blank";
  a.rel = "noopener noreferrer";
  document.body.appendChild(a);
  a.click();
  a.remove();
}
