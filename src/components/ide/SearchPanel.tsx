"use client";

import { useMemo, useState } from "react";
import { SearchX } from "lucide-react";
import { files } from "@/data/fileSystem";
import {
  achievements,
  education,
  experience,
  projects,
  skills,
} from "@/data/portfolio";
import { useIdeStore } from "@/store/ideStore";

interface SearchEntry {
  fileId: string;
  fileName: string;
  category: string;
  text: string;
}

function buildIndex(): SearchEntry[] {
  const entries: SearchEntry[] = [];

  for (const file of Object.values(files)) {
    entries.push({
      fileId: file.id,
      fileName: file.name,
      category: "File",
      text: file.name,
    });
  }
  for (const p of projects) {
    entries.push({
      fileId: files[p.id] ? p.id : "projects-overview",
      fileName: p.fileName,
      category: "Project",
      text: `${p.title} — ${p.summary} ${p.technologies.join(" ")}`,
    });
  }
  for (const [category, list] of Object.entries(skills)) {
    for (const skill of list) {
      entries.push({
        fileId: "skills",
        fileName: "skills.json",
        category: `Skill · ${category}`,
        text: skill,
      });
    }
  }
  for (const e of experience) {
    entries.push({
      fileId: "experience",
      fileName: "experience.ts",
      category: "Experience",
      text: `${e.role} ${e.organization} ${e.summary} ${e.technologies.join(" ")}`,
    });
  }
  for (const ed of education) {
    entries.push({
      fileId: "education",
      fileName: "education.md",
      category: "Education",
      text: `${ed.institution} ${ed.degree} ${ed.score}`,
    });
  }
  for (const a of achievements) {
    entries.push({
      fileId: "achievements",
      fileName: "achievements.md",
      category: "Achievement",
      text: a.text,
    });
  }
  return entries;
}

function Highlight({ text, query }: { text: string; query: string }) {
  const idx = text.toLowerCase().indexOf(query.toLowerCase());
  if (idx === -1) return <>{text}</>;
  return (
    <>
      {text.slice(0, idx)}
      <mark className="rounded-sm bg-cyan/30 px-0.5 text-text-1">
        {text.slice(idx, idx + query.length)}
      </mark>
      {text.slice(idx + query.length)}
    </>
  );
}

export default function SearchPanel() {
  const [query, setQuery] = useState("");
  const { openFile, setMobileDrawerOpen } = useIdeStore();
  const index = useMemo(() => buildIndex(), []);

  const results =
    query.trim().length >= 2
      ? index.filter((e) => e.text.toLowerCase().includes(query.trim().toLowerCase()))
      : [];

  return (
    <div className="flex h-full flex-col overflow-hidden">
      <div className="px-4 pb-2 pt-3 text-[11px] font-semibold uppercase tracking-wider text-text-2">
        Search
      </div>
      <div className="px-3 pb-2">
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search portfolio"
          aria-label="Search portfolio content"
          className="w-full rounded border border-border bg-editor px-2.5 py-1.5 font-mono text-xs text-text-1 placeholder:text-text-3 focus:border-cyan focus:outline-none"
        />
      </div>
      <div className="flex-1 overflow-y-auto pb-4">
        {query.trim().length >= 2 && results.length === 0 && (
          <div className="flex flex-col items-center gap-2 px-4 py-8 text-center text-xs text-text-3">
            <SearchX size={24} aria-hidden />
            <p>No results for &ldquo;{query}&rdquo;.</p>
            <p>Try a project name, skill, or technology.</p>
          </div>
        )}
        {results.slice(0, 40).map((r, i) => (
          <button
            key={`${r.fileId}-${i}`}
            onClick={() => {
              openFile(r.fileId);
              setMobileDrawerOpen(false);
            }}
            className="block w-full px-4 py-1.5 text-left hover:bg-surface-hover"
          >
            <span className="block truncate text-xs text-text-1">
              <Highlight text={r.text} query={query.trim()} />
            </span>
            <span className="block truncate font-mono text-[10px] text-text-3">
              {r.fileName} · {r.category}
            </span>
          </button>
        ))}
        {query.trim().length < 2 && (
          <p className="px-4 py-2 text-xs text-text-3">
            Search across files, projects, skills, experience, education, and achievements.
          </p>
        )}
      </div>
    </div>
  );
}
