import type { MetadataRoute } from 'next';

/**
 * Generate robots.txt for search engine crawlers
 * Allows all crawlers, specifies sitemap location
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      // Disallow admin/dashboard areas if needed
      // disallow: ['/admin/', '/dashboard/private/']
    },
    sitemap: 'https://sidraraza.xyz/sitemap.xml'
  };
}
