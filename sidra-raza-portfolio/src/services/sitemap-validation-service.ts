import { MetadataRoute } from 'next';
import { SitemapInfoModel } from '@/models/sitemap-info';
import { SitemapService } from './sitemap-service';

export class SitemapValidationService {
  /**
   * Validates a sitemap and returns detailed validation information
   * @param sitemap The sitemap to validate
   * @returns A SitemapInfoModel with validation details
   */
  static validateSitemap(sitemap: MetadataRoute.Sitemap): SitemapInfoModel {
    const startTime = Date.now();
    console.log('Starting sitemap validation...');
    
    // Perform the validation checks
    const isValid = SitemapService.validateForGoogleSearchConsole(sitemap);
    
    // Calculate total URLs
    const totalUrls = sitemap.length;
    
    // Determine status based on validation result
    const status = isValid ? 'valid' : 'invalid';
    
    // Create and return the SitemapInfoModel
    const sitemapInfo = new SitemapInfoModel(
      new Date(),
      totalUrls,
      status
    );
    
    const endTime = Date.now();
    console.log(`Sitemap validation completed in ${endTime - startTime}ms. Status: ${status}. Total URLs: ${totalUrls}`);
    
    return sitemapInfo;
  }

  /**
   * Performs a comprehensive validation of the sitemap for SEO health
   * @param sitemap The sitemap to validate
   * @returns A SitemapInfoModel with comprehensive validation details
   */
  static validateSitemapForSEOHealth(sitemap: MetadataRoute.Sitemap): SitemapInfoModel {
    const startTime = Date.now();
    console.log('Starting comprehensive SEO health validation...');
    
    // First, run the standard validation
    const isValid = SitemapService.validateForGoogleSearchConsole(sitemap);
    
    // Additional SEO-specific checks
    const seoIssues = [];
    
    // Check for duplicate URLs
    const urls = sitemap.map(item => item.url);
    const uniqueUrls = new Set(urls);
    if (urls.length !== uniqueUrls.size) {
      seoIssues.push('Duplicate URLs detected in sitemap');
    }
    
    // Check for URLs with low priority that might be important
    const lowPriorityImportantPages = sitemap.filter(item => 
      item.priority !== undefined && 
      item.priority < 0.5 && 
      (item.url.includes('/important-page') || item.url.includes('/critical-resource'))
    );
    
    if (lowPriorityImportantPages.length > 0) {
      seoIssues.push(`${lowPriorityImportantPages.length} potentially important pages have low priority`);
    }
    
    // Check for URLs that haven't been updated recently
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    
    const outdatedPages = sitemap.filter(item => 
      item.lastModified && 
      new Date(item.lastModified) < sevenDaysAgo
    );
    
    if (outdatedPages.length > 0) {
      seoIssues.push(`${outdatedPages.length} pages haven't been updated in the last 7 days`);
    }
    
    // Calculate total URLs
    const totalUrls = sitemap.length;
    
    // Determine status based on validation result
    let status: 'valid' | 'invalid' | 'pending' = isValid ? 'valid' : 'invalid';
    
    // If there are SEO issues, we might want to mark as 'pending' for review
    if (seoIssues.length > 0 && status === 'valid') {
      console.warn('Sitemap is technically valid but has SEO issues:', seoIssues);
      // For now, we'll keep it as 'valid' but in a real implementation, 
      // we might want to have a different status for SEO issues
    }
    
    // Create and return the SitemapInfoModel
    const sitemapInfo = new SitemapInfoModel(
      new Date(),
      totalUrls,
      status
    );
    
    const endTime = Date.now();
    console.log(`Comprehensive SEO health validation completed in ${endTime - startTime}ms. Status: ${status}. Total URLs: ${totalUrls}`);
    
    if (seoIssues.length > 0) {
      console.log('SEO Issues found:', seoIssues);
    }
    
    return sitemapInfo;
  }

  /**
   * Checks if the sitemap meets minimum SEO standards
   * @param sitemap The sitemap to check
   * @returns True if the sitemap meets minimum SEO standards, false otherwise
   */
  static meetsMinimumSEOStandards(sitemap: MetadataRoute.Sitemap): boolean {
    // Check that we have at least some pages in the sitemap
    if (sitemap.length === 0) {
      console.error('Sitemap is empty');
      return false;
    }

    // Check that important pages are included
    const requiredPages = [
      'https://sidraraza.xyz/',
      'https://sidraraza.xyz/about',
      'https://sidraraza.xyz/contact'
    ];
    
    const missingRequiredPages = requiredPages.filter(page => 
      !sitemap.some(item => item.url === page)
    );
    
    if (missingRequiredPages.length > 0) {
      console.warn('Missing required pages in sitemap:', missingRequiredPages);
    }

    // Check that priority values are reasonable
    const highPriorityPages = sitemap.filter(item => 
      item.priority !== undefined && item.priority >= 0.8
    );
    
    if (highPriorityPages.length === 0) {
      console.warn('No pages have high priority (>= 0.8) in sitemap');
    }

    // If we passed all checks, return true
    return true;
  }
}