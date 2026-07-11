import type { ChatIntent } from "@/types/portfolio";
import { experience, personalInfo, projects, skills, socialLinks } from "@/data/portfolio";

export const suggestedQuestions: string[] = [
  "What is Sidak's strongest project?",
  "What did Sidak do at MIDAS Lab?",
  "Which backend technologies does Sidak use?",
  "Tell me about the Product Browser.",
  "Is Sidak open to software engineering opportunities?",
  "How can I contact Sidak?",
];

/** Extra questions unlocked by reaching a score of 50 in the Dino game. */
export const bonusQuestions: string[] = [
  "What's Sidak's debugging philosophy?",
  "Does Sidak play any games while coding?",
];

export const bonusIntents: ChatIntent[] = [
  {
    id: "debugging-philosophy",
    keywords: ["debugging philosophy", "debug", "debugging streak"],
    answer:
      "Achievement holder detected! Sidak's debugging approach: reproduce first, read the error twice, binary-search the problem space, and never trust a fix you can't explain. 400+ DSA problems have made him very patient with stubborn bugs.",
  },
  {
    id: "games",
    keywords: ["play any games", "games while coding", "dino"],
    answer:
      "You found the easter egg! Sidak clearly appreciates a good runner game — you just beat the one hidden in this portfolio. When not dodging bugs in the Dino game, he's usually squashing real ones in his projects.",
  },
];

const projectList = projects
  .filter((p) => p.featured)
  .map((p) => `• ${p.title} — ${p.summary}`)
  .join("\n");

const backendSkills = skills.backend.join(", ");
const dbSkills = skills.databases.join(", ");

export const fallbackAnswer =
  "I don't have that information yet. You can ask about Sidak's projects, experience, skills, education, or contact details.";

export const intents: ChatIntent[] = [
  {
    id: "greeting",
    keywords: ["hello", "hi", "hey", "good morning", "good evening"],
    answer:
      "Hi! I'm Sidak's portfolio assistant. Ask me about his projects, experience at MIDAS Lab or TechCarrot, technical skills, education, or how to get in touch.",
  },
  {
    id: "strongest-project",
    keywords: ["strongest project", "best project", "top project", "favorite project", "most impressive"],
    answer:
      "Sidak's featured projects are SheStarts (an AI career platform for women with employability scoring, 90-day roadmaps, and a 24/7 AI counselor — live at https://careercompass-chi-two.vercel.app/), the IIIT Delhi Infirmary Portal, RAGbot for enterprise assistance, the Delhi School Equity Compliance Portal, and LiverGuard (an ML liver-disease predictor). Ask me about any of them for details!",
  },
  {
    id: "shestarts",
    keywords: ["shestarts", "career compass", "career counselor", "employability"],
    answer:
      "SheStarts — Career Compass is an AI-powered career intelligence platform for women. It analyses 7 dimensions of a profile to produce an Employability Score out of 100, generates a personalized 90-day roadmap, and includes Prerna, a 24/7 AI career counselor. Built with Next.js, React, and TypeScript. Live at https://careercompass-chi-two.vercel.app/",
  },
  {
    id: "ragbot",
    keywords: ["ragbot", "enterprise assistance", "enterprise bot"],
    answer:
      "RAGbot — Enterprise Assistance is a Python-based retrieval-augmented generation assistant that answers enterprise questions grounded in internal knowledge sources, deployed as an interactive Streamlit app. Try it live: https://ragbot---rag-for-enterprise-assistance-6s8qepiswqtsc72335ycap.streamlit.app/",
  },
  {
    id: "midas",
    keywords: ["midas", "research", "llm evaluation", "researcher"],
    answer:
      "At MIDAS Lab, IIIT Delhi (Aug–Dec 2024), Sidak built evaluation pipelines for LLaMA-70B, Mixtral-8x7B, and LLaMA-405B; evaluated Answer-Only, Chain-of-Thought, and Few-Shot prompting on benchmarks like MATH, JEEBench, and MMLU; improved mathematical reasoning performance by ~6% (with ~84% accuracy on advanced algebra); and built a RAG pipeline with LlamaIndex and ChromaDB that improved accuracy on difficult questions by ~12%.",
  },
  {
    id: "techcarrot",
    keywords: ["techcarrot", "intern", "internship"],
    answer:
      "At TechCarrot, Sidak worked as a Software Development Intern on a data-driven employee management and HR analytics platform — building React interfaces and reusable components, integrating with Spring Boot APIs, and working with MySQL-backed data and dashboards.",
  },
  {
    id: "outlier",
    keywords: ["outlier", "rlhf", "openclaw", "evaluator", "human feedback"],
    answer:
      "At Outlier AI, Sidak worked as an AI Evaluator focused on training and refining LLMs through Reinforcement Learning from Human Feedback (RLHF). He handled complex long-form evaluations — up to 6-hour tasks — for intensive projects like Openclaw Atlas, built evaluation rubrics (including Polarity Coherence Checkers) with weighted metrics targeting factuality and hallucination rates, designed prompts to test model constraints on systems like ChatGPT and Gemini, and provided detailed human feedback to improve model logic and reasoning.",
  },
  {
    id: "backend",
    keywords: ["backend", "back-end", "server side", "apis"],
    answer: `Sidak's backend stack includes ${backendSkills}. On the database side he works with ${dbSkills}. Notable backend work includes the Product Browser (Node.js + PostgreSQL keyset pagination at 200k-row scale) and the Employee Management System (Spring Boot + Spring Security + JWT).`,
  },
  {
    id: "frontend",
    keywords: ["frontend", "front-end", "react", "next.js", "ui"],
    answer: `Sidak's frontend skills: ${skills.frontend.join(", ")}. He has built responsive interfaces for the Infirmary Portal, Employee Management System dashboards, and the Chatbot Flow Builder.`,
  },
  {
    id: "product-browser",
    keywords: ["product browser", "pagination", "keyset", "200,000", "200000", "200k"],
    answer:
      "The Product Browser handles 200,000 products efficiently using keyset (cursor-based) pagination ordered by (created_at, id) — avoiding OFFSET, which slows down at depth and can duplicate/skip rows during concurrent writes. Seed data was generated with a set-based PostgreSQL INSERT...SELECT...generate_series() statement. Stack: Node.js, Express, PostgreSQL (Neon), deployed on Render. Live demo: https://product-browser-k1p7.onrender.com/",
  },
  {
    id: "infirmary",
    keywords: ["infirmary", "healthcare", "health portal"],
    answer:
      "The Infirmary Portal is a full-stack healthcare management platform for IIIT Delhi — appointment scheduling, digital prescriptions, role-based access, and secure patient records, built with Next.js and TypeScript for 2,000+ users.",
  },
  {
    id: "ems",
    keywords: ["employee management", "spring boot project", "hr system"],
    answer:
      "The Employee Management System is a role-based HR application (Employee, HR, Supervisor, Admin) built with React, Spring Boot, Spring Security, and MySQL — covering leave workflows, attendance tracking, holiday calendars, and JWT-secured APIs.",
  },
  {
    id: "liverguard",
    keywords: ["liverguard", "liver", "machine learning project", "ml project", "xgboost"],
    answer:
      "LiverGuard is a machine learning pipeline for liver-health risk prediction built on 30,000+ clinical records — covering EDA, cleaning, feature engineering, class balancing, and comparison of 6+ models, with a final XGBoost model.",
  },
  {
    id: "flow-builder",
    keywords: ["flow builder", "chatbot flow"],
    answer:
      "The Chatbot Flow Builder is a visual drag-and-drop tool for designing chatbot conversations — message nodes, connections, an editable settings panel, and validation before saving. Built with React.",
  },
  {
    id: "projects",
    keywords: ["projects", "portfolio", "built", "work"],
    answer: `Here are Sidak's featured projects:\n${projectList}\n\nOpen the projects folder in the Explorer to dive into any of them.`,
  },
  {
    id: "skills",
    keywords: ["skills", "technologies", "tech stack", "stack", "languages"],
    answer: `Languages: ${skills.languages.join(", ")}\nFrontend: ${skills.frontend.join(", ")}\nBackend: ${backendSkills}\nDatabases: ${dbSkills}\nAI/ML: ${skills.ai_ml.join(", ")}\nTools & Cloud: ${skills.tools_and_cloud.join(", ")}`,
  },
  {
    id: "ai",
    keywords: ["ai", "llm", "rag", "retrieval", "machine learning", "artificial intelligence"],
    answer:
      "Sidak works with LLMs (LLaMA, Mixtral), retrieval-augmented generation with LlamaIndex and ChromaDB, prompt engineering, LLM evaluation pipelines, and classic ML with Scikit-learn and XGBoost. His RAG pipeline at MIDAS Lab improved accuracy on difficult questions by ~12%.",
  },
  {
    id: "education",
    keywords: ["education", "university", "college", "degree", "iiit", "cgpa", "study"],
    answer:
      "Sidak is a final-year B.Tech student in Electronics and Communication Engineering at IIIT Delhi (2022–2026) with a CGPA of 7.98/10. Coursework includes DSA, Operating Systems, DBMS, Machine Learning, Advanced Java, Computer Networks, and Computer Architecture.",
  },
  {
    id: "experience",
    keywords: ["experience", "worked", "job", "career"],
    answer: experience
      .map((e) => `• ${e.role} @ ${e.organization} (${e.dates}) — ${e.summary}`)
      .join("\n"),
  },
  {
    id: "availability",
    keywords: ["open to", "available", "availability", "hiring", "hire", "opportunities", "looking for"],
    answer: `Yes — Sidak is ${personalInfo.availability.toLowerCase()}. He graduates from IIIT Delhi in ${personalInfo.graduationYear}. Reach him at ${personalInfo.email} or on LinkedIn: ${socialLinks.linkedin}`,
  },
  {
    id: "contact",
    keywords: ["contact", "email", "reach", "linkedin", "github", "get in touch", "social"],
    answer: `You can reach Sidak at:\n• Email: ${personalInfo.email}\n• GitHub: ${socialLinks.github}\n• LinkedIn: ${socialLinks.linkedin}\n\nOr open contact.css in the Explorer.`,
  },
  {
    id: "location",
    keywords: ["location", "where", "based", "city", "live"],
    answer: `Sidak is based in ${personalInfo.location}.`,
  },
  {
    id: "resume",
    keywords: ["resume", "cv"],
    answer:
      "You can view and download Sidak's resume by opening resume.pdf in the Explorer, or via File → Download Resume in the menu bar.",
  },
  {
    id: "dsa",
    keywords: ["dsa", "data structures", "algorithms", "leetcode", "competitive"],
    answer:
      "Sidak has solved more than 400 data structures and algorithms problems, which has sharpened his approach to problem solving, optimization, and debugging.",
  },
  {
    id: "who",
    keywords: ["who is sidak", "about sidak", "who are you", "tell me about sidak", "introduce"],
    answer: `${personalInfo.name} is a ${personalInfo.roles.join(", ").toLowerCase()} and final-year B.Tech student at IIIT Delhi. ${personalInfo.introPrimary}`,
  },
];

/**
 * Deterministic local intent matcher — used as the default engine and as a
 * fallback when the optional Gemini API is unavailable.
 */
export function matchIntent(question: string, includeBonus: boolean): string {
  const q = question.toLowerCase();
  const pool = includeBonus ? [...bonusIntents, ...intents] : intents;

  let best: { score: number; answer: string } | null = null;
  for (const intent of pool) {
    let score = 0;
    for (const keyword of intent.keywords) {
      if (q.includes(keyword)) {
        score += keyword.split(" ").length * 2 + keyword.length / 10;
      }
    }
    if (score > 0 && (!best || score > best.score)) {
      best = { score, answer: intent.answer };
    }
  }
  return best ? best.answer : fallbackAnswer;
}

/** Compact knowledge summary sent to the optional LLM endpoint as context. */
export function buildKnowledgeContext(): string {
  return [
    `Name: ${personalInfo.name}`,
    `Roles: ${personalInfo.roles.join(", ")}`,
    `Location: ${personalInfo.location}`,
    `Email: ${personalInfo.email}`,
    `Education: ${personalInfo.degree}, ${personalInfo.university}, graduating ${personalInfo.graduationYear}, CGPA 7.98/10`,
    `Availability: ${personalInfo.availability}`,
    `GitHub: ${socialLinks.github}`,
    `LinkedIn: ${socialLinks.linkedin}`,
    "",
    "EXPERIENCE:",
    ...experience.map(
      (e) => `- ${e.role} @ ${e.organization} (${e.dates}): ${e.highlights.join(" ")}`
    ),
    "",
    "PROJECTS:",
    ...projects.map(
      (p) =>
        `- ${p.title} [${p.status}]: ${p.description} Technologies: ${p.technologies.join(", ")}.${p.liveUrl ? ` Live: ${p.liveUrl}` : ""}${p.githubUrl ? ` GitHub: ${p.githubUrl}` : ""}`
    ),
    "",
    "SKILLS:",
    ...Object.entries(skills).map(([cat, list]) => `- ${cat}: ${list.join(", ")}`),
    "",
    "ACHIEVEMENTS: Solved 400+ DSA problems; built and deployed multiple full-stack apps; LLM evaluation research at MIDAS Lab; ~12% RAG improvement on difficult questions; 200k-product PostgreSQL browsing.",
  ].join("\n");
}
