import Link from "next/link";
import { ArrowRight, BookOpen, Building2 } from "lucide-react";
import type { Architecture } from "@/data/architectures";
import { difficultyColors, categoryColors } from "@/data/architectures";
import ArchDiagram from "./ArchDiagram";

interface ArchCardProps {
  arch: Architecture;
}

export default function ArchCard({ arch }: ArchCardProps) {
  return (
    <Link href={`/architecture/${arch.slug}`} className="block arch-card p-0 overflow-hidden group">
      {/* Diagram preview */}
      <div className="h-40 bg-[var(--bg-primary)] border-b border-[var(--border)] relative overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0 grid-bg opacity-40" />
        <div className="relative z-10 w-full h-full p-3">
          <ArchDiagram type={arch.diagramType} category={arch.category} />
        </div>
        <div className="absolute top-2 right-2">
          <span className={`badge ${categoryColors[arch.category]}`}>{arch.category === "LLM & AI Systems" ? "🤖 LLM" : arch.category === "Distributed Systems" ? "⚡ Distributed" : "🗄️ Data"}</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="flex items-start justify-between gap-2 mb-2">
          <h3 className="font-semibold text-[var(--text-primary)] text-sm leading-snug group-hover:text-blue-400 transition-colors line-clamp-2">
            {arch.title}
          </h3>
          <ArrowRight className="w-4 h-4 text-[var(--text-muted)] group-hover:text-blue-400 transition-colors shrink-0 mt-0.5" />
        </div>
        <p className="text-xs text-[var(--text-muted)] mb-3 line-clamp-2 leading-relaxed">{arch.subtitle}</p>

        {/* Companies */}
        <div className="flex items-center gap-1.5 mb-3">
          <Building2 className="w-3 h-3 text-[var(--text-muted)]" />
          <p className="text-xs text-[var(--text-muted)] truncate">{arch.companies.slice(0, 3).join(" · ")}</p>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-3">
          {arch.concepts.slice(0, 3).map((c) => (
            <span key={c} className="text-[10px] px-2 py-0.5 rounded bg-[var(--bg-primary)] text-[var(--text-muted)] border border-[var(--border)]">
              {c}
            </span>
          ))}
          {arch.concepts.length > 3 && (
            <span className="text-[10px] px-2 py-0.5 rounded bg-[var(--bg-primary)] text-[var(--text-muted)] border border-[var(--border)]">
              +{arch.concepts.length - 3}
            </span>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-2 border-t border-[var(--border)]">
          <span className={`badge ${difficultyColors[arch.difficulty]}`}>{arch.difficulty}</span>
          {arch.papers.length > 0 && (
            <div className="flex items-center gap-1 text-[var(--text-muted)]">
              <BookOpen className="w-3 h-3" />
              <span className="text-[10px]">{arch.papers.length} paper{arch.papers.length > 1 ? "s" : ""}</span>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}
