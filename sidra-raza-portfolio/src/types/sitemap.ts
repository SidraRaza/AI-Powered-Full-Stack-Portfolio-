import { MetadataRoute } from 'next';

export interface SitemapEntry {
  url: string;
  lastModified?: Date | string;
  changeFrequency?: MetadataRoute.Sitemap['0']['changeFrequency'];
  priority?: number;
}

export interface Sitemap {
  entries: SitemapEntry[];
  version: string;
  xmlns: string;
}

export interface SitemapInfo {
  lastGenerated: Date;
  totalUrls: number;
  status: 'valid' | 'invalid' | 'pending';
}