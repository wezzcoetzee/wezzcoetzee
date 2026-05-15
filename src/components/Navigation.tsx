import Link from 'next/link';
import { ThemeToggle } from './ThemeToggle';

const EMAIL = 'info@wezzcoetzee.com';

export function NavBar() {
  return (
    <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container">
        <nav aria-label="Main navigation" className="flex items-center justify-between gap-4 py-3">
          <Link
            href="/"
            className="font-mono text-sm text-foreground hover:text-accent transition-colors"
          >
            wezzcoetzee.com
          </Link>

          <div className="flex items-center gap-3">
            <Link
              href={`mailto:${EMAIL}?subject=Hello%20Wesley`}
              className="font-mono text-xs sm:text-sm border border-border px-3 py-1.5 text-foreground hover:bg-foreground hover:text-background transition-colors"
            >
              <span className="hidden sm:inline">{EMAIL}</span>
              <span className="sm:hidden">email me &rarr;</span>
            </Link>
            <ThemeToggle />
          </div>
        </nav>
      </div>
    </header>
  );
}
