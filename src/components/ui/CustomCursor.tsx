"use client";

import { useEffect, useRef } from "react";

/**
 * Retro pixel cursor: an outlined square with a solid white pixel in the
 * middle. Replaces the native cursor on precise-pointer devices only;
 * touch devices and reduced-pointer setups keep their defaults.
 */
export default function CustomCursor() {
  const outerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    if (!finePointer) return;

    const outer = outerRef.current;
    if (!outer) return;

    document.documentElement.classList.add("sc-cursor");
    outer.style.display = "block";

    function onMove(e: MouseEvent) {
      if (!outer) return;
      outer.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      const interactive = (e.target as Element | null)?.closest?.(
        'a, button, [role="button"], [role="option"], [role="tab"], input, textarea, select, label, canvas'
      );
      outer.dataset.hover = interactive ? "true" : "false";
    }
    function onDown() {
      if (outer) outer.dataset.down = "true";
    }
    function onUp() {
      if (outer) outer.dataset.down = "false";
    }
    function onLeave() {
      if (outer) outer.style.opacity = "0";
    }
    function onEnter() {
      if (outer) outer.style.opacity = "1";
    }

    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    document.documentElement.addEventListener("mouseleave", onLeave);
    document.documentElement.addEventListener("mouseenter", onEnter);

    return () => {
      document.documentElement.classList.remove("sc-cursor");
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      document.documentElement.removeEventListener("mouseenter", onEnter);
    };
  }, []);

  return (
    <div
      ref={outerRef}
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[999] hidden"
      style={{ willChange: "transform" }}
    >
      <div className="sc-cursor-box">
        <span className="sc-cursor-pixel" />
      </div>
    </div>
  );
}
