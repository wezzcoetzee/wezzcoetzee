import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Page Not Found',
  description: 'The page you are looking for does not exist.',
  robots: {
    index: false,
    follow: true,
  },
};

export default function NotFound() {
  return (
    <main className="relative min-h-screen flex items-center justify-center">
      <div className="container relative mx-auto px-6 md:px-12 py-12 md:py-24">
        <div className="mx-auto w-full max-w-2xl text-center space-y-8">
          <h1>404</h1>
          <p className="text-xl text-muted-foreground">
            The page you&apos;re looking for doesn&apos;t exist or has been moved.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium border chrome-pill hover:bg-card transition-colors duration-300"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
              />
            </svg>
            <span className="chrome-text">Back home</span>
          </Link>
        </div>
      </div>

      <div className="fixed bottom-0 right-0 w-96 h-96 rounded-full blur-3xl -z-10 pointer-events-none bg-accent-orb" />
    </main>
  );
}
