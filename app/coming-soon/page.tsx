"use client";
import { useState } from "react";
import Link from "next/link";
import { CheckCircle2, ArrowLeft, Play, BookOpen, Target, Layers } from "lucide-react";

const features = [
  { icon: Play, title: "40-Min Video Deep-Dives", desc: "Full walkthrough of every architecture with live diagram annotation — not slide decks." },
  { icon: Target, title: "FAANG Interview Q&A", desc: "5 real interview questions per architecture with model answers, traps, and follow-ups." },
  { icon: Layers, title: "Capacity Estimation Worked Examples", desc: "Back-of-envelope math for every system — DAUs, QPS, storage, bandwidth." },
  { icon: BookOpen, title: "Production War Stories", desc: "Real failure modes, postmortems, and how companies actually solved these problems." },
];

export default function ComingSoonPage() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;
    setSubmitted(true);
    fetch("/api/waitlist", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    }).catch(() => {}); // fire and forget — UI already shows success
  }

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] flex flex-col items-center justify-center px-4 py-20">
      <div className="max-w-2xl w-full text-center space-y-8">

        {/* Back */}
        <Link href="/architectures" className="inline-flex items-center gap-1.5 text-sm text-[var(--text-muted)] hover:text-[var(--text-secondary)] transition mb-4">
          <ArrowLeft className="w-4 h-4" /> Back to Architectures
        </Link>

        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-bold uppercase tracking-widest">
          🎬 Coming Soon
        </div>

        {/* Heading */}
        <h1 className="text-4xl sm:text-5xl font-extrabold text-[var(--text-primary)] leading-tight">
          Video walkthroughs are{" "}
          <span className="gradient-text-warm">on the way</span>
        </h1>
        <p className="text-lg text-[var(--text-secondary)] leading-relaxed max-w-xl mx-auto">
          Every architecture on this site will get a free 40-minute video walkthrough — explained by a practising Microsoft engineer with FAANG interview prep built in.
        </p>

        {/* Features grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left mt-4">
          {features.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="arch-card p-5 flex items-start gap-3">
              <div className="shrink-0 w-9 h-9 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
                <Icon className="w-4 h-4 text-blue-400" />
              </div>
              <div>
                <p className="text-sm font-semibold text-[var(--text-primary)] mb-1">{title}</p>
                <p className="text-xs text-[var(--text-muted)] leading-relaxed">{desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Notify form */}
        <div className="arch-card p-7 text-center">
          {submitted ? (
            <div className="space-y-3">
              <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
              <p className="text-lg font-bold text-[var(--text-primary)]">You&apos;re on the list!</p>
              <p className="text-sm text-[var(--text-secondary)]">We&apos;ll notify you the moment videos go live. In the meantime, explore all 30 architecture deep-dives — completely free.</p>
              <Link href="/architectures" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[var(--bg-primary)] border border-[var(--border)] text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition mt-2">
                Browse Architectures
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <p className="text-base font-semibold text-[var(--text-primary)]">Get notified when videos drop</p>
              <p className="text-sm text-[var(--text-muted)]">No spam. One email when we launch. That&apos;s it.</p>
              <div className="flex gap-2 max-w-sm mx-auto">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="flex-1 px-4 py-2.5 rounded-xl bg-[var(--bg-primary)] border border-[var(--border)] text-[var(--text-primary)] placeholder:text-[var(--text-muted)] text-sm focus:outline-none focus:border-blue-500/50 transition"
                />
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold text-sm hover:opacity-90 transition shadow-lg shadow-blue-600/20 whitespace-nowrap"
                >
                  Notify Me
                </button>
              </div>
            </form>
          )}
        </div>

        <p className="text-xs text-[var(--text-muted)]">
          All 30 architecture articles are live and free right now.{" "}
          <Link href="/architectures" className="text-blue-400 hover:underline">Start reading →</Link>
        </p>
      </div>
    </div>
  );
}
