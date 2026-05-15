import Link from 'next/link';
import type { Project } from '@/data';
import { ArrowLeftIcon, CheckIcon, ExternalLinkIcon } from './Icons';

type CaseStudyProps = {
  project: Project;
};

export default function CaseStudy({ project }: CaseStudyProps) {
  return (
    <article className="space-y-16">
      <header className="space-y-8">
        <Link
          href="/work/"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors duration-300 group"
        >
          <ArrowLeftIcon className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-1" />
          Back to work
        </Link>

        <div className="space-y-6 max-w-3xl">
          <p className="section-marker">case study · {project.role.toLowerCase()}</p>

          <h1>{project.title}</h1>

          <p className="text-xl text-muted-foreground leading-snug">{project.tagline}</p>

          <div className="flex flex-wrap gap-x-3 gap-y-1 font-mono text-xs text-muted-foreground pt-2">
            {project.technologies.map((tech, i) => (
              <span key={tech}>
                {tech}
                {i < project.technologies.length - 1 && <span className="ml-3 text-border">·</span>}
              </span>
            ))}
          </div>
        </div>
      </header>

      <section className="space-y-6">
        <div className="flex items-baseline gap-4">
          <span className="section-marker">§ overview</span>
          <div className="h-px flex-1 divider self-center" />
        </div>
        <p className="text-foreground text-lg leading-relaxed max-w-3xl">{project.description}</p>
      </section>

      <section className="space-y-6">
        <div className="flex items-baseline gap-4">
          <span className="section-marker">§ highlights</span>
          <div className="h-px flex-1 divider self-center" />
        </div>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-4 max-w-4xl">
          {project.highlights.map((highlight, index) => (
            <li key={index} className="flex items-start gap-3 text-foreground">
              <CheckIcon className="w-5 h-5 text-muted-foreground flex-shrink-0 mt-0.5" />
              <span>{highlight}</span>
            </li>
          ))}
        </ul>
      </section>

      {project.links.length > 0 && (
        <section className="space-y-6">
          <div className="flex items-baseline gap-4">
            <span className="section-marker">§ links</span>
            <div className="h-px flex-1 divider self-center" />
          </div>
          <div className="flex flex-wrap gap-3">
            {project.links.map((link) => (
              <a
                key={link.url}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2 px-5 py-3 border border-border text-foreground hover:border-foreground transition-colors duration-300"
              >
                <span>{link.label}</span>
                <ExternalLinkIcon className="w-4 h-4 text-muted-foreground transition-all duration-300 group-hover:text-foreground group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
