import type { ExplorerNode, PortfolioFile } from "@/types/portfolio";

/**
 * Flat registry of every openable file in the fake workspace.
 * The explorer shows the simple top-level list; project detail files
 * open as tabs from the projects.js overview page.
 */
export const files: Record<string, PortfolioFile> = {
  home: { id: "home", name: "home.tsx", language: "tsx", slug: "home" },
  about: { id: "about", name: "about.html", language: "html", slug: "about" },
  "projects-overview": {
    id: "projects-overview",
    name: "projects.js",
    language: "js",
    slug: "projects",
  },
  skills: { id: "skills", name: "skills.json", language: "json", slug: "skills" },
  experience: {
    id: "experience",
    name: "experience.ts",
    language: "ts",
    slug: "experience",
  },
  education: { id: "education", name: "education.md", language: "md", slug: "education" },
  achievements: {
    id: "achievements",
    name: "achievements.md",
    language: "md",
    slug: "achievements",
  },
  contact: { id: "contact", name: "contact.css", language: "css", slug: "contact" },
  readme: { id: "readme", name: "README.md", language: "md", slug: "readme" },
  resume: { id: "resume", name: "Sidak_Resume.pdf", language: "pdf", slug: "resume" },

  /* Project detail files — opened from projects.js, not listed in the explorer */
  "product-browser": {
    id: "product-browser",
    name: "product-browser.ts",
    language: "ts",
    slug: "projects/product-browser",
  },
  "infirmary-portal": {
    id: "infirmary-portal",
    name: "infirmary-portal.tsx",
    language: "tsx",
    slug: "projects/infirmary-portal",
  },
  "employee-management-system": {
    id: "employee-management-system",
    name: "employee-management-system.java",
    language: "java",
    slug: "projects/employee-management-system",
  },
  liverguard: {
    id: "liverguard",
    name: "liverguard.py",
    language: "py",
    slug: "projects/liverguard",
  },
  "chatbot-flow-builder": {
    id: "chatbot-flow-builder",
    name: "chatbot-flow-builder.tsx",
    language: "tsx",
    slug: "projects/chatbot-flow-builder",
  },
  shestarts: {
    id: "shestarts",
    name: "shestarts.tsx",
    language: "tsx",
    slug: "projects/shestarts",
  },
  "ragbot-enterprise": {
    id: "ragbot-enterprise",
    name: "ragbot.py",
    language: "py",
    slug: "projects/ragbot",
  },
  "school-equity-portal": {
    id: "school-equity-portal",
    name: "equity-portal.js",
    language: "js",
    slug: "projects/equity-portal",
  },
};

/** Explorer tree — a clean flat list like a real minimal workspace. */
export const explorerTree: ExplorerNode[] = [
  { kind: "file", file: files["home"] },
  { kind: "file", file: files["about"] },
  { kind: "file", file: files["projects-overview"] },
  { kind: "file", file: files["skills"] },
  { kind: "file", file: files["experience"] },
  { kind: "file", file: files["education"] },
  { kind: "file", file: files["achievements"] },
  { kind: "file", file: files["contact"] },
  { kind: "file", file: files["readme"] },
  { kind: "file", file: files["resume"] },
];

export const rootFolderName = "SIDAK-CHAHAL-PORTFOLIO";

/** Look up a file id from a URL hash slug like "projects/product-browser". */
export function fileIdFromSlug(slug: string): string | undefined {
  return Object.values(files).find((f) => f.slug === slug)?.id;
}

/** Look up a file id from a filename like "about.html" (case-insensitive). */
export function fileIdFromName(name: string): string | undefined {
  const lower = name.toLowerCase();
  return Object.values(files).find((f) => f.name.toLowerCase() === lower)?.id;
}

/** ASCII tree used by the terminal `tree` command. */
export const asciiTree = `SIDAK-CHAHAL-PORTFOLIO
│
├── home.tsx
├── about.html
├── projects.js
│   ├── shestarts.tsx
│   ├── infirmary-portal.tsx
│   ├── ragbot.py
│   ├── equity-portal.js
│   ├── liverguard.py
│   ├── product-browser.ts
│   ├── employee-management-system.java
│   └── chatbot-flow-builder.tsx
├── skills.json
├── experience.ts
├── education.md
├── achievements.md
├── contact.css
├── README.md
└── Sidak_Resume.pdf`;

/** Root-level entries used by the terminal `ls` command. */
export const rootListing = [
  "home.tsx",
  "about.html",
  "projects.js",
  "skills.json",
  "experience.ts",
  "education.md",
  "achievements.md",
  "contact.css",
  "README.md",
  "Sidak_Resume.pdf",
];
