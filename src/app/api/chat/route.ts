import { anthropic } from "@ai-sdk/anthropic";
import { streamText } from "ai";
import { portfolio } from "@/data/bhavika";

export async function POST(request: Request) {
  const body: unknown = await request.json().catch(() => null);
  const message = typeof body === "object" && body && "message" in body && typeof body.message === "string" ? body.message.trim() : "";
  if (!message || message.length > 500) return Response.json({ error:"Provide a question under 500 characters." }, { status:400 });
  if (!process.env.ANTHROPIC_API_KEY) return Response.json({ error:"The portfolio assistant is not configured yet." }, { status:503 });
  const result = streamText({
    model: anthropic("claude-haiku-4-5"),
    system:`You answer only from this public portfolio context. Do not invent facts, confidential Adobe details, metrics, credentials, or project specifics. If the answer is not present, say: “That detail isn’t covered in Bhavika’s public portfolio.”\n\n${portfolio.grounding.join("\n")}`,
    prompt: message,
  });
  return result.toTextStreamResponse();
}
