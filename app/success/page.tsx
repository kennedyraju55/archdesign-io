import Link from 'next/link';

const nextSteps = [
  {
    step: 1,
    title: 'Check your inbox',
    desc: 'A welcome email is on its way with your account details and a sneak peek at what\'s coming.',
  },
  {
    step: 2,
    title: 'First 2 videos arrive Monday',
    desc: 'Every Monday at 9 AM UTC, two fresh system design breakdowns land in your inbox — ready to read or watch.',
  },
  {
    step: 3,
    title: 'Videos coming soon — stay tuned',
    desc: 'We\'re recording free 40-minute video walkthroughs for every architecture. We\'ll notify you when they go live.',
  },
];

const twitterText = encodeURIComponent(
  'Just discovered @archdesign_io — free system design architecture deep-dives. Built by a Microsoft engineer. Check it out\nhttps://archdesign.io'
);
const linkedinUrl = 'https://www.linkedin.com/sharing/share-offsite/?url=https%3A%2F%2Farchdesign.io%2Fsubscribe';

export default function SuccessPage() {
  return (
    <main
      style={{ backgroundColor: 'var(--bg-primary)', color: 'var(--text-primary)', minHeight: '100vh' }}
      className="flex flex-col items-center justify-center px-6 py-20"
    >

      {/* ── Animated Checkmark ── */}
      <div className="success-check-wrapper mb-8">
        <svg
          className="success-check"
          viewBox="0 0 52 52"
          xmlns="http://www.w3.org/2000/svg"
          aria-label="Success checkmark"
        >
          <circle className="success-check__circle" cx="26" cy="26" r="25" fill="none" />
          <path className="success-check__path" fill="none" d="M14 27 l8 8 l16-16" />
        </svg>
      </div>

      {/* ── Headline ── */}
      <h1 className="text-4xl md:text-5xl font-bold text-center mb-4">
        You&apos;re In! 🎉
      </h1>
      <p className="text-lg text-center max-w-md mb-12" style={{ color: 'var(--text-secondary)' }}>
        Welcome to <strong style={{ color: 'var(--text-primary)' }}>ArchDesign.io</strong> — you&apos;re on the list! We&apos;ll notify you when videos go live.
      </p>

      {/* ── Next Steps ── */}
      <div className="w-full max-w-lg mb-12 space-y-5">
        {nextSteps.map(({ step, title, desc }) => (
          <div key={step} className="arch-card flex gap-5 items-start">
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0"
              style={{ backgroundColor: 'rgba(34,197,94,0.15)', color: '#22c55e', border: '2px solid #22c55e' }}
            >
              {step}
            </div>
            <div>
              <p className="font-semibold mb-1">{title}</p>
              <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>{desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* ── CTA: Browse Free Articles ── */}
      <Link
        href="/architectures"
        className="mb-10 py-3 px-8 rounded-lg font-semibold text-sm transition-opacity hover:opacity-90"
        style={{ backgroundColor: '#6366f1', color: '#fff' }}
      >
        Browse Free Architectures While You Wait →
      </Link>

      {/* ── Social Share ── */}
      <div className="text-center">
        <p className="text-sm mb-4" style={{ color: 'var(--text-muted)' }}>
          Spread the word and help a fellow engineer level up 👇
        </p>
        <div className="flex gap-4 justify-center">
          <a
            href={`https://twitter.com/intent/tweet?text=${twitterText}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 py-2 px-5 rounded-lg text-sm font-semibold transition-opacity hover:opacity-90"
            style={{ backgroundColor: '#1d9bf0', color: '#fff' }}
          >
            <span>𝕏</span> Share on Twitter
          </a>
          <a
            href={linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 py-2 px-5 rounded-lg text-sm font-semibold transition-opacity hover:opacity-90"
            style={{ backgroundColor: '#0a66c2', color: '#fff' }}
          >
            <span>in</span> Share on LinkedIn
          </a>
        </div>
      </div>

      {/* ── CSS for checkmark animation ── */}
      <style>{`
        .success-check-wrapper {
          width: 90px;
          height: 90px;
        }
        .success-check {
          width: 90px;
          height: 90px;
        }
        .success-check__circle {
          stroke: #22c55e;
          stroke-width: 2;
          stroke-dasharray: 166;
          stroke-dashoffset: 166;
          animation: stroke 0.6s cubic-bezier(0.65, 0, 0.45, 1) forwards;
        }
        .success-check__path {
          stroke: #22c55e;
          stroke-width: 3;
          stroke-linecap: round;
          stroke-linejoin: round;
          stroke-dasharray: 48;
          stroke-dashoffset: 48;
          animation: stroke 0.3s cubic-bezier(0.65, 0, 0.45, 1) 0.5s forwards;
        }
        @keyframes stroke {
          100% { stroke-dashoffset: 0; }
        }
      `}</style>

    </main>
  );
}
