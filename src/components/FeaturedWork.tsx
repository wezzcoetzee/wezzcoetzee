import Link from 'next/link';
import { PROJECTS } from '@/data';
import { ProjectCard } from './ProjectCard';
import { Reveal } from './Reveal';
import { ArrowRightIcon } from './Icons';

const FEATURED_COUNT = 4;

export default function FeaturedWork() {
  const [lead, ...rest] = PROJECTS.slice(0, FEATURED_COUNT);

  return (
    <section className="space-y-10">
      <div className="flex items-baseline justify-between gap-4">
        <h2>Selected work</h2>
        <Link
          href="/work/"
          className="text-sm text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1 group whitespace-nowrap"
        >
          All projects
          <ArrowRightIcon className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
      </div>

      <div className="space-y-6 md:space-y-8">
        {lead && (
          <Reveal index={0}>
            <ProjectCard project={lead} variant="lead" />
          </Reveal>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {rest.map((project, i) => (
            <Reveal key={project.slug} index={i + 1} className="h-full">
              <ProjectCard project={project} maxTechnologies={2} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
