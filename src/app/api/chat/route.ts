import { anthropic } from "@ai-sdk/anthropic";
import { streamText } from "ai";
import { portfolio } from "@/data/bhavika";

export async function POST(request: Request) {
  const body: unknown = await request.json().catch(() => null);
  const message = typeof body === "object" && body && "message" in body && typeof body.message === "string" ? body.message.trim() : "";
  if (!message || message.length > 500) return Response.json({ error:"Provide a question under 500 characters." }, { status:400 });
  if (!process.env.ANTHROPIC_API_KEY) {
    const normalized = message.toLowerCase();
    const answer = normalized.includes("contact") || normalized.includes("reach") || normalized.includes("email")
      ? "You can contact me at bhavika.hireme@gmail.com, or find me on LinkedIn at linkedin.com/in/bhavika-karale."
      : normalized.includes("education") || normalized.includes("highest") || normalized.includes("degree")
        ? "My highest education is an M.S. in Data Science from Syracuse University (2023–2025)."
        : normalized.includes("yourself") || normalized.includes("who is")
          ? "I’m a software engineer based in the United States (PST), currently an SDE II at Adobe. My public experience spans full-stack engineering, data systems, developer tools, and AI-assisted automation."
          : normalized.includes("built") || normalized.includes("project")
            ? "My public projects include Speech to Code, an accessibility-focused developer tool; an e-commerce microservices platform; and an AWS portfolio platform designed for scale."
            : "That detail isn’t covered in my public portfolio. You can ask about my background, contact details, education, skills, or public projects.";
    return new Response(answer, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
  }
  const result = streamText({
    model: anthropic("claude-haiku-4-5"),
    system:`You speak in Bhavika's first-person voice and answer only from this public portfolio context. Do not invent facts, confidential Adobe details, metrics, credentials, or project specifics. If the answer is not present, say: “That detail isn’t covered in my public portfolio.”\n\n${portfolio.grounding.join("\n")}`,
    prompt: message,
  });
  return result.toTextStreamResponse();
}
