const stats = [
  { value: "30", label: "Architecture Deep-Dives", sublabel: "Real-world systems" },
  { value: "10+", label: "LLM & AI Systems", sublabel: "Latest research papers" },
  { value: "30", label: "Podcast Episodes", sublabel: "Free to listen, always" },
  { value: "2025", label: "Research Coverage", sublabel: "Latest papers included" },
];

export default function Stats() {
  return (
    <section className="border-y border-[var(--border)] bg-[var(--bg-secondary)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map(({ value, label, sublabel }) => (
            <div key={label} className="text-center">
              <div className="text-4xl font-bold gradient-text mb-1">{value}</div>
              <div className="text-sm font-semibold text-[var(--text-primary)] mb-0.5">{label}</div>
              <div className="text-xs text-[var(--text-muted)]">{sublabel}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
