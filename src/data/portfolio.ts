import type {
  Achievement,
  EducationEntry,
  ExperienceEntry,
  PersonalInfo,
  Project,
  SkillCategories,
  SocialLinks,
  StatItem,
  TechExtension,
} from "@/types/portfolio";

export const personalInfo: PersonalInfo = {
  name: "Sidak Singh Chahal",
  shortName: "Sidak",
  initials: "SC",
  roles: ["Software Engineer", "Full-Stack Developer", "AI / LLM Engineer"],
  location: "Delhi, India",
  email: "sidak99273@gmail.com",
  university: "IIIT Delhi",
  degree: "B.Tech in Electronics and Communication Engineering",
  graduationYear: "2026",
  availability: "Open to software engineering opportunities",
  tagline: "// hello world — welcome to my portfolio",
  introPrimary:
    "I build scalable web applications and intelligent systems at the intersection of full-stack engineering, backend development, and applied AI.",
  introSecondary:
    "I'm a final-year B.Tech student at IIIT Delhi with experience in React, Node.js, Spring Boot, databases, LLM evaluation, retrieval-augmented generation, and production-oriented software development.",
};

export const socialLinks: SocialLinks = {
  github: "https://github.com/sidak131singh",
  linkedin: "https://www.linkedin.com/in/sidak-singh-chahal-03ba06185/",
  instagram: "https://www.instagram.com/_sidak_singh__/?hl=en",
};

/** Sentences typed word-by-word (then deleted word-by-word) on the home hero. */
export const typewriterLines: string[] = [
  "I build scalable full-stack web applications.",
  "I train and evaluate LLMs through RLHF.",
  "I design backends that survive 200,000-row datasets.",
  "I've solved 400+ data structures and algorithms problems.",
  "I build retrieval-augmented generation pipelines.",
  "I turn complex problems into reliable software.",
  "I'm graduating from IIIT Delhi in 2026.",
  "I'm open to software engineering opportunities.",
];

export const heroStats: StatItem[] = [
  { label: "DSA Problems", value: 400, suffix: "+" },
  { label: "Major Projects", value: 5, suffix: "+" },
  { label: "Professional Experiences", value: 3, suffix: "" },
  { label: "Core Technologies", value: 10, suffix: "+" },
];

// NOTE: Keep CGPA and coursework easy to update here.
export const education: EducationEntry[] = [
  {
    institution: "Indraprastha Institute of Information Technology Delhi",
    degree: "Bachelor of Technology in Electronics and Communication Engineering",
    duration: "2022 – 2026",
    score: "7.98 / 10",
    scoreLabel: "CGPA",
    coursework: [
      "Data Structures and Algorithms",
      "Operating Systems",
      "Database Management Systems",
      "Machine Learning",
      "Advanced Java",
      "Probability and Statistics",
      "Computer Networks",
      "Computer Architecture",
    ],
    level: "college",
  },
  {
    institution: "Dhruva Public School",
    degree: "Class XII",
    duration: "",
    score: "93.6%",
    scoreLabel: "Percentage",
    level: "school",
  },
  {
    institution: "Jaycees Public School",
    degree: "Class X",
    duration: "",
    score: "97.4%",
    scoreLabel: "Percentage",
    level: "school",
  },
];

export const experience: ExperienceEntry[] = [
  {
    id: "midas-lab",
    role: "Undergraduate Researcher",
    organization: "MIDAS Lab, IIIT Delhi",
    dates: "August 2024 – December 2024",
    location: "Delhi, India",
    commitLabel: "commit: research/llm-evaluation",
    summary:
      "LLM evaluation research spanning prompting strategies, mathematical reasoning benchmarks, and retrieval-augmented generation.",
    highlights: [
      "Built evaluation pipelines for large language models including LLaMA-70B, Mixtral-8x7B, and LLaMA-405B.",
      "Evaluated Answer-Only, Chain-of-Thought, and Few-Shot prompting approaches.",
      "Worked with mathematical reasoning benchmarks including MATH, JEEBench, and MMLU.",
      "Improved overall mathematical reasoning performance by approximately 6% through evaluation and prompting improvements.",
      "Achieved approximately 84% accuracy on advanced algebra tasks.",
      "Developed a retrieval-augmented generation pipeline using LlamaIndex and ChromaDB.",
      "Improved accuracy on difficult questions by approximately 12%.",
      "Used Python, Hugging Face, LlamaIndex, ChromaDB, and prompt engineering workflows.",
    ],
    technologies: [
      "Python",
      "Hugging Face",
      "LlamaIndex",
      "ChromaDB",
      "Prompt Engineering",
      "LLM Evaluation",
    ],
  },
  {
    id: "techcarrot",
    role: "Software Development Intern",
    organization: "TechCarrot",
    // TODO: Replace with exact internship dates when available.
    dates: "Internship",
    commitLabel: "commit: feature/hr-dashboard",
    summary:
      "Full-stack contributions to a data-driven employee management and HR analytics platform.",
    highlights: [
      "Contributed to a data-driven employee management and HR analytics platform.",
      "Worked on React-based user interfaces and reusable frontend components.",
      "Integrated frontend functionality with Spring Boot APIs.",
      "Worked with MySQL-backed application data.",
      "Helped build dashboards and employee management workflows.",
      "Gained experience working in a team-based software development environment.",
    ],
    technologies: ["React", "Spring Boot", "Java", "MySQL", "REST APIs"],
  },
  {
    id: "outlier-ai",
    role: "AI Evaluator / AI Specialist (RLHF)",
    organization: "Outlier AI",
    // TODO: Replace with exact engagement dates when available.
    dates: "Freelance",
    commitLabel: "commit: research/rlhf-evaluation",
    summary:
      "Trained and refined large language models through Reinforcement Learning from Human Feedback (RLHF), handling complex long-form evaluations for intensive projects like Openclaw Atlas.",
    highlights: [
      "Trained and refined LLMs through RLHF, providing detailed human feedback to align model behavior with strict safety, accuracy, and logic standards.",
      "Handled complex, long-form evaluations — up to 6-hour tasks — for intensive projects like Openclaw Atlas, requiring sustained focus and multi-step validation.",
      "Built and maintained evaluation rubrics and criteria builders (such as Polarity Coherence Checkers) to systematically evaluate AI responses.",
      "Assigned weighted metrics to pinpoint specific model failures, specifically targeting factuality and hallucination rates.",
      "Designed specialized prompts to test the boundaries, constraints, and capabilities of top-tier models including ChatGPT and Gemini.",
      "Conducted deep-dive assessments of AI reasoning, identifying edge cases and providing comprehensive failure justifications.",
      "Evaluated multimodal inputs and edge cases, including recording constraints and environmental subcategories for voice-based tasks.",
    ],
    technologies: [
      "RLHF",
      "LLM Evaluation",
      "Prompt Engineering",
      "Rubric Design",
      "ChatGPT",
      "Gemini",
      "Quality Assurance",
    ],
  },
];

export const projects: Project[] = [
  {
    id: "product-browser",
    fileName: "product-browser.ts",
    title: "Product Browser",
    summary:
      "A scalable product browsing application designed to handle a dataset of 200,000 products efficiently.",
    description:
      "Built a full-stack product browser using Node.js, Express, and PostgreSQL, with the database hosted on Neon and the application deployed on Render.",
    problem:
      "Deep pagination over large datasets with OFFSET becomes slower at greater depths and can produce duplicate or skipped records during concurrent writes.",
    approach: [
      "Used keyset (cursor-based) pagination ordered by (created_at, id) for stable, constant-time page fetches.",
      "Generated 200,000 seed records through a set-based PostgreSQL INSERT...SELECT...generate_series() statement.",
      "Created a Load More interaction for predictable pagination.",
      "Structured the backend around REST API endpoints.",
    ],
    decisions: [
      "Avoided OFFSET pagination in favor of keyset cursors for predictable performance at any depth.",
      "Considered HMAC-signed cursors as a future security improvement.",
      "Considered incremental category counts and composite indexes for future optimization.",
    ],
    features: [
      "Browses 200,000 products without slow deep-pagination queries",
      "Cursor-based Load More pagination",
      "REST API backend",
      "Neon-hosted PostgreSQL database",
      "Deployed on Render",
    ],
    technologies: ["Node.js", "Express", "PostgreSQL", "Neon", "JavaScript", "REST API", "Render"],
    githubUrl: "https://github.com/sidak131singh/Product-Browser/tree/main",
    liveUrl: "https://product-browser-k1p7.onrender.com/",
    image: "/project-images/product-browser.png",
    status: "Live",
    featured: false,
  },
  {
    id: "infirmary-portal",
    fileName: "infirmary-portal.tsx",
    title: "Infirmary Portal",
    summary: "A full-stack healthcare and campus infirmary management platform for IIIT Delhi.",
    description:
      "Developed a portal that simplifies interactions between students, healthcare staff, and campus infirmary services — enabling appointment scheduling, digital prescriptions, role-based access control, and secure patient record management for 2,000+ users.",
    features: [
      "Responsive interface built with Next.js and TypeScript",
      "Appointment scheduling and health-service workflows",
      "Digital prescriptions and organized health records",
      "Role-based access for students, staff, and administrators",
      "Reusable components with form validation",
      "Clear navigation for different user workflows",
    ],
    technologies: ["Next.js", "React", "TypeScript", "HTML", "CSS", "REST API integration"],
    githubUrl: "https://github.com/sidak131singh/iiitd-infirmary-portal",
    liveUrl: "https://infirmary-portal.vercel.app/login",
    image: "/project-images/infirmary.png",
    status: "Completed / Testing",
    featured: true,
  },
  {
    id: "employee-management-system",
    fileName: "employee-management-system.java",
    title: "Employee Management System",
    summary:
      "A role-based employee management application built with React, Spring Boot, Spring Security, and MySQL.",
    description:
      "A full-stack HR application with distinct Employee, HR, Supervisor, and Admin roles, secure role-based access, and dashboard-driven workflows backed by Spring Boot APIs and MySQL persistence.",
    approach: [
      "Separation of frontend and backend concerns",
      "Role-based authorization with Spring Security and JWT",
      "Reusable UI components",
      "Structured database entities and API endpoints",
    ],
    features: [
      "Employee, HR, Supervisor, and Admin roles",
      "Secure role-based access",
      "Leave request and approval workflows",
      "Attendance tracking",
      "Holiday calendar",
      "Administrative controls",
      "Dashboard-based interface",
      "Backend APIs with MySQL persistence",
    ],
    technologies: [
      "React",
      "Spring Boot",
      "Spring Security",
      "Java",
      "MySQL",
      "REST APIs",
      "JWT authentication",
    ],
    githubUrl: "", // TODO: Add the verified repository URL.
    liveUrl: "", // TODO: Add the verified live URL if deployed.
    image: "",
    status: "Completed",
    featured: false,
  },
  {
    id: "liverguard",
    fileName: "liverguard.py",
    title: "LiverGuard",
    summary: "A machine learning pipeline for liver-health risk prediction using clinical data.",
    description:
      "Built a data science and machine learning workflow using more than 30,000 clinical records, covering the full pipeline from exploratory analysis to a tuned XGBoost model.",
    approach: [
      "Exploratory data analysis and data cleaning",
      "Feature engineering and class balancing",
      "Comparison and evaluation of more than six machine learning models",
      "XGBoost-based final model with performance visualization",
    ],
    features: [
      "30,000+ clinical records processed",
      "Six+ model comparison",
      "XGBoost final model",
      "Performance visualization with Matplotlib",
    ],
    technologies: ["Python", "Pandas", "NumPy", "Scikit-learn", "XGBoost", "Matplotlib", "Machine Learning"],
    githubUrl: "https://github.com/sidak131singh/LiverGuard-ML_Disease_Predictor",
    liveUrl: "",
    image: "",
    status: "Completed",
    featured: true,
    // TODO: Verify this metric against the final resume/report value before publishing.
    metricNote: "Reported approximately 99.8% XGBoost accuracy.",
  },
  {
    id: "chatbot-flow-builder",
    fileName: "chatbot-flow-builder.tsx",
    title: "Chatbot Flow Builder",
    summary: "A visual interface for creating and connecting chatbot conversation nodes.",
    description:
      "A drag-and-drop flow construction tool for designing chatbot conversations with message nodes, connections, an editable settings panel, and validation before saving.",
    features: [
      "Drag-and-drop flow construction",
      "Message nodes and node connections",
      "Editable settings panel",
      "Validation before saving",
      "Responsive, state-driven UI",
    ],
    technologies: ["React", "JavaScript", "React Flow", "CSS", "State management"],
    githubUrl: "https://github.com/sidak131singh/chatbot-Flow-Builder",
    liveUrl: "", // TODO: Add the verified live demo URL.
    image: "",
    status: "Deployed",
    featured: false,
  },
  {
    id: "rag-medical-qa",
    fileName: "rag-medical-qa.py",
    title: "RAG Medical Q&A System",
    summary:
      "An AI-powered medical question-answering system combining retrieval-augmented generation with LLMs.",
    description:
      "Combines Retrieval-Augmented Generation (RAG) with large language models to deliver context-aware, accurate healthcare responses from trusted knowledge sources.",
    features: [
      "Retrieval-augmented generation pipeline",
      "Context-aware medical answers",
      "Trusted knowledge-source grounding",
    ],
    technologies: ["Python", "RAG", "LLMs", "Vector Search"],
    githubUrl: "https://github.com/sidak131singh/RAG-Medical-Q-A-System",
    liveUrl: "",
    image: "",
    status: "Completed",
    featured: false,
  },
  {
    id: "shestarts",
    fileName: "shestarts.tsx",
    title: "SheStarts — Career Compass",
    summary:
      "India-focused AI career platform for women — employability scoring, 90-day roadmaps, and a 24/7 AI counselor.",
    description:
      "An AI-powered career intelligence platform for women returners and professionals. The engine analyses 7 dimensions of a profile to generate a precise Employability Score out of 100, delivers a personalized 90-day action plan tailored to skill gaps and goals, and includes Prerna — an AI career counselor available 24/7 for questions and resume reviews.",
    features: [
      "Employability Score across 7 profile dimensions",
      "Personalized 90-day career roadmap",
      "Prerna — 24/7 AI career counselor",
      "180+ career paths covered",
      "8-step guided profile assessment",
    ],
    technologies: ["TypeScript", "Next.js", "React", "Generative AI", "Vercel"],
    githubUrl: "https://github.com/sidak131singh/SheStarts---Ai-powered-Career-Counselor",
    liveUrl: "https://careercompass-chi-two.vercel.app/",
    image: "/project-images/shestarts.png",
    status: "Live",
    featured: true,
  },
  {
    id: "ragbot-enterprise",
    fileName: "ragbot.py",
    title: "RAGbot — Enterprise Assistance",
    summary:
      "A retrieval-augmented generation assistant that answers enterprise questions grounded in internal knowledge.",
    description:
      "A Python-based RAG assistant designed to answer enterprise questions grounded in internal knowledge sources, deployed as an interactive Streamlit application.",
    features: [
      "Document retrieval over enterprise knowledge",
      "LLM-grounded answers",
      "Interactive Streamlit interface",
    ],
    technologies: ["Python", "RAG", "LLMs", "Streamlit"],
    githubUrl: "https://github.com/sidak131singh/RAGbot---RAG-for-enterprise-assistance",
    liveUrl:
      "https://ragbot---rag-for-enterprise-assistance-6s8qepiswqtsc72335ycap.streamlit.app/",
    image: "/project-images/ragbot.png",
    status: "Live",
    featured: true,
  },
  {
    id: "school-equity-portal",
    fileName: "equity-portal.js",
    title: "Delhi School Equity Compliance Portal",
    summary:
      "A web-based compliance management system for school equity reporting and administrative workflows.",
    description:
      "Streamlines school equity reporting, document tracking, and administrative workflows with secure authentication, role-based access, and efficient data management.",
    features: [
      "Secure authentication",
      "Role-based access",
      "Document tracking",
      "Compliance reporting workflows",
    ],
    technologies: ["JavaScript", "Node.js", "Express", "Database Management"],
    githubUrl: "https://github.com/sidak131singh/Delhi-School-Equity-Compliance-Portal",
    liveUrl: "",
    image: "/project-images/delhi-school.png",
    status: "Completed",
    featured: true,
  },
  {
    id: "url-shortener",
    fileName: "url-shortener.js",
    title: "URL Shortener",
    summary: "A lightweight URL shortening service with redirect handling.",
    description:
      "A JavaScript-based URL shortener that generates compact links and resolves them back to their original destinations.",
    features: ["Short link generation", "Redirect handling", "Simple REST API"],
    technologies: ["JavaScript", "Node.js", "Express"],
    githubUrl: "https://github.com/sidak131singh/URL-shortner-",
    liveUrl: "",
    image: "",
    status: "Completed",
    featured: false,
  },
  {
    id: "snapshop",
    fileName: "snapshop.py",
    title: "SnapShop CLI",
    summary: "A command-line online thrift store simulation built with Python and MySQL.",
    description:
      "A CLI application that simulates an online thrift store, built using Python with MySQL for database management.",
    features: ["CLI shopping flows", "MySQL-backed catalog", "Order management"],
    technologies: ["Python", "MySQL", "CLI"],
    githubUrl: "https://github.com/sidak131singh/Snapshop",
    liveUrl: "",
    image: "",
    status: "Completed",
    featured: false,
  },
  {
    id: "superrdev",
    fileName: "superrdev.js",
    title: "SuperrDev Patch Exercise",
    summary: "A JavaScript patch exercise exploring code modification and review workflows.",
    description:
      "A hands-on JavaScript exercise project focused on applying, reviewing, and validating code patches.",
    features: ["Patch-based code changes", "JavaScript tooling"],
    technologies: ["JavaScript", "Node.js", "Git"],
    githubUrl: "https://github.com/sidak131singh/superrdev-patch-exercise",
    liveUrl: "",
    image: "",
    status: "Completed",
    featured: false,
  },
  {
    id: "qrypt",
    fileName: "qrypt.ts",
    title: "Qrypt — Password Manager",
    summary: "A password manager focused on secure credential storage and organization.",
    description:
      "A password manager application for storing, organizing, and retrieving credentials securely.",
    features: ["Secure credential storage", "Organized password vault"],
    technologies: ["Cryptography", "Web Development"],
    githubUrl: "", // TODO: Add the verified Qrypt-Password-Manager repository URL.
    liveUrl: "",
    image: "",
    status: "Completed",
    featured: false,
  },
  {
    id: "dragon-game",
    fileName: "dragon-game.js",
    title: "Dragon Game",
    summary: "A browser-based arcade game built with vanilla JavaScript.",
    description:
      "A lightweight browser arcade game with real-time gameplay, built using plain JavaScript, HTML, and CSS.",
    features: ["Real-time gameplay", "Keyboard controls", "Score tracking"],
    technologies: ["JavaScript", "HTML", "CSS"],
    githubUrl: "https://github.com/sidak131singh/Dragon-game",
    liveUrl: "",
    image: "",
    status: "Completed",
    featured: false,
  },
  {
    id: "spinwin",
    fileName: "spinwin.js",
    title: "SpinWin",
    summary: "A virtual slot machine game bringing casino-style excitement to the browser, risk-free.",
    description:
      "An engaging virtual slot machine game with a colorful interface and simple gameplay — the thrill of the casino without any real-world risk.",
    features: ["Slot machine mechanics", "Colorful interface", "Simple gameplay"],
    technologies: ["JavaScript", "HTML", "CSS"],
    githubUrl: "https://github.com/sidak131singh/SpinWin",
    liveUrl: "",
    image: "",
    status: "Completed",
    featured: false,
  },
  {
    id: "ap-game",
    fileName: "stick-hero.java",
    title: "Stick Hero (AP Game)",
    summary: "A Java arcade game built with object-oriented programming principles.",
    description:
      "A Java-based arcade game featuring interactive gameplay mechanics, real-time event handling, and a modular architecture designed for maintainability.",
    features: [
      "Interactive gameplay mechanics",
      "Real-time event handling",
      "Modular OOP architecture",
    ],
    technologies: ["Java", "Object-Oriented Programming"],
    githubUrl: "https://github.com/sidak131singh/AP_game-final",
    liveUrl: "",
    image: "/project-images/stickhero.png",
    status: "Completed",
    featured: false,
  },
];

/** Display order for the projects overview page. Unlisted ids sort last. */
export const featuredProjectOrder: string[] = [
  "shestarts",
  "infirmary-portal",
  "ragbot-enterprise",
  "school-equity-portal",
  "liverguard",
];

export const moreProjectOrder: string[] = [
  "superrdev",
  "product-browser",
  "rag-medical-qa",
  "qrypt",
  "url-shortener",
  "dragon-game",
  "spinwin",
  "snapshop",
  "ap-game",
  "employee-management-system",
  "chatbot-flow-builder",
];

export const skills: SkillCategories = {
  languages: ["C++", "Python", "Java", "JavaScript", "TypeScript", "SQL"],
  frontend: ["React", "Next.js", "HTML", "CSS", "Tailwind CSS", "Responsive Design"],
  backend: ["Node.js", "Express.js", "Spring Boot", "Spring Security", "REST APIs"],
  databases: ["PostgreSQL", "MySQL", "SQLite", "MongoDB", "Redis", "ChromaDB"],
  ai_ml: [
    "Large Language Models",
    "Retrieval-Augmented Generation",
    "Prompt Engineering",
    "LLM Evaluation",
    "LlamaIndex",
    "Hugging Face",
    "Scikit-learn",
    "XGBoost",
    "Pandas",
    "NumPy",
  ],
  tools_and_cloud: ["Git", "GitHub", "Vercel", "Render", "Neon", "Docker", "VS Code", "Postman"],
  computer_science: [
    "Data Structures and Algorithms",
    "Object-Oriented Programming",
    "Database Management Systems",
    "Operating Systems",
    "Computer Networks",
    "Distributed Systems Fundamentals",
  ],
};

export const achievements: Achievement[] = [
  {
    text: "Solved more than 400 data structures and algorithms problems.",
    marker: "400+",
  },
  {
    text: "Built and deployed multiple full-stack web applications.",
    marker: "ship",
  },
  {
    text: "Worked with large-scale LLM evaluation pipelines at MIDAS Lab.",
    marker: "research",
  },
  {
    text: "Achieved an approximately 12% improvement on difficult questions using a retrieval-augmented generation pipeline.",
    marker: "+12%",
  },
  {
    text: "Generated and efficiently browsed a PostgreSQL dataset containing 200,000 products.",
    marker: "200k",
  },
  {
    text: "Developed applications using both Java/Spring Boot and JavaScript/Node.js backend ecosystems.",
    marker: "stack",
  },
];

export const currentlyExploring: string[] = [
  "Scalable backend design",
  "AI agent workflows",
  "Retrieval and reasoning systems",
  "Distributed systems",
  "Reliable cloud deployment",
];

export const techExtensions: TechExtension[] = [
  {
    name: "React",
    category: "Frontend",
    description: "Component-driven UI library used across most of my web projects.",
    relatedProjects: ["Infirmary Portal", "Employee Management System", "Chatbot Flow Builder"],
  },
  {
    name: "Next.js",
    category: "Frontend",
    description: "App Router, server components, and production deployments on Vercel.",
    relatedProjects: ["Infirmary Portal", "SheStarts", "This Portfolio"],
  },
  {
    name: "Node.js",
    category: "Backend",
    description: "REST APIs, Express services, and server-side tooling.",
    relatedProjects: ["Product Browser", "URL Shortener"],
  },
  {
    name: "Spring Boot",
    category: "Backend",
    description: "Java APIs with Spring Security and JWT-based authorization.",
    relatedProjects: ["Employee Management System"],
  },
  {
    name: "PostgreSQL",
    category: "Database",
    description: "Keyset pagination, set-based seeding, and indexing strategies.",
    relatedProjects: ["Product Browser"],
  },
  {
    name: "Python",
    category: "AI / ML",
    description: "ML pipelines, LLM evaluation, and data engineering.",
    relatedProjects: ["LiverGuard", "RAG Medical Q&A", "MIDAS Lab research"],
  },
  {
    name: "LlamaIndex",
    category: "AI / ML",
    description: "Retrieval-augmented generation pipelines with ChromaDB.",
    relatedProjects: ["MIDAS Lab research", "RAGbot"],
  },
  {
    name: "Git",
    category: "Tooling",
    description: "Version control, branching workflows, and collaboration.",
    relatedProjects: ["All projects"],
  },
];

export const sourceControlCommits: string[] = [
  "feat: add scalable Product Browser project",
  "research: document LLM evaluation pipeline",
  "feat: add Spring Boot employee management system",
  "docs: update skills and experience",
  "style: improve responsive IDE layout",
];
