import { Metadata } from 'next';
import Link from 'next/link';
import { PROJECTS } from '@/data';
import { ProjectCard } from '@/components/ProjectCard';
import { ArrowLeftIcon } from '@/components/Icons';

export const metadata: Metadata = {
  title: 'Work',
  description:
    'Selected projects by Wesley Coetzee: Hyperliquid CLI, GRVT TypeScript SDK, Trading Lab, risk-management tooling, on-chain bots, and smart-contract security research.',
  alternates: { canonical: '/work/' },
  openGraph: {
    title: 'Work · Wesley Coetzee',
    description:
      'Selected projects: Hyperliquid CLI, GRVT TypeScript SDK, Trading Lab, risk-management tooling, on-chain bots, and smart-contract security research.',
    url: 'https://wezzcoetzee.com/work/',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Work · Wesley Coetzee',
    description:
      'Selected projects: Hyperliquid CLI, GRVT TypeScript SDK, Trading Lab, risk-management tooling, on-chain bots, and smart-contract security research.',
  },
};

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

      <main id="main-content" className="relative min-h-screen">
        <div className="container relative py-12 md:py-24">
          <div className="mx-auto w-full max-w-7xl space-y-16 md:space-y-20">
            <header className="space-y-6">
              <Link
                href="/"
                className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors duration-300 group"
              >
                <ArrowLeftIcon className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-1" />
                Back home
              </Link>

              <div className="space-y-4 max-w-3xl">
                <p className="section-marker">all projects · {PROJECTS.length}</p>
                <h1>Work</h1>
                <p className="text-xl text-muted-foreground leading-snug">
                  Open source tools, trading infrastructure, security research, and the side
                  projects in between.
                </p>
              </div>
            </header>

            <section>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                {PROJECTS.map((project, index) => (
                  <ProjectCard
                    key={project.slug}
                    project={project}
                    index={index}
                    headingLevel="h2"
                  />
                ))}
              </div>
            </section>
          </div>
        </div>
      </main>
    </>
  );
}
