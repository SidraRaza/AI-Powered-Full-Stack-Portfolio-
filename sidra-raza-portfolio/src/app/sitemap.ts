import { MetadataRoute } from 'next';
import { SitemapService } from '@/services/sitemap-service';
import { AutoSitemapService } from '@/services/auto-sitemap-service';

// Cache the sitemap for 1 hour to improve performance
let cachedSitemap: MetadataRoute.Sitemap | null = null;
let cacheTimestamp: number | null = null;
const CACHE_DURATION = 60 * 60 * 1000; // 1 hour in milliseconds

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  try {
    // Check if we have a valid cached sitemap
    if (cachedSitemap && cacheTimestamp) {
      const now = Date.now();
      if (now - cacheTimestamp < CACHE_DURATION) {
        console.log('Returning cached sitemap');
        return cachedSitemap;
      }
    }

    // Generate the sitemap using our service
    let sitemap = SitemapService.generateSitemap();

    // Update the sitemap with any changes from automatic page discovery
    sitemap = await AutoSitemapService.updateSitemapWithChanges(sitemap);

    // Validate the sitemap for Google Search Console compliance
    const isValid = SitemapService.validateForGoogleSearchConsole(sitemap);
    
    if (!isValid) {
      console.error('Generated sitemap is not compliant with Google Search Console requirements');
    } else {
      console.log('Generated sitemap is compliant with Google Search Console requirements');
    }

    // Cache the generated sitemap
    cachedSitemap = sitemap;
    cacheTimestamp = Date.now();

    return sitemap;
  } catch (error) {
    console.error('Error generating sitemap:', error);
    
    // Fallback to a minimal sitemap in case of error
    return [
      {
        url: 'https://sidraraza.xyz',
        lastModified: new Date(),
        changeFrequency: 'yearly',
        priority: 1,
      },
    ];
  }
}
