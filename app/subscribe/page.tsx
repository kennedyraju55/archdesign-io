import Link from 'next/link';

const checklist = [
  '2 in-depth system design videos every Monday',
  'Real-world architectures used by top tech companies',
  'PDF cheat sheets included with every video',
  'Searchable archive of 30+ architectures',
  'New content added every single week',
  'Cancel anytime — no questions asked',
  'Built & curated by a Microsoft Software Engineer',
];

const sampleEmail = {
  subject: '🏗️ This Week: How Uber Handles 14M Requests/Min',
  preview: 'Week #12 — Two new architecture breakdowns inside...',
  items: [
    { title: "Uber's Dispatch Architecture", tag: 'Scalability', desc: 'How Uber routes 14M ride requests per minute using geospatial sharding and consistent hashing.' },
    { title: "Stripe's Payment Ledger", tag: 'Reliability', desc: "Double-entry bookkeeping at scale — why Stripe never loses a dollar even during outages." },
  ],
};

export default function SubscribePage() {
  return (
    <main style={{ backgroundColor: 'var(--bg-primary)', color: 'var(--text-primary)', minHeight: '100vh' }}>

      {/* ── Hero ── */}
      <section className="text-center px-6 pt-20 pb-12 max-w-3xl mx-auto">
        <span className="badge badge-blue mb-4 inline-block">New videos every Monday</span>
        <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
          Get <span className="gradient-text">2 Architecture Videos</span> Every Monday
        </h1>
        <p className="text-lg" style={{ color: 'var(--text-secondary)' }}>
          Real-world system design breakdowns — <strong style={{ color: 'var(--text-primary)' }}>$5/month</strong>, 30+ architectures, cancel anytime.
          <br className="hidden md:block" />
          Curated by <strong style={{ color: 'var(--text-primary)' }}>Raju Guthikonda</strong>, Software Engineer at Microsoft.
        </p>
      </section>

      {/* ── Pricing Cards ── */}
      <section className="px-6 pb-16 max-w-3xl mx-auto">
        <div className="grid md:grid-cols-2 gap-6">

          {/* Monthly */}
          <div className="arch-card flex flex-col justify-between">
            <div>
              <p style={{ color: 'var(--text-secondary)' }} className="text-sm font-medium uppercase tracking-widest mb-2">Monthly</p>
              <p className="text-4xl font-bold mb-1">$5 <span className="text-lg font-normal" style={{ color: 'var(--text-secondary)' }}>/month</span></p>
              <p style={{ color: 'var(--text-muted)' }} className="text-sm mb-6">Billed monthly · cancel anytime</p>
              <ul className="space-y-2 text-sm" style={{ color: 'var(--text-secondary)' }}>
                <li>✓ 2 videos every Monday</li>
                <li>✓ Full archive access</li>
                <li>✓ PDF cheat sheets</li>
              </ul>
            </div>
            <Link
              href="/api/create-checkout-session?plan=monthly"
              className="mt-8 block text-center py-3 px-6 rounded-lg font-semibold transition-opacity hover:opacity-90"
              style={{ background: 'var(--text-muted)', color: 'var(--text-primary)' }}
            >
              Start Today
            </Link>
          </div>

          {/* Annual — highlighted */}
          <div
            className="arch-card flex flex-col justify-between relative"
            style={{ border: '2px solid #22c55e', boxShadow: '0 0 24px rgba(34,197,94,0.15)' }}
          >
            <div
              className="absolute -top-3 left-1/2 -translate-x-1/2 text-xs font-bold px-3 py-1 rounded-full"
              style={{ backgroundColor: '#22c55e', color: '#0a0f1e' }}
            >
              BEST VALUE
            </div>
            <div>
              <p style={{ color: '#22c55e' }} className="text-sm font-medium uppercase tracking-widest mb-2">Annual</p>
              <p className="text-4xl font-bold mb-1">
                $39 <span className="text-lg font-normal" style={{ color: 'var(--text-secondary)' }}>/year</span>
              </p>
              <p style={{ color: '#22c55e' }} className="text-sm mb-1 font-semibold">Save 35% · That's $3.25/mo</p>
              <p style={{ color: 'var(--text-muted)' }} className="text-sm mb-6">Billed annually · cancel anytime</p>
              <ul className="space-y-2 text-sm" style={{ color: 'var(--text-secondary)' }}>
                <li>✓ Everything in Monthly</li>
                <li>✓ 104 videos per year</li>
                <li>✓ Priority email support</li>
              </ul>
            </div>
            <Link
              href="/api/create-checkout-session?plan=annual"
              className="mt-8 block text-center py-3 px-6 rounded-lg font-semibold transition-opacity hover:opacity-90"
              style={{ backgroundColor: '#22c55e', color: '#0a0f1e' }}
            >
              Best Value · Save 35%
            </Link>
          </div>

        </div>

        {/* Competitor callout */}
        <p className="text-center text-sm mt-6" style={{ color: 'var(--text-muted)' }}>
          💡 ByteByteGo charges $15/mo for less content — ArchDesign.io gives you more for less.
        </p>
      </section>

      {/* ── What You Get ── */}
      <section className="px-6 pb-16 max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold text-center mb-8">Everything Included</h2>
        <ul className="space-y-4">
          {checklist.map((item) => (
            <li key={item} className="flex items-start gap-3">
              <span style={{ color: '#22c55e' }} className="mt-0.5 text-lg leading-none">✓</span>
              <span style={{ color: 'var(--text-secondary)' }}>{item}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* ── Sample Email Preview ── */}
      <section className="px-6 pb-16 max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold text-center mb-2">What Your Weekly Email Looks Like</h2>
        <p className="text-center text-sm mb-8" style={{ color: 'var(--text-muted)' }}>
          Real example from a recent Monday drop
        </p>
        <div
          className="arch-card"
          style={{ border: '1px solid rgba(99,102,241,0.3)', borderRadius: '12px', overflow: 'hidden' }}
        >
          {/* Email header */}
          <div className="px-5 py-4 border-b" style={{ borderColor: 'rgba(255,255,255,0.07)', backgroundColor: 'rgba(99,102,241,0.08)' }}>
            <p className="text-xs mb-1" style={{ color: 'var(--text-muted)' }}>From: raju@archdesign.io · To: you@example.com</p>
            <p className="font-semibold">{sampleEmail.subject}</p>
            <p className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>{sampleEmail.preview}</p>
          </div>
          {/* Email body */}
          <div className="px-5 py-5 space-y-5">
            {sampleEmail.items.map((item) => (
              <div key={item.title} className="flex gap-4">
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center text-lg flex-shrink-0"
                  style={{ backgroundColor: 'rgba(99,102,241,0.15)' }}
                >
                  🏗️
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-semibold text-sm">{item.title}</span>
                    <span className="badge badge-blue text-xs">{item.tag}</span>
                  </div>
                  <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>{item.desc}</p>
                </div>
              </div>
            ))}
            <div
              className="text-center py-3 rounded-lg text-sm font-semibold"
              style={{ backgroundColor: 'rgba(99,102,241,0.2)', color: '#a5b4fc' }}
            >
              → Watch Both Videos (8 min each)
            </div>
          </div>
        </div>
      </section>

      {/* ── Trust Badges ── */}
      <section className="px-6 pb-20 max-w-2xl mx-auto">
        <div className="flex flex-wrap justify-center gap-6 text-sm" style={{ color: 'var(--text-muted)' }}>
          <div className="flex items-center gap-2">
            <span>🔒</span>
            <span>Payments secured by <strong style={{ color: 'var(--text-secondary)' }}>Stripe</strong></span>
          </div>
          <div className="flex items-center gap-2">
            <span>❌</span>
            <span>Cancel anytime, instantly</span>
          </div>
          <div className="flex items-center gap-2">
            <span>💰</span>
            <span>30-day money-back guarantee</span>
          </div>
          <div className="flex items-center gap-2">
            <span>👷</span>
            <span>Built by a Microsoft Engineer</span>
          </div>
        </div>
      </section>

    </main>
  );
}
