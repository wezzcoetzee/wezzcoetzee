'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useReducedMotion } from '@/hooks/use-reduced-motion';

export default function Introduction() {
  const [isVisible, setIsVisible] = useState(false);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const settled = isVisible || reducedMotion;

  return (
    <div className="relative">
      <div className="flex flex-col md:flex-row gap-10 md:gap-14 items-start">
        <div
          className="relative shrink-0 transition-[opacity,transform] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
          style={{
            opacity: settled ? 1 : 0,
            transform: settled ? 'translateY(0)' : 'translateY(16px)',
          }}
        >
          <div className="relative w-40 h-40 md:w-48 md:h-48 overflow-hidden rounded-full ring-1 ring-border">
            <Image
              src="/avatar.jpg"
              alt="Wesley Coetzee"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 40vw, 12rem"
              priority
            />
          </div>
        </div>

        <div className="space-y-8 flex-1 min-w-0">
          <p
            className="section-marker transition-[opacity,transform] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
            style={{
              opacity: settled ? 1 : 0,
              transform: settled ? 'translateY(0)' : 'translateY(16px)',
            }}
          >
            wesley coetzee · principal engineer
          </p>

          <h1
            className="max-w-3xl transition-[opacity,transform] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
            style={{
              opacity: settled ? 1 : 0,
              transform: settled ? 'translateY(0)' : 'translateY(16px)',
              transitionDelay: '0.1s',
            }}
          >
            I build highly scalable distributed systems, and lead the engineering teams that ship it.
          </h1>

          <dl
            className="flex flex-col sm:flex-row gap-x-10 gap-y-4 text-sm transition-[opacity,transform] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
            style={{
              opacity: settled ? 1 : 0,
              transform: settled ? 'translateY(0)' : 'translateY(16px)',
              transitionDelay: '0.2s',
            }}
          >
            <div>
              <dt className="section-marker mb-1">currently</dt>
              <dd className="text-foreground">Tech Lead, Idexx</dd>
            </div>
            <div>
              <dt className="section-marker mb-1">open to</dt>
              <dd className="text-foreground">Principal / Staff &amp; contracts</dd>
            </div>
            <div>
              <dt className="section-marker mb-1">based in</dt>
              <dd className="text-foreground">Auckland, NZ &middot; remote</dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
}
