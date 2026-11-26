"use client";

import { useEffect, useMemo, useState } from "react";
import type { portfolio as portfolioData } from "@/data/bhavika";
import { kahnSteps } from "@/lib/graph/kahn";

type Portfolio = typeof portfolioData;
type Representation = "list" | "matrix" | "edges";

const nav = ["Work", "Experience", "Ask", "About"];
const prompts = ["Tell me about yourself", "How can I contact you?", "What is your highest education?", "What has Bhavika built?"];

function SectionLabel({ children }: { children: React.ReactNode }) {
  return <p className="mono text-[11px] font-medium uppercase tracking-[.12em] text-[#64706c]">{children}</p>;
}

function Pill({ children }: { children: React.ReactNode }) {
  return <span className="mono rounded-full border border-[#d9d8d0] px-3 py-1 text-[11px] text-[#52605a]">{children}</span>;
}

function CareerGraph({ nodes, edges, step }: { nodes: string[]; edges: [number, number][]; step: number }) {
  const states = kahnSteps({ nodes, edges });
  const current = states[Math.min(step, states.length - 1)];
  const coords = [[64, 145], [205, 84], [350, 145], [495, 204], [640, 145]];
  const labels = ["B.E.", "Persistent", "M.S. Data", "Adobe intern", "Adobe SDE II"];

  return <div className="mt-8 overflow-x-auto border-y border-[#d9d8d0] py-5">
    <svg viewBox="0 0 705 278" className="min-w-[660px]" role="img" aria-label="Bhavika's education and career progression">
      <defs><marker id="career-arrow" markerWidth="9" markerHeight="9" refX="6" refY="3" orient="auto"><path d="M0,0 L0,6 L7,3 z" fill="#53665f" /></marker></defs>
      {edges.map(([from, to]) => {
        const [x1, y1] = coords[from]; const [x2, y2] = coords[to];
        return <path key={`${from}-${to}`} d={`M${x1 + 48} ${y1} L${x2 - 48} ${y2}`} fill="none" stroke={current.resolved.includes(from) ? "#d85d3f" : "#a7b4ad"} strokeWidth="2" markerEnd="url(#career-arrow)" />;
      })}
      {nodes.map((node, index) => {
        const [x, y] = coords[index]; const complete = current.resolved.includes(index); const queued = current.queue.includes(index);
        const fill = complete ? "#d85d3f" : queued ? "#315d51" : "#f6f4ef"; const text = complete || queued ? "#ffffff" : "#17211f";
        return <g key={node}><circle cx={x} cy={y} r="46" fill={fill} stroke="#17211f" strokeWidth="1.2" /><text x={x} y={y - 4} textAnchor="middle" fontSize="11" fontWeight="700" fill={text}>{labels[index]}</text><text x={x} y={y + 15} textAnchor="middle" fontSize="9" fill={complete || queued ? "#fff" : "#64706c"}>in-degree {current.inDegrees[index]}</text></g>;
      })}
      <text x="18" y="263" fontSize="10" fill="#64706c" fontFamily="monospace">READY NEXT: {current.queue.map((id) => labels[id]).join(" · ") || "complete"}</text>
    </svg>
  </div>;
}

export function PortfolioExperience({ portfolio }: { portfolio: Portfolio }) {
  const [showDsa, setShowDsa] = useState(false);
  const [graphStep, setGraphStep] = useState(0);
  const [autoPlay, setAutoPlay] = useState(false);
  const [representation, setRepresentation] = useState<Representation>("list");
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState<string | null>(null);
  const [chatState, setChatState] = useState<"idle" | "loading">("idle");
  const graphSteps = useMemo(() => kahnSteps(portfolio.graph), [portfolio]);
  const graphState = graphSteps[Math.min(graphStep, graphSteps.length - 1)];
  const matrix = useMemo(() => portfolio.graph.nodes.map((_, from) => portfolio.graph.nodes.map((_, to) => portfolio.graph.edges.some(([a, b]) => a === from && b === to) ? 1 : 0)), [portfolio]);

  useEffect(() => {
    if (!autoPlay) return;
    if (graphStep >= graphSteps.length - 1) return;
    const timer = window.setTimeout(() => {
      setGraphStep((value) => value + 1);
      if (graphStep + 1 >= graphSteps.length - 1) setAutoPlay(false);
    }, 1050);
    return () => window.clearTimeout(timer);
  }, [autoPlay, graphStep, graphSteps.length]);

  async function ask(message = question) {
    const cleaned = message.trim(); if (!cleaned) return;
    setQuestion(cleaned); setChatState("loading"); setAnswer(null);
    try {
      const response = await fetch("/api/chat", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ message: cleaned }) });
      const text = await response.text(); if (!response.ok) throw new Error(text); setAnswer(text);
    } catch { setAnswer("I can answer from Bhavika’s public portfolio once the assistant is configured. In the meantime, you can reach her at bhavika.hireme@gmail.com."); }
    finally { setChatState("idle"); }
  }

  return <main className="overflow-hidden">
    <header className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 md:px-10"><a href="#top" className="font-semibold tracking-[-.04em]">BK<span className="text-[#d85d3f]">.</span></a><nav className="hidden gap-7 text-sm text-[#52605a] md:flex">{nav.map((item) => <a key={item} href={`#${item.toLowerCase()}`} className="transition hover:text-[#17211f]">{item}</a>)}</nav><span className="text-xs text-[#64706c]">{portfolio.identity.location}</span></header>
    <section id="top" className="mx-auto grid max-w-7xl gap-10 px-5 pb-24 pt-14 md:grid-cols-12 md:px-10 md:pb-36 md:pt-24"><div className="md:col-span-8"><SectionLabel>Software engineering · Systems · AI</SectionLabel><h1 className="display mt-7 text-[clamp(3.8rem,9vw,8rem)] leading-[.88]">Bhavika<br />Karale<span className="text-[#d85d3f]">.</span></h1><p className="mt-8 max-w-2xl text-lg leading-8 text-[#52605a] md:text-xl">{portfolio.intro}</p><div className="mt-10 flex flex-wrap gap-3"><a href="#work" className="rounded-full bg-[#17211f] px-5 py-3 text-sm text-white transition hover:bg-[#315d51]">See selected work</a><a href="#ask" className="rounded-full border border-[#17211f] px-5 py-3 text-sm transition hover:bg-[#eceae3]">Ask about Bhavika&apos;s work</a></div></div><aside className="self-end border-l border-[#d9d8d0] pl-5 md:col-span-4"><p className="text-sm leading-6 text-[#52605a]">{portfolio.availability}</p><div className="mt-6 flex gap-4 text-sm underline decoration-[#d85d3f] underline-offset-4"><a href={portfolio.identity.linkedin} target="_blank" rel="noreferrer">LinkedIn ↗</a><a href={portfolio.identity.github} target="_blank" rel="noreferrer">GitHub ↗</a></div></aside></section>
    <section id="work" className="border-y border-[#d9d8d0] bg-[#efede7] py-20 md:py-28"><div className="mx-auto max-w-7xl px-5 md:px-10"><div className="flex items-end justify-between"><div><SectionLabel>Selected work</SectionLabel><h2 className="display mt-3 text-5xl md:text-6xl">A few things I&apos;ve built.</h2></div><span className="mono hidden text-xs text-[#64706c] md:block">03 / public work</span></div><div className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-[#d9d8d0] bg-[#d9d8d0] md:grid-cols-3">{portfolio.projects.map((project, index) => <article key={project.title} className="flex min-h-96 flex-col bg-[#f6f4ef] p-6 md:p-7"><div className="flex justify-between"><SectionLabel>0{index + 1} · {project.eyebrow}</SectionLabel><span className="text-xl text-[#d85d3f]">↗</span></div><h3 className="display mt-12 text-4xl leading-none">{project.title}</h3><p className="mt-5 text-sm leading-6 text-[#52605a]">{project.summary}</p><p className="mt-auto border-t border-[#d9d8d0] pt-5 text-sm font-medium">{project.impact}</p><div className="mt-5 flex flex-wrap gap-2">{project.tags.map((tag) => <Pill key={tag}>{tag}</Pill>)}</div>{project.href !== "#" && <a href={project.href} target="_blank" rel="noreferrer" className="mt-5 text-sm underline underline-offset-4">View repository ↗</a>}</article>)}</div></div></section>
    <section id="experience" className="mx-auto max-w-7xl px-5 py-24 md:px-10 md:py-36"><div className="grid gap-12 md:grid-cols-12"><div className="md:col-span-4"><SectionLabel>Experience</SectionLabel><h2 className="display mt-3 text-5xl leading-[.95] md:text-6xl">Building the useful, not just the new.</h2><button onClick={() => { setShowDsa((shown) => !shown); setAutoPlay(false); }} className="mt-8 border-b border-[#d85d3f] pb-1 text-left text-sm font-medium">{showDsa ? "Back to timeline list" : "Want to see it the Data Structures & Algo way?"}</button></div><div className="md:col-span-7 md:col-start-6">{showDsa ? <div className="border-y border-[#d9d8d0] py-6"><SectionLabel>Career + education as a directed graph</SectionLabel><h3 className="display mt-3 text-4xl">Five milestones, one path.</h3><CareerGraph nodes={portfolio.graph.nodes} edges={portfolio.graph.edges} step={graphStep} /><div className="mt-6 flex flex-wrap gap-2">{(["list", "matrix", "edges"] as Representation[]).map((item) => <button key={item} onClick={() => setRepresentation(item)} className={`mono rounded-full px-3 py-2 text-[10px] uppercase ${representation === item ? "bg-[#17211f] text-white" : "border border-[#d9d8d0]"}`}>{item === "list" ? "Adjacency list" : item === "matrix" ? "Adjacency matrix" : "Edge list + in-degree"}</button>)}</div><div className="mono mt-4 min-h-32 rounded-xl border border-[#d9d8d0] bg-[#efede7] p-4 text-xs leading-6 text-[#52605a]">{representation === "list" && portfolio.graph.nodes.map((node, index) => <p key={node}>{node}: {portfolio.graph.edges.filter(([from]) => from === index).map(([, to]) => portfolio.graph.nodes[to]).join(", ") || "none"}</p>)}{representation === "edges" && portfolio.graph.edges.map(([from, to]) => <p key={`${from}-${to}`}>{portfolio.graph.nodes[from]} → {portfolio.graph.nodes[to]} <span className="text-[#64706c]">· current in-degree: {graphState.inDegrees[to]}</span></p>)}{representation === "matrix" && <pre className="overflow-x-auto">{matrix.map((row) => row.join("  ")).join("\n")}</pre>}</div><div className="mt-5 flex flex-wrap items-center justify-between gap-4 border-t border-[#d9d8d0] pt-5"><p className="text-sm">Kahn&apos;s algorithm <span className="text-[#64706c]">· resolves the next available milestone</span></p><div className="flex flex-wrap gap-2"><button onClick={() => { setGraphStep((value) => Math.min(graphSteps.length - 1, value + 1)); setAutoPlay(false); }} className="rounded-full bg-[#17211f] px-4 py-2 text-sm text-white">Step</button><button onClick={() => setAutoPlay((playing) => !playing)} className="rounded-full border border-[#17211f] px-4 py-2 text-sm">{autoPlay ? "Pause" : "Auto-play"}</button><button onClick={() => { setGraphStep(0); setAutoPlay(false); }} className="rounded-full border border-[#d9d8d0] px-4 py-2 text-sm">Reset</button></div></div></div> : <>{portfolio.experience.map((item) => <article key={item.company + item.period} className="grid gap-3 border-t border-[#d9d8d0] py-6 md:grid-cols-[130px_1fr]"><p className="mono text-xs text-[#64706c]">{item.period}</p><div><h3 className="text-xl font-medium">{item.company}<span className="text-[#d85d3f]"> / </span>{item.role}</h3><p className="mt-3 max-w-xl text-sm leading-6 text-[#52605a]">{item.detail}</p></div></article>)}<div className="border-t border-[#d9d8d0] pt-6"><SectionLabel>Education</SectionLabel>{portfolio.education.map((item) => <p key={item} className="mt-3 text-sm text-[#52605a]">{item}</p>)}</div></>}</div></div></section>
    <section id="ask" className="bg-[#20342e] py-20 text-[#f6f4ef] md:py-28"><div className="mx-auto grid max-w-7xl gap-10 px-5 md:grid-cols-12 md:px-10"><div className="md:col-span-5"><SectionLabel>Portfolio assistant</SectionLabel><h2 className="display mt-4 text-5xl leading-[.95] md:text-6xl">Ask about Bhavika&apos;s work.</h2><p className="mt-6 max-w-md text-base leading-7 text-[#c5d1cc]">A quick, grounded way to answer the questions recruiters often start with. It uses only the public information on this site.</p><p className="mono mt-8 text-[10px] uppercase tracking-wider text-[#aabbb4]">Public portfolio context only</p></div><div className="md:col-span-6 md:col-start-7"><div className="flex flex-wrap gap-2">{prompts.map((prompt) => <button key={prompt} onClick={() => ask(prompt)} disabled={chatState === "loading"} className="rounded-full border border-white/25 px-3 py-2 text-sm text-[#f6f4ef] transition hover:bg-white/10 disabled:opacity-50">{prompt}</button>)}</div><div className="mt-5 rounded-2xl border border-white/15 bg-white/5 p-5"><form onSubmit={(event) => { event.preventDefault(); void ask(); }}><label className="sr-only" htmlFor="question">Ask a question about Bhavika</label><textarea id="question" value={question} onChange={(event) => setQuestion(event.target.value)} placeholder="Ask a question about Bhavika’s work…" className="h-28 w-full resize-none bg-transparent text-base leading-6 outline-none placeholder:text-[#aabbb4]" maxLength={500} /><div className="flex items-center justify-between border-t border-white/15 pt-4"><span className="mono text-[10px] text-[#aabbb4]">STRICTLY GROUNDED</span><button disabled={chatState === "loading"} className="rounded-full bg-[#f6f4ef] px-4 py-2 text-sm text-[#17211f] disabled:opacity-60">{chatState === "loading" ? "Thinking…" : "Ask"}</button></div></form>{answer && <p aria-live="polite" className="mt-5 border-t border-white/15 pt-5 text-sm leading-6 text-[#e5ece8]">{answer}</p>}</div></div></div></section>
    <section id="about" className="mx-auto grid max-w-7xl gap-10 px-5 py-24 md:grid-cols-12 md:px-10 md:py-36"><div className="md:col-span-4"><SectionLabel>About</SectionLabel><div className="mt-5 aspect-[4/5] rounded-2xl bg-[#dfe6df] p-6"><span className="mono text-[10px] uppercase text-[#52605a]">Portrait placeholder · photo coming soon</span><div className="mt-16 h-40 rounded-full border border-dashed border-[#8aa198]" /></div></div><div className="self-center md:col-span-7 md:col-start-6"><h2 className="display text-5xl leading-[.98] md:text-6xl">Made with care for the details people feel.</h2><p className="mt-7 max-w-xl text-lg leading-8 text-[#52605a]">{portfolio.bio}</p><a href={`mailto:${portfolio.identity.email}`} className="mt-9 inline-block border-b border-[#d85d3f] pb-1 text-lg">Let&apos;s talk ↗</a></div></section>
    <footer className="border-t border-[#d9d8d0] px-5 py-8 md:px-10"><div className="mx-auto flex max-w-7xl flex-col gap-4 text-sm text-[#64706c] sm:flex-row sm:items-center sm:justify-between"><p>© 2026 Bhavika Karale. Built with curiosity.</p><p className="mono text-[10px] uppercase">Responsive by default · no heavy 3D</p></div></footer>
  </main>;
}
