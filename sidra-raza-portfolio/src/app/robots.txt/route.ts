import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const robotsTxt = `User-agent: *
Allow: /

Sitemap: https://sidraraza.xyz/sitemap.xml`;

  return new NextResponse(robotsTxt, {
    headers: {
      'Content-Type': 'text/plain',
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=3600', // Cache for 1 hour
    },
  });
}