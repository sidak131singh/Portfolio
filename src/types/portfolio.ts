/** Shared type definitions for all portfolio content. */

export interface PersonalInfo {
  name: string;
  shortName: string;
  initials: string;
  roles: string[];
  location: string;
  email: string;
  university: string;
  degree: string;
  graduationYear: string;
  availability: string;
  tagline: string;
  introPrimary: string;
  introSecondary: string;
}

export interface SocialLinks {
  github: string;
  linkedin: string;
  instagram: string;
}

export interface EducationEntry {
  institution: string;
  degree: string;
  duration: string;
  score: string;
  scoreLabel: string;
  coursework?: string[];
  level: "college" | "school";
}

export interface ExperienceEntry {
  id: string;
  role: string;
  organization: string;
  dates: string;
  location?: string;
  commitLabel: string;
  summary: string;
  highlights: string[];
  technologies: string[];
  /** Set when details still need verification by the portfolio owner. */
  needsVerification?: boolean;
}

export type ProjectStatus = "Live" | "Deployed" | "Completed" | "Completed / Testing" | "In Progress";

export interface Project {
  id: string;
  fileName: string;
  title: string;
  summary: string;
  description: string;
  problem?: string;
  approach?: string[];
  decisions?: string[];
  features: string[];
  challenges?: string[];
  technologies: string[];
  githubUrl: string; // empty string => TODO: add the verified project URL
  liveUrl: string; // empty string => TODO: add the verified project URL
  image: string; // empty string => placeholder rendered
  status: ProjectStatus;
  featured: boolean;
  metricNote?: string;
}

export interface SkillCategories {
  [category: string]: string[];
}

export interface Achievement {
  text: string;
  marker: string;
}

export interface StatItem {
  label: string;
  value: number;
  suffix: string;
}

export interface TechExtension {
  name: string;
  category: string;
  description: string;
  relatedProjects: string[];
}

/* ---------- IDE file-system types ---------- */

export type FileLanguage =
  | "tsx"
  | "ts"
  | "js"
  | "html"
  | "css"
  | "md"
  | "json"
  | "java"
  | "py"
  | "pdf";

export interface PortfolioFile {
  id: string;
  name: string;
  language: FileLanguage;
  /** URL hash slug, e.g. "projects/product-browser" */
  slug: string;
}

export interface PortfolioFolder {
  id: string;
  name: string;
  children: PortfolioFile[];
}

export type ExplorerNode =
  | { kind: "file"; file: PortfolioFile }
  | { kind: "folder"; folder: PortfolioFolder };

/* ---------- Chatbot types ---------- */

export interface ChatIntent {
  id: string;
  keywords: string[];
  answer: string;
}

export interface ChatMessageData {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: number;
}
