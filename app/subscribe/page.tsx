'use client';
import { useState, useEffect } from 'react';
import { CheckCircle2, ArrowRight, Lock, Flame, Clock, Zap, ChevronRight, Eye, EyeOff } from 'lucide-react';

// Launch date — 30 days from a fixed reference (update this to your real launch date)
const LAUNCH_DATE = new Date('2025-04-15T00:00:00Z');

function useCountdown(target: Date) {
  const calc = () => {
    const diff = Math.max(0, target.getTime() - Date.now());
    return {
      days: Math.floor(diff / 86400000),
      hours: Math.floor((diff % 86400000) / 3600000),
      minutes: Math.floor((diff % 3600000) / 60000),
      seconds: Math.floor((diff % 60000) / 1000),
    };
  };
  const [t, setT] = useState(calc);
  useEffect(() => {
    const id = setInterval(() => setT(calc()), 1000);
    return () => clearInterval(id);
  });
  return t;
}

const teaserVideos = [
  { title: 'Netflix CDN Deep-Dive', week: 'Week 1', teaser: 'How 17,000 servers eliminate buffering for 260M users', locked: false },
  { title: 'GPT Inference at Scale', week: 'Week 2', teaser: 'KV cache, FlashAttention & serving 10M req/day', locked: true },
  { title: 'Twitter Fan-Out Architecture', week: 'Week 3', teaser: 'Why Katy Perry\'s tweet needs a special code path', locked: true },
  { title: 'RAG Pipeline Production', week: 'Week 4', teaser: 'Chunking secrets that 90% of tutorials get wrong', locked: true },
  { title: 'Kafka Internals Masterclass', week: 'Week 5', teaser: 'Partitions, compaction & exactly-once semantics', locked: true },
  { title: 'DynamoDB: The Dynamo Paper', week: 'Week 6', teaser: 'The 2007 paper that changed distributed databases forever', locked: true },
];

const earlyBirdCount = 247; // simulate a counter — update as real signups come in

export default function SubscribePage() {
  const [email, setEmail] = useState('');
  const [plan, setPlan] = useState<'monthly' | 'annual'>('annual');
  const [state, setState] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');
  const [hovered, setHovered] = useState<number | null>(null);
  const { days, hours, minutes, seconds } = useCountdown(LAUNCH_DATE);

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
      if (res.ok) setState('success');
      else {
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
        <div className="max-w-lg w-full text-center space-y-6">
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-amber-500/20 to-orange-500/20 border border-amber-500/40 flex items-center justify-center mx-auto">
            <span className="text-4xl">🎉</span>
          </div>
          <h1 className="text-3xl font-bold text-[var(--text-primary)]">You&apos;re #{earlyBirdCount + 1} on the list!</h1>
          <p className="text-[var(--text-secondary)]">
            We&apos;ll email <strong className="text-[var(--text-primary)]">{email}</strong> the moment subscriptions open.
            Early birds get <span className="text-amber-400 font-semibold">locked-in pricing forever</span> — no price increases as long as you stay subscribed.
          </p>
          <div className="arch-card p-4 text-sm text-[var(--text-muted)] text-left space-y-2">
            <p className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-400" /> Waitlist spot reserved for <strong>{plan === 'annual' ? 'Annual ($39/yr)' : 'Monthly ($5/mo)'}</strong></p>
            <p className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-400" /> Early-bird pricing locked — first 300 subscribers only</p>
            <p className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-400" /> No charge until launch day</p>
          </div>
          <p className="text-xs text-[var(--text-muted)]">While you wait — explore the free architecture deep-dives below 👇</p>
          <a href="/architectures" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-semibold text-sm hover:opacity-90 transition">
            Browse Free Architectures <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] overflow-hidden">

      {/* Top urgency bar */}
      <div className="bg-gradient-to-r from-amber-600/30 via-orange-500/20 to-amber-600/30 border-b border-amber-500/30 py-2.5 px-4 text-center">
        <p className="text-xs sm:text-sm font-semibold text-amber-300 flex items-center justify-center gap-2 flex-wrap">
          <Flame className="w-4 h-4 text-orange-400" />
          <span>Early-bird pricing — first 300 subscribers get <strong>locked-in rates forever.</strong> {earlyBirdCount} of 300 spots taken.</span>
          <Flame className="w-4 h-4 text-orange-400" />
        </p>
      </div>

      {/* Hero */}
      <section className="relative text-center px-6 pt-16 pb-10 max-w-4xl mx-auto">
        <div className="absolute inset-0 grid-bg opacity-10 pointer-events-none" />
        <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-blue-600/5 rounded-full blur-[80px] pointer-events-none" />

        <div className="relative space-y-5">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold uppercase tracking-widest">
            <Clock className="w-3.5 h-3.5" /> Launching in
          </div>

          {/* Countdown */}
          <div className="flex items-center justify-center gap-3 sm:gap-5">
            {[
              { v: days, label: 'Days' },
              { v: hours, label: 'Hours' },
              { v: minutes, label: 'Min' },
              { v: seconds, label: 'Sec' },
            ].map(({ v, label }) => (
              <div key={label} className="flex flex-col items-center">
                <div className="w-16 sm:w-20 h-16 sm:h-20 rounded-2xl bg-[var(--bg-card)] border border-[var(--border)] flex items-center justify-center shadow-lg" style={{ boxShadow: '0 0 20px rgba(245,158,11,0.08)' }}>
                  <span className="text-2xl sm:text-3xl font-mono font-bold text-amber-300">{String(v).padStart(2, '0')}</span>
                </div>
                <span className="text-[10px] text-[var(--text-muted)] mt-1.5 uppercase tracking-widest">{label}</span>
              </div>
            ))}
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight max-w-3xl mx-auto">
            The system design course{' '}
            <span className="gradient-text">FAANG engineers</span>{' '}
            wish existed.
          </h1>
          <p className="text-lg sm:text-xl text-[var(--text-secondary)] max-w-2xl mx-auto leading-relaxed">
            30 video deep-dives into the architectures powering Netflix, Uber, ChatGPT, and more.
            <br className="hidden sm:block" />
            <strong className="text-[var(--text-primary)]">3× cheaper than ByteByteGo. 10× more LLM content.</strong>
          </p>
        </div>
      </section>

      {/* Waitlist counter */}
      <div className="max-w-lg mx-auto px-6 pb-8">
        <div className="arch-card p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex -space-x-2">
              {['AB','CS','MK','RJ','TL'].map((initials) => (
                <div key={initials} className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 border-2 border-[var(--bg-card)] flex items-center justify-center text-[9px] font-bold text-white">{initials}</div>
              ))}
            </div>
            <div>
              <p className="text-sm font-semibold text-[var(--text-primary)]">{earlyBirdCount} engineers on the waitlist</p>
              <p className="text-xs text-[var(--text-muted)]">from Google, Amazon, Microsoft, Meta</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-xs font-semibold text-amber-400">{300 - earlyBirdCount} spots left</p>
            <div className="w-24 h-1.5 bg-[var(--bg-primary)] rounded-full mt-1 overflow-hidden">
              <div className="h-full bg-gradient-to-r from-amber-500 to-orange-500 rounded-full" style={{ width: `${(earlyBirdCount / 300) * 100}%` }} />
            </div>
          </div>
        </div>
      </div>

      {/* Plan selector + form */}
      <section className="px-6 pb-16 max-w-lg mx-auto">

        {/* Plan toggle */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          {([
            { id: 'monthly', label: 'Monthly', price: '$5', per: '/mo', sub: 'Billed monthly', savings: '' },
            { id: 'annual', label: 'Annual', price: '$39', per: '/yr', sub: 'Only $3.25/mo', savings: 'Save 35%', highlight: true },
          ] as const).map((p) => (
            <button
              key={p.id}
              type="button"
              onClick={() => setPlan(p.id)}
              className="relative arch-card p-5 text-left transition-all cursor-pointer"
              style={plan === p.id ? { border: '2px solid #f59e0b', boxShadow: '0 0 24px rgba(245,158,11,0.15)' } : {}}
            >
              {'highlight' in p && p.highlight && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 text-[10px] font-bold px-3 py-1 rounded-full bg-amber-500 text-[#0a0f1e] whitespace-nowrap">
                  BEST VALUE
                </div>
              )}
              <p className="text-xs font-semibold uppercase tracking-widest mb-1" style={{ color: plan === p.id ? '#f59e0b' : 'var(--text-muted)' }}>
                {p.label}
              </p>
              <p className="text-3xl font-bold">
                {p.price} <span className="text-base font-normal text-[var(--text-muted)]">{p.per}</span>
              </p>
              {p.savings && <p className="text-xs font-semibold text-amber-400 mt-1">{p.savings}</p>}
              <p className="text-xs text-[var(--text-muted)] mt-1">{p.sub}</p>
              {plan === p.id && (
                <div className="absolute top-3 right-3 w-5 h-5 rounded-full bg-amber-500 flex items-center justify-center">
                  <CheckCircle2 className="w-3 h-3 text-black" />
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
              className="w-full px-4 py-3 rounded-xl bg-[var(--bg-primary)] border border-[var(--border)] text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-amber-500/60 transition text-sm"
            />
          </div>

          {state === 'error' && (
            <p className="text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2">{errorMsg}</p>
          )}

          <button
            type="submit"
            disabled={state === 'loading' || !email}
            className="w-full py-4 px-6 rounded-xl font-bold text-sm transition disabled:opacity-50 disabled:cursor-not-allowed text-black"
            style={{ background: 'linear-gradient(135deg, #f59e0b, #ef4444)' }}
          >
            {state === 'loading' ? '⏳ Reserving your spot...' : `🔥 Reserve Early-Bird Spot — ${plan === 'annual' ? '$39/yr' : '$5/mo'}`}
          </button>

          <p className="text-xs text-center text-[var(--text-muted)]">
            💳 <strong className="text-[var(--text-secondary)]">No charge until launch.</strong> Early-bird price locked forever once you subscribe. Cancel anytime.
          </p>
        </form>
      </section>

      {/* Teaser video list */}
      <section className="px-6 pb-16 max-w-2xl mx-auto">
        <div className="flex items-center gap-3 mb-6">
          <h2 className="text-2xl font-bold">Sneak peek — what&apos;s dropping</h2>
          <span className="badge badge-purple text-xs">30 videos total</span>
        </div>
        <div className="space-y-3">
          {teaserVideos.map((v, i) => (
            <div
              key={i}
              className="arch-card p-4 flex items-center gap-4 cursor-pointer group/card transition-all"
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
            >
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 text-sm font-bold transition ${v.locked ? 'bg-[var(--bg-primary)] border border-[var(--border)] text-[var(--text-muted)]' : 'bg-blue-600/20 border border-blue-500/30 text-blue-400'}`}>
                {v.locked ? <Lock className="w-4 h-4" /> : <span>{i + 1}</span>}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <p className={`text-sm font-semibold ${v.locked ? 'text-[var(--text-muted)]' : 'text-[var(--text-primary)]'}`}>
                    {v.locked && hovered !== i ? '🔒 ' + v.title : v.title}
                  </p>
                  <span className="text-[10px] text-[var(--text-muted)] border border-[var(--border)] px-1.5 py-0.5 rounded">{v.week}</span>
                </div>
                <p className={`text-xs transition-all duration-200 ${v.locked && hovered !== i ? 'blur-[3px] select-none text-[var(--text-muted)]' : 'text-[var(--text-secondary)]'}`}>
                  {v.teaser}
                </p>
              </div>
              {v.locked ? (
                <div className="shrink-0">
                  {hovered === i
                    ? <Eye className="w-4 h-4 text-amber-400" />
                    : <EyeOff className="w-4 h-4 text-[var(--text-muted)]" />}
                </div>
              ) : (
                <ChevronRight className="w-4 h-4 text-blue-400 shrink-0" />
              )}
            </div>
          ))}
          <div className="arch-card p-4 text-center text-sm text-[var(--text-muted)] italic">
            + 24 more locked deep-dives — revealed weekly after launch 🚀
          </div>
        </div>
      </section>

      {/* What you get */}
      <section className="px-6 pb-16 max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold text-center mb-8">Everything in the subscription</h2>
        <div className="grid sm:grid-cols-2 gap-3">
          {[
            { icon: '🎬', title: '2 videos every Monday', desc: '40-min deep-dives with live diagram annotation' },
            { icon: '🧠', title: '10 LLM architectures', desc: 'GPT inference, RAG, vLLM, multi-agent — the cutting edge' },
            { icon: '🎯', title: 'FAANG interview prep', desc: 'Real questions + model answers for every architecture' },
            { icon: '📊', title: 'Scaling numbers', desc: 'Real metrics from production systems — not textbook examples' },
            { icon: '📄', title: 'PDF cheat sheets', desc: 'One-page visual summaries for quick revision before interviews' },
            { icon: '🔬', title: 'Research paper breakdowns', desc: 'Dynamo, MapReduce, Attention Is All You Need — explained plainly' },
          ].map((item) => (
            <div key={item.title} className="arch-card p-4 flex items-start gap-3">
              <span className="text-2xl shrink-0">{item.icon}</span>
              <div>
                <p className="text-sm font-semibold text-[var(--text-primary)]">{item.title}</p>
                <p className="text-xs text-[var(--text-muted)] mt-0.5">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* vs competitors */}
      <section className="px-6 pb-16 max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold text-center mb-6">Why not ByteByteGo?</h2>
        <div className="arch-card overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[var(--border)] text-[var(--text-muted)] text-xs uppercase tracking-widest">
                <th className="text-left px-4 py-3">Feature</th>
                <th className="px-4 py-3 text-center">ByteByteGo</th>
                <th className="px-4 py-3 text-center text-amber-400">ArchDesign.io</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border)]">
              {[
                ['Price/month', '$15/mo', '$5/mo 🔥'],
                ['LLM/AI architectures', '2–3', '10+ 🧠'],
                ['Research paper breakdowns', '❌', '✅'],
                ['FAANG interview Q&A', 'Limited', 'Every video ✅'],
                ['Real scaling numbers', 'Sometimes', 'Every architecture ✅'],
                ['PDF cheat sheets', '❌', '✅'],
              ].map(([feature, bbg, us]) => (
                <tr key={feature}>
                  <td className="px-4 py-3 text-[var(--text-secondary)]">{feature}</td>
                  <td className="px-4 py-3 text-center text-[var(--text-muted)]">{bbg}</td>
                  <td className="px-4 py-3 text-center font-semibold text-amber-400">{us}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Final CTA */}
      <section className="px-6 pb-24 max-w-lg mx-auto text-center">
        <div className="arch-card p-8 space-y-4" style={{ border: '1px solid rgba(245,158,11,0.3)', boxShadow: '0 0 40px rgba(245,158,11,0.08)' }}>
          <p className="text-sm font-semibold text-amber-400 uppercase tracking-widest">⏰ Limited early-bird spots</p>
          <h3 className="text-2xl font-bold">Lock in your price before launch</h3>
          <p className="text-sm text-[var(--text-muted)]">After the first 300 subscribers, prices will increase. Early birds keep their rate as long as they stay subscribed.</p>
          <a href="#top" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm text-black transition hover:opacity-90"
            style={{ background: 'linear-gradient(135deg, #f59e0b, #ef4444)' }}>
            <Zap className="w-4 h-4" /> Reserve My Spot Now
          </a>
          <p className="text-xs text-[var(--text-muted)]">No credit card · No commitment · Just your email</p>
        </div>
      </section>

    </main>
  );
}
