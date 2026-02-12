import { NextRequest } from 'next/server';
import { SitemapInfoModel } from '@/models/sitemap-info';
import { SitemapService } from '@/services/sitemap-service';
import { SitemapValidationService } from '@/services/sitemap-validation-service';

export async function GET(request: NextRequest) {
  try {
    // Log the access for monitoring
    const userAgent = request.headers.get('user-agent') || 'Unknown';
    // Next.js doesn't provide request.ip directly in middleware
    // Using a fallback approach for IP detection
    const forwardedFor = request.headers.get('x-forwarded-for');
    const realIp = request.headers.get('x-real-ip');
    const ip = forwardedFor ? forwardedFor.split(',')[0] : realIp || 'Unknown';
    SitemapService.logSitemapAccess(userAgent, ip);

    // Generate the sitemap
    const sitemap = SitemapService.generateSitemap();

    // Validate the sitemap for SEO health
    const sitemapInfo = SitemapValidationService.validateSitemapForSEOHealth(sitemap);

    // Check if the sitemap meets minimum SEO standards
    const meetsMinimumStandards = SitemapValidationService.meetsMinimumSEOStandards(sitemap);

    // Prepare the response
    const response = {
      ...sitemapInfo.toJSON(),
      meetsMinimumSEOStandards,
      message: sitemapInfo.isValid() 
        ? 'Sitemap is valid and meets SEO requirements' 
        : 'Sitemap validation failed',
    };

    // Return the sitemap info as JSON
    return new Response(JSON.stringify(response), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Error generating sitemap info:', error);
    
    return new Response(
      JSON.stringify({ 
        error: 'Internal server error',
        message: 'An error occurred while generating sitemap information'
      }),
      {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
  }
}