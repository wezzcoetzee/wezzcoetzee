import Link from 'next/link';
import type { Project } from '@/data';
import { CornerBrackets } from './CornerBrackets';
import { ArrowRightIcon } from './Icons';

type ProjectCardProps = {
  project: Project;
  index: number;
  headingLevel?: 'h2' | 'h3';
  maxTechnologies?: number;
};

export function ProjectCard({
  project,
  index,
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
              <Heading className="font-display text-xl font-semibold transition-colors duration-300 leading-tight text-foreground">
                {project.title}
              </Heading>

              <div className="flex-shrink-0 transition-all duration-300 opacity-40 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1">
                <ArrowRightIcon className="w-5 h-5 text-muted-foreground" />
              </div>
            </div>

            <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
              {project.tagline}
            </p>

            <div className="flex flex-wrap gap-2">
              {visibleTech.map((tech) => (
                <span
                  key={tech}
                  className="inline-block px-2 py-0.5 text-xs font-medium border border-border text-muted-foreground"
                >
                  {tech}
                </span>
              ))}
              {overflowCount > 0 && (
                <span className="inline-block px-2 py-0.5 text-xs font-medium text-muted-foreground">
                  +{overflowCount}
                </span>
              )}
            </div>
          </div>
        </div>
      </CornerBrackets>
    </Link>
  );
}
