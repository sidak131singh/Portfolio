"use client";

import { Mail, MapPin } from "lucide-react";
import { GithubIcon, InstagramIcon, LinkedinIcon } from "@/components/ui/BrandIcons";
import { personalInfo, socialLinks } from "@/data/portfolio";
import { useIdeStore } from "@/store/ideStore";
import ExternalLink from "@/components/ui/ExternalLink";

export default function ProfilePanel() {
  const openFile = useIdeStore((s) => s.openFile);

  const rows = [
    { Icon: Mail, label: personalInfo.email, href: `mailto:${personalInfo.email}` },
    { Icon: GithubIcon, label: "github.com/sidak131singh", href: socialLinks.github },
    { Icon: LinkedinIcon, label: "LinkedIn Profile", href: socialLinks.linkedin },
    { Icon: InstagramIcon, label: "Instagram", href: socialLinks.instagram },
  ];

  return (
    <div className="flex h-full flex-col overflow-y-auto pb-4">
      <div className="px-4 pb-2 pt-3 text-[11px] font-semibold uppercase tracking-wider text-text-2">
        Account
      </div>
      <div className="mx-3 rounded border border-border bg-editor p-4 text-center">
        <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-cyan to-violet font-mono text-lg font-bold text-black">
          {personalInfo.initials}
        </span>
        <p className="mt-2 text-sm font-semibold text-text-1">{personalInfo.name}</p>
        <p className="text-[11px] text-text-2">{personalInfo.roles[0]}</p>
        <p className="mt-1 flex items-center justify-center gap-1 text-[11px] text-text-3">
          <MapPin size={11} aria-hidden /> {personalInfo.location}
        </p>
      </div>
      <div className="mt-3 space-y-1 px-3">
        {rows.map((row) => (
          <ExternalLink
            key={row.label}
            href={row.href}
            className="flex items-center gap-2 rounded px-2 py-1.5 text-xs text-text-2 hover:bg-surface-hover hover:text-text-1"
          >
            <row.Icon size={14} className="shrink-0 text-cyan" aria-hidden />
            <span className="truncate">{row.label}</span>
          </ExternalLink>
        ))}
      </div>
      <button
        onClick={() => openFile("contact")}
        className="mx-3 mt-3 rounded bg-blue px-3 py-1.5 text-xs font-medium text-white hover:opacity-90"
      >
        Open contact.css
      </button>
    </div>
  );
}
