"use client";

import { useState } from "react";
import { Check, Copy, Download, Mail, MapPin } from "lucide-react";
import { GithubIcon, InstagramIcon, LinkedinIcon } from "@/components/ui/BrandIcons";
import { personalInfo, socialLinks } from "@/data/portfolio";
import { CodeComment, EditorPage } from "@/components/portfolio/shared";
import ExternalLink from "@/components/ui/ExternalLink";

export default function ContactFile() {
  const [copied, setCopied] = useState(false);
  const [copyFailed, setCopyFailed] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(personalInfo.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard unavailable — show the address for manual copying
      setCopyFailed(true);
      setTimeout(() => setCopyFailed(false), 3500);
    }
  };

  const codeLine = (key: string, value: string, comma = true) => (
    <>
      {"  "}
      {key}: <span className="text-string">&quot;{value}&quot;</span>
      {comma ? "," : ""}
      {"\n"}
    </>
  );

  return (
    <EditorPage>
      <CodeComment>{"/* contact.css — open to work, collabs & good conversations */"}</CodeComment>
      <h1 className="mb-6 mt-3 text-2xl font-bold text-text-1 sm:text-3xl">Contact</h1>

      <pre className="max-w-2xl overflow-x-auto rounded-lg border border-border bg-surface p-4 font-mono text-xs leading-relaxed sm:text-sm">
        <code>
          <span className="text-keyword">const</span>{" "}
          <span className="text-cyan">contact</span> = {"{"}
          {"\n"}
          {codeLine("name", personalInfo.name)}
          {codeLine("location", personalInfo.location)}
          {codeLine("email", personalInfo.email)}
          {codeLine("github", socialLinks.github)}
          {codeLine("instagram", socialLinks.instagram)}
          {codeLine("linkedin", socialLinks.linkedin)}
          {codeLine("availability", personalInfo.availability, false)}
          {"}"};
        </code>
      </pre>

      <div className="mt-6 flex max-w-2xl flex-wrap gap-2">
        <button
          onClick={copyEmail}
          className="inline-flex min-h-11 items-center gap-1.5 rounded-md border border-border px-4 py-2 text-sm font-medium text-text-1 hover:bg-surface-hover"
        >
          {copied ? (
            <>
              <Check size={14} className="text-success" aria-hidden /> Copied!
            </>
          ) : (
            <>
              <Copy size={14} aria-hidden /> Copy Email
            </>
          )}
        </button>
        <a
          href={`mailto:${personalInfo.email}`}
          className="inline-flex min-h-11 items-center gap-1.5 rounded-md bg-gradient-to-r from-cyan to-violet px-4 py-2 text-sm font-semibold text-black transition-transform hover:-translate-y-0.5"
        >
          <Mail size={14} aria-hidden /> Send Email
        </a>
        <ExternalLink
          href={socialLinks.github}
          className="inline-flex min-h-11 items-center gap-1.5 rounded-md border border-border px-4 py-2 text-sm font-medium text-text-1 hover:bg-surface-hover"
        >
          <GithubIcon size={14} aria-hidden /> Open GitHub
        </ExternalLink>
        <ExternalLink
          href={socialLinks.linkedin}
          className="inline-flex min-h-11 items-center gap-1.5 rounded-md border border-border px-4 py-2 text-sm font-medium text-text-1 hover:bg-surface-hover"
        >
          <LinkedinIcon size={14} aria-hidden /> Open LinkedIn
        </ExternalLink>
        <ExternalLink
          href={socialLinks.instagram}
          className="inline-flex min-h-11 items-center gap-1.5 rounded-md border border-border px-4 py-2 text-sm font-medium text-text-1 hover:bg-surface-hover"
        >
          <InstagramIcon size={14} aria-hidden /> Instagram
        </ExternalLink>
        <a
          href="/resume.pdf"
          download="Sidak-Singh-Chahal-Resume.pdf"
          className="inline-flex min-h-11 items-center gap-1.5 rounded-md border border-border px-4 py-2 text-sm font-medium text-text-1 hover:bg-surface-hover"
        >
          <Download size={14} aria-hidden /> Download Resume
        </a>
      </div>

      {copyFailed && (
        <p role="alert" className="mt-3 font-mono text-xs text-warning">
          Clipboard unavailable — email me at {personalInfo.email}
        </p>
      )}

      <div className="mt-8 flex max-w-2xl flex-wrap items-center gap-x-6 gap-y-2 border-t border-border pt-5 text-sm text-text-2">
        <span className="flex items-center gap-1.5">
          <MapPin size={14} className="text-cyan" aria-hidden />
          {personalInfo.location}
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-success" aria-hidden />
          {personalInfo.availability}
        </span>
      </div>
    </EditorPage>
  );
}
