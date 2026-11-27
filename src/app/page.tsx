import { SiteHeader } from '@/components/SiteHeader';
import { WorkList } from '@/components/WorkList';
import { MediaList } from '@/components/MediaList';
import { ActivityGraph } from '@/components/ActivityGraph';
import { SocialLinks } from '@/components/SocialLinks';
import { WORK } from '@/data';

const SITE_URL = 'https://wezzcoetzee.com';
const PERSON_DESCRIPTION =
  'Engineer shipping agent tooling in the open: MCP servers, trading CLIs, browser and macOS helpers. Tech Lead at Idexx, based in Auckland.';

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
      'AI Agents',
      'Model Context Protocol',
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
      workExample: WORK.map((item) => ({
        '@type': 'CreativeWork',
        name: item.title,
        url: item.url,
      })),
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personData) }}
      />

      {/* Bottom padding clears the fixed glass dock (SocialLinks). */}
      <div className="mx-auto w-full max-w-3xl px-6 pt-10 pb-32 md:pt-14">
        <SiteHeader />

        <main id="main-content">
          <div className="fade-in mt-10 [animation-delay:80ms] md:mt-14">
            <h1>Building AI agents and the tools they run on</h1>
            <p className="mt-4 text-lg text-muted-foreground">
              Tech Lead at Idexx. Distributed systems and crypto infrastructure before that.
            </p>
          </div>

          <div className="divider fade-in my-10 [animation-delay:160ms] md:my-12" />

          <div className="fade-in space-y-12 [animation-delay:160ms]">
            <div className="grid grid-cols-1 items-start gap-x-10 gap-y-12 md:grid-cols-2">
              <WorkList />
              <MediaList />
            </div>
            <ActivityGraph />
          </div>
        </main>

        <footer>
          <SocialLinks />
        </footer>
      </div>
    </>
  );
}
