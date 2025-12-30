'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function NotFound() {
  const router = useRouter();
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          router.push('/');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [router]);

  return (
    <main className="relative min-h-screen flex items-center justify-center">
      <div className="container relative mx-auto px-6 md:px-12">
        <div className="mx-auto w-full max-w-2xl text-center space-y-8">
          {/* 404 Number */}
          <div
            className="text-9xl font-display font-bold"
            style={{
              background: 'linear-gradient(135deg, #e2e8f0 0%, #cbd5e1 50%, #94a3b8 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            404
          </div>

          {/* Message */}
          <div className="space-y-4">
            <h1 className="text-3xl md:text-4xl font-display font-semibold">Page Not Found</h1>
            <p className="text-lg text-foreground/80">
              The page you&apos;re looking for doesn&apos;t exist or has been moved.
            </p>
            <p className="text-base text-foreground/60">
              Redirecting to home in{' '}
              <span
                className="font-bold chrome-text"
                style={{
                  fontSize: '1.25rem',
                }}
              >
                {countdown}
              </span>{' '}
              {countdown === 1 ? 'second' : 'seconds'}...
            </p>
          </div>

          {/* Back to Home Button */}
          <Link
            href="/"
            className="inline-block px-8 py-3 border chrome-shimmer transition-all duration-300 hover:scale-105"
            style={{
              background: 'rgba(203, 213, 225, 0.1)',
              borderColor: 'rgba(203, 213, 225, 0.3)',
              boxShadow: '0 0 10px rgba(203, 213, 225, 0.2)',
            }}
          >
            <span className="text-sm font-medium chrome-text tracking-wide uppercase">
              Back to Home
            </span>
          </Link>

          {/* Decorative element */}
          <div className="pt-12 flex items-center justify-center gap-3">
            <div className="w-8 h-px chrome-shimmer" style={{ background: 'rgba(148, 163, 184, 0.4)' }} />
            <div className="w-8 h-px chrome-shimmer" style={{ background: 'rgba(148, 163, 184, 0.4)' }} />
          </div>
        </div>
      </div>

      {/* Chrome background accent element */}
      <div
        className="fixed bottom-0 right-0 w-96 h-96 rounded-full blur-3xl -z-10 pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(203, 213, 225, 0.08) 0%, transparent 70%)',
        }}
      />
    </main>
  );
}
