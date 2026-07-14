import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Page not found',
  description: 'The page you are looking for does not exist.',
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-3xl items-center px-6 py-10">
      <div className="space-y-6">
        <p className="text-xs tracking-widest text-muted-foreground">
          <span className="text-accent" aria-hidden="true">
            #{' '}
          </span>
          404
        </p>
        <h1>This page does not exist, or moved.</h1>
        <Link
          href="/"
          className="inline-block text-muted-foreground hover:text-foreground transition-colors"
        >
          &larr; Home
        </Link>
      </div>
    </main>
  );
}
