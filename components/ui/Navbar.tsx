"use client";
import Link from "next/link";
import { useState } from "react";
import { Menu, X, Zap } from "lucide-react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 nav-blur">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center">
              <Zap className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-lg tracking-tight">
              <span className="gradient-text">Arch</span>
              <span className="text-[var(--text-primary)]">Design</span>
              <span className="text-[var(--text-muted)]">.io</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="/architectures" className="text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">
              Architectures
            </Link>
            <Link href="/podcast" className="text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">
              Podcast
            </Link>
            <Link href="/#how-it-works" className="text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">
              How it Works
            </Link>
          </div>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/coming-soon"
              className="px-4 py-2 rounded-lg text-sm font-semibold hover:opacity-90 transition-opacity text-black"
              style={{ background: 'linear-gradient(135deg, #f59e0b, #ef4444)' }}
            >
              🔔 Get Notified
            </Link>
          </div>

          {/* Mobile menu toggle */}
          <button
            className="md:hidden text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t border-[var(--border)] bg-[var(--bg-secondary)]">
          <div className="px-4 py-4 space-y-3">
            <Link href="/architectures" className="block text-sm text-[var(--text-secondary)] hover:text-white py-2" onClick={() => setOpen(false)}>
              Architectures
            </Link>
            <Link href="/podcast" className="block text-sm text-[var(--text-secondary)] hover:text-white py-2" onClick={() => setOpen(false)}>
              Podcast
            </Link>
            <Link href="/#how-it-works" className="block text-sm text-[var(--text-secondary)] hover:text-white py-2" onClick={() => setOpen(false)}>
              How it Works
            </Link>
            <Link
              href="/coming-soon"
              className="block w-full text-center px-4 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-cyan-500 text-white text-sm font-semibold"
              onClick={() => setOpen(false)}
            >
              🔔 Get Notified
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
