"use client";

import { CheckSquare } from "lucide-react";
import { achievements } from "@/data/portfolio";
import { EditorPage, MdHeading } from "@/components/portfolio/shared";

export default function AchievementsFile() {
  return (
    <EditorPage>
      <MdHeading>Achievements</MdHeading>
      <p className="mb-6 max-w-2xl text-sm text-text-2">
        A checklist of milestones — every box here is backed by real work.
      </p>

      <ul className="max-w-2xl space-y-2.5">
        {achievements.map((a) => (
          <li
            key={a.text}
            className="flex items-start gap-3 rounded-lg border border-border bg-surface p-3.5 transition-colors hover:border-cyan/40"
          >
            <CheckSquare size={17} className="mt-0.5 shrink-0 text-success" aria-hidden />
            <span className="flex-1 text-sm leading-relaxed text-text-1">{a.text}</span>
            <span className="shrink-0 rounded bg-cyan/10 px-2 py-0.5 font-mono text-[10px] text-cyan">
              {a.marker}
            </span>
          </li>
        ))}
      </ul>
    </EditorPage>
  );
}
