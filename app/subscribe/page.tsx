'use client';
import { useState } from 'react';
import { CheckCircle2, ArrowRight, Video, BookOpen, Zap } from 'lucide-react';

const comingFeatures = [
  { icon: Video, title: '40-min video deep-dives', desc: 'One per architecture -- live diagram annotation included' },
  { icon: BookOpen, title: 'FAANG interview Q&A', desc: '5 real questions mapped to each architecture' },
  { icon: Zap, title: 'Capacity estimation walkthroughs', desc: 'Real production numbers, not textbook examples' },
];

export default function ComingSoonPage() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
  }

  return (
    <main className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)]">

      {/* Hero */}
      <section className="relative text-center px-6 pt-28 pb-16 max-w-3xl mx-auto">
        <div className="absolute inset-0 grid-bg opacity-10 pointer-events-none" />
        <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-blue-600/5 rounded-full blur-[80px] pointer-events-none" />

        <div className="relative space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold uppercase tracking-widest">
            Video Series
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
            Something Exciting is{' '}
            <span className="gradient-text">Coming</span>
          </h1>

          <p className="text-lg sm:text-xl text-[var(--text-secondary)] max-w-2xl mx-auto leading-relaxed">
            We&apos;re recording free 40-minute video walkthroughs for every one of our 30 architecture deep-dives.
            No paywall. No subscription. Completely free.
          </p>
        </div>
      </section>

      {/* Email form */}
      <section className="px-6 pb-16 max-w-lg mx-auto">
        {submitted ? (
          <div className="arch-card p-8 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-green-500/20 border border-green-500/40 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8 text-green-400" />
            </div>
            <h2 className="text-2xl font-bold text-[var(--text-primary)]">You&apos;re on the list!</h2>
            <p className="text-[var(--text-secondary)]">
              We&apos;ll notify <strong className="text-[var(--text-primary)]">{email}</strong> the moment the videos go live. In the meantime, all 30 architecture articles are free to read right now.
            </p>
            <a
              href="/architectures"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold text-sm hover:opacity-90 transition"
            >
              Browse Free Architectures <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="arch-card p-8 space-y-4">
            <h2 className="text-xl font-bold text-[var(--text-primary)] text-center">Get notified when videos launch</h2>
            <p className="text-sm text-[var(--text-secondary)] text-center">No spam. One email when the videos go live.</p>
            <div>
              <label className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
                Your email address
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full px-4 py-3 rounded-xl bg-[var(--bg-primary)] border border-[var(--border)] text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-amber-500/60 transition text-sm"
              />
            </div>
            <button
              type="submit"
              disabled={!email}
              className="w-full py-4 px-6 rounded-xl font-bold text-sm transition disabled:opacity-50 disabled:cursor-not-allowed text-black"
              style={{ background: 'linear-gradient(135deg, #f59e0b, #ef4444)' }}
            >
              Notify Me When Videos Launch
            </button>
            <p className="text-xs text-center text-[var(--text-muted)]">Free forever - No credit card - No commitment</p>
          </form>
        )}
      </section>

      {/* What's coming */}
      <section className="px-6 pb-16 max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold text-center mb-8">What&apos;s in each video</h2>
        <div className="grid sm:grid-cols-3 gap-4">
          {comingFeatures.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="arch-card p-5 text-center">
              <div className="w-10 h-10 rounded-xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center mx-auto mb-3">
                <Icon className="w-5 h-5 text-blue-400" />
              </div>
              <p className="text-sm font-semibold text-[var(--text-primary)] mb-1">{title}</p>
              <p className="text-xs text-[var(--text-muted)]">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Browse articles CTA */}
      <section className="px-6 pb-24 max-w-lg mx-auto text-center">
        <div className="arch-card p-8 space-y-4">
          <p className="text-sm font-semibold text-[var(--text-muted)]">While you wait</p>
          <h3 className="text-xl font-bold">All 30 architecture articles are free right now</h3>
          <p className="text-sm text-[var(--text-muted)]">No login. No paywall. Just deep-dives into real systems.</p>
          <a
            href="/architectures"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold text-sm hover:opacity-90 transition"
          >
            Browse Free Architectures <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </section>

    </main>
  );
}
