import {
  Atom,
  Braces,
  Code2,
  Coffee,
  FileCode2,
  FileDown,
  FileJson,
  FileText,
  Palette,
} from "lucide-react";
import type { FileLanguage } from "@/types/portfolio";

const iconMap: Record<FileLanguage, { Icon: typeof FileCode2; color: string }> = {
  tsx: { Icon: Atom, color: "text-cyan" },
  ts: { Icon: FileCode2, color: "text-blue" },
  js: { Icon: Braces, color: "text-yellow" },
  html: { Icon: Code2, color: "text-string" },
  css: { Icon: Palette, color: "text-violet" },
  md: { Icon: FileText, color: "text-green" },
  json: { Icon: FileJson, color: "text-warning" },
  java: { Icon: Coffee, color: "text-string" },
  py: { Icon: FileCode2, color: "text-success" },
  pdf: { Icon: FileDown, color: "text-pink" },
};

export default function FileIcon({
  language,
  size = 15,
}: {
  language: FileLanguage;
  size?: number;
}) {
  const { Icon, color } = iconMap[language];
  return <Icon size={size} className={`shrink-0 ${color}`} aria-hidden />;
}
