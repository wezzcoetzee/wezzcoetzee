'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

export default function Introduction() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="relative">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-start">
        {/* Profile Image - Asymmetric placement */}
        <div
          className="md:col-span-4 relative"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
            transition: 'opacity 0.6s ease-out, transform 0.6s ease-out',
          }}
        >
          <div className="relative aspect-square overflow-hidden group chrome-shimmer">
            <div
              className="absolute inset-0 border-4 transition-all duration-300"
              style={{
                borderImage: 'linear-gradient(145deg, #cbd5e1, #e2e8f0, #94a3b8, #cbd5e1) 1',
                boxShadow: 'inset 0 0 20px rgba(203, 213, 225, 0.2)',
              }}
            />
            <div
              className="absolute top-4 right-4 w-full h-full border-2 -z-10"
              style={{
                borderColor: 'rgba(148, 163, 184, 0.4)',
                boxShadow: '0 0 15px rgba(203, 213, 225, 0.3)',
              }}
            />
            <Image
              src="https://avatars.githubusercontent.com/u/15249642?v=4"
              alt="Wesley Coetzee - Staff Engineer and Tech Lead"
              fill
              className="object-cover transition-all duration-500"
              sizes="(max-width: 768px) 100vw, 33vw"
              priority
            />
          </div>
        </div>

        {/* Content - Editorial layout */}
        <div className="md:col-span-8 space-y-6 md:pt-8">
          <div
            className="space-y-4"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
              transition: 'opacity 0.6s ease-out 0.2s, transform 0.6s ease-out 0.2s',
            }}
          >
            <div
              className="inline-block px-4 py-1.5 border chrome-shimmer"
              style={{
                background: 'rgba(203, 213, 225, 0.1)',
                borderColor: 'rgba(203, 213, 225, 0.3)',
                boxShadow: '0 0 10px rgba(203, 213, 225, 0.2)',
              }}
            >
              <span className="text-sm font-medium chrome-text tracking-wide uppercase">
                Software Engineer
              </span>
            </div>

            <h1>Wesley Coetzee</h1>

            <h2 className="max-w-2xl">
              Building scalable solutions & leading engineering teams
            </h2>
          </div>

          <div
            className="flex items-center gap-3 text-muted-foreground"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
              transition: 'opacity 0.6s ease-out 0.4s, transform 0.6s ease-out 0.4s',
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-5 h-5"
              style={{ color: '#cbd5e1', filter: 'drop-shadow(0 0 5px rgba(203, 213, 225, 0.5))' }}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z"
              />
            </svg>
            <span className="text-base font-medium text-foreground">Auckland, New Zealand</span>
          </div>

          <div
            className="max-w-2xl border-l-2 pl-6"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
              transition: 'opacity 0.6s ease-out 0.6s, transform 0.6s ease-out 0.6s',
              borderColor: 'rgba(203, 213, 225, 0.3)',
              boxShadow: '-2px 0 8px rgba(203, 213, 225, 0.15)',
            }}
          >
            <p className="text-foreground/80 text-lg leading-relaxed">
              Passionate about crafting elegant, scalable solutions and empowering engineering
              teams to build exceptional products. Let&apos;s connect and create something
              remarkable.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
