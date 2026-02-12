import { MetadataRoute } from 'next';

export class SitemapEntry {
  readonly url: string;
  readonly lastModified?: Date | string;
  readonly changeFrequency?: MetadataRoute.Sitemap['0']['changeFrequency'];
  readonly priority?: number;

  constructor(
    url: string,
    lastModified?: Date | string,
    changeFrequency?: MetadataRoute.Sitemap['0']['changeFrequency'],
    priority?: number
  ) {
    if (!this.isValidUrl(url)) {
      throw new Error(`Invalid URL: ${url}`);
    }

    if (priority !== undefined && (priority < 0 || priority > 1)) {
      throw new Error(`Priority must be between 0 and 1: ${priority}`);
    }

    this.url = url;
    this.lastModified = lastModified;
    this.changeFrequency = changeFrequency;
    this.priority = priority;
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
   * Converts the SitemapEntry to a format compatible with Next.js sitemap
   * @returns A Next.js sitemap-compatible object
   */
  toNextJsSitemapFormat(): MetadataRoute.Sitemap[number] {
    return {
      url: this.url,
      lastModified: this.lastModified ? new Date(this.lastModified) : undefined,
      changeFrequency: this.changeFrequency,
      priority: this.priority,
    };
  }
}