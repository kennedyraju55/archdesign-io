import { BadgeCheck, Briefcase, GraduationCap, Star, Building2, Users } from "lucide-react";

const authors = [
  {
    name: "Raju Guthikonda",
    title: "Software Engineer @ Microsoft",
    location: "Austin, Texas",
    avatar: "https://github.com/kennedyraju55.png",
    linkedin: "https://www.linkedin.com/in/nrk-raju-guthikonda-504066a8/",
    accentFrom: "from-blue-600",
    accentTo: "to-cyan-500",
    accentColor: "var(--accent-blue)",
    quote: "I've spent 10+ years building scalable systems at Microsoft and Wells Fargo — and I kept noticing the same gap: CS students could solve LeetCode but couldn't explain why Netflix uses consistent hashing or how GPT inference actually works at scale. ArchDesign.io is what I wish existed when I was studying.",
    credentials: [
      { icon: Building2, label: "Software Engineer @ Microsoft", sub: "Building distributed cloud systems at scale", color: "var(--accent-blue)" },
      { icon: Briefcase, label: "10+ Years in the Industry", sub: "Microsoft · Wells Fargo · Space Ranger Award winner", color: "var(--accent-teal)" },
      { icon: GraduationCap, label: "MS Computer Science — GPA 3.79", sub: "University of Houston – Clear Lake · $15K Scholarship", color: "var(--accent-purple)" },
      { icon: Star, label: "Cloud & Distributed Systems Expert", sub: "Azure, Cassandra, Redis, Kafka, CosmosDB", color: "var(--accent-orange)" },
    ],
    tags: ["Azure", "Kafka", "Cassandra", "Redis", "CosmosDB", "C#", "Python", ".NET"],
  },
  {
    name: "Rohith Shabad",
    title: "Senior Software Engineer @ Lowe's",
    location: "Minneapolis, Minnesota",
    avatar: "https://ui-avatars.com/api/?name=Rohith+Shabad&background=6366f1&color=fff&size=200",
    linkedin: "https://www.linkedin.com/in/rohith-s-0b257a186/",
    accentFrom: "from-violet-600",
    accentTo: "to-purple-500",
    accentColor: "var(--accent-purple)",
    quote: "From Wells Fargo to Target to Lowe's, I've built full-stack systems that handle millions of retail transactions daily. The patterns repeat — but the tradeoffs are always in the details. That's what we teach here.",
    credentials: [
      { icon: Building2, label: "Senior SWE @ Lowe's", sub: "Full-stack systems at retail scale · Nov 2022–Present", color: "var(--accent-purple)" },
      { icon: Briefcase, label: "9+ Years Experience", sub: "Lowe's · Target · Principal Financial · Wells Fargo", color: "var(--accent-teal)" },
      { icon: GraduationCap, label: "MS Computer Science", sub: "University of Houston – Clear Lake · 2011–2013", color: "var(--accent-blue)" },
      { icon: Star, label: "Full-Stack & Distributed Systems", sub: "Java, JavaScript, React, Spring Boot, Kubernetes", color: "var(--accent-orange)" },
    ],
    tags: ["Java", "JavaScript", "React", "Spring Boot", "Kubernetes", "AWS", "Node.js", "SQL"],
  },
];

export default function AuthorSection() {
  return (
    <section className="py-24 bg-[var(--bg-secondary)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section header */}
        <div className="text-center mb-16">
          <span className="badge badge-purple mb-4 inline-flex items-center gap-2">
            <Users className="w-3.5 h-3.5" /> Built by Practitioners
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold leading-tight mb-4">
            Learn from Engineers Who{" "}
            <span className="gradient-text">Ship at Scale</span>
          </h2>
          <p className="text-lg text-[var(--text-secondary)] max-w-2xl mx-auto">
            Not textbook authors — engineers who have designed, operated, and debugged these exact architectures at Microsoft, Lowe&apos;s, Target, and Wells Fargo.
          </p>
        </div>

        {/* Author cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {authors.map((author) => (
            <div key={author.name} className="relative">
              <div className={`absolute -inset-3 rounded-3xl bg-gradient-to-br ${author.accentFrom}/10 ${author.accentTo}/5 blur-xl pointer-events-none`} />
              <div className="relative arch-card p-8 h-full flex flex-col">

                {/* Header */}
                <div className="flex items-center gap-5 mb-6">
                  <div className="relative shrink-0">
                    <img
                      src={author.avatar}
                      alt={author.name}
                      className="w-20 h-20 rounded-2xl object-cover border-2"
                      style={{ borderColor: `${author.accentColor}66` }}
                    />
                    <div className={`absolute -bottom-1.5 -right-1.5 w-7 h-7 rounded-full bg-gradient-to-br ${author.accentFrom} ${author.accentTo} flex items-center justify-center`}>
                      <BadgeCheck className="w-4 h-4 text-white" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-[var(--text-primary)]">{author.name}</h3>
                    <p className="text-sm font-medium mt-0.5" style={{ color: author.accentColor }}>{author.title}</p>
                    <div className="flex items-center gap-3 mt-1">
                      <p className="text-xs text-[var(--text-muted)]">{author.location}</p>
                      <a href={author.linkedin} target="_blank" rel="noopener noreferrer"
                        className="text-[10px] px-2 py-0.5 rounded border text-[var(--text-muted)] hover:text-white transition-colors"
                        style={{ borderColor: `${author.accentColor}44` }}>
                        LinkedIn →
                      </a>
                    </div>
                  </div>
                </div>

                {/* Quote */}
                <blockquote className="border-l-2 pl-4 mb-6" style={{ borderColor: `${author.accentColor}66` }}>
                  <p className="text-sm text-[var(--text-secondary)] italic leading-relaxed">
                    &ldquo;{author.quote}&rdquo;
                  </p>
                </blockquote>

                {/* Credentials */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 flex-1">
                  {author.credentials.map(({ icon: Icon, label, sub, color }) => (
                    <div key={label} className="flex items-start gap-3 p-3 rounded-xl bg-[var(--bg-primary)] border border-[var(--border)]">
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5"
                        style={{ background: `${color}22`, border: `1px solid ${color}44` }}>
                        <Icon className="w-4 h-4" style={{ color }} />
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs font-semibold text-[var(--text-primary)] leading-snug">{label}</p>
                        <p className="text-[11px] text-[var(--text-muted)] mt-0.5 leading-snug">{sub}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mt-5 pt-5 border-t border-[var(--border)]">
                  {author.tags.map((t) => (
                    <span key={t} className="text-[10px] px-2 py-1 rounded-md bg-[var(--bg-primary)] border border-[var(--border)] text-[var(--text-muted)]">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom differentiators */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { emoji: "🧠", title: "Research-first", desc: "Every architecture cites the original paper — Dynamo, MapReduce, FlashAttention, LoRA, PagedAttention." },
            { emoji: "⚡", title: "Production-grade depth", desc: "Failure modes, operational gotchas, and real tradeoffs from actually running these systems." },
            { emoji: "🤖", title: "2025 LLM papers", desc: "PRESERVE, Mooncake, Preble, Oaken — cutting-edge inference architectures ByteByteGo hasn't covered." },
            { emoji: "🎯", title: "Interview-ready framing", desc: "Common patterns from real system design rounds at Google, Meta, Amazon, and Microsoft — 5 questions per architecture." },
          ].map(({ emoji, title, desc }) => (
            <div key={title} className="arch-card p-5">
              <span className="text-2xl mb-3 block">{emoji}</span>
              <p className="font-semibold text-[var(--text-primary)] text-sm mb-1">{title}</p>
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
