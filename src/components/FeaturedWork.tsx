import Link from 'next/link';
import { PROJECTS } from '@/data';
import { ProjectCard } from './ProjectCard';
import { ArrowRightIcon } from './Icons';

const FEATURED_COUNT = 4;

export default function FeaturedWork() {
  const featured = PROJECTS.slice(0, FEATURED_COUNT);

  return (
    <section className="space-y-10">
      <div className="flex items-baseline gap-4">
        <span className="section-marker">§ 02</span>
        <h2>Selected work</h2>
        <div className="h-px flex-1 divider self-center" />
        <Link
          href="/work/"
          className="text-sm text-muted-foreground hover:text-foreground transition-colors inline-flex items-center gap-1 group whitespace-nowrap"
        >
          All projects
          <ArrowRightIcon className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
        {featured.map((project) => (
          <ProjectCard key={project.slug} project={project} maxTechnologies={3} />
        ))}
      </div>
    </section>
  );
}
