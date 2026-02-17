import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { PROJECTS } from '@/data';
import CaseStudy from '@/components/CaseStudy';

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return PROJECTS.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = PROJECTS.find((p) => p.slug === slug);

  if (!project) {
    return {
      title: 'Project Not Found',
    };
  }

  return {
    title: project.title,
    description: project.description,
    alternates: {
      canonical: `/work/${project.slug}/`,
    },
    openGraph: {
      title: `${project.title} | Wesley Coetzee`,
      description: project.description,
      url: `https://wezzcoetzee.com/work/${project.slug}/`,
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${project.title} | Wesley Coetzee`,
      description: project.description,
    },
  };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = PROJECTS.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    name: project.title,
    description: project.description,
    url: `https://wezzcoetzee.com/work/${project.slug}/`,
    author: {
      '@type': 'Person',
      name: 'Wesley Coetzee',
      url: 'https://wezzcoetzee.com',
    },
    keywords: project.technologies.join(', '),
    ...(project.dateCreated && { dateCreated: project.dateCreated }),
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://wezzcoetzee.com/work/${project.slug}/`,
    },
  };

  const breadcrumbData = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://wezzcoetzee.com',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Work',
        item: 'https://wezzcoetzee.com/work/',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: project.title,
        item: `https://wezzcoetzee.com/work/${project.slug}/`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbData) }}
      />

      <main id="main-content" className="relative min-h-screen">
        <div className="container relative mx-auto px-6 md:px-12 py-12 md:py-24">
          <div className="mx-auto w-full max-w-7xl">
            <CaseStudy project={project} />
          </div>
        </div>
      </main>
    </>
  );
}
