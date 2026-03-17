'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import type { Project } from '@/data';
import { useReducedMotion } from '@/hooks/use-reduced-motion';
import { useInView } from '@/hooks/use-in-view';
import { CornerBrackets } from './CornerBrackets';
import { ArrowLeftIcon, CheckIcon, ExternalLinkIcon } from './Icons';

type CaseStudyProps = {
  project: Project;
};

function RevealSection({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const [ref, inView] = useInView<HTMLElement>(0.1);

  return (
    <section
      ref={ref}
      className={`transition-[opacity,transform] duration-600 ease-out ${className || ''}`}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? 'translateY(0)' : 'translateY(20px)',
        transitionDelay: inView ? `${delay}s` : '0s',
      }}
    >
      {children}
    </section>
  );
}

export default function CaseStudy({ project }: CaseStudyProps) {
  const [isVisible, setIsVisible] = useState(false);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <article className="space-y-12">
      <header
        className="space-y-6 transition-[opacity,transform] duration-600 ease-out"
        style={{
          opacity: isVisible || reducedMotion ? 1 : 0,
          transform: isVisible || reducedMotion ? 'translateY(0)' : 'translateY(20px)',
        }}
      >
        <Link
          href="/work/"
          className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-300 group"
        >
          <ArrowLeftIcon className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-1" />
          Back to work
        </Link>

        <div className="space-y-4">
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="inline-block px-3 py-1 text-sm font-medium border border-border text-muted-foreground"
              >
                {tech}
              </span>
            ))}
          </div>

          <h1>{project.title}</h1>

          <p className="text-xl text-muted-foreground max-w-2xl">
            {project.tagline}
          </p>
        </div>
      </header>

      <RevealSection className="space-y-8">
        <div className="flex items-center gap-4">
          <h2>Overview</h2>
          <div className="h-px flex-1 divider" />
        </div>

        <div className="max-w-3xl">
          <div className="border-l-2 border-border pl-6">
            <p className="text-foreground text-lg leading-relaxed">
              {project.description}
            </p>
          </div>
        </div>
      </RevealSection>

      <RevealSection className="space-y-8">
        <div className="flex items-center gap-4">
          <h2>
            Highlights
          </h2>
          <div className="h-px flex-1 divider" />
        </div>

        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl">
          {project.highlights.map((highlight, index) => (
            <li
              key={index}
              className="flex items-start gap-3 text-foreground"
            >
              <CheckIcon className="w-5 h-5 text-muted-foreground flex-shrink-0 mt-0.5" />
              <span>{highlight}</span>
            </li>
          ))}
        </ul>
      </RevealSection>

      {project.links.length > 0 && (
        <RevealSection className="space-y-8">
          <div className="flex items-center gap-4">
            <h2>Links</h2>
            <div className="h-px flex-1 divider" />
          </div>

          <div className="flex flex-wrap gap-4">
            {project.links.map((link) => (
              <CornerBrackets key={link.url}>
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 px-6 py-3 card-minimal font-medium transition-all duration-300"
                >
                  <span className="text-foreground transition-colors duration-300">
                    {link.label}
                  </span>
                  <ExternalLinkIcon className="w-4 h-4 text-muted-foreground transition-all duration-300 group-hover:text-foreground group-hover:translate-x-1 group-hover:-translate-y-1" />
                </a>
              </CornerBrackets>
            ))}
          </div>
        </RevealSection>
      )}
    </article>
  );
}
