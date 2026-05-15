import Link from 'next/link';
import type { Project } from '@/data';
import { ArrowRightIcon } from './Icons';

type ProjectCardProps = {
  project: Project;
  headingLevel?: 'h2' | 'h3';
  maxTechnologies?: number;
};

export function ProjectCard({
  project,
  headingLevel: Heading = 'h3',
  maxTechnologies,
}: ProjectCardProps) {
  const visibleTech = maxTechnologies
    ? project.technologies.slice(0, maxTechnologies)
    : project.technologies;
  const overflowCount = maxTechnologies
    ? Math.max(0, project.technologies.length - maxTechnologies)
    : 0;

  return (
    <Link
      href={`/work/${project.slug}/`}
      className="group relative block w-full h-full text-left"
    >
      <div className="card-minimal p-6 h-full">
        <div className="space-y-4">
          <div className="flex items-start justify-between gap-3">
            <Heading className="leading-tight text-foreground transition-colors duration-300">
              {project.title}
            </Heading>

            <div className="flex-shrink-0 text-muted-foreground opacity-30 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1">
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
