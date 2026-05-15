import Introduction from '@/components/Introduction';
import About from '@/components/About';
import FeaturedWork from '@/components/FeaturedWork';
import ConnectSection from '@/components/ConnectSection';
import { PROJECTS } from '@/data';

const SITE_URL = 'https://wezzcoetzee.com';
const PERSON_DESCRIPTION =
  'I build highly scalable distributed systems, and lead the engineering teams that ship them. Auckland-based, remote anywhere.';

export default function Home() {
  const personData = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Wesley Coetzee',
    jobTitle: ['Tech Lead', 'Principal Software Engineer'],
    description: PERSON_DESCRIPTION,
    url: SITE_URL,
    image: `${SITE_URL}/avatar.jpg`,
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
      'Distributed Systems',
      'Event-Driven Architecture',
      'Technical Leadership',
      'Crypto Infrastructure',
      'Smart Contract Security',
      'Blockchain Development',
      'Full Stack Development',
    ],
    mainEntityOfPage: { '@type': 'WebPage', '@id': SITE_URL },
    hasOccupation: {
      '@type': 'Occupation',
      name: 'Software Engineer',
      occupationalCategory: '15-1252.00',
      workExample: PROJECTS.map((project) => ({
        '@type': 'CreativeWork',
        name: project.title,
        url: `${SITE_URL}/work/${project.slug}/`,
      })),
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personData) }}
      />

      <main id="main-content" className="relative min-h-screen">
        <div className="container relative py-12 md:py-24">
          <div className="mx-auto w-full max-w-5xl space-y-20 md:space-y-28">
            <Introduction />

            <section id="about">
              <About />
            </section>

            <section id="work">
              <FeaturedWork />
            </section>

            <section id="connect">
              <ConnectSection />
            </section>
          </div>
        </div>
      </main>
    </>
  );
}
