import { ReactNode } from "react";

/** Small monospace chip used for technologies and tags. */
export function TechTag({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center rounded border border-border bg-surface px-2 py-0.5 font-mono text-[11px] text-text-2">
      {children}
    </span>
  );
}

/** Scrollable editor page wrapper with consistent padding. */
export function EditorPage({ children }: { children: ReactNode }) {
  return (
    <div className="mx-auto w-full max-w-4xl px-4 py-6 sm:px-8 sm:py-8">{children}</div>
  );
}

/** Green code-style comment line. */
export function CodeComment({ children }: { children: ReactNode }) {
  return <p className="font-mono text-sm text-comment">{children}</p>;
}

/** Markdown-style section heading with the # prefix. */
export function MdHeading({
  level = 1,
  children,
}: {
  level?: 1 | 2;
  children: ReactNode;
}) {
  const hashes = "#".repeat(level);
  if (level === 1) {
    return (
      <h1 className="mb-4 text-2xl font-bold text-text-1 sm:text-3xl">
        <span className="mr-2 font-mono text-cyan" aria-hidden>
          {hashes}
        </span>
        {children}
      </h1>
    );
  }
  return (
    <h2 className="mb-3 mt-8 text-lg font-semibold text-text-1 sm:text-xl">
      <span className="mr-2 font-mono text-violet" aria-hidden>
        {hashes}
      </span>
      {children}
    </h2>
  );
}
