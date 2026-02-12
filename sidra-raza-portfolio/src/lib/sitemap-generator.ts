import { MetadataRoute } from 'next';

export interface SitemapEntry {
  url: string;
  lastModified?: Date | string;
  changeFrequency?: MetadataRoute.Sitemap['0']['changeFrequency'];
  priority?: number;
}

export interface SitemapOptions {
  hostname: string;
  entries: SitemapEntry[];
}

/**
 * Generates a sitemap in the format required by the sitemap protocol
 * @param options Configuration options for the sitemap
 * @returns A properly formatted sitemap XML string
 */
export function generateSitemap(options: SitemapOptions): string {
  const { hostname, entries } = options;
  
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
  
  entries.forEach(entry => {
    xml += '  <url>\n';
    xml += `    <loc>${entry.url}</loc>\n`;
    
    if (entry.lastModified) {
      const dateStr = typeof entry.lastModified === 'string' 
        ? entry.lastModified 
        : entry.lastModified.toISOString().split('T')[0];
      xml += `    <lastmod>${dateStr}</lastmod>\n`;
    }
    
    if (entry.changeFrequency) {
      xml += `    <changefreq>${entry.changeFrequency}</changefreq>\n`;
    }
    
    if (entry.priority !== undefined) {
      xml += `    <priority>${entry.priority.toFixed(1)}</priority>\n`;
    }
    
    xml += '  </url>\n';
  });
  
  xml += '</urlset>';
  
  return xml;
}

/**
 * Validates if a URL is properly formatted
 * @param url The URL to validate
 * @returns True if the URL is valid, false otherwise
 */
export function isValidUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}