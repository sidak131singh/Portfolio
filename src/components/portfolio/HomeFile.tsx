"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Download, Mail } from "lucide-react";
import { heroStats, personalInfo, socialLinks, typewriterLines } from "@/data/portfolio";
import { useIdeStore } from "@/store/ideStore";
import { CodeComment, EditorPage } from "@/components/portfolio/shared";
import { GithubIcon, InstagramIcon, LinkedinIcon } from "@/components/ui/BrandIcons";
import ExternalLink from "@/components/ui/ExternalLink";
import Typewriter from "@/components/ui/Typewriter";

function CountUp({ value, suffix }: { value: number; suffix: string }) {
  const [display, setDisplay] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting || started.current) return;
      started.current = true;
      const duration = 900;
      const start = performance.now();
      const tick = (now: number) => {
        const t = Math.min((now - start) / duration, 1);
        setDisplay(Math.round(value * (1 - Math.pow(1 - t, 3))));
        if (t < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, [value, reduced]);

  return (
    <span ref={ref}>
      {reduced ? value : display}
      {suffix}
    </span>
  );
}

const statColors = ["text-cyan", "text-pink", "text-yellow", "text-green"];

const roleChipColors = [
  "border-cyan/60 text-cyan",
  "border-pink/60 text-pink",
  "border-yellow/60 text-yellow",
];
const roleDotColors = ["bg-cyan", "bg-pink", "bg-yellow"];

export default function HomeFile() {
  const openFile = useIdeStore((s) => s.openFile);
  const reduced = useReducedMotion();

  const fadeUp = reduced
    ? {}
    : {
        initial: { opacity: 0, y: 12 },
        animate: { opacity: 1, y: 0 },
      };

  return (
    <EditorPage>
      <motion.div {...fadeUp} transition={{ duration: 0.4 }}>
        <CodeComment>{personalInfo.tagline}</CodeComment>

        <h1 className="mt-6 font-mono font-extrabold leading-[0.95]">
          <span className="hero-name-top block text-[clamp(2.8rem,9vw,6rem)]">SIDAK</span>
          <span className="hero-name-bottom block text-[clamp(1.8rem,6vw,4rem)]">
            SINGH CHAHAL
          </span>
        </h1>

        <ul className="mt-6 flex flex-wrap items-center gap-2" aria-label="Roles">
          {personalInfo.roles.map((role, i) => (
            <li
              key={role}
              className={`flex items-center gap-1.5 rounded border bg-surface px-2.5 py-1 font-mono text-xs ${roleChipColors[i % 3]}`}
            >
              <span className={`h-1.5 w-1.5 rounded-full ${roleDotColors[i % 3]}`} aria-hidden />
              {role}
            </li>
          ))}
        </ul>

        <div className="mt-5">
          <Typewriter lines={typewriterLines} />
        </div>
      </motion.div>

      <motion.div {...fadeUp} transition={{ duration: 0.4, delay: 0.1 }}>
        <p className="mt-8 max-w-2xl text-base leading-relaxed text-text-1 sm:text-lg">
          {personalInfo.introPrimary}
        </p>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-text-2">
          {personalInfo.introSecondary}
        </p>
      </motion.div>

      <motion.pre
        {...fadeUp}
        transition={{ duration: 0.4, delay: 0.2 }}
        className="mt-8 overflow-x-auto rounded-lg border border-border bg-surface p-4 font-mono text-xs leading-relaxed sm:text-sm"
      >
        <code>
          <span className="text-keyword">const</span>{" "}
          <span className="text-cyan">developer</span> = {"{"}
          {"\n"}  name: <span className="text-string">&quot;Sidak Singh Chahal&quot;</span>,
          {"\n"}  role: <span className="text-string">&quot;Software Engineer&quot;</span>,
          {"\n"}  education: <span className="text-string">&quot;B.Tech, IIIT Delhi&quot;</span>,
          {"\n"}  interests: [{"\n"}
          {["Full-Stack Engineering", "Backend Systems", "Applied AI", "LLMs and RAG"].map(
            (i, idx, arr) => (
              <span key={i}>
                {"    "}
                <span className="text-string">&quot;{i}&quot;</span>
                {idx < arr.length - 1 ? "," : ""}
                {"\n"}
              </span>
            )
          )}
          {"  "}],
          {"\n"}  status:{" "}
          <span className="text-string">
            &quot;Open to software engineering opportunities&quot;
          </span>
          {"\n"}
          {"}"};<span className="cursor-blink text-cyan">▌</span>
        </code>
      </motion.pre>

      <motion.div
        {...fadeUp}
        transition={{ duration: 0.4, delay: 0.3 }}
        className="mt-8 flex flex-wrap items-center gap-3"
      >
        <button
          onClick={() => openFile("projects-overview")}
          className="rounded-md bg-gradient-to-r from-cyan to-violet px-5 py-2.5 text-sm font-semibold text-black transition-transform hover:-translate-y-0.5"
        >
          View Projects
        </button>
        <button
          onClick={() => openFile("about")}
          className="rounded-md border border-cyan/50 px-5 py-2.5 text-sm font-semibold text-cyan transition-transform hover:-translate-y-0.5 hover:bg-cyan/10"
        >
          About Me
        </button>
        <button
          onClick={() => openFile("contact")}
          className="rounded-md border border-border px-5 py-2.5 text-sm font-semibold text-text-1 transition-transform hover:-translate-y-0.5 hover:bg-surface-hover"
        >
          Contact Me
        </button>
        <a
          href="/resume.pdf"
          download="Sidak-Singh-Chahal-Resume.pdf"
          className="ml-1 inline-flex items-center gap-1.5 font-mono text-xs text-text-2 underline-offset-4 hover:text-cyan hover:underline"
        >
          <Download size={13} aria-hidden /> Download Resume
        </a>
      </motion.div>

      <motion.dl
        {...fadeUp}
        transition={{ duration: 0.4, delay: 0.4 }}
        className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-4"
      >
        {heroStats.map((stat, i) => (
          <div
            key={stat.label}
            className="rounded-lg border border-border bg-surface p-4 text-center"
          >
            <dd className={`font-mono text-2xl font-bold ${statColors[i % 4]}`}>
              <CountUp value={stat.value} suffix={stat.suffix} />
            </dd>
            <dt className="mt-1 text-[11px] uppercase tracking-wide text-text-2">{stat.label}</dt>
          </div>
        ))}
      </motion.dl>

      <motion.div
        {...fadeUp}
        transition={{ duration: 0.4, delay: 0.5 }}
        className="mt-8 flex flex-wrap gap-2 border-t border-border pt-6"
      >
        <ExternalLink
          href={socialLinks.github}
          className="inline-flex items-center gap-1.5 rounded border border-border bg-surface px-3 py-1.5 font-mono text-xs text-text-1 hover:border-cyan/60 hover:text-cyan"
        >
          <GithubIcon size={13} aria-hidden /> GitHub
        </ExternalLink>
        <ExternalLink
          href={socialLinks.linkedin}
          className="inline-flex items-center gap-1.5 rounded border border-border bg-surface px-3 py-1.5 font-mono text-xs text-text-1 hover:border-blue/60 hover:text-blue"
        >
          <LinkedinIcon size={13} aria-hidden /> LinkedIn
        </ExternalLink>
        <ExternalLink
          href={socialLinks.instagram}
          className="inline-flex items-center gap-1.5 rounded border border-border bg-surface px-3 py-1.5 font-mono text-xs text-text-1 hover:border-pink/60 hover:text-pink"
        >
          <InstagramIcon size={13} aria-hidden /> Instagram
        </ExternalLink>
        <a
          href={`mailto:${personalInfo.email}`}
          className="inline-flex items-center gap-1.5 rounded border border-border bg-surface px-3 py-1.5 font-mono text-xs text-text-1 hover:border-yellow/60 hover:text-yellow"
        >
          <Mail size={13} aria-hidden /> Email
        </a>
      </motion.div>
    </EditorPage>
  );
}
