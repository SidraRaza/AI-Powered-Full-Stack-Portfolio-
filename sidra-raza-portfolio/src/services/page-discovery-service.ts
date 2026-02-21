import fs from 'fs';
import path from 'path';
import { SitemapEntry } from '@/models/sitemap-entry';

export interface PageMetadata {
  path: string;
  priority: number;
  changeFrequency: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  lastModified?: Date;
}

export class PageDiscoveryService {
  /**
   * Discovers all pages in the app directory and generates metadata for them
   * @param appDirPath Path to the Next.js app directory
   * @returns Array of PageMetadata objects
   */
  static discoverPages(appDirPath: string): PageMetadata[] {
    const pages: PageMetadata[] = [];
    
    // Define the base URL for the site
    const baseUrl = 'https://sidraraza.xyz';
    
    // Recursively walk through the app directory to find all page files
    this.walkDirectory(appDirPath, (filePath) => {
      // Convert file path to URL path
      const urlPath = this.filePathToUrlPath(filePath, appDirPath);
      
      // Skip certain paths that shouldn't be in the sitemap
      if (this.shouldExcludePath(urlPath)) {
        return;
      }
      
      // Generate metadata for this page
      const metadata = this.generatePageMetadata(urlPath, filePath, baseUrl);
      pages.push(metadata);
    });
    
    return pages;
  }

  /**
   * Recursively walks through a directory and calls the callback for each file
   * @param dirPath Directory to walk
   * @param callback Callback to call for each file
   */
  private static walkDirectory(dirPath: string, callback: (filePath: string) => void): void {
    const items = fs.readdirSync(dirPath);
    
    for (const item of items) {
      const fullPath = path.join(dirPath, item);
      const stat = fs.statSync(fullPath);
      
      if (stat.isDirectory()) {
        // Skip certain directories that shouldn't be crawled
        if (['api', '_next', 'node_modules', '.git'].includes(item)) {
          continue;
        }
        
        this.walkDirectory(fullPath, callback);
      } else if (stat.isFile() && this.isPageFile(item)) {
        callback(fullPath);
      }
    }
  }

  /**
   * Checks if a file is a page file that should be included in the sitemap
   * @param fileName Name of the file
   * @returns True if the file is a page file, false otherwise
   */
  private static isPageFile(fileName: string): boolean {
    // Include common Next.js page files
    return [
      'page.tsx', 'page.jsx', 'page.js', 'page.ts',
      'index.tsx', 'index.jsx', 'index.js', 'index.ts',
      '[id].tsx', '[id].jsx', '[id].js', '[id].ts'
    ].includes(fileName);
  }

  /**
   * Converts a file path to a URL path
   * @param filePath Path to the file
   * @param appDirPath Path to the app directory
   * @returns URL path
   */
  private static filePathToUrlPath(filePath: string, appDirPath: string): string {
    // Remove the app directory path and the page file name
    let relativePath = path.relative(appDirPath, filePath);

    // Remove the filename (e.g., page.tsx, index.tsx)
    relativePath = relativePath.replace(/\/?(page|index)\.(t|j)sx?$/, '');

    // Handle dynamic routes (e.g., [id] becomes :id)
    relativePath = relativePath.replace(/\[(\w+)\]/g, ':$1');

    // Convert backslashes to forward slashes and ensure leading slash
    relativePath = relativePath.replace(/\\/g, '/');
    if (!relativePath.startsWith('/')) {
      relativePath = '/' + relativePath;
    }

    // Special case: root index/page should be just "/"
    if (relativePath === '/index' || relativePath === '/page' || relativePath === '/') {
      relativePath = '/';
    }

    return relativePath;
  }

  /**
   * Checks if a path should be excluded from the sitemap
   * @param urlPath URL path to check
   * @returns True if the path should be excluded, false otherwise
   */
  private static shouldExcludePath(urlPath: string): boolean {
    // Normalize the path to prevent path traversal attacks
    if (urlPath.includes('../') || urlPath.includes('..\\')) {
      return true;
    }

    // Exclude any paths that still contain file extensions (indicates a conversion error)
    if (/\.(tsx|jsx|ts|js)$/.test(urlPath)) {
      return true;
    }

    // Exclude API routes, auth pages, dashboard, and other private areas
    const excludePatterns = [
      /^\/api\//,      // API routes
      /^\/auth\//,     // Auth pages
      /^\/dashboard\//, // Dashboard pages
      /^\/admin\//,    // Admin pages
      /\/auth$/,       // Auth page
      /\/dashboard$/,  // Dashboard page
      /\/admin$/,      // Admin page
      /\.env/,         // Environment files
      /private/,       // Private routes
      /secret/,        // Secret routes
      /config/         // Configuration routes
    ];

    return excludePatterns.some(pattern => pattern.test(urlPath.toLowerCase()));
  }

  /**
   * Generates metadata for a page
   * @param urlPath URL path of the page
   * @param filePath File path of the page
   * @param baseUrl Base URL of the site
   * @returns PageMetadata object
   */
  private static generatePageMetadata(urlPath: string, filePath: string, baseUrl: string): PageMetadata {
    // Determine priority based on the URL path
    let priority = 0.8; // Default priority
    
    if (urlPath === '/') {
      priority = 1.0; // Home page gets highest priority
    } else if (['/about', '/contact', '/services'].includes(urlPath)) {
      priority = 0.9; // Important pages get high priority
    } else if (urlPath.includes('/projects') || urlPath.includes('/agents')) {
      priority = 0.7; // Projects and agents get medium priority
    }
    
    // Determine change frequency based on the URL path
    let changeFrequency: PageMetadata['changeFrequency'] = 'weekly';
    
    if (urlPath === '/') {
      changeFrequency = 'daily'; // Home page changes more frequently
    } else if (urlPath.includes('/blog') || urlPath.includes('/news')) {
      changeFrequency = 'daily'; // Blog/news pages change frequently
    } else if (urlPath.includes('/projects')) {
      changeFrequency = 'monthly'; // Projects might change monthly
    }
    
    // Get the last modified date from the file
    const stats = fs.statSync(filePath);
    const lastModified = stats.mtime;
    
    return {
      path: `${baseUrl}${urlPath}`,
      priority,
      changeFrequency,
      lastModified
    };
  }
}