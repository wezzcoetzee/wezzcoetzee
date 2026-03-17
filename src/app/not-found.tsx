import { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeftIcon } from '@/components/Icons';

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
      <div className="container relative py-12 md:py-24">
        <div className="mx-auto w-full max-w-2xl text-center space-y-8">
          <h1>Page Not Found</h1>
          <p className="text-xl text-muted-foreground">
            The page you&apos;re looking for doesn&apos;t exist or has been moved.
          </p>
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium border border-border text-foreground hover:bg-muted transition-colors duration-300"
          >
            <ArrowLeftIcon />
            Back home
          </Link>
        </div>
      </div>
    </main>
  );
}
