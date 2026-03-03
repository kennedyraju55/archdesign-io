import { FileText, Video, Mail, Repeat } from "lucide-react";

const steps = [
  {
    icon: FileText,
    number: "01",
    title: "Read the Free Articles",
    description: "All 30 architecture deep-dives are free on the website. Each includes diagrams, key concepts, tradeoffs, and research paper links. No login required.",
    color: "var(--accent-teal)",
  },
  {
    icon: Video,
    number: "02",
    title: "Subscribe for Video Walkthroughs",
    description: "Subscribe for $9/month to get weekly video walkthroughs. Each video is a 20–40 min deep-dive with live diagram annotation and Q&A-style explanations.",
    color: "var(--accent-blue)",
  },
  {
    icon: Mail,
    number: "03",
    title: "Get 2 Videos Every Monday",
    description: "Every Monday morning, you'll receive an email with 2 new architecture video links (YouTube unlisted — only subscribers can access them).",
    color: "var(--accent-purple)",
  },
  {
    icon: Repeat,
    number: "04",
    title: "15 Weeks of Content",
    description: "30 architectures × 2/week = 15 weeks of structured system design education. Cancel anytime. Keep the articles forever — they're always free.",
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

        {/* Weekly schedule visual */}
        <div className="mt-16 arch-card p-6 max-w-3xl mx-auto">
          <h3 className="text-center font-semibold text-[var(--text-primary)] mb-6">Sample Weekly Email Schedule</h3>
          <div className="space-y-3">
            {[
              { week: "Week 1", archs: ["Netflix Content Delivery Architecture", "Twitter Fan-Out & Timeline"], icon: "⚡" },
              { week: "Week 2", archs: ["Uber Geospatial Architecture", "WhatsApp Messaging at Scale"], icon: "⚡" },
              { week: "Week 3", archs: ["Google Web Search Index", "Amazon DynamoDB Architecture"], icon: "⚡" },
              { week: "Week 11", archs: ["GPT / Transformer Inference", "RAG Pipeline Architecture"], icon: "🤖" },
              { week: "Week 15", archs: ["AI Safety & Guardrails", "LLM Serving Infrastructure"], icon: "🤖" },
            ].map(({ week, archs, icon }) => (
              <div key={week} className="flex items-center gap-4 p-3 rounded-lg bg-[var(--bg-primary)] border border-[var(--border)]">
                <div className="text-xs font-bold text-[var(--text-muted)] w-16 shrink-0">{week}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap gap-2">
                    {archs.map((a) => (
                      <span key={a} className="text-xs px-2 py-1 rounded bg-[var(--bg-card)] border border-[var(--border)] text-[var(--text-secondary)] truncate">{icon} {a}</span>
                    ))}
                  </div>
                </div>
                <div className="shrink-0">
                  <Mail className="w-4 h-4 text-blue-400" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
