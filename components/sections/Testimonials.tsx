const testimonials = [
  {
    quote: "I've been listening to the podcast on my commute and it's genuinely the best way I've found to build system design intuition. Alex and Sam explain things like I'm a smart person, not like they're reading from a textbook.",
    name: "CS Student",
    role: "Preparing for FAANG interviews",
    emoji: "🎓",
  },
  {
    quote: "The LLM architecture episodes are unlike anything else out there. Nobody else is explaining RAG pipelines, KV cache disaggregation, and multi-agent systems at this level of depth for free.",
    name: "Backend Engineer",
    role: "Moving into ML infrastructure",
    emoji: "🤖",
  },
  {
    quote: "I used to dread the system design round. After going through all 30 architecture deep-dives, I actually look forward to it now. The diagrams and podcast together clicked for me in a way that reading alone never did.",
    name: "Software Engineer",
    role: "New grad preparing for interviews",
    emoji: "⚡",
  },
];

export default function Testimonials() {
  return (
    <section className="py-24 px-4 bg-[var(--bg-secondary)]">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <span className="badge badge-teal mb-4 inline-block">Student Reviews</span>
          <h2 className="text-4xl font-bold mb-4">
            What Students Are <span className="gradient-text">Saying</span>
          </h2>
          <p className="text-[var(--text-secondary)] max-w-xl mx-auto">
            Built for CS students preparing for FAANG system design interviews.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div key={t.name} className="arch-card p-7 flex flex-col gap-4">
              <div className="text-3xl">{t.emoji}</div>
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed flex-1">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div>
                <p className="font-semibold text-[var(--text-primary)] text-sm">{t.name}</p>
                <p className="text-xs text-[var(--text-muted)]">{t.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
