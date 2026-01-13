import { NextRequest, NextResponse } from 'next/server';

// Define the structure for each sitemap entry
interface SitemapEntry {
  url: string;
  lastmod?: string;
  changefreq?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority?: number;
}

// Function to generate the sitemap XML
function generateSitemapXml(entries: SitemapEntry[]): string {
  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
  xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

  entries.forEach(entry => {
    xml += '  <url>\n';
    xml += `    <loc>https://sidraraza.xyz${entry.url}</loc>\n`;
    if (entry.lastmod) {
      xml += `    <lastmod>${entry.lastmod}</lastmod>\n`;
    }
    if (entry.changefreq) {
      xml += `    <changefreq>${entry.changefreq}</changefreq>\n`;
    }
    if (entry.priority !== undefined) {
      xml += `    <priority>${entry.priority.toFixed(1)}</priority>\n`;
    }
    xml += '  </url>\n';
  });

  xml += '</urlset>';

  return xml;
}

// Define your site's pages
const sitemapEntries: SitemapEntry[] = [
  { url: '/', lastmod: new Date().toISOString().split('T')[0], changefreq: 'daily', priority: 1.0 },
  { url: '/about', lastmod: new Date().toISOString().split('T')[0], changefreq: 'weekly', priority: 0.9 },
  { url: '/services', lastmod: new Date().toISOString().split('T')[0], changefreq: 'weekly', priority: 0.8 },
  { url: '/skills', lastmod: new Date().toISOString().split('T')[0], changefreq: 'weekly', priority: 0.8 },
  { url: '/projects', lastmod: new Date().toISOString().split('T')[0], changefreq: 'weekly', priority: 0.8 },
  { url: '/agents', lastmod: new Date().toISOString().split('T')[0], changefreq: 'daily', priority: 0.9 },
  { url: '/agents/ai-assistant', lastmod: new Date().toISOString().split('T')[0], changefreq: 'daily', priority: 0.7 },
  { url: '/agents/business-validator', lastmod: new Date().toISOString().split('T')[0], changefreq: 'daily', priority: 0.7 },
  { url: '/agents/content-strategist', lastmod: new Date().toISOString().split('T')[0], changefreq: 'daily', priority: 0.7 },
  { url: '/agents/proposal-generator', lastmod: new Date().toISOString().split('T')[0], changefreq: 'daily', priority: 0.7 },
  { url: '/contact', lastmod: new Date().toISOString().split('T')[0], changefreq: 'monthly', priority: 0.7 },
  { url: '/auth/sign-in', lastmod: new Date().toISOString().split('T')[0], changefreq: 'monthly', priority: 0.5 },
  { url: '/auth/sign-up', lastmod: new Date().toISOString().split('T')[0], changefreq: 'monthly', priority: 0.5 },
  { url: '/dashboard', lastmod: new Date().toISOString().split('T')[0], changefreq: 'daily', priority: 0.6 },
];

export async function GET(request: NextRequest) {
  const sitemapXml = generateSitemapXml(sitemapEntries);

  return new NextResponse(sitemapXml, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, s-maxage=86400, stale-while-revalidate=86400', // Cache for 24 hours
    },
  });
}