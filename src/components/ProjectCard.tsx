import Link from 'next/link';
import type { Project } from '@/data';
import { ArrowRightIcon } from './Icons';

type ProjectCardProps = {
  project: Project;
  headingLevel?: 'h2' | 'h3';
  maxTechnologies?: number;
  variant?: 'grid' | 'lead';
};

export function ProjectCard({
  project,
  headingLevel: Heading = 'h3',
  maxTechnologies,
  variant = 'grid',
}: ProjectCardProps) {
  const visibleTech = maxTechnologies
    ? project.technologies.slice(0, maxTechnologies)
    : project.technologies;
  const overflowCount = maxTechnologies
    ? Math.max(0, project.technologies.length - maxTechnologies)
    : 0;

  if (variant === 'lead') {
    const outcome = project.highlights[0];

    return (
      <Link href={`/work/${project.slug}/`} className="group relative block w-full text-left">
        <div className="card-minimal p-6 md:p-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-x-8 gap-y-6">
            <div className="md:col-span-8 space-y-4">
              <div className="flex items-start justify-between gap-4">
                <Heading className="text-xl md:text-2xl tracking-[-0.02em] leading-tight text-foreground">
                  {project.title}
                </Heading>
                <div className="flex-shrink-0 mt-1 text-muted-foreground transition-all duration-300 group-hover:text-foreground group-hover:translate-x-1 group-hover:-translate-y-1">
                  <ArrowRightIcon className="w-5 h-5" />
                </div>
              </div>

              <p className="text-base text-muted-foreground leading-relaxed">{project.tagline}</p>

              {outcome && <p className="text-sm text-foreground leading-relaxed">{outcome}</p>}
            </div>

            <div className="md:col-span-4 md:border-l md:border-border md:pl-6 space-y-5">
              <div>
                <dt className="font-mono text-xs text-muted-foreground tracking-wide mb-1">role</dt>
                <dd className="text-sm text-foreground">{project.role}</dd>
              </div>
              <div>
                <dt className="font-mono text-xs text-muted-foreground tracking-wide mb-2">
                  built with
                </dt>
                <dd className="flex flex-wrap gap-x-3 gap-y-1 font-mono text-xs text-muted-foreground">
                  {project.technologies.map((tech, i) => (
                    <span key={tech}>
                      {tech}
                      {i < project.technologies.length - 1 && (
                        <span className="ml-3 text-border">·</span>
                      )}
                    </span>
                  ))}
                </dd>
              </div>
            </div>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link href={`/work/${project.slug}/`} className="group relative block w-full h-full text-left">
      <div className="card-minimal p-6 h-full">
        <div className="space-y-4">
          <div className="flex items-start justify-between gap-3">
            <Heading className="leading-tight text-foreground transition-colors duration-300">
              {project.title}
            </Heading>

            <div className="flex-shrink-0 text-muted-foreground transition-all duration-300 group-hover:text-foreground group-hover:translate-x-1 group-hover:-translate-y-1">
              <ArrowRightIcon className="w-5 h-5" />
            </div>
          </div>

          <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
            {project.tagline}
          </p>

          <div className="flex flex-wrap gap-x-3 gap-y-1 font-mono text-xs text-muted-foreground">
            {visibleTech.map((tech, i) => (
              <span key={tech}>
                {tech}
                {i < visibleTech.length - 1 && <span className="ml-3 text-border">·</span>}
              </span>
            ))}
            {overflowCount > 0 && (
              <span>
                <span className="mr-3 text-border">·</span>+{overflowCount}
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
