"use client";

import { Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/ui/BrandIcons";
import { personalInfo, socialLinks } from "@/data/portfolio";
import { useIdeStore } from "@/store/ideStore";
import { EditorPage, MdHeading } from "@/components/portfolio/shared";
import ExternalLink from "@/components/ui/ExternalLink";

export default function ReadmeFile() {
  const openFile = useIdeStore((s) => s.openFile);

  const workItems = [
    "Full-stack web applications",
    "Backend APIs and database systems",
    "AI and LLM evaluation pipelines",
    "Retrieval-augmented generation",
    "Scalable and reliable product engineering",
  ];

  const quickLinks: { label: string; action: () => void }[] = [
    { label: "Projects", action: () => openFile("projects-overview") },
    { label: "Experience", action: () => openFile("experience") },
    { label: "Skills", action: () => openFile("skills") },
    { label: "Resume", action: () => openFile("resume") },
  ];

  return (
    <EditorPage>
      <MdHeading>{personalInfo.name}</MdHeading>
      <p className="max-w-2xl leading-relaxed text-text-2">
        Software engineer and final-year B.Tech student at Indraprastha Institute of
        Information Technology Delhi.
      </p>

      <MdHeading level={2}>What I work on</MdHeading>
      <ul className="space-y-1.5">
        {workItems.map((item) => (
          <li key={item} className="flex items-start gap-2 text-sm text-text-1">
            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan" aria-hidden />
            {item}
          </li>
        ))}
      </ul>

      <MdHeading level={2}>Current focus</MdHeading>
      <p className="max-w-2xl text-sm leading-relaxed text-text-1">
        I am currently strengthening my software engineering fundamentals, building
        production-ready web applications, and exploring practical AI systems that combine
        retrieval, reasoning, and reliable backend infrastructure.
      </p>

      <MdHeading level={2}>Quick links</MdHeading>
      <div className="flex flex-wrap gap-2">
        {quickLinks.map((link) => (
          <button
            key={link.label}
            onClick={link.action}
            className="rounded border border-border bg-surface px-3 py-1.5 font-mono text-xs text-text-1 hover:border-cyan/50 hover:bg-surface-hover"
          >
            {link.label}
          </button>
        ))}
        <ExternalLink
          href={socialLinks.github}
          className="inline-flex items-center gap-1.5 rounded border border-border bg-surface px-3 py-1.5 font-mono text-xs text-text-1 hover:border-cyan/50 hover:bg-surface-hover"
        >
          <GithubIcon size={12} aria-hidden /> GitHub
        </ExternalLink>
        <ExternalLink
          href={socialLinks.linkedin}
          className="inline-flex items-center gap-1.5 rounded border border-border bg-surface px-3 py-1.5 font-mono text-xs text-text-1 hover:border-cyan/50 hover:bg-surface-hover"
        >
          <LinkedinIcon size={12} aria-hidden /> LinkedIn
        </ExternalLink>
        <a
          href={`mailto:${personalInfo.email}`}
          className="inline-flex items-center gap-1.5 rounded border border-border bg-surface px-3 py-1.5 font-mono text-xs text-text-1 hover:border-cyan/50 hover:bg-surface-hover"
        >
          <Mail size={12} aria-hidden /> Email
        </a>
      </div>
    </EditorPage>
  );
}
