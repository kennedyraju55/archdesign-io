import Link from "next/link";
import { ArrowRight, Star, Users, BookOpen } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center pt-16 overflow-hidden">
      {/* Background grid */}
      <div className="absolute inset-0 grid-bg" />

      {/* Radial glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-blue-600/5 blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-1/4 w-[400px] h-[400px] rounded-full bg-cyan-500/5 blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 w-[400px] h-[400px] rounded-full bg-purple-600/5 blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center max-w-4xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[var(--border-bright)] bg-blue-600/10 text-blue-400 text-sm font-medium mb-8">
            <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse-glow" />
            New: Mooncake &amp; PRESERVE (2025 papers) just added →
            <ArrowRight className="w-3.5 h-3.5" />
          </div>

          {/* Headline */}
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.1] tracking-tight mb-4">
            Master System Design
            <br />
            <span className="gradient-text">Like a Staff Engineer</span>
          </h1>

          {/* Attribution */}
          <p className="text-sm text-[var(--text-muted)] mb-6 flex items-center justify-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[#0078d4] inline-block" />
            by Microsoft Engineer Raju Guthikonda
          </p>

          {/* Subheadline */}
          <p className="text-xl text-[var(--text-secondary)] leading-relaxed mb-10 max-w-2xl mx-auto">
            30 real-world architectures · 10 LLM systems · latest 2025 research papers.
            Real systems, backed by research. Built for <strong className="text-[var(--text-primary)]">CS students</strong> who want to ace system design interviews and actually understand how things work.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-4">
            <Link
              href="/subscribe"
              className="group flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold text-lg hover:opacity-90 transition-all glow-blue shadow-2xl"
            >
              Start Learning Free
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              href="/architectures"
              className="flex items-center gap-2 px-8 py-4 rounded-xl border border-[var(--border)] text-[var(--text-secondary)] font-semibold text-lg hover:border-blue-500 hover:text-white transition-all"
            >
              <BookOpen className="w-5 h-5" />
              Browse Free Articles
            </Link>
          </div>

          {/* Value line */}
          <p className="text-xs text-[var(--text-muted)] mb-10">
            Built by a Microsoft engineer · Free forever · 30 architectures
          </p>

          {/* Real facts only */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-[var(--text-muted)]">
            <div className="flex items-center gap-1.5">
              <BookOpen className="w-4 h-4 text-blue-400" />
              <span><strong className="text-[var(--text-primary)]">30</strong> architecture deep-dives</span>
            </div>
            <div className="hidden sm:block w-px h-4 bg-[var(--border)]" />
            <div className="flex items-center gap-1.5">
              <Star className="w-4 h-4 text-yellow-400" />
              <span><strong className="text-[var(--text-primary)]">10</strong> LLM &amp; AI systems</span>
            </div>
            <div className="hidden sm:block w-px h-4 bg-[var(--border)]" />
            <div className="flex items-center gap-1.5">
              <Users className="w-4 h-4 text-green-400" />
              <span><strong className="text-green-400">150+</strong> FAANG interview questions</span>
            </div>
          </div>
        </div>

        {/* Architecture preview grid */}
        <div className="mt-20 relative">
          <div className="absolute inset-x-0 top-0 h-12 bg-gradient-to-b from-[#0a0f1e] to-transparent z-10 pointer-events-none" />
          <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[#0a0f1e] to-transparent z-10 pointer-events-none" />

          <div className="grid grid-cols-3 gap-3 max-w-5xl mx-auto opacity-60">
            {[
              { label: "Netflix CDN", company: "Netflix", tag: "⚡ Distributed", color: "#2563eb" },
              { label: "GPT Inference", company: "OpenAI", tag: "🤖 LLM", color: "#8b5cf6" },
              { label: "Kafka Streams", company: "LinkedIn", tag: "🗄️ Data", color: "#06b6d4" },
              { label: "Twitter Fan-out", company: "Twitter/X", tag: "⚡ Distributed", color: "#2563eb" },
              { label: "RAG Pipeline", company: "Cohere", tag: "🤖 LLM", color: "#8b5cf6" },
              { label: "DynamoDB", company: "Amazon", tag: "🗄️ Data", color: "#06b6d4" },
            ].map(({ label, company, tag, color }) => (
              <div key={label} className="arch-card p-4 flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0" style={{ background: `${color}22`, border: `1px solid ${color}44` }}>
                  <div className="w-4 h-4 rounded-sm" style={{ background: color }} />
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-medium text-[var(--text-primary)] truncate">{label}</p>
                  <p className="text-xs text-[var(--text-muted)]">{company}</p>
                </div>
                <span className="text-[10px] ml-auto text-[var(--text-muted)] whitespace-nowrap">{tag}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
