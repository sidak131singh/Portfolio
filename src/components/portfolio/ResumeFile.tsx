"use client";

import { useEffect, useState } from "react";
import { Download, ExternalLink as ExternalLinkIcon, FileWarning } from "lucide-react";
import { CodeComment, EditorPage } from "@/components/portfolio/shared";

export default function ResumeFile() {
  // null = still checking, true/false = known
  const [exists, setExists] = useState<boolean | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetch("/resume.pdf", { method: "HEAD" })
      .then((res) => {
        const type = res.headers.get("content-type") ?? "";
        if (!cancelled) setExists(res.ok && type.includes("pdf"));
      })
      .catch(() => {
        if (!cancelled) setExists(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <EditorPage>
      <CodeComment>{"// Sidak_Resume.pdf"}</CodeComment>
      <h1 className="mb-6 mt-3 text-2xl font-bold text-text-1 sm:text-3xl">Resume</h1>

      <div className="mb-6 flex flex-wrap gap-2">
        <a
          href="/resume.pdf"
          download="Sidak-Singh-Chahal-Resume.pdf"
          className="inline-flex min-h-11 items-center gap-1.5 rounded-md bg-gradient-to-r from-cyan to-violet px-4 py-2 text-sm font-semibold text-black transition-transform hover:-translate-y-0.5"
        >
          <Download size={14} aria-hidden /> Download Resume
        </a>
        <a
          href="/resume.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-11 items-center gap-1.5 rounded-md border border-border px-4 py-2 text-sm font-medium text-text-1 hover:bg-surface-hover"
        >
          <ExternalLinkIcon size={14} aria-hidden /> Open in New Tab
        </a>
      </div>

      {exists ? (
        <div className="h-[70vh] max-w-3xl overflow-hidden rounded-lg border border-border">
          <object
            data="/resume.pdf"
            type="application/pdf"
            className="h-full w-full"
            aria-label="Resume PDF preview"
          >
            <div className="flex h-full items-center justify-center p-8 text-center text-sm text-text-2">
              Your browser can&apos;t preview PDFs inline — use the download button above.
            </div>
          </object>
        </div>
      ) : (
        <div className="flex max-w-3xl flex-col items-center gap-3 rounded-lg border border-dashed border-border bg-surface p-10 text-center">
          <FileWarning size={32} className="text-warning" aria-hidden />
          <p className="text-sm font-medium text-text-1">
            {exists === null ? "Checking for resume.pdf ..." : "Resume file not added yet"}
          </p>
          {exists === false && (
            <p className="max-w-md font-mono text-xs leading-relaxed text-text-3">
              Place the real resume at <span className="text-cyan">public/resume.pdf</span> and
              this preview will render it automatically. Everything you need to know in the
              meantime is in home.tsx, experience/, and projects/.
            </p>
          )}
        </div>
      )}
    </EditorPage>
  );
}
