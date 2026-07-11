"use client";

import { ExternalLink as ExternalLinkIcon, ImageOff, Star } from "lucide-react";
import { GithubIcon } from "@/components/ui/BrandIcons";
import { projects } from "@/data/portfolio";
import { CodeComment, EditorPage, TechTag } from "@/components/portfolio/shared";
import ExternalLink from "@/components/ui/ExternalLink";

const statusColors: Record<string, string> = {
  Live: "bg-success/15 text-success border-success/40",
  Deployed: "bg-cyan/15 text-cyan border-cyan/40",
  Completed: "bg-violet/15 text-violet border-violet/40",
  "Completed / Testing": "bg-warning/15 text-warning border-warning/40",
  "In Progress": "bg-string/15 text-string border-string/40",
};

function Section({ title, items }: { title: string; items?: string[] }) {
  if (!items || items.length === 0) return null;
  return (
    <section className="mt-6">
      <h2 className="mb-2 font-mono text-sm font-semibold text-violet">{`/* ${title} */`}</h2>
      <ul className="space-y-1.5">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-2 text-sm leading-relaxed text-text-1">
            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan" aria-hidden />
            {item}
          </li>
        ))}
      </ul>
    </section>
  );
}

export default function ProjectFile({ projectId }: { projectId: string }) {
  const project = projects.find((p) => p.id === projectId);

  if (!project) {
    return (
      <EditorPage>
        <p className="text-sm text-text-2">Project not found. Open the projects folder to browse all projects.</p>
      </EditorPage>
    );
  }

  return (
    <EditorPage>
      <CodeComment>{`// ${project.fileName}`}</CodeComment>
      <div className="mt-3 flex flex-wrap items-center gap-3">
        <h1 className="text-2xl font-bold text-text-1 sm:text-3xl">{project.title}</h1>
        <span
          className={`rounded-full border px-2.5 py-0.5 font-mono text-[11px] ${statusColors[project.status] ?? "border-border text-text-2"}`}
        >
          {project.status}
        </span>
        {project.featured && (
          <span className="flex items-center gap-1 font-mono text-[11px] text-warning">
            <Star size={12} aria-hidden /> featured
          </span>
        )}
      </div>
      <p className="mt-2 max-w-2xl text-sm leading-relaxed text-text-2 sm:text-base">
        {project.summary}
      </p>

      {/* Screenshot area with graceful placeholder */}
      <div className="mt-6 flex aspect-video max-w-2xl items-center justify-center rounded-lg border border-border bg-surface">
        {project.image ? (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            src={project.image}
            alt={`${project.title} screenshot`}
            className="h-full w-full rounded-lg object-cover"
          />
        ) : (
          <div className="flex flex-col items-center gap-2 p-6 text-center text-text-3">
            <ImageOff size={28} aria-hidden />
            <p className="font-mono text-xs">screenshot coming soon</p>
          </div>
        )}
      </div>

      <div className="mt-6 flex flex-wrap gap-2">
        {project.liveUrl ? (
          <ExternalLink
            href={project.liveUrl}
            className="inline-flex items-center gap-1.5 rounded-md bg-gradient-to-r from-cyan to-violet px-4 py-2 text-sm font-semibold text-black transition-transform hover:-translate-y-0.5"
          >
            <ExternalLinkIcon size={14} aria-hidden /> Live Demo
          </ExternalLink>
        ) : (
          <span className="inline-flex items-center gap-1.5 rounded-md border border-border px-4 py-2 font-mono text-xs text-text-3">
            live demo link coming soon
          </span>
        )}
        {project.githubUrl ? (
          <ExternalLink
            href={project.githubUrl}
            className="inline-flex items-center gap-1.5 rounded-md border border-border px-4 py-2 text-sm font-semibold text-text-1 transition-transform hover:-translate-y-0.5 hover:bg-surface-hover"
          >
            <GithubIcon size={14} aria-hidden /> View Code
          </ExternalLink>
        ) : (
          <span className="inline-flex items-center gap-1.5 rounded-md border border-border px-4 py-2 font-mono text-xs text-text-3">
            repository link coming soon
          </span>
        )}
      </div>

      <section className="mt-8 max-w-2xl">
        <h2 className="mb-2 font-mono text-sm font-semibold text-violet">{"/* overview */"}</h2>
        <p className="text-sm leading-relaxed text-text-1">{project.description}</p>
        {project.problem && (
          <p className="mt-3 rounded border-l-2 border-warning bg-surface p-3 text-sm leading-relaxed text-text-2">
            <span className="font-semibold text-warning">Problem: </span>
            {project.problem}
          </p>
        )}
        {project.metricNote && (
          <p className="mt-3 font-mono text-xs text-text-3">{project.metricNote}</p>
        )}
      </section>

      <Section title="engineering approach" items={project.approach} />
      <Section title="key technical decisions" items={project.decisions} />
      <Section title="major features" items={project.features} />
      <Section title="challenges & lessons" items={project.challenges} />

      <section className="mt-6">
        <h2 className="mb-2 font-mono text-sm font-semibold text-violet">{"/* technologies */"}</h2>
        <div className="flex flex-wrap gap-1.5">
          {project.technologies.map((t) => (
            <TechTag key={t}>{t}</TechTag>
          ))}
        </div>
      </section>
    </EditorPage>
  );
}
