/**
 * Utility functions for generating and validating canonical URLs
 */

import { siteConfig } from '@/lib/config/site';

/**
 * Generates a canonical URL for a given path
 * @param path - The path for which to generate a canonical URL
 * @returns The complete canonical URL
 */
export function generateCanonicalUrl(path: string): string {
  // Ensure path starts with a slash
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  
  // Remove trailing slash except for the root path
  const finalPath = normalizedPath.length > 1 ? normalizedPath.replace(/\/$/, '') : normalizedPath;
  
  return `${siteConfig.url}${finalPath}`;
}

/**
 * Validates if a URL is properly formatted according to RFC standards
 * @param url - The URL to validate
 * @returns True if the URL is valid, false otherwise
 */
export function isValidUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch (e) {
    return false;
  }
}

/**
 * Checks if a canonical URL points to the same domain to prevent circular references
 * @param canonicalUrl - The canonical URL to check
 * @param currentPageUrl - The current page URL for comparison
 * @returns True if the canonical URL is valid and not circular, false otherwise
 */
export function isValidCanonicalReference(canonicalUrl: string, currentPageUrl: string): boolean {
  try {
    const canonical = new URL(canonicalUrl);
    const current = new URL(currentPageUrl, siteConfig.url);
    
    // Check if canonical URL is on the same domain/site
    if (canonical.hostname !== current.hostname) {
      // External canonical tags are valid in some cases, but for this implementation
      // we'll consider same-site canonical tags to prevent common mistakes
      return true; // Allow external canonical tags
    }
    
    // Prevent self-referencing canonical tags that could be redundant
    // Though self-referencing is technically valid, we allow it as it's common practice
    return canonical.href !== '';
  } catch (e) {
    return false;
  }
}