import { Metadata } from 'next';
import Link from 'next/link';
import { PROJECTS } from '@/data';

export const metadata: Metadata = {
  title: 'Work',
  description:
    'Portfolio of projects by Wesley Coetzee - Email Verification Service, Risk Management Tools, Solana DCA Bot, and more.',
  alternates: {
    canonical: '/work/',
  },
  openGraph: {
    title: 'Work | Wesley Coetzee',
    description:
      'Portfolio of projects by Wesley Coetzee - Email Verification Service, Risk Management Tools, Solana DCA Bot, and more.',
    url: 'https://wezzcoetzee.com/work/',
  },
};

function ProjectCard({
  project,
  index,
}: {
  project: (typeof PROJECTS)[number];
  index: number;
}) {
  return (
    <Link
      href={`/work/${project.slug}/`}
      className="group relative block w-full text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background overflow-hidden"
      style={{
        opacity: 0,
        animation: `fadeInUp 0.6s ease-out ${0.1 + index * 0.1}s forwards`,
      }}
    >
      <div className="relative bg-card card-interactive p-6">
        <div className="card-shadow-offset" />

        <div className="space-y-4">
          <div className="flex items-start justify-between gap-3">
            <h2 className="font-display text-xl font-semibold transition-all duration-300 leading-tight text-secondary group-hover:text-foreground group-hover:[text-shadow:0_0_10px_rgb(var(--color-chrome-glow)/0.5)]">
              {project.title}
            </h2>

            <div className="flex-shrink-0 transition-all duration-300 opacity-40 group-hover:opacity-100 group-hover:translate-x-1 group-hover:-translate-y-1">
              <svg
                className="w-5 h-5 text-secondary group-hover:[filter:drop-shadow(0_0_5px_rgb(var(--color-chrome-highlight)/0.6))]"
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

          <p className="text-sm text-muted-foreground leading-relaxed">
            {project.tagline}
          </p>

          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="inline-block px-2 py-0.5 text-xs font-medium chrome-pill border"
              >
                <span className="chrome-text">{tech}</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
}

export default function WorkPage() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Work by Wesley Coetzee',
    description:
      'Portfolio of projects by Wesley Coetzee including open source tools and side projects.',
    url: 'https://wezzcoetzee.com/work/',
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: PROJECTS.map((project, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        item: {
          '@type': 'CreativeWork',
          name: project.title,
          description: project.tagline,
          url: `https://wezzcoetzee.com/work/${project.slug}/`,
        },
      })),
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <main className="relative min-h-screen">
        <div className="container relative mx-auto px-6 md:px-12 py-12 md:py-24">
          <div className="mx-auto w-full max-w-7xl space-y-16 md:space-y-24">
            <header className="space-y-6">
              <Link
                href="/"
                className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-300 group"
                style={{
                  opacity: 0,
                  animation: 'fadeInUp 0.6s ease-out forwards',
                }}
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
                Back home
              </Link>

              <div
                style={{
                  opacity: 0,
                  animation: 'fadeInUp 0.6s ease-out 0.1s forwards',
                }}
              >
                <h1>Work</h1>
                <p className="text-xl text-muted-foreground max-w-2xl mt-4">
                  A collection of projects I&apos;ve built - from open source tools to
                  side projects exploring different technologies.
                </p>
              </div>
            </header>

            <section className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                {PROJECTS.map((project, index) => (
                  <ProjectCard
                    key={project.slug}
                    project={project}
                    index={index}
                  />
                ))}
              </div>
            </section>

            <div className="pt-12 pb-6">
              <div className="flex items-center justify-center gap-3 text-sm">
                <div className="w-8 h-px chrome-shimmer footer-accent" />
                <span className="font-medium tracking-wide chrome-text text-sm">
                  Built with precision
                </span>
                <div className="w-8 h-px chrome-shimmer footer-accent" />
              </div>
            </div>
          </div>
        </div>

        <div className="fixed bottom-0 right-0 w-96 h-96 rounded-full blur-3xl -z-10 pointer-events-none bg-accent-orb" />
      </main>
    </>
  );
}
