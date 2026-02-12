import { MetadataRoute } from 'next';
import { SitemapEntry } from './sitemap-entry';

export class Sitemap {
  readonly entries: SitemapEntry[];
  readonly version: string = '0.9';
  readonly xmlns: string = 'http://www.sitemaps.org/schemas/sitemap/0.9';

  constructor(entries: SitemapEntry[]) {
    if (entries.length === 0) {
      throw new Error('Sitemap must contain at least one entry');
    }

    if (entries.length > 50000) {
      throw new Error('Sitemap must not exceed 50,000 entries');
    }

    this.entries = entries;
  }

  /**
   * Adds a new entry to the sitemap
   * @param entry The entry to add
   */
  addEntry(entry: SitemapEntry): void {
    if (this.entries.length >= 50000) {
      throw new Error('Sitemap must not exceed 50,000 entries');
    }
    this.entries.push(entry);
  }

  /**
   * Converts the Sitemap to a format compatible with Next.js sitemap
   * @returns An array of Next.js sitemap-compatible objects
   */
  toNextJsSitemapFormat(): MetadataRoute.Sitemap {
    return this.entries.map(entry => entry.toNextJsSitemapFormat());
  }

  /**
   * Validates the sitemap according to sitemap protocol specifications
   * @returns True if the sitemap is valid, false otherwise
   */
  validate(): boolean {
    // Check that we have at least one entry
    if (this.entries.length === 0) {
      return false;
    }

    // Check that we don't exceed 50,000 entries
    if (this.entries.length > 50000) {
      return false;
    }

    // Validate each entry
    for (const entry of this.entries) {
      if (!this.isValidUrl(entry.url)) {
        return false;
      }

      // Check priority range
      if (entry.priority !== undefined && (entry.priority < 0 || entry.priority > 1)) {
        return false;
      }
    }

    return true;
  }

  /**
   * Validates if a URL is properly formatted
   * @param url The URL to validate
   * @returns True if the URL is valid, false otherwise
   */
  private isValidUrl(url: string): boolean {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Generates a sitemap in XML format
   * @returns A properly formatted sitemap XML string
   */
  toXml(): string {
    let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
    xml += `<urlset xmlns="${this.xmlns}">\n`;
    
    for (const entry of this.entries) {
      xml += '  <url>\n';
      xml += `    <loc>${entry.url}</loc>\n`;
      
      if (entry.lastModified) {
        const dateStr = typeof entry.lastModified === 'string' 
          ? entry.lastModified 
          : new Date(entry.lastModified).toISOString().split('T')[0];
        xml += `    <lastmod>${dateStr}</lastmod>\n`;
      }
      
      if (entry.changeFrequency) {
        xml += `    <changefreq>${entry.changeFrequency}</changefreq>\n`;
      }
      
      if (entry.priority !== undefined) {
        xml += `    <priority>${entry.priority.toFixed(1)}</priority>\n`;
      }
      
      xml += '  </url>\n';
    }
    
    xml += '</urlset>';
    
    return xml;
  }
}