'use client';

import { useState } from 'react';
import Link from 'next/link';
import { CornerBrackets } from './CornerBrackets';

const NAV_LINKS = [
  { href: '/#about', label: 'About' },
  { href: '/#work', label: 'Work' },
  { href: '/#connect', label: 'Connect' },
];

export function NavBar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50">
      <div className="container mx-auto pt-4">
        <CornerBrackets>
          <nav
            aria-label="Main navigation"
            className="bg-card/80 backdrop-blur-md px-6 py-3"
          >
            <div className="flex items-center justify-between">
              <Link
                href="/"
                className="text-sm font-semibold tracking-tight text-primary hover:text-foreground transition-colors"
              >
                WC
              </Link>

              <div className="hidden sm:flex items-center gap-1 text-sm text-muted-foreground">
                {NAV_LINKS.map((link, i) => (
                  <span key={link.href} className="flex items-center gap-1">
                    {i > 0 && <span className="text-muted-foreground/40">/</span>}
                    <Link
                      href={link.href}
                      className="px-2 py-1 hover:text-foreground transition-colors"
                    >
                      {link.label}
                    </Link>
                  </span>
                ))}
              </div>

              <button
                className="sm:hidden text-muted-foreground hover:text-foreground transition-colors"
                onClick={() => setOpen(!open)}
                aria-label="Toggle navigation menu"
                aria-expanded={open}
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  {open ? (
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>

            {open && (
              <div className="sm:hidden flex flex-col gap-1 pt-3 border-t border-border mt-3 text-sm text-muted-foreground">
                {NAV_LINKS.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="px-2 py-2 hover:text-foreground transition-colors"
                    onClick={() => setOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            )}
          </nav>
        </CornerBrackets>
      </div>
    </header>
  );
}
