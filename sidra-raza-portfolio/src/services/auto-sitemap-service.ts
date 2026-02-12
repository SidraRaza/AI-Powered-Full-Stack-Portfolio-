import { MetadataRoute } from 'next';
import { PageDiscoveryService, PageMetadata } from './page-discovery-service';
import { SitemapEntry } from '../models/sitemap-entry';

export class AutoSitemapService {
  private static readonly APP_DIR_PATH = process.cwd() + '/src/app';

  /**
   * Automatically generates a sitemap by discovering all pages in the app directory
   * @returns A Next.js sitemap-compatible array
   */
  static async generateAutomatedSitemap(): Promise<MetadataRoute.Sitemap> {
    console.log('Starting automated sitemap generation...');
    
    try {
      // Discover all pages in the app directory
      const discoveredPages = PageDiscoveryService.discoverPages(this.APP_DIR_PATH);
      
      console.log(`Discovered ${discoveredPages.length} pages for sitemap`);
      
      // Convert discovered pages to sitemap entries
      const sitemapEntries = discoveredPages.map(page => {
        return new SitemapEntry(
          page.path,
          page.lastModified,
          page.changeFrequency,
          page.priority
        );
      });
      
      // Convert to Next.js sitemap format
      const sitemap: MetadataRoute.Sitemap = sitemapEntries.map(entry => entry.toNextJsSitemapFormat());
      
      console.log(`Generated sitemap with ${sitemap.length} entries`);
      
      return sitemap;
    } catch (error) {
      console.error('Error during automated sitemap generation:', error);
      throw error;
    }
  }

  /**
   * Compares the current sitemap with the automatically generated one
   * @param currentSitemap The current sitemap
   * @returns Differences between the sitemaps
   */
  static async compareSitemaps(currentSitemap: MetadataRoute.Sitemap): Promise<{
    added: MetadataRoute.Sitemap;
    removed: MetadataRoute.Sitemap;
    modified: MetadataRoute.Sitemap;
  }> {
    console.log('Comparing current sitemap with automatically generated one...');
    
    const automatedSitemap = await this.generateAutomatedSitemap();
    
    // Create maps for easier comparison
    const currentMap = new Map(currentSitemap.map(item => [item.url, item]));
    const automatedMap = new Map(automatedSitemap.map(item => [item.url, item]));
    
    // Find added pages (in automated but not in current)
    const added: MetadataRoute.Sitemap = [];
    for (const [url, item] of automatedMap) {
      if (!currentMap.has(url)) {
        added.push(item);
      }
    }
    
    // Find removed pages (in current but not in automated)
    const removed: MetadataRoute.Sitemap = [];
    for (const [url, item] of currentMap) {
      if (!automatedMap.has(url)) {
        removed.push(item);
      }
    }
    
    // Find modified pages (in both but with different properties)
    const modified: MetadataRoute.Sitemap = [];
    for (const [url, currentItem] of currentMap) {
      const automatedItem = automatedMap.get(url);
      if (automatedItem && this.itemsAreDifferent(currentItem, automatedItem)) {
        modified.push(automatedItem); // Use the automated version as the "correct" one
      }
    }
    
    console.log(`Sitemap comparison results: ${added.length} added, ${removed.length} removed, ${modified.length} modified`);
    
    return { added, removed, modified };
  }

  /**
   * Checks if two sitemap items are different
   * @param item1 First sitemap item
   * @param item2 Second sitemap item
   * @returns True if the items are different, false otherwise
   */
  private static itemsAreDifferent(
    item1: MetadataRoute.Sitemap[number],
    item2: MetadataRoute.Sitemap[number]
  ): boolean {
    // Compare priority
    if (item1.priority !== item2.priority) {
      return true;
    }
    
    // Compare changeFrequency
    if (item1.changeFrequency !== item2.changeFrequency) {
      return true;
    }
    
    // Compare lastModified if both exist
    if (item1.lastModified && item2.lastModified) {
      if (item1.lastModified.getTime() !== item2.lastModified.getTime()) {
        return true;
      }
    }
    
    return false;
  }

  /**
   * Updates the sitemap with any changes detected
   * @param currentSitemap The current sitemap
   * @returns Updated sitemap
   */
  static async updateSitemapWithChanges(currentSitemap: MetadataRoute.Sitemap): Promise<MetadataRoute.Sitemap> {
    console.log('Updating sitemap with detected changes...');
    
    const { added, removed, modified } = await this.compareSitemaps(currentSitemap);
    
    // Start with the current sitemap
    let updatedSitemap = [...currentSitemap];
    
    // Remove pages that no longer exist
    for (const removedItem of removed) {
      updatedSitemap = updatedSitemap.filter(item => item.url !== removedItem.url);
    }
    
    // Add new pages
    for (const addedItem of added) {
      updatedSitemap.push(addedItem);
    }
    
    // Update modified pages
    for (let i = 0; i < updatedSitemap.length; i++) {
      const currentItem = updatedSitemap[i];
      const modifiedItem = modified.find(item => item.url === currentItem.url);
      
      if (modifiedItem) {
        updatedSitemap[i] = modifiedItem;
      }
    }
    
    console.log(`Updated sitemap now has ${updatedSitemap.length} entries`);
    
    return updatedSitemap;
  }
}