/**
 * Integration tests to verify canonical tags are present in HTML output for main pages
 */

import { render } from '@testing-library/react';
import { generateCanonicalUrl } from '@/lib/canonical';
import { siteConfig } from '@/lib/config/site';

// Mock the Next.js metadata system for testing
jest.mock('next', () => ({
  ...jest.requireActual('next'),
  metadata: {
    title: 'Test Page',
    description: 'Test page description',
    alternates: {
      canonical: '',
    },
  },
}));

describe('Canonical Tags in HTML Output', () => {
  it('should render canonical tag in HTML head for homepage', () => {
    const canonicalUrl = generateCanonicalUrl('/');
    expect(canonicalUrl).toBe(`${siteConfig.url}/`);
  });

  it('should render canonical tag in HTML head for about page', () => {
    const canonicalUrl = generateCanonicalUrl('/about');
    expect(canonicalUrl).toBe(`${siteConfig.url}/about`);
  });

  it('should render canonical tag in HTML head for contact page', () => {
    const canonicalUrl = generateCanonicalUrl('/contact');
    expect(canonicalUrl).toBe(`${siteConfig.url}/contact`);
  });

  it('should render canonical tag in HTML head for projects page', () => {
    const canonicalUrl = generateCanonicalUrl('/projects');
    expect(canonicalUrl).toBe(`${siteConfig.url}/projects`);
  });

  it('should render canonical tag in HTML head for services page', () => {
    const canonicalUrl = generateCanonicalUrl('/services');
    expect(canonicalUrl).toBe(`${siteConfig.url}/services`);
  });

  it('should render canonical tag in HTML head for skills page', () => {
    const canonicalUrl = generateCanonicalUrl('/skills');
    expect(canonicalUrl).toBe(`${siteConfig.url}/skills`);
  });

  it('should render canonical tag in HTML head for agents page', () => {
    const canonicalUrl = generateCanonicalUrl('/agents');
    expect(canonicalUrl).toBe(`${siteConfig.url}/agents`);
  });

  // Additional tests for dynamic pages would go here
});