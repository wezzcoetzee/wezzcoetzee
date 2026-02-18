import Introduction from '@/components/Introduction';
import About from '@/components/About';
import FeaturedWork from '@/components/FeaturedWork';
import ConnectSection from '@/components/ConnectSection';
import { PROJECTS } from '@/data';

export default function Home() {
  const websiteData = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Wesley Coetzee',
    url: 'https://wezzcoetzee.com',
    description:
      'Tech Lead and Principal Software Engineer based in Auckland, NZ. Building scalable solutions and leading engineering teams.',
    author: {
      '@type': 'Person',
      name: 'Wesley Coetzee',
    },
  };

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Wesley Coetzee',
    jobTitle: ['Tech Lead', 'Principal Software Engineer'],
    description:
      'Tech Lead, and Principal Software Engineer based in Auckland, New Zealand. Passionate about crafting elegant, scalable solutions and empowering engineering teams to build exceptional products.',
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
      'Blockchain Development',
      'Cryptocurrency Trading',
    ],
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': 'https://wezzcoetzee.com',
    },
    hasOccupation: {
      '@type': 'Occupation',
      name: 'Software Engineer',
      occupationalCategory: '15-1252.00',
      workExample: PROJECTS.map((project) => ({
        '@type': 'CreativeWork',
        name: project.title,
        url: `https://wezzcoetzee.com/work/${project.slug}/`,
      })),
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <main id="main-content" className="relative min-h-screen">
        <div className="container relative mx-auto px-6 md:px-12 py-12 md:py-24">
          <div className="mx-auto w-full max-w-7xl space-y-16 md:space-y-24">
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
