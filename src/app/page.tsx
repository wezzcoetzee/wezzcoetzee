import SocialCard from '@/components/SocialCard';
import { CONTACTS, TOOLS } from '@/data';
import Introduction from '@/components/Introduction';

export default function Home() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Wesley Coetzee',
    jobTitle: ['Tech Lead', 'Software Engineer', 'Engineering Manager'],
    description:
      'Tech Lead, Software Engineer, and Engineering Manager based in Auckland, New Zealand. Passionate about crafting elegant, scalable solutions and empowering engineering teams to build exceptional products.',
    url: 'https://wezzcoetzee.com',
    image: 'https://avatars.githubusercontent.com/u/15249642?v=4',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Auckland',
      addressCountry: 'NZ',
    },
    sameAs: [
      'https://www.linkedin.com/in/wesleycoetzee/',
      'https://github.com/wezzcoetzee',
      'https://medium.com/@wezzcoetzee',
      'https://x.com/wezzcoetzee',
      'https://stackoverflow.com/users/5658060/wesley-coetzee',
    ],
    knowsAbout: [
      'Software Engineering',
      'Technical Leadership',
      'Engineering Management',
      'Scalable Solutions',
      'Web Development',
      'Full Stack Development',
    ],
  };

  return (
    <>
      {/* Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      {/* Skip to main content link for screen readers */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-primary text-primary-foreground px-4 py-2 z-50 focus:outline-none focus:ring-2 focus:ring-primary"
      >
        Skip to main content
      </a>

      <main id="main-content" className="relative min-h-screen">
        <div className="container relative mx-auto px-6 md:px-12 py-12 md:py-24">
          <div className="mx-auto w-full max-w-7xl space-y-16 md:space-y-24">
            {/* Introduction Section */}
            <Introduction />

            {/* Social Links Section */}
            <section className="space-y-8">
              <div className="flex items-center gap-4">
                <h2 className="text-2xl md:text-3xl font-display font-semibold">Connect</h2>
                <div className="h-px flex-1 section-divider" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                {CONTACTS.map((contact, index) => (
                  <SocialCard key={`contact-${index}`} contact={contact} index={index} />
                ))}
              </div>
            </section>

            {/* Tools Section */}
            <section className="space-y-8">
              <div className="flex items-center gap-4">
                <h2 className="text-2xl md:text-3xl font-display font-semibold">Tools</h2>
                <div className="h-px flex-1 section-divider" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                {TOOLS.map((tool, index) => (
                  <SocialCard key={`tool-${index}`} contact={tool} index={index} />
                ))}
              </div>
            </section>

            {/* Footer accent */}
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

        {/* Chrome background accent element */}
        <div className="fixed bottom-0 right-0 w-96 h-96 rounded-full blur-3xl -z-10 pointer-events-none bg-accent-orb" />
      </main>
    </>
  );
}
