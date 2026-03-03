import Link from "next/link";
import { Check, Zap, X, TrendingDown } from "lucide-react";

const freeFeatures = [
  "All 30 architecture articles",
  "Architecture diagrams",
  "Key concepts & tradeoffs",
  "Research paper references",
  "Company case studies",
];

const paidFeatures = [
  "Everything in Free",
  "2 video walkthroughs/week",
  "20–40 min deep-dive per video",
  "Diagram annotation walkthroughs",
  "Interview tips per architecture",
  "Full archive access (all past videos)",
  "Cancel anytime — no lock-in",
];

const notIncluded = [
  "Video walkthroughs",
  "Interview tips per topic",
];

const competitors = [
  { name: "ByteByteGo", price: "$15/mo", annual: "$150/yr", color: "#ef4444" },
  { name: "DesignGurus.io", price: "$29/mo", annual: "$79/yr", color: "#f59e0b" },
  { name: "Educative.io", price: "$20/mo", annual: "$199/yr", color: "#f59e0b" },
  { name: "ArchDesign.io", price: "$5/mo", annual: "$39/yr", color: "#10b981", isUs: true },
];

export default function Pricing() {
  return (
    <section id="pricing" className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <span className="badge badge-green mb-4">Simple Pricing</span>
        <h2 className="text-4xl sm:text-5xl font-bold mb-5">
          Free Articles.{" "}
          <span className="gradient-text">Premium Videos.</span>
        </h2>
        <p className="text-lg text-[var(--text-secondary)] max-w-xl mx-auto">
          Read everything for free. Subscribe to get the video walkthroughs that make complex architectures click in 30 minutes.
        </p>
      </div>

      {/* Competitor comparison banner */}
      <div className="max-w-4xl mx-auto mb-10">
        <div className="arch-card p-6 border-green-500/30 bg-green-600/5">
          <div className="flex items-center gap-2 mb-5">
            <TrendingDown className="w-5 h-5 text-green-400" />
            <span className="font-bold text-[var(--text-primary)]">Why we&apos;re priced 3× cheaper than the competition</span>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {competitors.map(({ name, price, annual, color, isUs }) => (
              <div
                key={name}
                className={`rounded-xl p-4 text-center border ${isUs ? "border-green-500/50 bg-green-600/10" : "border-[var(--border)] bg-[var(--bg-primary)]"}`}
              >
                <p className={`text-xs font-semibold mb-2 ${isUs ? "text-green-400" : "text-[var(--text-muted)]"}`}>{name}</p>
                <p className="text-2xl font-black mb-0.5" style={{ color }}>{price}</p>
                <p className="text-[10px]" style={{ color: `${color}99` }}>{annual}</p>
                {isUs && <p className="text-[10px] text-green-400 font-bold mt-1">✓ Best Value</p>}
              </div>
            ))}
          </div>
          <p className="text-xs text-[var(--text-muted)] mt-4 text-center">
            Same depth. Same real-world case studies. 3× cheaper than ByteByteGo ($15/mo). No compromises.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {/* Free tier */}
        <div className="arch-card p-8">
          <div className="mb-6">
            <h3 className="text-xl font-bold text-[var(--text-primary)] mb-1">Free Reader</h3>
            <p className="text-[var(--text-secondary)] text-sm">Full articles, no credit card ever</p>
          </div>
          <div className="mb-6">
            <span className="text-5xl font-black text-[var(--text-primary)]">$0</span>
            <span className="text-[var(--text-muted)] ml-2">forever</span>
          </div>

          <ul className="space-y-3 mb-8">
            {freeFeatures.map((f) => (
              <li key={f} className="flex items-center gap-3 text-sm text-[var(--text-secondary)]">
                <Check className="w-4 h-4 text-green-400 shrink-0" />
                {f}
              </li>
            ))}
            {notIncluded.map((f) => (
              <li key={f} className="flex items-center gap-3 text-sm text-[var(--text-muted)] line-through">
                <X className="w-4 h-4 text-[var(--text-muted)] shrink-0" />
                {f}
              </li>
            ))}
          </ul>

          <Link
            href="/architectures"
            className="block w-full text-center py-3 rounded-xl border border-[var(--border)] text-[var(--text-secondary)] font-semibold hover:border-blue-500 hover:text-white transition-all"
          >
            Browse Free Articles
          </Link>
        </div>

        {/* Paid tier */}
        <div className="relative arch-card p-8 border-blue-500/50 bg-gradient-to-b from-blue-600/10 to-transparent overflow-hidden">
          {/* Badge */}
          <div className="absolute top-4 right-4">
            <span className="badge badge-green">
              <Zap className="w-3 h-3 mr-1" />
              3× Cheaper than ByteByteGo
            </span>
          </div>

          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-cyan-500/5 pointer-events-none" />

          <div className="relative mb-4">
            <h3 className="text-xl font-bold text-[var(--text-primary)] mb-1">Weekly Subscriber</h3>
            <p className="text-[var(--text-secondary)] text-sm">Video walkthroughs in your inbox every Monday</p>
          </div>
          <div className="relative flex items-end gap-3 mb-1">
            <span className="text-5xl font-black text-[var(--text-primary)]">$5</span>
            <span className="text-[var(--text-muted)] mb-2">/month</span>
            <span className="text-[var(--text-muted)] line-through text-sm mb-2">$15</span>
          </div>
          <p className="text-xs text-green-400 mb-1">≈ <strong>$0.33 per architecture video</strong> · Cancel anytime</p>
          <p className="text-xs text-[var(--text-muted)] mb-6">Or <strong className="text-[var(--text-primary)]">$39/year</strong> (save 35% · $3.25/mo)</p>

          <ul className="space-y-3 mb-8 relative">
            {paidFeatures.map((f) => (
              <li key={f} className="flex items-center gap-3 text-sm text-[var(--text-secondary)]">
                <Check className="w-4 h-4 text-blue-400 shrink-0" />
                {f}
              </li>
            ))}
          </ul>

          <div className="relative space-y-3">
            <Link
              href="/subscribe?plan=monthly"
              className="block w-full text-center py-3 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold hover:opacity-90 transition-opacity glow-blue"
            >
              Start Learning — $5/month
            </Link>
            <Link
              href="/subscribe?plan=annual"
              className="block w-full text-center py-3 rounded-xl border border-green-500/50 text-green-400 font-semibold hover:bg-green-600/10 transition-all text-sm"
            >
              Annual Plan — $39/year <span className="opacity-70">(Save 35%)</span>
            </Link>
          </div>
          <p className="text-center text-xs text-[var(--text-muted)] mt-3">Secure payment via Stripe · Cancel anytime</p>
        </div>
      </div>

      {/* Bottom context */}
      <div className="mt-10 text-center p-5 arch-card max-w-2xl mx-auto">
        <p className="text-[var(--text-secondary)] text-sm leading-relaxed">
          💡 One system design interview coaching session costs <strong className="text-[var(--text-primary)]">$200–$500</strong>.
          This gives you 30 architecture deep-dives with video walkthroughs for{" "}
          <strong className="text-green-400">$5/month</strong> — and it&apos;s better prep.
        </p>
      </div>
    </section>
  );
}
