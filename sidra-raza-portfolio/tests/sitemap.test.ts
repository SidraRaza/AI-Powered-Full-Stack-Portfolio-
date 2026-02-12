import { isValidUrl, generateSitemap, SitemapOptions } from '../src/lib/sitemap-generator';

describe('Sitemap Generator', () => {
  describe('isValidUrl', () => {
    it('should return true for valid URLs', () => {
      expect(isValidUrl('https://example.com')).toBe(true);
      expect(isValidUrl('http://example.com')).toBe(true);
      expect(isValidUrl('https://example.com/path')).toBe(true);
    });

    it('should return false for invalid URLs', () => {
      expect(isValidUrl('not-a-url')).toBe(false);
      expect(isValidUrl('')).toBe(false);
      expect(isValidUrl('htp://example.com')).toBe(false);
    });
  });

  describe('generateSitemap', () => {
    it('should generate a valid sitemap XML', () => {
      const options: SitemapOptions = {
        hostname: 'https://example.com',
        entries: [
          {
            url: 'https://example.com/',
            lastModified: '2023-01-01',
            changeFrequency: 'daily',
            priority: 1.0
          }
        ]
      };

      const sitemap = generateSitemap(options);
      
      expect(sitemap).toContain('<?xml version="1.0" encoding="UTF-8"?>');
      expect(sitemap).toContain('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">');
      expect(sitemap).toContain('<loc>https://example.com/</loc>');
      expect(sitemap).toContain('<lastmod>2023-01-01</lastmod>');
      expect(sitemap).toContain('<changefreq>daily</changefreq>');
      expect(sitemap).toContain('<priority>1.0</priority>');
    });

    it('should handle optional fields correctly', () => {
      const options: SitemapOptions = {
        hostname: 'https://example.com',
        entries: [
          {
            url: 'https://example.com/page'
          }
        ]
      };

      const sitemap = generateSitemap(options);
      
      expect(sitemap).toContain('<loc>https://example.com/page</loc>');
      expect(sitemap).not.toContain('<lastmod>');
      expect(sitemap).not.toContain('<changefreq>');
      expect(sitemap).not.toContain('<priority>');
    });

    it('should format dates correctly', () => {
      const date = new Date('2023-05-15T10:30:00Z');
      const options: SitemapOptions = {
        hostname: 'https://example.com',
        entries: [
          {
            url: 'https://example.com/',
            lastModified: date
          }
        ]
      };

      const sitemap = generateSitemap(options);
      
      expect(sitemap).toContain('<lastmod>2023-05-15</lastmod>');
    });
  });
});