import { NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";
import { buildKnowledgeContext, fallbackAnswer } from "@/data/chatbotKnowledge";

export const runtime = "nodejs";

// Remembers the first model name that works for this key, since model
// availability differs between older and newer Gemini API keys.
let workingModel: string | null = null;

/**
 * Optional LLM adapter for the portfolio assistant.
 *
 * Reads GEMINI_API_KEY from the environment (never exposed to the client).
 * When the key is missing or the call fails, the client falls back to the
 * local deterministic knowledge base, so this route is never a hard dependency.
 */
export async function POST(request: Request) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "LLM not configured" }, { status: 503 });
  }

  let question: string;
  try {
    const body = (await request.json()) as { question?: unknown };
    if (typeof body.question !== "string" || body.question.trim().length === 0) {
      return NextResponse.json({ error: "Missing question" }, { status: 400 });
    }
    question = body.question.trim().slice(0, 500);
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const prompt = [
    "You are the portfolio assistant for Sidak Singh Chahal, embedded in his VS Code-style portfolio website.",
    "Answer the visitor's question using ONLY the knowledge base below.",
    "Be concise (2-5 sentences), friendly, and professional. Refer to Sidak in the third person.",
    `If the answer is not in the knowledge base, reply exactly with: "${fallbackAnswer}"`,
    "Never invent projects, employers, dates, links, or metrics.",
    "",
    "===== KNOWLEDGE BASE =====",
    buildKnowledgeContext(),
    "===== END KNOWLEDGE BASE =====",
    "",
    `Visitor question: ${question}`,
  ].join("\n");

  const ai = new GoogleGenAI({ apiKey });
  const candidates = workingModel
    ? [workingModel]
    : [
        ...(process.env.GEMINI_MODEL ? [process.env.GEMINI_MODEL] : []),
        "gemini-flash-latest",
        "gemini-2.5-flash",
        "gemini-2.0-flash",
      ];

  for (const model of candidates) {
    try {
      const response = await ai.models.generateContent({ model, contents: prompt });
      const answer = response.text?.trim();
      if (answer) {
        workingModel = model;
        return NextResponse.json({ answer });
      }
    } catch (error) {
      console.error(`Gemini request failed for model "${model}":`, error);
    }
  }
  return NextResponse.json({ error: "LLM request failed" }, { status: 502 });
}
