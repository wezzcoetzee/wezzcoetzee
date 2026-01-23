import { MetadataRoute } from 'next';
import { PROJECTS } from '@/data';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://wezzcoetzee.com';

  const projectPages = PROJECTS.map((project) => ({
    url: `${baseUrl}/work/${project.slug}/`,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [
    {
      url: baseUrl,
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: `${baseUrl}/work/`,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    ...projectPages,
  ];
}
