import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  
  return [
    {
      url: 'https://api.forg.to',
      lastModified,
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: 'https://api.forg.to/docs',
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    // Adding deep links to sitemap to help index sections
    {
      url: 'https://api.forg.to/docs#authentication',
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: 'https://api.forg.to/docs#products',
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: 'https://api.forg.to/docs#users',
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
  ];
}
