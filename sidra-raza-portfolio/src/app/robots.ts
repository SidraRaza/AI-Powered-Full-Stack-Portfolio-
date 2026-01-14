import { MetadataRoute } from 'next';

export function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: 'https://sidraraza.xyz/sitemap.xml',
  };
}