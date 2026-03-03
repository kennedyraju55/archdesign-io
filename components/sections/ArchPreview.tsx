import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { architectures } from "@/data/architectures";
import ArchCard from "@/components/architecture/ArchCard";

export default function ArchPreview() {
  const featured = architectures.filter((a) => [1, 21, 17, 22, 6, 25].includes(a.id));

  return (
    <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="text-center mb-16">
        <span className="badge badge-blue mb-4">Free to Read</span>
        <h2 className="text-4xl sm:text-5xl font-bold mb-5">
          30 Architectures.{" "}
          <span className="gradient-text">Zero Fluff.</span>
        </h2>
        <p className="text-lg text-[var(--text-secondary)] max-w-2xl mx-auto">
          Every architecture explains the <em>why</em> behind design decisions — not just the what. Includes references to original research papers from Google, Amazon, Meta, and leading AI labs.
        </p>
      </div>

      {/* Category pills */}
      <div className="flex flex-wrap justify-center gap-3 mb-12">
        {[
          { label: "⚡ Distributed Systems", count: 10, color: "badge-blue" },
          { label: "🗄️ Data & Infrastructure", count: 10, color: "badge-teal" },
          { label: "🤖 LLM & AI Systems", count: 10, color: "badge-purple" },
        ].map(({ label, count, color }) => (
          <div key={label} className={`badge ${color} px-4 py-1.5 text-sm gap-2`}>
            {label}
            <span className="opacity-70">({count})</span>
          </div>
        ))}
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {featured.map((arch) => (
          <ArchCard key={arch.id} arch={arch} />
        ))}
      </div>

      {/* See all CTA */}
      <div className="text-center mt-12">
        <Link
          href="/architectures"
          className="inline-flex items-center gap-2 px-8 py-3 rounded-xl border border-[var(--border)] text-[var(--text-secondary)] font-semibold hover:border-blue-500 hover:text-white transition-all group"
        >
          Explore All 30 Architectures
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>
    </section>
  );
}
