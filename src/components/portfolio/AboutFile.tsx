"use client";

import { Fragment, ReactNode } from "react";
import { currentlyExploring } from "@/data/portfolio";
import { CodeComment, EditorPage, MdHeading } from "@/components/portfolio/shared";

/** Renders **bold** markers in plain text as highlighted spans. */
function Bold({ text }: { text: string }): ReactNode {
  const parts = text.split(/\*\*(.+?)\*\*/g);
  return parts.map((part, i) =>
    i % 2 === 1 ? (
      <strong key={i} className="font-semibold text-cyan">
        {part}
      </strong>
    ) : (
      <Fragment key={i}>{part}</Fragment>
    )
  );
}

const paragraphs = [
  "Hi, I'm **Sidak Singh Chahal** — a Software Engineer and AI enthusiast who enjoys building products that solve real problems.",
  "I graduated from **IIIT Delhi** with a degree in Electronics and Communication Engineering, but somewhere along the way I discovered that what excited me most wasn't hardware — it was software, intelligent systems, and the challenge of turning ideas into products people actually use.",
  "Over the past few years, I've worked across **full-stack development, machine learning, and Generative AI**. I've built production-ready web applications with **React, Next.js, Spring Boot, and PostgreSQL**, developed **Retrieval-Augmented Generation (RAG)** systems, evaluated frontier language models, and shipped AI-powered applications that help real users make better decisions. Whether it's designing scalable APIs, improving LLM reasoning, or optimizing database queries, I enjoy understanding how systems work end-to-end.",
  "Professionally, I've had the opportunity to contribute as a **Software Engineering Intern at TechCarrot**, an **Undergraduate Researcher at MIDAS Lab**, and currently as an **AI Quality Assurance Engineer at Outlier AI**, where I evaluate and improve the reasoning capabilities of large language models. These experiences taught me how to think critically, write reliable software, and measure success through real-world impact rather than just working code.",
  "Outside of work, I'm someone who genuinely enjoys learning. I've solved **400+ DSA problems**, love exploring new AI frameworks, and often find myself experimenting with the latest developments in LLMs, agents, and retrieval systems. The pace at which AI is evolving is what motivates me the most — there's always something new to build, understand, or improve.",
  "One experience that shaped me deeply was having a full-time offer revoked shortly before joining due to organizational restructuring. Instead of waiting for another opportunity, I decided to create one. I spent that time strengthening my fundamentals, building larger projects, diving deeper into AI, and becoming a better engineer. Looking back, that setback became one of the biggest reasons I've grown as much as I have.",
  "I care about writing clean, maintainable software, taking ownership of my work, and continuously improving. In the long run, I want to build AI products that solve meaningful problems, contribute to cutting-edge research, and eventually lead engineering teams that combine innovation with practical impact.",
  "When I'm not coding, you'll probably find me reading about new AI models, refining side projects, playing volleyball, or exploring ideas that sit at the intersection of mathematics, software, and artificial intelligence.",
];

export default function AboutFile() {
  return (
    <EditorPage>
      <CodeComment>{"<!-- about.html — who I am · what I do · where I build -->"}</CodeComment>
      <div className="mt-3">
        <MdHeading>About Me</MdHeading>
      </div>
      <div className="max-w-2xl space-y-4">
        {paragraphs.map((p) => (
          <p key={p.slice(0, 40)} className="text-sm leading-relaxed text-text-1 sm:text-[15px]">
            <Bold text={p} />
          </p>
        ))}
      </div>

      <MdHeading level={2}>Currently Exploring</MdHeading>
      <ul className="grid max-w-2xl gap-2 sm:grid-cols-2">
        {currentlyExploring.map((item) => (
          <li
            key={item}
            className="flex items-center gap-2 rounded border border-border bg-surface px-3 py-2 text-sm text-text-1"
          >
            <span className="font-mono text-cyan" aria-hidden>
              →
            </span>
            {item}
          </li>
        ))}
      </ul>

      <div className="mt-8 max-w-2xl">
        <CodeComment>{"// a quick class definition"}</CodeComment>
        <pre className="mt-2 overflow-x-auto rounded-lg border border-border bg-surface p-4 font-mono text-xs leading-relaxed sm:text-sm">
          <code>
            <span className="text-keyword">class</span>{" "}
            <span className="text-success">Sidak</span> {"{"}
            {"\n"}  location = <span className="text-string">&quot;Delhi, India&quot;</span>;
            {"\n"}  university = <span className="text-string">&quot;IIIT Delhi&quot;</span>;
            {"\n"}  interests = [
            <span className="text-string">&quot;Software Engineering&quot;</span>,{" "}
            <span className="text-string">&quot;Backend&quot;</span>,{" "}
            <span className="text-string">&quot;AI/LLMs&quot;</span>];
            {"\n"}  workingStyle = [
            <span className="text-string">&quot;Curious&quot;</span>,{" "}
            <span className="text-string">&quot;Analytical&quot;</span>,{" "}
            <span className="text-string">&quot;Persistent&quot;</span>];
            {"\n"}  hobbies = [
            <span className="text-string">&quot;Volleyball&quot;</span>,{" "}
            <span className="text-string">&quot;Side Projects&quot;</span>,{" "}
            <span className="text-string">&quot;AI Papers&quot;</span>];
            {"\n"}
            {"}"}
          </code>
        </pre>
      </div>
    </EditorPage>
  );
}
