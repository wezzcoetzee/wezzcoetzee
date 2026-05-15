import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRightIcon } from '@/components/Icons';

export const metadata: Metadata = {
  title: 'Page not found',
  description: 'The page you are looking for does not exist.',
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <main className="relative min-h-screen flex items-center">
      <div className="container py-12 md:py-24">
        <div className="max-w-2xl space-y-8">
          <p className="font-mono text-xs text-muted-foreground tracking-wide">404</p>
          <h1>This page does not exist, or moved.</h1>
          <p className="text-muted-foreground">Probably nothing here. Try one of these instead.</p>
          <ul className="space-y-3 text-foreground">
            <li>
              <Link
                href="/"
                className="group inline-flex items-center gap-2 hover:text-accent transition-colors"
              >
                Home
                <ArrowRightIcon className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </li>
            <li>
              <Link
                href="/work/"
                className="group inline-flex items-center gap-2 hover:text-accent transition-colors"
              >
                Selected work
                <ArrowRightIcon className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </main>
  );
}
