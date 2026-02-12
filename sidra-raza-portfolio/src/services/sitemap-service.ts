import { MetadataRoute } from 'next';
import { Sitemap } from '../models/sitemap';
import { SitemapEntry } from '../models/sitemap-entry';

export class SitemapService {
  /**
   * Generates a sitemap for the website
   * @returns A Next.js sitemap-compatible array
   */
  static generateSitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://sidraraza.xyz';

    const routes = [
      { path: '', priority: 1, changeFreq: 'daily' as const },
      { path: '/about', priority: 0.8, changeFreq: 'weekly' as const },
      { path: '/services', priority: 0.8, changeFreq: 'weekly' as const },
      { path: '/skills', priority: 0.8, changeFreq: 'weekly' as const },
      { path: '/projects', priority: 0.9, changeFreq: 'weekly' as const },
      { path: '/agents', priority: 0.8, changeFreq: 'weekly' as const },
      { path: '/agents/ai-assistant', priority: 0.7, changeFreq: 'weekly' as const },
      { path: '/agents/business-validator', priority: 0.7, changeFreq: 'weekly' as const },
      { path: '/agents/content-strategist', priority: 0.7, changeFreq: 'weekly' as const },
      { path: '/agents/proposal-generator', priority: 0.7, changeFreq: 'weekly' as const },
      { path: '/contact', priority: 0.9, changeFreq: 'weekly' as const },
    ];

    const entries = routes.map(route => {
      return new SitemapEntry(
        `${baseUrl}${route.path}`,
        new Date(),
        route.changeFreq,
        route.priority
      );
    });

    const sitemap = new Sitemap(entries);
    
    // Log sitemap validation status
    const isValid = sitemap.validate();
    if (!isValid) {
      console.error('Generated sitemap is invalid according to sitemap protocol specifications');
    } else {
      console.log('Generated sitemap is valid according to sitemap protocol specifications');
    }

    return sitemap.toNextJsSitemapFormat();
  }

  /**
   * Validates the XML format of a sitemap according to sitemap protocol specifications
   * @param xml The XML string to validate
   * @returns True if the XML format is valid, false otherwise
   */
  static validateXmlFormat(xml: string): boolean {
    // Check that the XML declaration is present
    if (!xml.startsWith('<?xml version="1.0" encoding="UTF-8"?>')) {
      console.error('Missing XML declaration');
      return false;
    }

    // Check that the root element is urlset with the correct namespace
    if (!xml.includes('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">')) {
      console.error('Missing or incorrect urlset element with namespace');
      return false;
    }

    // Check that the root element is properly closed
    if (!xml.endsWith('</urlset>')) {
      console.error('Missing closing urlset tag');
      return false;
    }

    // Check that each URL entry has required loc element
    const urlMatches = xml.match(/<url>([\s\S]*?)<\/url>/g);
    if (urlMatches) {
      for (const urlMatch of urlMatches) {
        if (!urlMatch.includes('<loc>')) {
          console.error('Missing loc element in URL entry');
          return false;
        }

        // Extract the URL from the loc element to validate it
        const locMatch = urlMatch.match(/<loc>(.*?)<\/loc>/);
        if (locMatch && locMatch[1]) {
          const url = locMatch[1];
          if (!this.isValidUrl(url)) {
            console.error(`Invalid URL in loc element: ${url}`);
            return false;
          }
        }
      }
    }

    // Check that priority values are within the valid range (0.0 to 1.0)
    const priorityMatches = xml.match(/<priority>(.*?)<\/priority>/g);
    if (priorityMatches) {
      for (const priorityMatch of priorityMatches) {
        const priorityValue = priorityMatch.replace(/<priority>|<\/priority>/g, '');
        const priorityNum = parseFloat(priorityValue);
        if (isNaN(priorityNum) || priorityNum < 0.0 || priorityNum > 1.0) {
          console.error(`Invalid priority value: ${priorityValue}. Must be between 0.0 and 1.0`);
          return false;
        }
      }
    }

    // Check that change frequency values are valid
    const changeFreqMatches = xml.match(/<changefreq>(.*?)<\/changefreq>/g);
    if (changeFreqMatches) {
      const validChangeFreqs = ['always', 'hourly', 'daily', 'weekly', 'monthly', 'yearly', 'never'];
      for (const changeFreqMatch of changeFreqMatches) {
        const changeFreqValue = changeFreqMatch.replace(/<changefreq>|<\/changefreq>/g, '');
        if (!validChangeFreqs.includes(changeFreqValue)) {
          console.error(`Invalid change frequency value: ${changeFreqValue}. Must be one of: ${validChangeFreqs.join(', ')}`);
          return false;
        }
      }
    }

    return true;
  }

  /**
   * Validates if the sitemap complies with Google Search Console requirements
   * @param sitemap The sitemap to validate
   * @returns True if the sitemap is compliant, false otherwise
   */
  static validateForGoogleSearchConsole(sitemap: MetadataRoute.Sitemap): boolean {
    // Check that we have at least one entry
    if (sitemap.length === 0) {
      console.error('Sitemap must contain at least one URL');
      return false;
    }

    // Check that we don't exceed 50,000 entries
    if (sitemap.length > 50000) {
      console.error('Sitemap must not exceed 50,000 URLs');
      return false;
    }

    // Validate each URL
    for (const entry of sitemap) {
      if (!this.isValidUrl(entry.url)) {
        console.error(`Invalid URL in sitemap: ${entry.url}`);
        return false;
      }

      // Check priority range
      if (entry.priority !== undefined && (entry.priority < 0 || entry.priority > 1)) {
        console.error(`Priority must be between 0 and 1: ${entry.priority}`);
        return false;
      }

      // Check that lastModified is a valid date if provided
      if (entry.lastModified) {
        const date = new Date(entry.lastModified);
        if (isNaN(date.getTime())) {
          console.error(`Invalid date format for lastModified: ${entry.lastModified}`);
          return false;
        }
      }
    }

    return true;
  }

  /**
   * Logs sitemap access for monitoring and analytics
   * @param userAgent The user agent accessing the sitemap
   * @param ip The IP address of the requester
   */
  static logSitemapAccess(userAgent: string, ip: string): void {
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] Sitemap accessed by: ${userAgent} from IP: ${ip}`);
  }

  /**
   * Validates if a URL is properly formatted
   * @param url The URL to validate
   * @returns True if the URL is valid, false otherwise
   */
  private static isValidUrl(url: string): boolean {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  }
}