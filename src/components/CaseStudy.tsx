'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import type { Project } from '@/data';

type CaseStudyProps = {
  project: Project;
};

export default function CaseStudy({ project }: CaseStudyProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <article className="space-y-12">
      <header
        className="space-y-6 transition-all duration-600 ease-out"
        style={{
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
        }}
      >
        <Link
          href="/work/"
          className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-300 group"
        >
          <svg
            className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-1"
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
          Back to work
        </Link>

        <div className="space-y-4">
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="inline-block px-3 py-1 text-sm font-medium chrome-pill border"
              >
                <span className="chrome-text">{tech}</span>
              </span>
            ))}
          </div>

          <h1>{project.title}</h1>

          <p className="text-xl text-muted-foreground max-w-2xl">
            {project.tagline}
          </p>
        </div>
      </header>

      <section
        className="space-y-8 transition-all duration-600 ease-out"
        style={{
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
          transitionDelay: '0.2s',
        }}
      >
        <div className="flex items-center gap-4">
          <h2 className="text-2xl md:text-3xl font-display font-semibold">Overview</h2>
          <div className="h-px flex-1 section-divider" />
        </div>

        <div className="max-w-3xl">
          <div className="border-l-2 pl-6 chrome-border-left">
            <p className="text-foreground/80 text-lg leading-relaxed">
              {project.description}
            </p>
          </div>
        </div>
      </section>

      <section
        className="space-y-8 transition-all duration-600 ease-out"
        style={{
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
          transitionDelay: '0.4s',
        }}
      >
        <div className="flex items-center gap-4">
          <h2 className="text-2xl md:text-3xl font-display font-semibold">
            Highlights
          </h2>
          <div className="h-px flex-1 section-divider" />
        </div>

        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl">
          {project.highlights.map((highlight, index) => (
            <li
              key={index}
              className="flex items-start gap-3 text-foreground/80"
            >
              <svg
                className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5 [filter:drop-shadow(0_0_5px_rgb(var(--color-chrome-highlight)/0.5))]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m4.5 12.75 6 6 9-13.5"
                />
              </svg>
              <span>{highlight}</span>
            </li>
          ))}
        </ul>
      </section>

      {project.links.length > 0 && (
        <section
          className="space-y-8 transition-all duration-600 ease-out"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
            transitionDelay: '0.6s',
          }}
        >
          <div className="flex items-center gap-4">
            <h2 className="text-2xl md:text-3xl font-display font-semibold">Links</h2>
            <div className="h-px flex-1 section-divider" />
          </div>

          <div className="flex flex-wrap gap-4">
            {project.links.map((link) => (
              <a
                key={link.url}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 px-6 py-3 bg-card card-interactive font-medium transition-all duration-300"
              >
                <span className="text-secondary group-hover:text-foreground transition-colors duration-300">
                  {link.label}
                </span>
                <svg
                  className="w-4 h-4 text-secondary transition-all duration-300 group-hover:text-foreground group-hover:translate-x-1 group-hover:-translate-y-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M7 17L17 7M17 7H7M17 7v10"
                  />
                </svg>
              </a>
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
