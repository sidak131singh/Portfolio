"use client";

import { useState } from "react";
import { ChevronDown, GitCommitHorizontal, MapPin } from "lucide-react";
import { experience } from "@/data/portfolio";
import { CodeComment, EditorPage, TechTag } from "@/components/portfolio/shared";

function ExperienceCard({
  entry,
  highlighted,
}: {
  entry: (typeof experience)[number];
  highlighted: boolean;
}) {
  const [expanded, setExpanded] = useState(false);

  return (
    <li className="relative pl-8">
      {/* timeline marker */}
      <span
        className={`absolute left-0 top-1.5 flex h-4 w-4 items-center justify-center rounded-full border-2 ${
          highlighted ? "border-cyan bg-cyan/20" : "border-border bg-surface"
        }`}
        aria-hidden
      >
        <span className={`h-1.5 w-1.5 rounded-full ${highlighted ? "bg-cyan" : "bg-text-3"}`} />
      </span>

      <div
        className={`rounded-lg border bg-surface p-4 ${
          highlighted ? "border-cyan/40" : "border-border"
        }`}
      >
        <p className="flex items-center gap-1.5 font-mono text-[11px] text-violet">
          <GitCommitHorizontal size={13} aria-hidden />
          {entry.commitLabel}
        </p>
        <h2 className="mt-2 text-base font-semibold text-text-1">{entry.role}</h2>
        <p className="text-sm text-cyan">{entry.organization}</p>
        <p className="mt-0.5 flex flex-wrap items-center gap-x-3 font-mono text-xs text-text-3">
          <span>{entry.dates}</span>
          {entry.location && (
            <span className="flex items-center gap-1">
              <MapPin size={11} aria-hidden />
              {entry.location}
            </span>
          )}
        </p>
        <p className="mt-2 text-sm leading-relaxed text-text-2">{entry.summary}</p>

        <button
          onClick={() => setExpanded(!expanded)}
          aria-expanded={expanded}
          className="mt-3 flex items-center gap-1 font-mono text-xs text-cyan hover:underline"
        >
          <ChevronDown
            size={13}
            className={`transition-transform duration-150 ${expanded ? "rotate-180" : ""}`}
            aria-hidden
          />
          {expanded ? "Hide details" : "Show details"}
        </button>

        {expanded && (
          <ul className="mt-3 space-y-1.5 border-l-2 border-border pl-4">
            {entry.highlights.map((h) => (
              <li key={h} className="text-sm leading-relaxed text-text-1">
                {h}
              </li>
            ))}
          </ul>
        )}

        <div className="mt-4 flex flex-wrap gap-1.5">
          {entry.technologies.map((t) => (
            <TechTag key={t}>{t}</TechTag>
          ))}
        </div>
      </div>
    </li>
  );
}

export default function ExperienceFile() {
  return (
    <EditorPage>
      <CodeComment>{"// experience.ts — a git log of where I've worked"}</CodeComment>
      <h1 className="mb-8 mt-3 text-2xl font-bold text-text-1 sm:text-3xl">Experience</h1>
      <ol className="relative space-y-6">
        <span
          className="absolute bottom-2 left-[7px] top-2 w-px bg-border"
          aria-hidden
        />
        {experience.map((entry, i) => (
          <ExperienceCard key={entry.id} entry={entry} highlighted={i === 0} />
        ))}
      </ol>
    </EditorPage>
  );
}
