'use client';

import { useState } from 'react';
import Link from 'next/link';
import { PROJECTS } from '@/data';
import { CornerBrackets } from './CornerBrackets';

const INITIAL_PROJECT_COUNT = 4;

type ProjectCardProps = {
  project: (typeof PROJECTS)[number];
  index: number;
};

function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <Link
      href={`/work/${project.slug}/`}
      className="group relative block w-full text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background overflow-hidden"
      style={{
        opacity: 0,
        animation: `fadeInUp 0.6s ease-out ${0.1 + index * 0.1}s forwards`,
      }}
    >
      <CornerBrackets>
        <div className="card-minimal p-6">
          <div className="space-y-4">
            <div className="flex items-start justify-between gap-3">
              <h3 className="font-display text-xl font-semibold transition-colors duration-300 leading-tight text-foreground">
                {project.title}
              </h3>

              <div className="flex-shrink-0 transition-all duration-300 opacity-40 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1">
                <svg
                  className="w-5 h-5 text-muted-foreground"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                  />
                </svg>
              </div>
            </div>

            <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
              {project.tagline}
            </p>

            <div className="flex flex-wrap gap-2">
              {project.technologies.slice(0, 3).map((tech) => (
                <span
                  key={tech}
                  className="inline-block px-2 py-0.5 text-xs font-medium border border-border text-muted-foreground"
                >
                  {tech}
                </span>
              ))}
              {project.technologies.length > 3 && (
                <span className="inline-block px-2 py-0.5 text-xs font-medium text-muted-foreground">
                  +{project.technologies.length - 3}
                </span>
              )}
            </div>
          </div>
        </div>
      </CornerBrackets>
    </Link>
  );
}

export default function FeaturedWork() {
  const [showAll, setShowAll] = useState(false);
  const hasMoreProjects = PROJECTS.length > INITIAL_PROJECT_COUNT;
  const visibleProjects = showAll ? PROJECTS : PROJECTS.slice(0, INITIAL_PROJECT_COUNT);

  return (
    <section className="space-y-8">
      <div className="flex items-center gap-4">
        <h2 className="text-2xl md:text-3xl font-display font-semibold">Work</h2>
        <div className="h-px flex-1 divider" />
        <Link
          href="/work/"
          className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-300 flex items-center gap-1 group"
        >
          View all
          <svg
            className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
            />
          </svg>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
        {visibleProjects.map((project, index) => (
          <ProjectCard key={project.slug} project={project} index={index} />
        ))}
      </div>

      {hasMoreProjects && (
        <div className="flex justify-center">
          <button
            onClick={() => setShowAll(!showAll)}
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-300 flex items-center gap-2 group"
          >
            {showAll ? 'View less' : 'View more'}
            <svg
              className={`w-4 h-4 transition-transform duration-300 ${showAll ? 'group-hover:-translate-y-0.5' : 'group-hover:translate-y-0.5'}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d={showAll ? 'M5 15l7-7 7 7' : 'M19 9l-7 7-7-7'}
              />
            </svg>
          </button>
        </div>
      )}
    </section>
  );
}
