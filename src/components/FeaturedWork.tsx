'use client';

import { useState } from 'react';
import Link from 'next/link';
import { PROJECTS } from '@/data';
import { ProjectCard } from './ProjectCard';
import { ArrowRightIcon, ChevronIcon } from './Icons';

const INITIAL_PROJECT_COUNT = 4;

export default function FeaturedWork() {
  const [showAll, setShowAll] = useState(false);
  const hasMoreProjects = PROJECTS.length > INITIAL_PROJECT_COUNT;

  return (
    <section className="space-y-8">
      <div className="flex items-center gap-4">
        <h2>Work</h2>
        <div className="h-px flex-1 divider" />
        <Link
          href="/work/"
          className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-300 flex items-center gap-1 group"
        >
          View all
          <ArrowRightIcon className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
        {PROJECTS.map((project, index) => (
          <div key={project.slug} className={!showAll && index >= INITIAL_PROJECT_COUNT ? 'hidden' : undefined}>
            <ProjectCard project={project} index={index} maxTechnologies={3} />
          </div>
        ))}
      </div>

      {hasMoreProjects && (
        <div className="flex justify-center">
          <button
            onClick={() => setShowAll(!showAll)}
            aria-expanded={showAll}
            className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-300 flex items-center gap-2 group"
          >
            {showAll ? 'View less' : 'View more'}
            <ChevronIcon
              className={`w-4 h-4 transition-transform duration-300 ${showAll ? 'group-hover:-translate-y-0.5' : 'group-hover:translate-y-0.5'}`}
              direction={showAll ? 'up' : 'down'}
            />
          </button>
        </div>
      )}
    </section>
  );
}
