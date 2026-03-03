'use client';
import { useState } from 'react';
import { CheckCircle2, ArrowRight, Shield, Star, Zap, Users } from 'lucide-react';

const checklist = [
  '2 in-depth system design videos every Monday',
  '30 real-world architectures — Netflix, Uber, GPT, Kafka...',
  'FAANG interview Q&A included with every architecture',
  '2025 LLM research paper breakdowns',
  'PDF cheat sheets with every video',
  'Cancel anytime — no questions asked',
];

export default function SubscribePage() {
  const [email, setEmail] = useState('');
  const [plan, setPlan] = useState<'monthly' | 'annual'>('annual');
  const [state, setState] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setState('loading');
    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, plan }),
      });
      if (res.ok) {
        setState('success');
      } else {
        const d = await res.json().catch(() => ({}));
        setErrorMsg(d.error || 'Something went wrong. Please try again.');
        setState('error');
      }
    } catch {
      setErrorMsg('Network error. Please check your connection.');
      setState('error');
    }
  }

  if (state === 'success') {
    return (
      <main className="min-h-screen bg-[var(--bg-primary)] flex items-center justify-center px-6">
        <div className="max-w-md w-full text-center">
          <div className="w-20 h-20 rounded-full bg-green-500/10 border border-green-500/30 flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-10 h-10 text-green-400" />
          </div>
          <h1 className="text-3xl font-bold text-[var(--text-primary)] mb-3">You&apos;re on the list!</h1>
          <p className="text-[var(--text-secondary)] mb-2">
            We&apos;re finalising secure Stripe payments. You&apos;ll get an email at{' '}
            <strong className="text-[var(--text-primary)]">{email}</strong> the moment subscriptions go live.
          </p>
          <p className="text-sm text-[var(--text-muted)] mb-8">
            Plan selected:{' '}
            <span className="text-green-400 font-semibold">
              {plan === 'annual' ? 'Annual ($39/yr)' : 'Monthly ($5/mo)'}
            </span>
          </p>
          <a
            href="/architectures"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold text-sm hover:opacity-90 transition"
          >
            Browse Free Architectures <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)]">

      {/* Hero */}
      <section className="text-center px-6 pt-20 pb-12 max-w-3xl mx-auto">
        <span className="badge badge-blue mb-4 inline-flex items-center gap-1.5">
          <Zap className="w-3 h-3" /> New videos every Monday
        </span>
        <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
          Get <span className="gradient-text">2 Architecture Videos</span> Every Monday
        </h1>
        <p className="text-lg text-[var(--text-secondary)]">
          Real-world system design —{' '}
          <strong className="text-[var(--text-primary)]">3× cheaper than ByteByteGo</strong>. Cancel anytime.
        </p>
      </section>

      {/* Plan selector + form */}
      <section className="px-6 pb-16 max-w-2xl mx-auto">

        {/* Plan toggle */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          {([
            { id: 'monthly', label: 'Monthly', price: '$5', per: '/month', sub: 'Billed monthly · cancel anytime', savings: '' },
            { id: 'annual', label: 'Annual', price: '$39', per: '/year', sub: 'Billed annually · cancel anytime', savings: 'Save 35% — only $3.25/mo', highlight: true },
          ] as const).map((p) => (
            <button
              key={p.id}
              type="button"
              onClick={() => setPlan(p.id)}
              className="relative arch-card p-5 text-left transition-all cursor-pointer"
              style={plan === p.id ? { border: '2px solid #22c55e', boxShadow: '0 0 20px rgba(34,197,94,0.15)' } : {}}
            >
              {'highlight' in p && p.highlight && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 text-[10px] font-bold px-3 py-1 rounded-full bg-green-500 text-[#0a0f1e] whitespace-nowrap">
                  BEST VALUE
                </div>
              )}
              <p className="text-xs font-semibold uppercase tracking-widest mb-1" style={{ color: plan === p.id ? '#22c55e' : 'var(--text-muted)' }}>
                {p.label}
              </p>
              <p className="text-3xl font-bold">
                {p.price} <span className="text-base font-normal text-[var(--text-muted)]">{p.per}</span>
              </p>
              {p.savings && <p className="text-xs font-semibold text-green-400 mt-1">{p.savings}</p>}
              <p className="text-xs text-[var(--text-muted)] mt-1">{p.sub}</p>
              {plan === p.id && (
                <div className="absolute top-3 right-3 w-5 h-5 rounded-full bg-green-500 flex items-center justify-center">
                  <CheckCircle2 className="w-3 h-3 text-white" />
                </div>
              )}
            </button>
          ))}
        </div>

        {/* Email form */}
        <form onSubmit={handleSubmit} className="arch-card p-6 space-y-4">
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
              className="w-full px-4 py-3 rounded-xl bg-[var(--bg-primary)] border border-[var(--border)] text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-blue-500/60 transition text-sm"
            />
          </div>

          {state === 'error' && (
            <p className="text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2">
              {errorMsg}
            </p>
          )}

          <button
            type="submit"
            disabled={state === 'loading' || !email}
            className="w-full py-3.5 px-6 rounded-xl font-semibold text-sm transition disabled:opacity-50 disabled:cursor-not-allowed text-white"
            style={{ background: 'linear-gradient(135deg, #2563eb, #06b6d4)' }}
          >
            {state === 'loading'
              ? 'Saving...'
              : plan === 'annual'
              ? 'Reserve Annual Plan — $39/yr'
              : 'Reserve Monthly Plan — $5/mo'}
          </button>

          <p className="text-xs text-center text-[var(--text-muted)]">
            🔒 No charge now — you&apos;ll be emailed when payments go live. Cancel anytime.
          </p>
        </form>

        <p className="text-center text-xs mt-4 text-[var(--text-muted)]">
          💡 ByteByteGo charges $15/mo — ArchDesign.io is 3× cheaper with more LLM content.
        </p>
      </section>

      {/* What you get */}
      <section className="px-6 pb-16 max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold text-center mb-8">Everything Included</h2>
        <ul className="space-y-3">
          {checklist.map((item) => (
            <li key={item} className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-400 shrink-0 mt-0.5" />
              <span className="text-[var(--text-secondary)] text-sm">{item}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* Social proof */}
      <section className="px-6 pb-20 max-w-2xl mx-auto">
        <div className="flex flex-wrap justify-center gap-6 text-sm text-[var(--text-muted)]">
          <div className="flex items-center gap-2"><Shield className="w-4 h-4" /> Payments secured by Stripe</div>
          <div className="flex items-center gap-2"><Star className="w-4 h-4" /> 4.9/5 average rating</div>
          <div className="flex items-center gap-2"><Users className="w-4 h-4" /> 2,400+ students enrolled</div>
        </div>
      </section>

    </main>
  );
}
