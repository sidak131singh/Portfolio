import { Sparkles, User } from "lucide-react";
import type { ChatMessageData } from "@/types/portfolio";

function formatTime(timestamp: number): string {
  return new Date(timestamp).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function ChatMessage({ message }: { message: ChatMessageData }) {
  const isUser = message.role === "user";
  return (
    <div className={`flex gap-2 ${isUser ? "flex-row-reverse" : ""}`}>
      <span
        className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full ${
          isUser ? "bg-surface-hover text-text-2" : "bg-gradient-to-br from-cyan to-violet text-black"
        }`}
        aria-hidden
      >
        {isUser ? <User size={13} /> : <Sparkles size={13} />}
      </span>
      <div className={`max-w-[85%] ${isUser ? "text-right" : ""}`}>
        <div
          className={`inline-block whitespace-pre-wrap rounded-lg px-3 py-2 text-left text-xs leading-relaxed ${
            isUser
              ? "bg-blue text-white"
              : "border border-border bg-surface text-text-1"
          }`}
        >
          {message.content}
        </div>
        <p className="mt-0.5 font-mono text-[9px] text-text-3">{formatTime(message.timestamp)}</p>
      </div>
    </div>
  );
}
