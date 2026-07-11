"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Minus, Send, Sparkles, Trash2, X } from "lucide-react";
import {
  bonusQuestions,
  matchIntent,
  suggestedQuestions,
} from "@/data/chatbotKnowledge";
import { useIdeStore } from "@/store/ideStore";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { now, readLocalStorage } from "@/lib/utils";
import ChatMessage from "@/components/chatbot/ChatMessage";
import type { ChatMessageData } from "@/types/portfolio";

const welcomeMessage: ChatMessageData = {
  id: "welcome",
  role: "assistant",
  content:
    "Ask me about Sidak's projects, experience, education, technical skills, or availability.",
  timestamp: 0,
};

async function getAnswer(question: string, hasBonus: boolean): Promise<string> {
  // Try the optional server-side LLM first; fall back to the local knowledge base.
  try {
    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ question }),
    });
    if (res.ok) {
      const data = (await res.json()) as { answer?: string };
      if (data.answer) return data.answer;
    }
  } catch {
    // network failure — use local fallback below
  }
  return matchIntent(question, hasBonus);
}

export default function PortfolioAssistant() {
  const { assistantOpen, setAssistantOpen } = useIdeStore();
  const [messages, setMessages] = useLocalStorage<ChatMessageData[]>("sc-chat-history", []);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [minimized, setMinimized] = useState(false);
  const [hasBonus, setHasBonus] = useState(
    () => readLocalStorage("sc-dino-achievement") === "true"
  );
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // The Dino game announces the achievement unlock via a window event
  useEffect(() => {
    const unlock = () => setHasBonus(true);
    window.addEventListener("sc-achievement", unlock);
    return () => window.removeEventListener("sc-achievement", unlock);
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [messages, typing, minimized]);

  useEffect(() => {
    if (assistantOpen && !minimized) {
      requestAnimationFrame(() => inputRef.current?.focus());
    }
  }, [assistantOpen, minimized]);

  const send = async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || typing) return;
    setInput("");
    const sentAt = now();
    const userMessage: ChatMessageData = {
      id: `u-${sentAt}`,
      role: "user",
      content: trimmed,
      timestamp: sentAt,
    };
    setMessages((prev) => [...prev, userMessage]);
    setTyping(true);

    const answer = await getAnswer(trimmed, hasBonus);
    const answeredAt = now();

    setMessages((prev) => [
      ...prev,
      {
        id: `a-${answeredAt}`,
        role: "assistant",
        content: answer,
        timestamp: answeredAt,
      },
    ]);
    setTyping(false);
  };

  const chips = hasBonus ? [...suggestedQuestions, ...bonusQuestions] : suggestedQuestions;

  return (
    <AnimatePresence>
      {assistantOpen && (
        <motion.aside
          initial={{ x: 40, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 40, opacity: 0 }}
          transition={{ duration: 0.18 }}
          aria-label="Portfolio assistant"
          className="fixed inset-0 z-[60] flex flex-col border-border bg-sidebar md:absolute md:inset-auto md:bottom-0 md:right-0 md:top-0 md:w-96 md:border-l"
        >
          <div className="flex items-center justify-between border-b border-border px-3 py-2">
            <h2 className="flex items-center gap-2 font-mono text-xs font-bold tracking-wide text-text-1">
              <Sparkles size={14} className="text-cyan" aria-hidden />
              ASK SIDAK.AI
              {hasBonus && (
                <span className="rounded bg-warning/15 px-1.5 py-0.5 text-[9px] text-warning">
                  Debugging Streak ✓
                </span>
              )}
            </h2>
            <div className="flex items-center gap-0.5">
              <button
                onClick={() => setMessages([])}
                aria-label="Clear chat"
                className="rounded p-1 text-text-3 hover:bg-surface-hover hover:text-text-1"
              >
                <Trash2 size={13} aria-hidden />
              </button>
              <button
                onClick={() => setMinimized(!minimized)}
                aria-label={minimized ? "Expand assistant" : "Minimize assistant"}
                className="hidden rounded p-1 text-text-3 hover:bg-surface-hover hover:text-text-1 md:block"
              >
                <Minus size={13} aria-hidden />
              </button>
              <button
                onClick={() => setAssistantOpen(false)}
                aria-label="Close assistant"
                className="rounded p-1 text-text-3 hover:bg-surface-hover hover:text-text-1"
              >
                <X size={13} aria-hidden />
              </button>
            </div>
          </div>

          {!minimized && (
            <>
              <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto p-3">
                <ChatMessage message={welcomeMessage} />
                {messages.map((m) => (
                  <ChatMessage key={m.id} message={m} />
                ))}
                {typing && (
                  <div className="flex items-center gap-2 pl-8" aria-label="Assistant is typing">
                    {[0, 1, 2].map((i) => (
                      <motion.span
                        key={i}
                        className="h-1.5 w-1.5 rounded-full bg-cyan"
                        animate={{ opacity: [0.3, 1, 0.3] }}
                        transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                      />
                    ))}
                  </div>
                )}
              </div>

              <div className="border-t border-border p-2">
                <div className="mb-2 flex gap-1.5 overflow-x-auto pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                  {chips.map((q) => (
                    <button
                      key={q}
                      onClick={() => send(q)}
                      className="shrink-0 rounded-full border border-border bg-surface px-2.5 py-1 text-[10px] text-text-2 hover:border-cyan/50 hover:text-text-1"
                    >
                      {q}
                    </button>
                  ))}
                </div>
                <form
                  className="flex gap-1.5"
                  onSubmit={(e) => {
                    e.preventDefault();
                    send(input);
                  }}
                >
                  <input
                    ref={inputRef}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask about Sidak..."
                    aria-label="Ask the portfolio assistant"
                    className="min-w-0 flex-1 rounded-md border border-border bg-editor px-3 py-2 text-xs text-text-1 placeholder:text-text-3 focus:border-cyan focus:outline-none"
                  />
                  <button
                    type="submit"
                    disabled={!input.trim() || typing}
                    aria-label="Send message"
                    className="rounded-md bg-blue px-3 text-white disabled:opacity-40"
                  >
                    <Send size={14} aria-hidden />
                  </button>
                </form>
              </div>
            </>
          )}
        </motion.aside>
      )}
    </AnimatePresence>
  );
}
