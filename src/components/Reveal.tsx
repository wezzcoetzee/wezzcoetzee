'use client';

import { useEffect, useRef, useState } from 'react';

type RevealProps = {
  children: React.ReactNode;
  /** Stagger position within a sibling group; drives the entrance delay. */
  index?: number;
  className?: string;
};

/**
 * Reveals its children once, when they scroll into view, as a staggered
 * sibling entrance. Content renders visible by default; JS only arms the
 * hidden state after paint, so no-JS, SSG, and reduced-motion all keep the
 * content fully visible with no motion.
 */
export function Reveal({ children, index = 0, className }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [phase, setPhase] = useState<'idle' | 'armed' | 'shown'>('idle');

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (
      !('IntersectionObserver' in window) ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      return; // stay visible, no motion
    }

    setPhase('armed');
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setPhase('shown');
            observer.disconnect();
            break;
          }
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -10% 0px' }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      data-reveal={phase === 'idle' ? undefined : phase}
      style={{ '--reveal-i': index } as React.CSSProperties}
      className={className}
    >
      {children}
    </div>
  );
}
