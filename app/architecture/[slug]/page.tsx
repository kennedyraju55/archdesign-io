import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import {
  ChevronRight,
  Lightbulb,
  BookOpen,
  ExternalLink,
  Lock,
  Play,
  CheckCircle2,
  Building2,
  ArrowRight,
  Zap,
} from "lucide-react";
import ArchDiagram from "@/components/architecture/ArchDiagram";
import MermaidDiagram from "@/components/architecture/MermaidDiagramClient";
import ArchCard from "@/components/architecture/ArchCard";
import {
  architectures,
  difficultyColors,
  categoryColors,
  type Architecture,
} from "@/data/architectures";

// ── Static params ─────────────────────────────────────────────────────────────

export function generateStaticParams() {
  return architectures.map((a) => ({ slug: a.slug }));
}

// ── Metadata ──────────────────────────────────────────────────────────────────

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const arch = architectures.find((a) => a.slug === slug);
  if (!arch) return {};
  return {
    title: `${arch.title} — ArchDesign.io`,
    description: arch.subtitle,
    keywords: arch.concepts.join(", "),
    openGraph: {
      title: arch.title,
      description: arch.subtitle,
      type: "article",
      url: `https://archdesign.io/architecture/${arch.slug}`,
    },
    twitter: {
      card: "summary_large_image",
      title: arch.title,
      description: arch.subtitle,
    },
  };
}

// ── Concept icons ─────────────────────────────────────────────────────────────

const conceptIconMap: Record<string, string> = {
  default: "⚙️",
  cache: "⚡", caching: "⚡", redis: "⚡",
  database: "🗄️", db: "🗄️", sql: "🗄️", postgres: "🗄️", mysql: "🗄️",
  kafka: "📨", queue: "📨", stream: "📨", event: "📨",
  ml: "🧠", model: "🧠", neural: "🧠", embedding: "🧠", llm: "🧠", ai: "🧠",
  cdn: "🌍", edge: "🌍", geo: "🌍",
  hash: "🔑", consistent: "🔑", sharding: "🔑",
  replication: "🔁", sync: "🔁", wal: "🔁",
  kubernetes: "☸️", docker: "☸️", container: "☸️",
  search: "🔍", index: "🔍", elasticsearch: "🔍",
  graph: "🕸️", network: "🕸️",
  vector: "📐", hnsw: "📐", ann: "📐",
  rag: "📚", retrieval: "📚",
  security: "🛡️", auth: "🛡️", safety: "🛡️",
};

function getConceptIcon(concept: string): string {
  const lower = concept.toLowerCase();
  for (const [key, icon] of Object.entries(conceptIconMap)) {
    if (lower.includes(key)) return icon;
  }
  return conceptIconMap.default;
}

// ── Category-aware gradient ────────────────────────────────────────────────────

const categoryGradients: Record<Architecture["category"], string> = {
  "Distributed Systems": "from-blue-600/20 via-transparent to-transparent",
  "Data & Infrastructure": "from-cyan-600/20 via-transparent to-transparent",
  "LLM & AI Systems": "from-purple-600/20 via-transparent to-transparent",
};

const categoryAccents: Record<Architecture["category"], string> = {
  "Distributed Systems": "border-blue-600/40 bg-blue-600/10",
  "Data & Infrastructure": "border-cyan-500/40 bg-cyan-500/10",
  "LLM & AI Systems": "border-purple-500/40 bg-purple-500/10",
};

const categoryTextAccents: Record<Architecture["category"], string> = {
  "Distributed Systems": "text-blue-400",
  "Data & Infrastructure": "text-cyan-400",
  "LLM & AI Systems": "text-purple-400",
};

// ── Page ──────────────────────────────────────────────────────────────────────

export default async function ArchitectureDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const arch = architectures.find((a) => a.slug === slug);
  if (!arch) notFound();

  const related = architectures
    .filter((a) => a.category === arch.category && a.id !== arch.id)
    .slice(0, 3);

  const accentBorder = categoryAccents[arch.category];
  const accentText = categoryTextAccents[arch.category];
  const accentBg = arch.category === "LLM & AI Systems" ? "bg-purple-500/10" : arch.category === "Data & Infrastructure" ? "bg-cyan-500/10" : "bg-blue-500/10";
  const heroGradient = categoryGradients[arch.category];

  return (
    <div className="min-h-screen bg-[var(--bg-primary)]">

      {/* ── Breadcrumb ─────────────────────────────────────────────── */}
      <div className="border-b border-[var(--border)] bg-[var(--bg-secondary)]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-3 flex items-center gap-1.5 text-xs text-[var(--text-muted)]">
          <Link href="/" className="hover:text-[var(--text-secondary)] transition">Home</Link>
          <ChevronRight className="w-3 h-3" />
          <Link href="/architectures" className="hover:text-[var(--text-secondary)] transition">Architectures</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-[var(--text-secondary)] truncate max-w-[200px]">{arch.title}</span>
        </div>
      </div>

      {/* ── Hero ───────────────────────────────────────────────────── */}
      <section className={`relative overflow-hidden pt-12 pb-14 bg-gradient-to-b ${heroGradient}`}>
        <div className="absolute inset-0 grid-bg opacity-20 pointer-events-none" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent" />

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6">
          {/* Badges */}
          <div className="flex flex-wrap items-center gap-2 mb-5">
            <span className={`badge ${categoryColors[arch.category]}`}>
              {arch.category === "LLM & AI Systems" ? "🤖 LLM & AI" : arch.category === "Distributed Systems" ? "⚡ Distributed Systems" : "🗄️ Data & Infrastructure"}
            </span>
            <span className={`badge ${difficultyColors[arch.difficulty]}`}>{arch.difficulty}</span>
            <span className="badge badge-blue">Week {arch.videoWeek}</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[var(--text-primary)] mb-4 leading-tight tracking-tight max-w-3xl">
            {arch.title}
          </h1>
          <p className="text-lg text-[var(--text-secondary)] mb-6 max-w-2xl leading-relaxed">
            {arch.subtitle}
          </p>

          {/* Companies */}
          <div className="flex flex-wrap items-center gap-2">
            <Building2 className="w-4 h-4 text-[var(--text-muted)]" />
            {arch.companies.map((co) => (
              <span
                key={co}
                className="px-3 py-1 rounded-full text-xs font-medium bg-[var(--bg-card)] border border-[var(--border)] text-[var(--text-secondary)]"
              >
                {co}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── Main Content ───────────────────────────────────────────── */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12 space-y-14">

        {/* ── Key Insight ──────────────────────────────────────────── */}
        <div className={`relative rounded-2xl border ${accentBorder} p-6 overflow-hidden`}>
          <div className="absolute inset-0 opacity-30 pointer-events-none bg-gradient-to-br from-current to-transparent" />
          <div className="relative flex gap-4 items-start">
            <div className={`shrink-0 w-10 h-10 rounded-xl flex items-center justify-center ${accentBorder} border`}>
              <Lightbulb className={`w-5 h-5 ${accentText}`} />
            </div>
            <div>
              <p className={`text-xs font-semibold uppercase tracking-widest mb-2 ${accentText}`}>Key Insight</p>
              <p className="text-[var(--text-primary)] font-medium leading-relaxed text-base sm:text-lg">
                {arch.keyInsight}
              </p>
            </div>
          </div>
        </div>

        {/* ── Request Journey ────────────────────────────────────────── */}
        {arch.howItWorks && (
          <div className="bg-slate-800/30 border border-slate-700/30 rounded-xl p-4 mb-8">
            <p className="text-xs text-slate-500 uppercase tracking-wider mb-3 font-semibold">Request Journey</p>
            <div className="flex flex-wrap gap-2 items-center">
              {arch.howItWorks.split('→').slice(0, 5).map((step, i, arr) => (
                <div key={i} className="flex items-center gap-2">
                  <span className="bg-slate-700/60 text-slate-300 text-xs px-3 py-1.5 rounded-full border border-slate-600/40 max-w-[160px] truncate" title={step.trim()}>
                    {step.trim().replace(/^[①②③④⑤⑥⑦⑧⑨]\s*/, '')}
                  </span>
                  {i < arr.length - 1 && <span className="text-slate-600 text-xs">→</span>}
                </div>
              ))}
              {arch.howItWorks.split('→').length > 5 && (
                <span className="text-slate-600 text-xs">+{arch.howItWorks.split('→').length - 5} more steps</span>
              )}
            </div>
          </div>
        )}

        {/* ── Description ──────────────────────────────────────────── */}
        <section>
          <h2 className="text-xl font-bold text-[var(--text-primary)] mb-4 flex items-center gap-2">
            <Zap className={`w-5 h-5 ${accentText}`} />
            How It Works
          </h2>
          {arch.howItWorks ? (
            <div className="space-y-0">
              {arch.howItWorks.split('→').map((step, i, steps) => (
                <div key={i} className="flex gap-4 group">
                  <div className="flex flex-col items-center">
                    <div className="w-8 h-8 rounded-full bg-blue-500/20 border border-blue-500/40 flex items-center justify-center text-blue-400 font-bold text-sm flex-shrink-0">
                      {i + 1}
                    </div>
                    {i < steps.length - 1 && (
                      <div className="w-px h-6 bg-blue-500/20 my-1" />
                    )}
                  </div>
                  <div className="pb-4 pt-1">
                    <p className="text-slate-300 text-sm leading-relaxed">{step.trim()}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-[var(--text-secondary)] leading-relaxed text-base">
              {arch.description}
            </p>
          )}
        </section>

        {/* ── Problem ──────────────────────────────────────────────── */}
        {arch.problem && (
          <section>
            <h2 className="text-xl font-bold text-[var(--text-primary)] mb-4 flex items-center gap-2">
              <span className="text-red-400">⚠</span>
              The Problem
            </h2>
            <div className="rounded-xl border border-red-500/30 bg-red-500/5 p-5">
              <p className="text-[var(--text-secondary)] leading-relaxed text-base">{arch.problem}</p>
            </div>
          </section>
        )}

        {/* ── Solution ─────────────────────────────────────────────── */}
        {arch.solution && (
          <section>
            <h2 className="text-xl font-bold text-[var(--text-primary)] mb-4 flex items-center gap-2">
              <span className="text-emerald-400">✓</span>
              The Solution
            </h2>
            <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/5 p-5">
              <p className="text-[var(--text-secondary)] leading-relaxed text-base">{arch.solution}</p>
            </div>
          </section>
        )}

        {/* ── Scaling Numbers ──────────────────────────────────────── */}
        {arch.scalingNumbers && arch.scalingNumbers.length > 0 && (
          <section>
            <h2 className="text-xl font-bold text-[var(--text-primary)] mb-5 flex items-center gap-2">
              <span className={accentText}>📊</span>
              Scale at a Glance
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {arch.scalingNumbers.map((n) => (
                <div key={n.label} className="arch-card p-5 text-center">
                  <p className={`text-2xl sm:text-3xl font-extrabold ${accentText} mb-1`}>{n.value}</p>
                  <p className="text-xs text-[var(--text-muted)] font-medium uppercase tracking-wider">{n.label}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ── Deep Dive ────────────────────────────────────────────── */}
        {arch.deepDive && arch.deepDive.length > 0 && (
          <section>
            <h2 className="text-xl font-bold text-[var(--text-primary)] mb-6 flex items-center gap-2">
              <span className={accentText}>🔬</span>
              Deep Dive
            </h2>
            <div className="space-y-6">
              {arch.deepDive.map((section, i) => (
                <div key={i} className="relative bg-slate-800/40 border border-slate-700/50 rounded-xl p-6 hover:border-slate-600/50 transition-colors">
                  <div className={`absolute left-0 top-6 bottom-6 w-1 rounded-full ${accentBg.replace('/10', '')}`} />
                  <div className="pl-4">
                    <div className="flex items-start gap-3 mb-3">
                      <span className={`w-7 h-7 rounded-lg ${accentBg} ${accentText} flex items-center justify-center font-bold text-xs flex-shrink-0`}>
                        {i + 1}
                      </span>
                      <h3 className="text-white font-semibold text-base leading-tight">{section.heading}</h3>
                    </div>
                    <p className="text-slate-300 text-sm leading-relaxed">{section.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ── Diagram ──────────────────────────────────────────────── */}
        <section>
          <h2 className="text-xl font-bold text-[var(--text-primary)] mb-5 flex items-center gap-2">
            <span className={accentText}>⬡</span>
            Architecture Diagram
          </h2>
          <div className="arch-card overflow-hidden">
            <div className="relative bg-[var(--bg-primary)] border-b border-[var(--border)] p-4">
              <div className="absolute inset-0 grid-bg opacity-40" />
              <div className="relative z-10 w-full">
                {arch.mermaidDef ? (
                  <MermaidDiagram definition={arch.mermaidDef} id={arch.slug} />
                ) : (
                  <ArchDiagram type={arch.diagramType} category={arch.category} large />
                )}
              </div>
            </div>
            <div className="px-5 py-3 bg-[var(--bg-card)]">
              <p className="text-xs text-[var(--text-muted)]">
                <span className="font-semibold text-[var(--text-secondary)]">{arch.title}</span> — simplified architecture overview
              </p>
            </div>
          </div>
        </section>

        {/* ── Core Concepts ────────────────────────────────────────── */}
        <section>
          <h2 className="text-xl font-bold text-[var(--text-primary)] mb-5 flex items-center gap-2">
            <span className={accentText}>✦</span>
            Core Concepts
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {arch.concepts.map((concept) => (
              <div
                key={concept}
                className="arch-card p-4 flex items-start gap-3"
              >
                <span className="text-xl leading-none shrink-0 mt-0.5">{getConceptIcon(concept)}</span>
                <div>
                  <p className="text-sm font-semibold text-[var(--text-primary)]">{concept}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Tradeoffs ────────────────────────────────────────────── */}
        {arch.tradeoffs && (
          <section>
            <h2 className="text-xl font-bold text-[var(--text-primary)] mb-5 flex items-center gap-2">
              <span className={accentText}>⚖</span>
              Tradeoffs & Design Decisions
            </h2>
            <p className="text-slate-400 text-sm mb-6">Every architectural decision is a tradeoff. Here&apos;s what you gain and what you give up.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="rounded-xl border border-emerald-500/25 bg-emerald-500/5 p-5">
                <p className="text-xs font-bold uppercase tracking-widest text-emerald-400 mb-3">✓ Strengths</p>
                <ul className="space-y-2.5">
                  {arch.tradeoffs.pros.map((p) => (
                    <li key={p} className="flex items-start gap-2.5 text-sm text-[var(--text-secondary)]">
                      <span className="text-emerald-400 shrink-0 mt-0.5 font-bold">✓</span>
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-xl border border-red-500/25 bg-red-500/5 p-5">
                <p className="text-xs font-bold uppercase tracking-widest text-red-400 mb-3">✗ Weaknesses</p>
                <ul className="space-y-2.5">
                  {arch.tradeoffs.cons.map((c) => (
                    <li key={c} className="flex items-start gap-2.5 text-sm text-[var(--text-secondary)]">
                      <span className="text-red-400 shrink-0 mt-0.5 font-bold">✗</span>
                      {c}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>
        )}

        {/* ── Interview Prep ───────────────────────────────────────── */}
        {arch.interviewQuestions && arch.interviewQuestions.length > 0 && (
          <section>
            <div className="flex items-center gap-3 mb-5">
              <h2 className="text-xl font-bold text-[var(--text-primary)] flex items-center gap-2">
                <span className="text-yellow-400">🎯</span>
                FAANG Interview Questions
              </h2>
              <span className="badge badge-purple">Interview Prep</span>
            </div>
            <div className="bg-yellow-500/5 border border-yellow-500/20 rounded-lg p-4 mb-6">
              <p className="text-yellow-300/80 text-sm">💡 These questions appear in FAANG system design rounds. Focus on <strong>tradeoffs</strong>, not just what the system does.</p>
            </div>
            <div className="rounded-xl border border-yellow-500/20 bg-yellow-500/5 p-6">
              <p className="text-xs text-[var(--text-muted)] mb-4 italic">
                These are real system design interview questions asked at Google, Meta, Amazon, Apple, Netflix, and Microsoft. Study the architecture above before attempting.
              </p>
              <ol className="space-y-4">
                {arch.interviewQuestions.map((q, i) => {
                  const question = typeof q === "string" ? q : q.question;
                  const hint = typeof q === "string" ? null : q.hint;
                  return (
                    <li key={i} className="flex items-start gap-3">
                      <span className="shrink-0 w-7 h-7 rounded-lg bg-yellow-500/15 border border-yellow-500/30 text-yellow-400 text-xs font-bold flex items-center justify-center mt-0.5">
                        Q{i + 1}
                      </span>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed">{question}</p>
                        {hint && (
                          <p className="text-xs text-[var(--text-muted)] mt-1 italic">💡 Hint: {hint}</p>
                        )}
                      </div>
                    </li>
                  );
                })}
              </ol>
            </div>
          </section>
        )}

        {/* ── Research Papers ──────────────────────────────────────── */}
        {arch.papers.length > 0 && (
          <section>
            <h2 className="text-xl font-bold text-[var(--text-primary)] mb-5 flex items-center gap-2">
              <BookOpen className={`w-5 h-5 ${accentText}`} />
              Research Papers & Further Reading
            </h2>
            <div className="space-y-3">
              {arch.papers.map((paper) => (
                <div
                  key={paper.title}
                  className="arch-card p-5 flex items-start justify-between gap-4 group/paper"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="badge badge-blue">{paper.year}</span>
                    </div>
                    <h3 className="text-sm font-semibold text-[var(--text-primary)] leading-snug mb-1">
                      {paper.title}
                    </h3>
                    <p className="text-xs text-[var(--text-muted)]">{paper.authors}</p>
                  </div>
                  {paper.url ? (
                    <a
                      href={paper.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium ${accentBorder} border ${accentText} hover:opacity-80 transition`}
                    >
                      Read <ExternalLink className="w-3 h-3" />
                    </a>
                  ) : (
                    <span className="shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-[var(--bg-primary)] border border-[var(--border)] text-[var(--text-muted)]">
                      No link
                    </span>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ── Video Coming Soon ─────────────────────────────────────── */}
        <section>
          <h2 className="text-xl font-bold text-[var(--text-primary)] mb-5 flex items-center gap-2">
            <Play className="w-5 h-5 text-amber-400" />
            Video Walkthrough
          </h2>
          <div className="relative rounded-2xl border border-amber-500/20 bg-gradient-to-br from-amber-500/5 to-orange-500/5 p-8 text-center overflow-hidden">
            <div className="absolute inset-0 grid-bg opacity-10 pointer-events-none" />
            <div className="relative">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold uppercase tracking-widest mb-5">
                🎬 Coming Soon
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-[var(--text-primary)] mb-3">
                40-Minute Video Deep-Dive
              </h3>
              <p className="text-[var(--text-secondary)] text-sm leading-relaxed max-w-md mx-auto mb-5">
                A full walkthrough of this architecture with live diagram annotation, capacity estimation worked examples, and FAANG interview Q&A — explained by a practising Microsoft engineer.
              </p>
              <ul className="flex flex-col sm:flex-row gap-3 justify-center text-sm text-[var(--text-secondary)] mb-6">
                {["Live diagram annotation", "Capacity estimation walkthrough", "Production war stories", "FAANG Q&A with model answers"].map(f => (
                  <li key={f} className="flex items-center gap-1.5 justify-center">
                    <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />{f}
                  </li>
                ))}
              </ul>
              <Link
                href="/coming-soon"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm text-black hover:opacity-90 transition shadow-lg"
                style={{ background: 'linear-gradient(135deg, #f59e0b, #ef4444)', boxShadow: '0 8px 24px rgba(245,158,11,0.25)' }}
              >
                <Zap className="w-4 h-4" />
                Get Notified When Live
              </Link>
              <p className="text-xs text-[var(--text-muted)] mt-2">Free to watch  No account required  Dropping soon</p>
            </div>
          </div>
        </section>

        {/*  Related Architectures  */}
        {related.length > 0 && (
          <section>
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-xl font-bold text-[var(--text-primary)] flex items-center gap-2">
                <span className={accentText}></span>
                More {arch.category}
              </h2>
              <Link
                href="/architectures"
                className={`flex items-center gap-1 text-xs font-medium ${accentText} hover:opacity-80 transition`}
              >
                View all <ArrowRight className="w-3 h-3" />
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {related.map((rel) => (
                <ArchCard key={rel.id} arch={rel} />
              ))}
            </div>
          </section>
        )}

        {/*  Bottom CTA ─ */}
        <section className="rounded-2xl border border-[var(--border)] bg-gradient-to-br from-[var(--bg-secondary)] to-[var(--bg-card)] p-8 sm:p-10 text-center relative overflow-hidden">
          <div className="absolute inset-0 grid-bg opacity-20 pointer-events-none" />
          <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-64 h-64 bg-blue-600/10 rounded-full blur-[60px] pointer-events-none" />
          <div className="relative">
            <div className="inline-flex items-center gap-2 badge badge-purple mb-5">
               30 Video Deep-Dives  Coming Soon
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-[var(--text-primary)] mb-3">
              Master every architecture with{" "}
              <span className="gradient-text-warm">video walkthroughs</span>
            </h2>
            <p className="text-[var(--text-secondary)] mb-7 max-w-xl mx-auto">
              One video per architecture. FAANG interview prep, live diagram walkthroughs, and production tradeoffs  explained by a Microsoft engineer.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/coming-soon"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold text-sm hover:opacity-90 transition shadow-lg shadow-blue-600/30"
              >
                <Play className="w-4 h-4" />
                Get Notified
              </Link>
              <Link
                href="/architectures"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[var(--bg-card)] border border-[var(--border)] text-[var(--text-secondary)] font-medium text-sm hover:text-[var(--text-primary)] hover:border-blue-600/40 transition"
              >
                Browse all 30 <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <p className="mt-4 text-xs text-[var(--text-muted)]">All architecture articles are free  No account needed</p>
          </div>
        </section>

      </div>
    </div>
  );
}