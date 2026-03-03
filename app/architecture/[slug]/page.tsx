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

        {/* ── Description ──────────────────────────────────────────── */}
        <section>
          <h2 className="text-xl font-bold text-[var(--text-primary)] mb-4 flex items-center gap-2">
            <Zap className={`w-5 h-5 ${accentText}`} />
            How It Works
          </h2>
          <p className="text-[var(--text-secondary)] leading-relaxed text-base">
            {arch.description}
          </p>
        </section>

        {/* ── Diagram ──────────────────────────────────────────────── */}
        <section>
          <h2 className="text-xl font-bold text-[var(--text-primary)] mb-5 flex items-center gap-2">
            <span className={accentText}>⬡</span>
            Architecture Diagram
          </h2>
          <div className="arch-card overflow-hidden">
            <div className="relative bg-[var(--bg-primary)] border-b border-[var(--border)] p-8 h-64 sm:h-80 flex items-center justify-center">
              <div className="absolute inset-0 grid-bg opacity-40" />
              <div className="relative z-10 w-full h-full">
                <ArchDiagram type={arch.diagramType} category={arch.category} large />
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

        {/* ── Research Papers ──────────────────────────────────────── */}
        {arch.papers.length > 0 && (
          <section>
            <h2 className="text-xl font-bold text-[var(--text-primary)] mb-5 flex items-center gap-2">
              <BookOpen className={`w-5 h-5 ${accentText}`} />
              Research Papers
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

        {/* ── Subscriber Exclusive (Locked) ────────────────────────── */}
        <section>
          <h2 className="text-xl font-bold text-[var(--text-primary)] mb-5 flex items-center gap-2">
            <Play className="w-5 h-5 text-amber-400" />
            Video Walkthrough
          </h2>

          <div className="relative rounded-2xl border border-amber-500/30 overflow-hidden" style={{ boxShadow: '0 0 40px rgba(245,158,11,0.06)' }}>
            {/* Blurred fake content */}
            <div className="select-none pointer-events-none" aria-hidden>
              <div className="bg-[var(--bg-card)] p-6 space-y-3 blur-[4px] opacity-40">
                <div className="h-4 w-2/3 rounded bg-[var(--border)]" />
                <div className="h-4 w-full rounded bg-[var(--border)]" />
                <div className="h-4 w-5/6 rounded bg-[var(--border)]" />
                <div className="h-36 rounded-xl bg-[var(--bg-primary)] flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-amber-500/20 border border-amber-500/30" />
                </div>
                <div className="h-4 w-3/4 rounded bg-[var(--border)]" />
                <div className="h-4 w-1/2 rounded bg-[var(--border)]" />
              </div>
            </div>

            {/* Lock overlay */}
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-[var(--bg-primary)]/85 backdrop-blur-sm p-6 sm:p-10">
              <div className="max-w-lg w-full text-center space-y-4">
                {/* Coming soon badge */}
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-sm font-bold uppercase tracking-widest">
                  🚀 Launching Soon
                </div>

                <h3 className="text-xl sm:text-2xl font-bold text-[var(--text-primary)]">
                  🎬 Video Deep-Dive Coming
                </h3>
                <p className="text-[var(--text-secondary)] text-sm leading-relaxed max-w-sm mx-auto">
                  A 40-min walkthrough of this exact architecture — with live diagram annotation, FAANG interview Q&A, and real capacity numbers. 
                  <strong className="text-amber-300"> Dropping soon for subscribers.</strong>
                </p>

                {/* What's inside */}
                <ul className="text-left space-y-2 max-w-xs mx-auto">
                  {[
                    "Step-by-step design with annotated diagrams",
                    "FAANG Q&A — traps, answers & follow-ups",
                    "Failure modes & real production war stories",
                    "Back-of-envelope capacity estimation",
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-sm text-[var(--text-secondary)]">
                      <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>

                {/* Early bird CTA */}
                <div className="pt-2 space-y-2">
                  <Link
                    href="/subscribe"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm text-black hover:opacity-90 transition shadow-lg"
                    style={{ background: 'linear-gradient(135deg, #f59e0b, #ef4444)', boxShadow: '0 8px 24px rgba(245,158,11,0.25)' }}
                  >
                    <Zap className="w-4 h-4" />
                    Reserve Early-Bird Spot — $5/mo
                  </Link>
                  <p className="text-xs text-[var(--text-muted)]">
                    No charge now · First 300 subscribers lock in this price forever
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Related Architectures ────────────────────────────────── */}
        {related.length > 0 && (
          <section>
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-xl font-bold text-[var(--text-primary)] flex items-center gap-2">
                <span className={accentText}>◈</span>
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

        {/* ── Bottom CTA ───────────────────────────────────────────── */}
        <section className="rounded-2xl border border-[var(--border)] bg-gradient-to-br from-[var(--bg-secondary)] to-[var(--bg-card)] p-8 sm:p-10 text-center relative overflow-hidden">
          <div className="absolute inset-0 grid-bg opacity-20 pointer-events-none" />
          <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-64 h-64 bg-blue-600/10 rounded-full blur-[60px] pointer-events-none" />

          <div className="relative">
            <div className="inline-flex items-center gap-2 badge badge-purple mb-5">
              🎬 30 Videos Total
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-[var(--text-primary)] mb-3">
              Master every architecture with{" "}
              <span className="gradient-text-warm">video deep-dives</span>
            </h2>
            <p className="text-[var(--text-secondary)] mb-7 max-w-xl mx-auto">
              One video per architecture. New release every week. FAANG interview prep, step-by-step walkthroughs, and production tradeoffs explained visually.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                href="/subscribe"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold text-sm hover:opacity-90 transition shadow-lg shadow-blue-600/30"
              >
                <Play className="w-4 h-4" />
                Subscribe — $5/mo
              </Link>
              <Link
                href="/architectures"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[var(--bg-card)] border border-[var(--border)] text-[var(--text-secondary)] font-medium text-sm hover:text-[var(--text-primary)] hover:border-blue-600/40 transition"
              >
                Browse all 30 <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <p className="mt-4 text-xs text-[var(--text-muted)]">Cancel anytime · No DRM · Watch at your own pace</p>
          </div>
        </section>

      </div>
    </div>
  );
}
