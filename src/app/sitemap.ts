import { MetadataRoute } from 'next';
import { PROJECTS } from '@/data';

export const dynamic = 'force-static';

const DEFAULT_DATE = '2023-05-01';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://wezzcoetzee.com';

  const mostRecentDate = PROJECTS.reduce((latest, project) => {
    const date = project.dateCreated ?? DEFAULT_DATE;
    return date > latest ? date : latest;
  }, DEFAULT_DATE);

  const projectPages = PROJECTS.map((project) => ({
    url: `${baseUrl}/work/${project.slug}/`,
    lastModified: new Date(project.dateCreated ?? DEFAULT_DATE),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [
    {
      url: `${baseUrl}/`,
      lastModified: new Date(mostRecentDate),
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: `${baseUrl}/work/`,
      lastModified: new Date(mostRecentDate),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    ...projectPages,
  ];
}
