"use client";

import { Check, GitBranch, GitCommitHorizontal } from "lucide-react";
import { socialLinks, sourceControlCommits } from "@/data/portfolio";
import ExternalLink from "@/components/ui/ExternalLink";

export default function SourceControlPanel() {
  return (
    <div className="flex h-full flex-col overflow-y-auto">
      <div className="px-4 pb-2 pt-3 text-[11px] font-semibold uppercase tracking-wider text-text-2">
        Source Control
      </div>

      <div className="mx-3 rounded border border-border bg-editor p-3">
        <p className="flex items-center gap-1.5 font-mono text-xs text-text-1">
          <GitBranch size={13} className="text-cyan" aria-hidden /> main
        </p>
        <p className="mt-1.5 flex items-center gap-1.5 text-xs text-text-2">
          <Check size={13} className="text-success" aria-hidden /> Working tree clean
        </p>
      </div>

      <div className="mt-4 px-4 text-[11px] font-semibold uppercase tracking-wider text-text-2">
        Recent portfolio commits
      </div>
      <ul className="mt-1 px-3">
        {sourceControlCommits.map((commit) => (
          <li
            key={commit}
            className="flex items-start gap-2 rounded px-1.5 py-1.5 font-mono text-xs text-text-2 hover:bg-surface-hover"
          >
            <GitCommitHorizontal size={14} className="mt-0.5 shrink-0 text-violet" aria-hidden />
            <span>{commit}</span>
          </li>
        ))}
      </ul>

      <div className="mt-4 px-3 pb-4">
        <ExternalLink
          href={socialLinks.github}
          className="block w-full rounded bg-blue px-3 py-1.5 text-center text-xs font-medium text-white hover:opacity-90"
        >
          View GitHub Profile
        </ExternalLink>
      </div>
    </div>
  );
}
