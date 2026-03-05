import { FileText, Headphones, Brain, Repeat } from "lucide-react";

const steps = [
  {
    icon: FileText,
    number: "01",
    title: "Read the Free Articles",
    description: "All 30 architecture deep-dives are free on the website. Each includes diagrams, key concepts, tradeoffs, and research paper links. No login required.",
    color: "var(--accent-teal)",
  },
  {
    icon: Headphones,
    number: "02",
    title: "Listen to the Podcast",
    description: "Alex & Sam break down each architecture in a conversational podcast episode — 3-8 minutes each. Perfect for commutes, walks, or coding sessions. All 30 episodes are free.",
    color: "var(--accent-blue)",
  },
  {
    icon: Brain,
    number: "03",
    title: "Understand the Trade-offs",
    description: "Each episode goes deep on why engineers at Netflix, Google, and Meta made specific design decisions. Understand the real constraints — not just the happy path.",
    color: "var(--accent-purple)",
  },
  {
    icon: Repeat,
    number: "04",
    title: "Ace Your System Design Interviews",
    description: "30 architectures across distributed systems, data infrastructure, and LLM/AI. Walk into any FAANG system design interview with genuine intuition — not memorized diagrams.",
    color: "var(--accent-green)",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 bg-[var(--bg-secondary)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <span className="badge badge-teal mb-4">The Process</span>
          <h2 className="text-4xl sm:text-5xl font-bold mb-5">
            How It <span className="gradient-text">Works</span>
          </h2>
          <p className="text-lg text-[var(--text-secondary)] max-w-xl mx-auto">
            Structured learning — not a random dump of content. Two architectures per week keeps it manageable while building deep intuition over time.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map(({ icon: Icon, number, title, description, color }) => (
            <div key={number} className="arch-card p-6 relative overflow-hidden group">
              {/* Number watermark */}
              <div className="absolute -top-2 -right-2 text-8xl font-black opacity-5 select-none" style={{ color }}>
                {number}
              </div>

              {/* Icon */}
              <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4" style={{ background: `${color}22`, border: `1px solid ${color}44` }}>
                <Icon className="w-6 h-6" style={{ color }} />
              </div>

              {/* Step number badge */}
              <span className="text-xs font-bold tracking-widest uppercase mb-2 block" style={{ color }}>
                Step {number}
              </span>

              <h3 className="font-bold text-[var(--text-primary)] text-lg mb-3">{title}</h3>
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{description}</p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <a
            href="/podcast"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold text-lg hover:opacity-90 transition-all glow-blue shadow-2xl"
          >
            <Headphones className="w-5 h-5" />
            Start Listening — All 30 Free
          </a>
          <p className="text-xs text-[var(--text-muted)] mt-3">No account · No payment · Just good systems education</p>
        </div>
      </div>
    </section>
  );
}
