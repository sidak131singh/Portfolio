"use client";

import { ArrowUpRight, ExternalLink as ExternalLinkIcon, FolderOpen, Star } from "lucide-react";
import { featuredProjectOrder, moreProjectOrder, projects } from "@/data/portfolio";
import { files } from "@/data/fileSystem";
import { useIdeStore } from "@/store/ideStore";
import { CodeComment, EditorPage, TechTag } from "@/components/portfolio/shared";
import ExternalLink from "@/components/ui/ExternalLink";
import type { Project } from "@/types/portfolio";

function sortByOrder(list: Project[], order: string[]): Project[] {
  const rank = (p: Project) => {
    const i = order.indexOf(p.id);
    return i === -1 ? order.length : i;
  };
  return [...list].sort((a, b) => rank(a) - rank(b));
}

export default function ProjectsOverview() {
  const openFile = useIdeStore((s) => s.openFile);
  const featured = sortByOrder(
    projects.filter((p) => p.featured),
    featuredProjectOrder
  );
  const others = sortByOrder(
    projects.filter((p) => !p.featured),
    moreProjectOrder
  );

  const Card = ({ project, showImage }: { project: Project; showImage?: boolean }) => {
    const openable = Boolean(files[project.id]);
    return (
      <article className="flex flex-col overflow-hidden rounded-lg border border-border bg-surface transition-colors hover:border-cyan/40">
        {showImage && project.image && (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            src={project.image}
            alt={`${project.title} screenshot`}
            loading="lazy"
            className="aspect-video w-full border-b border-border object-cover object-top"
          />
        )}
        <div className="flex flex-1 flex-col p-4">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-mono text-sm font-semibold text-text-1">{project.title}</h3>
            {project.featured && (
              <Star size={13} className="mt-0.5 shrink-0 text-warning" aria-hidden />
            )}
          </div>
          <p className="mt-1.5 flex-1 text-xs leading-relaxed text-text-2">{project.summary}</p>
          <div className="mt-3 flex flex-wrap gap-1">
            {project.technologies.slice(0, 4).map((t) => (
              <TechTag key={t}>{t}</TechTag>
            ))}
            {project.technologies.length > 4 && (
              <span className="font-mono text-[10px] text-text-3">
                +{project.technologies.length - 4} more
              </span>
            )}
          </div>
          <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 border-t border-border pt-3">
            {openable && (
              <button
                onClick={() => openFile(project.id)}
                className="inline-flex items-center gap-1 font-mono text-xs text-cyan hover:underline"
              >
                <FolderOpen size={12} aria-hidden /> open {project.fileName}
              </button>
            )}
            {project.liveUrl && (
              <ExternalLink
                href={project.liveUrl}
                className="inline-flex items-center gap-1 font-mono text-xs text-green hover:underline"
              >
                <ExternalLinkIcon size={12} aria-hidden /> live
              </ExternalLink>
            )}
            {project.githubUrl && (
              <ExternalLink
                href={project.githubUrl}
                className="inline-flex items-center gap-1 font-mono text-xs text-violet hover:underline"
              >
                <ArrowUpRight size={12} aria-hidden /> GitHub
              </ExternalLink>
            )}
            {!openable && !project.githubUrl && !project.liveUrl && (
              <span className="font-mono text-[11px] text-text-3">link coming soon</span>
            )}
            <span className="ml-auto font-mono text-[10px] text-text-3">{project.status}</span>
          </div>
        </div>
      </article>
    );
  };

  return (
    <EditorPage>
      <CodeComment>{"// projects.js — things I've built & shipped"}</CodeComment>
      <h1 className="mb-2 mt-3 text-2xl font-bold text-text-1 sm:text-3xl">Projects</h1>
      <p className="mb-6 max-w-2xl text-sm text-text-2">
        Featured work first — open any file for the full engineering write-up. More projects
        live on{" "}
        <ExternalLink
          href="https://github.com/sidak131singh"
          className="text-cyan hover:underline"
        >
          GitHub
        </ExternalLink>
        .
      </p>

      <h2 className="mb-3 font-mono text-sm font-semibold text-pink">{"/* featured */"}</h2>
      <div className="grid gap-4 sm:grid-cols-2">
        {featured.map((p) => (
          <Card key={p.id} project={p} showImage />
        ))}
      </div>

      <h2 className="mb-3 mt-10 font-mono text-sm font-semibold text-yellow">
        {"/* more from github */"}
      </h2>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {others.map((p) => (
          <Card key={p.id} project={p} />
        ))}
      </div>
    </EditorPage>
  );
}
