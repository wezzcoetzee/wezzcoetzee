'use client';

import Link from 'next/link';
import { CornerBrackets } from './CornerBrackets';

const NAV_LINKS = [
  { href: '/#about', label: 'About' },
  { href: '/#work', label: 'Work' },
  { href: '/#connect', label: 'Connect' },
];

export function NavBar() {
  return (
    <header className="sticky top-0 z-50">
      <div className="container mx-auto px-6 md:px-12 pt-4">
        <CornerBrackets>
          <nav
            aria-label="Main navigation"
            className="mx-auto max-w-7xl bg-card/80 backdrop-blur-md px-6 py-3"
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

            <Link
              href="/#connect"
              className="text-sm font-medium px-4 py-1.5 border border-border text-foreground hover:bg-muted transition-colors"
            >
              Get in Touch
            </Link>
          </div>
          </nav>
        </CornerBrackets>
      </div>
    </header>
  );
}
