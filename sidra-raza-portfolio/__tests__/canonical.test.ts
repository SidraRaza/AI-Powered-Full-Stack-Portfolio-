/**
 * Test suite for canonical tag verification
 */

import { generateCanonicalUrl, isValidUrl, isValidCanonicalReference } from '@/lib/canonical';
import { siteConfig } from '@/lib/config/site';

describe('Canonical URL Utilities', () => {
  describe('generateCanonicalUrl', () => {
    it('should generate a proper canonical URL with the site base URL', () => {
      const path = '/test-page';
      const expected = `${siteConfig.url}/test-page`;
      expect(generateCanonicalUrl(path)).toBe(expected);
    });

    it('should normalize paths that start without a slash', () => {
      const path = 'test-page';
      const expected = `${siteConfig.url}/test-page`;
      expect(generateCanonicalUrl(path)).toBe(expected);
    });

    it('should remove trailing slashes except for root path', () => {
      const path = '/test-page/';
      const expected = `${siteConfig.url}/test-page`;
      expect(generateCanonicalUrl(path)).toBe(expected);
    });

    it('should keep root path as is', () => {
      const path = '/';
      const expected = `${siteConfig.url}/`;
      expect(generateCanonicalUrl(path)).toBe(expected);
    });
  });

  describe('isValidUrl', () => {
    it('should return true for valid URLs', () => {
      expect(isValidUrl('https://example.com')).toBe(true);
      expect(isValidUrl('http://localhost:3000')).toBe(true);
      expect(isValidUrl(`${siteConfig.url}/test`)).toBe(true);
    });

    it('should return false for invalid URLs', () => {
      expect(isValidUrl('not-a-url')).toBe(false);
      expect(isValidUrl('')).toBe(false);
      expect(isValidUrl('htp://invalid-protocol')).toBe(false);
    });
  });

  describe('isValidCanonicalReference', () => {
    it('should return true for valid canonical references', () => {
      const canonicalUrl = `${siteConfig.url}/test`;
      const currentPageUrl = `${siteConfig.url}/other`;
      expect(isValidCanonicalReference(canonicalUrl, currentPageUrl)).toBe(true);
    });

    it('should return false for invalid canonical references', () => {
      const canonicalUrl = 'invalid-url';
      const currentPageUrl = `${siteConfig.url}/other`;
      expect(isValidCanonicalReference(canonicalUrl, currentPageUrl)).toBe(false);
    });
  });
});

describe('Main Page Canonical Tags', () => {
  it('should have canonical tag for homepage', () => {
    const canonicalUrl = generateCanonicalUrl('/');
    expect(canonicalUrl).toBe('https://sidraraza.xyz/');
  });

  it('should have canonical tag for about page', () => {
    const canonicalUrl = generateCanonicalUrl('/about');
    expect(canonicalUrl).toBe('https://sidraraza.xyz/about');
  });

  it('should have canonical tag for contact page', () => {
    const canonicalUrl = generateCanonicalUrl('/contact');
    expect(canonicalUrl).toBe('https://sidraraza.xyz/contact');
  });

  it('should have canonical tag for projects page', () => {
    const canonicalUrl = generateCanonicalUrl('/projects');
    expect(canonicalUrl).toBe('https://sidraraza.xyz/projects');
  });

  it('should have canonical tag for services page', () => {
    const canonicalUrl = generateCanonicalUrl('/services');
    expect(canonicalUrl).toBe('https://sidraraza.xyz/services');
  });

  it('should have canonical tag for skills page', () => {
    const canonicalUrl = generateCanonicalUrl('/skills');
    expect(canonicalUrl).toBe('https://sidraraza.xyz/skills');
  });

  it('should have canonical tag for agents page', () => {
    const canonicalUrl = generateCanonicalUrl('/agents');
    expect(canonicalUrl).toBe('https://sidraraza.xyz/agents');
  });
});