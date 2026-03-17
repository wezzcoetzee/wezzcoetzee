import { Metadata } from 'next';
import Link from 'next/link';
import { PROJECTS } from '@/data';
import { ProjectCard } from '@/components/ProjectCard';
import { ArrowLeftIcon } from '@/components/Icons';

export const metadata: Metadata = {
  title: 'Work',
  description:
    'Portfolio of projects by Wesley Coetzee - GRVT TypeScript SDK, Trading Lab, Email Verification Service, Risk Management Tools, Solana DCA Bot, and more.',
  alternates: {
    canonical: '/work/',
  },
  openGraph: {
    title: 'Work | Wesley Coetzee',
    description:
      'Portfolio of projects by Wesley Coetzee - GRVT TypeScript SDK, Trading Lab, Email Verification Service, Risk Management Tools, Solana DCA Bot, and more.',
    url: 'https://wezzcoetzee.com/work/',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Work | Wesley Coetzee',
    description:
      'Portfolio of projects by Wesley Coetzee - GRVT TypeScript SDK, Trading Lab, Email Verification Service, Risk Management Tools, Solana DCA Bot, and more.',
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
                <ArrowLeftIcon className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-1" />
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
