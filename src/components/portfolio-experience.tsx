"use client";

import { useMemo, useState } from "react";
import type { portfolio as portfolioData } from "@/data/bhavika";

type Portfolio = typeof portfolioData;
type Mode = "reader" | "xray";

const nav = ["Work", "Experience", "Lab", "About"];
const arrows = "↗";

function SectionLabel({ children }: { children: React.ReactNode }) {
  return <p className="mono text-[11px] font-medium uppercase tracking-[.12em] text-[#64706c]">{children}</p>;
}

function Pill({ children }: { children: React.ReactNode }) {
  return <span className="mono rounded-full border border-[#d9d8d0] px-3 py-1 text-[11px] text-[#52605a]">{children}</span>;
}

export function PortfolioExperience({ portfolio }: { portfolio: Portfolio }) {
  const [mode, setMode] = useState<Mode>("reader");
  const [traceStep, setTraceStep] = useState(0);
  const [graphStep, setGraphStep] = useState(0);
  const [representation, setRepresentation] = useState<"list" | "matrix" | "edges">("list");
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState<string | null>(null);
  const [chatState, setChatState] = useState<"idle" | "loading" | "error">("idle");
  const trace = [
    ["01", "Resolve", "Your browser asks DNS where bhavikakarale.com lives."],
    ["02", "Route", "Vercel’s edge network receives the request near the visitor."],
    ["03", "Cache", "A cached response can return immediately; otherwise Next.js renders."],
    ["04", "Hydrate", "HTML arrives first, then small interactive islands become live."],
  ];
  const order = portfolio.graph.nodes.slice(0, Math.min(graphStep, portfolio.graph.nodes.length));
  const matrix = useMemo(() => portfolio.graph.nodes.map((_, from) => portfolio.graph.nodes.map((_, to) => portfolio.graph.edges.some(([a,b]) => a === from && b === to) ? 1 : 0)), [portfolio]);

  async function ask(event: React.FormEvent) {
    event.preventDefault();
    if (!question.trim()) return;
    setChatState("loading"); setAnswer(null);
    try {
      const response = await fetch("/api/chat", { method:"POST", headers:{"Content-Type":"application/json"}, body:JSON.stringify({ message:question }) });
      if (!response.ok) throw new Error("The assistant is not configured yet.");
      setAnswer(await response.text());
      setChatState("idle");
    } catch { setAnswer("The assistant is in portfolio-only mode until its provider key is configured. Try the suggested questions after launch."); setChatState("error"); }
  }

  return <main className="overflow-hidden">
    <header className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 md:px-10">
      <a href="#top" className="font-semibold tracking-[-.04em]">BK<span className="text-[#d85d3f]">.</span></a>
      <nav className="hidden gap-7 text-sm text-[#52605a] md:flex">{nav.map((item) => <a key={item} href={`#${item.toLowerCase()}`} className="transition hover:text-[#17211f]">{item}</a>)}</nav>
      <div className="flex items-center gap-3"><span className="hidden text-xs text-[#64706c] sm:block">{portfolio.identity.location}</span><button onClick={() => setMode(mode === "reader" ? "xray" : "reader")} className="mono rounded-full border border-[#17211f] px-3 py-2 text-[10px] uppercase tracking-wider">{mode === "reader" ? "X-ray mode" : "Reader mode"}</button></div>
    </header>

    <section id="top" className="mx-auto grid max-w-7xl gap-10 px-5 pb-24 pt-14 md:grid-cols-12 md:px-10 md:pb-36 md:pt-24">
      <div className="md:col-span-8"><SectionLabel>Software engineering · Systems · AI</SectionLabel><h1 className="display mt-7 max-w-4xl text-[clamp(3.8rem,9vw,8rem)] leading-[.88]">Bhavika<br/>Karale<span className="text-[#d85d3f]">.</span></h1><p className="mt-8 max-w-2xl text-lg leading-8 text-[#52605a] md:text-xl">{portfolio.intro}</p><div className="mt-10 flex flex-wrap gap-3"><a href="#work" className="rounded-full bg-[#17211f] px-5 py-3 text-sm text-white transition hover:bg-[#315d51]">See selected work</a><a href="#lab" className="rounded-full border border-[#17211f] px-5 py-3 text-sm transition hover:bg-[#eceae3]">Explore the engineering lab ↓</a></div></div>
      <aside className="self-end border-l border-[#d9d8d0] pl-5 md:col-span-4"><p className="text-sm leading-6 text-[#52605a]">{portfolio.availability}</p><div className="mt-6 flex gap-4 text-sm underline decoration-[#d85d3f] underline-offset-4"><a href={portfolio.identity.linkedin} target="_blank">LinkedIn {arrows}</a><a href={portfolio.identity.github} target="_blank">GitHub {arrows}</a></div></aside>
    </section>

    {mode === "xray" && <div className="mx-auto mb-10 max-w-7xl px-5 md:px-10"><div className="grain rounded-2xl border border-[#315d51] bg-[#e5eee9] p-5 text-sm text-[#315d51]"><span className="mono text-[10px] uppercase">X-ray annotation</span><p className="mt-2">The portfolio narrative is server-rendered. This switch, the trace, the graph controls, and the chat panel are lightweight client components hydrated only where interaction is needed.</p></div></div>}

    <section id="work" className="border-y border-[#d9d8d0] bg-[#efede7] py-20 md:py-28"><div className="mx-auto max-w-7xl px-5 md:px-10"><div className="flex items-end justify-between"><div><SectionLabel>Selected work</SectionLabel><h2 className="display mt-3 text-5xl md:text-6xl">A few things I&apos;ve built.</h2></div><span className="mono hidden text-xs text-[#64706c] md:block">03 / public work</span></div><div className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-[#d9d8d0] bg-[#d9d8d0] md:grid-cols-3">{portfolio.projects.map((project, index) => <article key={project.title} className="group flex min-h-96 flex-col bg-[#f6f4ef] p-6 md:p-7"><div className="flex justify-between"><SectionLabel>0{index + 1} · {project.eyebrow}</SectionLabel><span className="text-xl text-[#d85d3f]">↗</span></div><h3 className="display mt-12 text-4xl leading-none">{project.title}</h3><p className="mt-5 text-sm leading-6 text-[#52605a]">{project.summary}</p><p className="mt-auto border-t border-[#d9d8d0] pt-5 text-sm font-medium">{project.impact}</p><div className="mt-5 flex flex-wrap gap-2">{project.tags.map((tag) => <Pill key={tag}>{tag}</Pill>)}</div>{project.href !== "#" && <a href={project.href} target="_blank" className="mt-5 text-sm underline underline-offset-4">View repository {arrows}</a>}</article>)}</div></div></section>

    <section id="experience" className="mx-auto max-w-7xl px-5 py-24 md:px-10 md:py-36"><div className="grid gap-12 md:grid-cols-12"><div className="md:col-span-4"><SectionLabel>Experience</SectionLabel><h2 className="display mt-3 text-5xl leading-[.95] md:text-6xl">Building the useful, not just the new.</h2></div><div className="md:col-span-7 md:col-start-6">{portfolio.experience.map((item) => <article key={item.company + item.period} className="grid gap-3 border-t border-[#d9d8d0] py-6 md:grid-cols-[130px_1fr]"><p className="mono text-xs text-[#64706c]">{item.period}</p><div><h3 className="text-xl font-medium">{item.company}<span className="text-[#d85d3f]"> / </span>{item.role}</h3><p className="mt-3 max-w-xl text-sm leading-6 text-[#52605a]">{item.detail}</p></div></article>)}<div className="border-t border-[#d9d8d0] pt-6"><SectionLabel>Education</SectionLabel>{portfolio.education.map((item) => <p key={item} className="mt-3 text-sm text-[#52605a]">{item}</p>)}</div></div></div></section>

    <section id="lab" className="bg-[#17211f] py-20 text-[#f6f4ef] md:py-28"><div className="mx-auto max-w-7xl px-5 md:px-10"><SectionLabel>Engineering lab / three ways of thinking</SectionLabel><h2 className="display mt-4 max-w-3xl text-5xl leading-[.95] md:text-7xl">Curious how it works?</h2><p className="mt-6 max-w-2xl text-base leading-7 text-[#bac4bf]">These small, explorable systems turn familiar engineering ideas into something you can inspect without needing a whiteboard.</p>
      <div className="mt-14 grid gap-5 lg:grid-cols-2"><article className="rounded-2xl bg-[#21312d] p-6 md:p-8"><div className="flex items-start justify-between"><SectionLabel>01 / System design</SectionLabel><span className="mono text-xs text-[#bac4bf]">DNS → Edge → Render</span></div><h3 className="display mt-7 text-4xl">How this page reaches you.</h3><div className="mt-8 grid gap-2">{trace.map(([number,title,detail], index) => <button key={title} onClick={() => setTraceStep(index)} className={`grid grid-cols-[36px_1fr] rounded-xl p-4 text-left transition ${traceStep === index ? "bg-[#f6f4ef] text-[#17211f]" : "bg-white/5 text-[#d7dedb] hover:bg-white/10"}`}><span className="mono text-[11px]">{number}</span><span><b className="text-sm">{title}</b>{traceStep === index && <span className="mt-1 block text-sm leading-5 opacity-75">{detail}</span>}</span></button>)}</div><p className="mono mt-5 text-[10px] uppercase tracking-wider text-[#94a69f]">Live headers available after Vercel deploy · simulation always available</p></article>
        <article className="rounded-2xl bg-[#f6f4ef] p-6 text-[#17211f] md:p-8"><div className="flex items-start justify-between"><SectionLabel>02 / Algorithms</SectionLabel><span className="mono text-xs text-[#64706c]">Career DAG</span></div><h3 className="display mt-7 text-4xl">A path, in graph form.</h3><div className="mt-6 flex flex-wrap gap-2">{(["list","matrix","edges"] as const).map((item) => <button key={item} onClick={() => setRepresentation(item)} className={`mono rounded-full px-3 py-2 text-[10px] uppercase ${representation === item ? "bg-[#17211f] text-white" : "border border-[#d9d8d0]"}`}>{item === "list" ? "Adjacency list" : item === "matrix" ? "Matrix" : "Edges + degree"}</button>)}</div><div className="mono mt-5 min-h-35 rounded-xl border border-[#d9d8d0] bg-[#efede7] p-4 text-xs leading-6 text-[#52605a]">{representation === "list" && portfolio.graph.nodes.map((node, i) => <p key={node}>{node} → {portfolio.graph.edges.filter(([a]) => a === i).map(([,b]) => portfolio.graph.nodes[b]).join(", ") || "∅"}</p>)}{representation === "edges" && portfolio.graph.edges.map(([a,b]) => <p key={`${a}-${b}`}>{portfolio.graph.nodes[a]} → {portfolio.graph.nodes[b]}</p>)}{representation === "matrix" && <pre className="overflow-x-auto">{matrix.map((row) => row.join("  ")).join("\n")}</pre>}</div><div className="mt-5 flex items-center justify-between border-t border-[#d9d8d0] pt-5"><p className="text-sm">Kahn&apos;s algorithm: <b>{order.length}</b> / {portfolio.graph.nodes.length} nodes resolved</p><div className="flex gap-2"><button onClick={() => setGraphStep(Math.max(0, graphStep - 1))} className="rounded-full border border-[#d9d8d0] px-3 py-1">−</button><button onClick={() => setGraphStep(Math.min(portfolio.graph.nodes.length, graphStep + 1))} className="rounded-full bg-[#d85d3f] px-3 py-1 text-white">+</button></div></div><div className="mt-4 flex flex-wrap gap-1">{order.map((node) => <Pill key={node}>{node}</Pill>)}</div></article>
      </div>
      <article className="mt-5 rounded-2xl border border-white/15 p-6 md:p-8"><div className="grid gap-8 lg:grid-cols-[1fr_1.2fr]"><div><SectionLabel>03 / AI engineering</SectionLabel><h3 className="display mt-4 text-4xl">Ask about Bhavika&apos;s work.</h3><p className="mt-4 max-w-md text-sm leading-6 text-[#bac4bf]">A deliberately grounded assistant. It can use only the public portfolio facts — and says so when an answer isn&apos;t covered.</p><div className="mono mt-8 flex gap-4 text-[10px] uppercase tracking-wider text-[#94a69f]"><span>● portfolio context</span><span>○ provider key needed</span></div></div><div className="rounded-xl bg-white/5 p-4"><form onSubmit={ask}><label className="sr-only" htmlFor="question">Ask a question</label><textarea id="question" value={question} onChange={(e) => setQuestion(e.target.value)} placeholder="What kinds of systems does Bhavika enjoy building?" className="h-28 w-full resize-none bg-transparent text-sm leading-6 outline-none placeholder:text-[#94a69f]" maxLength={500}/><div className="flex items-center justify-between border-t border-white/15 pt-3"><span className="mono text-[10px] text-[#94a69f]">STRICTLY GROUNDED</span><button disabled={chatState === "loading"} className="rounded-full bg-[#f6f4ef] px-4 py-2 text-sm text-[#17211f] disabled:opacity-60">{chatState === "loading" ? "Thinking…" : "Ask →"}</button></div></form>{answer && <p className="mt-4 border-t border-white/15 pt-4 text-sm leading-6 text-[#d7dedb]">{answer}</p>}</div></div></article>
    </div></section>

    <section id="about" className="mx-auto grid max-w-7xl gap-10 px-5 py-24 md:grid-cols-12 md:px-10 md:py-36"><div className="md:col-span-4"><SectionLabel>About</SectionLabel><div className="mt-5 aspect-[4/5] rounded-2xl bg-[#dfe6df] p-6"><span className="mono text-[10px] uppercase text-[#52605a]">Portrait placeholder · photo coming soon</span><div className="mt-16 h-40 rounded-full border border-dashed border-[#8aa198]"/></div></div><div className="self-center md:col-span-7 md:col-start-6"><h2 className="display text-5xl leading-[.98] md:text-6xl">Made with care for the details people feel.</h2><p className="mt-7 max-w-xl text-lg leading-8 text-[#52605a]">{portfolio.bio}</p><a href={`mailto:${portfolio.identity.email}`} className="mt-9 inline-block border-b border-[#d85d3f] pb-1 text-lg">Let&apos;s talk {arrows}</a></div></section>
    <footer className="border-t border-[#d9d8d0] px-5 py-8 md:px-10"><div className="mx-auto flex max-w-7xl flex-col gap-4 text-sm text-[#64706c] sm:flex-row sm:items-center sm:justify-between"><p>© 2026 Bhavika Karale. Built with curiosity.</p><p className="mono text-[10px] uppercase">Responsive by default · no heavy 3D</p></div></footer>
  </main>;
}
