"use client";

import { useState } from "react";
import {
  Blocks,
  Braces,
  BrainCircuit,
  Cloud,
  Code2,
  Database,
  LayoutTemplate,
  Server,
} from "lucide-react";
import { skills } from "@/data/portfolio";
import { CodeComment, EditorPage } from "@/components/portfolio/shared";

const categoryMeta: Record<
  string,
  { label: string; Icon: typeof Code2; color: string; chip: string }
> = {
  languages: { label: "Languages", Icon: Code2, color: "text-cyan", chip: "border-cyan/40" },
  frontend: { label: "Frontend", Icon: LayoutTemplate, color: "text-pink", chip: "border-pink/40" },
  backend: { label: "Backend", Icon: Server, color: "text-green", chip: "border-green/40" },
  databases: { label: "Databases", Icon: Database, color: "text-yellow", chip: "border-yellow/40" },
  ai_ml: { label: "AI / ML", Icon: BrainCircuit, color: "text-violet", chip: "border-violet/40" },
  tools_and_cloud: { label: "Tools & Cloud", Icon: Cloud, color: "text-blue", chip: "border-blue/40" },
  computer_science: {
    label: "Computer Science",
    Icon: Blocks,
    color: "text-string",
    chip: "border-string/40",
  },
};

function JsonView() {
  const entries = Object.entries(skills);
  return (
    <pre className="overflow-x-auto rounded-lg border border-border bg-surface p-4 font-mono text-xs leading-relaxed sm:text-sm">
      <code>
        {"{"}
        {"\n"}
        {entries.map(([category, list], ci) => (
          <span key={category}>
            {"  "}
            <span className="text-cyan">&quot;{category}&quot;</span>: [{"\n"}
            {list.map((skill, si) => (
              <span key={skill}>
                {"    "}
                <span className="text-string">&quot;{skill}&quot;</span>
                {si < list.length - 1 ? "," : ""}
                {"\n"}
              </span>
            ))}
            {"  "}]{ci < entries.length - 1 ? "," : ""}
            {"\n"}
          </span>
        ))}
        {"}"}
      </code>
    </pre>
  );
}

function CardView() {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {Object.entries(skills).map(([category, list]) => {
        const meta =
          categoryMeta[category] ??
          ({ label: category, Icon: Braces, color: "text-cyan", chip: "border-cyan/40" } as const);
        return (
          <div
            key={category}
            className="rounded-lg border border-border bg-surface p-4 transition-colors hover:border-cyan/40"
          >
            <h2
              className={`flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-widest ${meta.color}`}
            >
              <meta.Icon size={16} aria-hidden />
              {meta.label}
            </h2>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {list.map((skill) => (
                <span
                  key={skill}
                  className={`inline-flex items-center rounded border bg-editor px-2 py-0.5 font-mono text-[11px] text-text-1 ${meta.chip}`}
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default function SkillsFile() {
  const [view, setView] = useState<"json" | "cards">("cards");

  return (
    <EditorPage>
      <CodeComment>{"// skills.json — everything in my toolbox"}</CodeComment>
      <div className="mb-6 mt-3 flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-2xl font-bold text-text-1 sm:text-3xl">Skills</h1>
        <div className="flex rounded-md border border-border p-0.5" role="tablist" aria-label="Skills view mode">
          {(
            [
              ["cards", "Category Cards"],
              ["json", "JSON View"],
            ] as const
          ).map(([mode, label]) => (
            <button
              key={mode}
              role="tab"
              aria-selected={view === mode}
              onClick={() => setView(mode)}
              className={`rounded px-3 py-1 font-mono text-xs ${
                view === mode
                  ? "bg-surface-hover text-cyan"
                  : "text-text-2 hover:text-text-1"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>
      {view === "json" ? <JsonView /> : <CardView />}
    </EditorPage>
  );
}
