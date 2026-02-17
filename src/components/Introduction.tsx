'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

export default function Introduction() {
  const [isVisible, setIsVisible] = useState(false);
  const roles = ['Tech Lead', 'Principal Software Engineer'];

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="relative flex justify-center">
      <div className="absolute inset-0 dot-matrix dot-matrix-fade pointer-events-none" />

      <div className="relative flex flex-col md:flex-row gap-8 md:gap-12 items-center md:items-start">
        <div
          className="relative transition-all duration-600 ease-out shrink-0"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
          }}
        >
          <div className="relative w-48 h-48 md:w-56 md:h-56 overflow-hidden rounded-full border-2 border-border">
            <Image
              src="https://avatars.githubusercontent.com/u/15249642?v=4"
              alt="Wesley Coetzee - Principal Software Engineer and Tech Lead"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 33vw"
              priority
            />
          </div>
        </div>

        <div className="space-y-6">
          <div
            className="space-y-4 transition-all duration-600 ease-out"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
              transitionDelay: '0.2s',
            }}
          >
            <div className="flex flex-wrap gap-2">
              {roles.map((role) => (
                <span
                  key={role}
                  className="inline-block px-4 py-1.5 border border-border text-sm font-medium text-muted-foreground tracking-wide uppercase"
                >
                  {role}
                </span>
              ))}
            </div>

            <h1>Wesley Coetzee</h1>

            <p className="font-display text-3xl md:text-4xl font-semibold tracking-tight text-primary leading-[1.2] max-w-2xl">
              Building scalable solutions & leading engineering teams
            </p>
          </div>

          <div
            className="flex items-center gap-3 text-muted-foreground transition-all duration-600 ease-out"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
              transitionDelay: '0.4s',
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
              />
            </svg>
            <span className="text-base font-medium text-foreground">Auckland, New Zealand</span>
          </div>
        </div>
      </div>
    </div>
  );
}
