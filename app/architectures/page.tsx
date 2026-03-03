"use client";

import { useState, useMemo } from "react";
import { Search, Layers, Cpu, Database, Filter } from "lucide-react";
import ArchCard from "@/components/architecture/ArchCard";
import { architectures, type Category } from "@/data/architectures";

const CATEGORIES: { label: string; value: Category | "All"; icon: React.ReactNode }[] = [
  { label: "All (30)", value: "All", icon: <Layers className="w-3.5 h-3.5" /> },
  { label: "Distributed Systems (10)", value: "Distributed Systems", icon: <Cpu className="w-3.5 h-3.5" /> },
  { label: "Data & Infrastructure (10)", value: "Data & Infrastructure", icon: <Database className="w-3.5 h-3.5" /> },
  { label: "LLM & AI Systems (10)", value: "LLM & AI Systems", icon: <span className="text-sm leading-none">🤖</span> },
];

export default function ArchitecturesPage() {
  const [activeCategory, setActiveCategory] = useState<Category | "All">("All");
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    let result = architectures;
    if (activeCategory !== "All") {
      result = result.filter((a) => a.category === activeCategory);
    }
    if (search.trim()) {
      const q = search.trim().toLowerCase();
      result = result.filter(
        (a) =>
          a.title.toLowerCase().includes(q) ||
          a.subtitle.toLowerCase().includes(q) ||
          a.concepts.some((c) => c.toLowerCase().includes(q)) ||
          a.companies.some((c) => c.toLowerCase().includes(q))
      );
    }
    return result;
  }, [activeCategory, search]);

  return (
    <div className="min-h-screen bg-[var(--bg-primary)]">
      {/* ── Hero ─────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden pt-24 pb-14 border-b border-[var(--border)]">
        <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none" />
        {/* Ambient glows */}
        <div className="absolute -top-32 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute -top-32 right-1/4 w-80 h-80 bg-cyan-400/8 rounded-full blur-[100px] pointer-events-none" />

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 text-center">
          <div className="inline-flex items-center gap-2 badge badge-blue mb-5">
            <Layers className="w-3 h-3" />
            30 Production Architectures
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold mb-4 leading-tight tracking-tight">
            <span className="gradient-text">30 System Architecture</span>
            <br />
            <span className="text-[var(--text-primary)]">Deep-Dives</span>
          </h1>
          <p className="text-[var(--text-secondary)] text-lg max-w-2xl mx-auto leading-relaxed">
            Real-world systems explained with diagrams, research papers, and production tradeoffs — from Netflix CDN to GPT inference pipelines.
          </p>
        </div>
      </section>

      {/* ── Sticky Filter Bar ────────────────────────────────────── */}
      <div className="sticky top-0 z-30 bg-[var(--bg-primary)]/90 backdrop-blur-xl border-b border-[var(--border)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex flex-col sm:flex-row gap-3 items-start sm:items-center justify-between">
          {/* Category tabs */}
          <div className="flex items-center gap-1 flex-wrap">
            <Filter className="w-3.5 h-3.5 text-[var(--text-muted)] mr-1 shrink-0" />
            {CATEGORIES.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setActiveCategory(cat.value)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  activeCategory === cat.value
                    ? "bg-blue-600/20 text-blue-400 border border-blue-600/40"
                    : "text-[var(--text-muted)] hover:text-[var(--text-secondary)] hover:bg-white/5 border border-transparent"
                }`}
              >
                {cat.icon}
                <span className="hidden sm:inline">{cat.label}</span>
                <span className="sm:hidden">
                  {cat.value === "All"
                    ? "All"
                    : cat.value === "Distributed Systems"
                    ? "Distributed"
                    : cat.value === "Data & Infrastructure"
                    ? "Data"
                    : "LLM & AI"}
                </span>
              </button>
            ))}
          </div>

          {/* Search */}
          <div className="relative w-full sm:w-64 shrink-0">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-[var(--text-muted)] pointer-events-none" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search architectures..."
              className="w-full pl-9 pr-3 py-1.5 rounded-lg bg-[var(--bg-card)] border border-[var(--border)] text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-blue-600/60 focus:ring-1 focus:ring-blue-600/30 transition"
            />
          </div>
        </div>
      </div>

      {/* ── Grid ─────────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        {filtered.length > 0 ? (
          <>
            <p className="text-xs text-[var(--text-muted)] mb-6">
              Showing <span className="text-[var(--text-secondary)] font-medium">{filtered.length}</span> architecture{filtered.length !== 1 ? "s" : ""}
              {search && (
                <> matching &ldquo;<span className="text-blue-400">{search}</span>&rdquo;</>
              )}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {filtered.map((arch) => {
                const isTrending = arch.id >= 21;
                return (
                  <div key={arch.id} className="relative">
                    {isTrending && (
                      <div className="absolute -top-2 -right-2 z-10 pointer-events-none">
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-gradient-to-r from-orange-500/90 to-pink-500/90 text-white text-[10px] font-bold shadow-lg shadow-orange-500/20 border border-orange-400/30">
                          🔥 Trending
                        </span>
                      </div>
                    )}
                    <ArchCard arch={arch} />
                  </div>
                );
              })}
            </div>
          </>
        ) : (
          /* Empty state */
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="w-16 h-16 rounded-2xl bg-[var(--bg-card)] border border-[var(--border)] flex items-center justify-center mb-5">
              <Search className="w-7 h-7 text-[var(--text-muted)]" />
            </div>
            <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-2">No architectures found</h3>
            <p className="text-sm text-[var(--text-muted)] max-w-xs">
              No results for &ldquo;<span className="text-blue-400">{search}</span>&rdquo;. Try a different keyword or clear the search.
            </p>
            <button
              onClick={() => { setSearch(""); setActiveCategory("All"); }}
              className="mt-5 px-4 py-2 rounded-lg bg-blue-600/20 text-blue-400 border border-blue-600/30 text-sm font-medium hover:bg-blue-600/30 transition"
            >
              Clear filters
            </button>
          </div>
        )}
      </section>

      {/* ── Bottom CTA ───────────────────────────────────────────── */}
      <section className="border-t border-[var(--border)] bg-[var(--bg-secondary)]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16 text-center">
          <div className="inline-flex items-center gap-2 badge badge-purple mb-5">🎬 Video Series</div>
          <h2 className="text-2xl sm:text-3xl font-bold text-[var(--text-primary)] mb-3">
            Every architecture includes a{" "}
            <span className="gradient-text-warm">video walkthrough</span>
          </h2>
          <p className="text-[var(--text-secondary)] mb-7 max-w-xl mx-auto">
            20–40 minute deep-dives with live diagram annotation, FAANG interview Q&amp;A, and capacity estimation. New video every week.
          </p>
          <a
            href="/subscribe"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold text-sm hover:opacity-90 transition shadow-lg shadow-blue-600/30"
          >
            Unlock All Videos — $5/mo
          </a>
          <p className="mt-3 text-xs text-[var(--text-muted)]">Cancel anytime · No DRM · Watch at your own pace</p>
        </div>
      </section>
    </div>
  );
}
