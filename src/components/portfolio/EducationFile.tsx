"use client";

import { useState } from "react";
import { ChevronDown, GraduationCap, School } from "lucide-react";
import { education } from "@/data/portfolio";
import { EditorPage, MdHeading, TechTag } from "@/components/portfolio/shared";

export default function EducationFile() {
  const [schoolsOpen, setSchoolsOpen] = useState(false);
  const college = education.find((e) => e.level === "college");
  const schools = education.filter((e) => e.level === "school");

  return (
    <EditorPage>
      <MdHeading>Education</MdHeading>

      {college && (
        <div className="rounded-lg border border-cyan/40 bg-surface p-5">
          <div className="flex items-start gap-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-cyan/15">
              <GraduationCap size={20} className="text-cyan" aria-hidden />
            </span>
            <div>
              <h2 className="text-base font-semibold text-text-1 sm:text-lg">
                {college.institution}
              </h2>
              <p className="mt-0.5 text-sm text-text-2">{college.degree}</p>
              <p className="mt-1 flex flex-wrap gap-x-4 font-mono text-xs text-text-3">
                <span>{college.duration}</span>
                <span className="text-success">
                  {college.scoreLabel}: {college.score}
                </span>
              </p>
            </div>
          </div>
          {college.coursework && (
            <>
              <h3 className="mt-5 font-mono text-xs font-semibold text-violet">
                {"/* relevant coursework */"}
              </h3>
              <div className="mt-2 flex flex-wrap gap-1.5">
                {college.coursework.map((course) => (
                  <TechTag key={course}>{course}</TechTag>
                ))}
              </div>
            </>
          )}
        </div>
      )}

      <button
        onClick={() => setSchoolsOpen(!schoolsOpen)}
        aria-expanded={schoolsOpen}
        className="mt-6 flex items-center gap-1.5 font-mono text-xs text-text-2 hover:text-cyan"
      >
        <ChevronDown
          size={13}
          className={`transition-transform duration-150 ${schoolsOpen ? "rotate-180" : ""}`}
          aria-hidden
        />
        {schoolsOpen ? "Hide school education" : "Show school education"}
      </button>

      {schoolsOpen && (
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          {schools.map((s) => (
            <div key={s.institution} className="rounded-lg border border-border bg-surface p-4">
              <p className="flex items-center gap-2 text-sm font-medium text-text-1">
                <School size={15} className="shrink-0 text-violet" aria-hidden />
                {s.institution}
              </p>
              <p className="mt-1 font-mono text-xs text-text-3">
                {s.degree} · {s.score}
              </p>
            </div>
          ))}
        </div>
      )}
    </EditorPage>
  );
}
