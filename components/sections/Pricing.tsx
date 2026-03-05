import Link from "next/link";
import { Headphones, BookOpen, Layers, Mic } from "lucide-react";

const features = [
  { icon: Headphones, label: "30 podcast episodes", sublabel: "3–8 min each, free forever" },
  { icon: BookOpen, label: "30 architecture articles", sublabel: "Diagrams, tradeoffs, papers" },
  { icon: Layers, label: "3 categories covered", sublabel: "Distributed · Data · LLM/AI" },
];

export default function Pricing() {
  return (
    <section id="pricing" className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <span className="badge badge-blue mb-4">100% Free</span>
        <h2 className="text-4xl sm:text-5xl font-bold mb-5">
          Everything Is{" "}
          <span className="gradient-text">Free Forever</span>
        </h2>
        <p className="text-lg text-[var(--text-secondary)] max-w-xl mx-auto">
          30 architecture articles + 30 podcast episodes. No credit card, no login, no paywall. System design education should be free for every CS student.
        </p>
      </div>

      <div className="max-w-2xl mx-auto">
        <div className="arch-card p-10 text-center border-blue-500/30 bg-gradient-to-b from-blue-600/5 to-transparent">
          <div className="w-16 h-16 rounded-2xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center mx-auto mb-6">
            <Mic className="w-8 h-8 text-blue-400" />
          </div>
          <h3 className="text-2xl font-bold text-[var(--text-primary)] mb-3">$0 · Always</h3>
          <p className="text-[var(--text-secondary)] mb-8 max-w-md mx-auto">
            Read the articles, listen to the podcast, download the diagrams. Everything on ArchDesign.io is free, permanently.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            {features.map(({ icon: Icon, label, sublabel }) => (
              <div key={label} className="p-4 rounded-xl bg-[var(--bg-primary)] border border-[var(--border)]">
                <Icon className="w-5 h-5 text-blue-400 mx-auto mb-2" />
                <p className="text-sm font-semibold text-[var(--text-primary)]">{label}</p>
                <p className="text-xs text-[var(--text-muted)] mt-1">{sublabel}</p>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/podcast"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold hover:opacity-90 transition-opacity glow-blue"
            >
              <Headphones className="w-4 h-4" />
              Listen to the Podcast
            </Link>
            <Link
              href="/architectures"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl border border-[var(--border)] text-[var(--text-secondary)] font-semibold hover:border-blue-500/50 hover:text-white transition-all"
            >
              <BookOpen className="w-4 h-4" />
              Browse Articles
            </Link>
          </div>
          <p className="text-xs text-[var(--text-muted)] mt-4">No credit card · No account required · No catch</p>
        </div>
      </div>
    </section>
  );
}
