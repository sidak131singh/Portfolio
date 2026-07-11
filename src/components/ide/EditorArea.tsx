"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useIdeStore } from "@/store/ideStore";
import EditorTabs from "@/components/ide/EditorTabs";
import HomeFile from "@/components/portfolio/HomeFile";
import ReadmeFile from "@/components/portfolio/ReadmeFile";
import AboutFile from "@/components/portfolio/AboutFile";
import ExperienceFile from "@/components/portfolio/ExperienceFile";
import ProjectsOverview from "@/components/portfolio/ProjectsOverview";
import ProjectFile from "@/components/portfolio/ProjectFile";
import SkillsFile from "@/components/portfolio/SkillsFile";
import EducationFile from "@/components/portfolio/EducationFile";
import AchievementsFile from "@/components/portfolio/AchievementsFile";
import ContactFile from "@/components/portfolio/ContactFile";
import ResumeFile from "@/components/portfolio/ResumeFile";

const projectIds = new Set([
  "shestarts",
  "infirmary-portal",
  "ragbot-enterprise",
  "school-equity-portal",
  "liverguard",
  "product-browser",
  "employee-management-system",
  "chatbot-flow-builder",
]);

function FileContent({ fileId }: { fileId: string }) {
  if (fileId === "experience") return <ExperienceFile />;
  if (projectIds.has(fileId)) return <ProjectFile projectId={fileId} />;

  switch (fileId) {
    case "home":
      return <HomeFile />;
    case "readme":
      return <ReadmeFile />;
    case "about":
      return <AboutFile />;
    case "projects-overview":
      return <ProjectsOverview />;
    case "skills":
      return <SkillsFile />;
    case "education":
      return <EducationFile />;
    case "achievements":
      return <AchievementsFile />;
    case "contact":
      return <ContactFile />;
    case "resume":
      return <ResumeFile />;
    default:
      return <HomeFile />;
  }
}

export default function EditorArea() {
  const activeTabId = useIdeStore((s) => s.activeTabId);

  return (
    <div className="flex min-h-0 min-w-0 flex-1 flex-col bg-editor">
      <EditorTabs />
      <div className="min-h-0 flex-1 overflow-y-auto" role="tabpanel" aria-label="Editor content">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTabId}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.12 }}
          >
            <FileContent fileId={activeTabId} />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
