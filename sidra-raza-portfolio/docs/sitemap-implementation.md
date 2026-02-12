# Sitemap Implementation Guide

## Overview
This document explains the sitemap implementation for the Sidra Raza portfolio website. The sitemap helps search engines crawl and index the site more effectively, improving SEO performance.

## Features

### 1. Dynamic Sitemap Generation
- Automatically discovers new pages in the Next.js app directory
- Updates sitemap when new pages are added or existing pages are modified
- Excludes private routes (API routes, auth pages, dashboard, etc.)

### 2. SEO Optimization
- Prioritizes important pages (homepage, about, contact)
- Sets appropriate change frequencies based on page type
- Validates sitemap against Google Search Console requirements

### 3. Monitoring & Analytics
- Tracks sitemap access by user agents
- Provides sitemap information via the `/api/sitemap-info` endpoint
- Validates sitemap for SEO health and compliance

## Architecture

### Components

#### Models
- `SitemapEntry`: Represents a single URL entry in the sitemap
- `Sitemap`: Represents the complete sitemap with validation
- `SitemapInfoModel`: Contains metadata about the sitemap

#### Services
- `SitemapService`: Core sitemap generation and validation
- `SitemapValidationService`: SEO health validation
- `PageDiscoveryService`: Discovers pages in the app directory
- `AutoSitemapService`: Automatic sitemap updates

#### Endpoints
- `/sitemap.xml`: The main sitemap endpoint
- `/api/sitemap-info`: Provides sitemap metadata and validation status

## Implementation Details

### Sitemap Generation Process
1. The `AutoSitemapService` discovers all pages in the app directory
2. The `SitemapService` generates the sitemap with appropriate priorities and frequencies
3. The sitemap is validated against Google Search Console requirements
4. The sitemap is served with the correct content-type header (application/xml)

### Content-Type Configuration
The `next.config.ts` file is configured to serve `/sitemap.xml` with the correct content-type header:

```typescript
async headers() {
  return [
    {
      source: '/sitemap.xml',
      headers: [
        {
          key: 'Content-Type',
          value: 'application/xml',
        },
      ],
    },
  ]
}
```

### Robots.txt Integration
The `robots.txt` file in the public directory references the sitemap:

```
User-agent: *
Allow: /

Sitemap: https://sidraraza.xyz/sitemap.xml
```

## Testing

### Unit Tests
Unit tests for the sitemap functionality are located in `tests/sitemap.test.ts`.

### Validation
The sitemap is validated for:
- Proper XML format according to sitemap protocol
- Valid URLs
- Correct priority values (0.0 to 1.0)
- Valid change frequency values
- Compliance with Google Search Console requirements

## Maintenance

### Adding New Pages
New pages added to the app directory will be automatically included in the sitemap, provided they follow Next.js conventions (using page.tsx, index.tsx, etc.).

### Excluding Pages
Pages can be excluded from the sitemap by adding their paths to the exclusion list in `PageDiscoveryService.shouldExcludePath()`.

## Troubleshooting

### Common Issues
1. **Sitemap not updating**: Check that new pages follow Next.js conventions and are not in excluded paths
2. **Invalid XML**: Verify that all URLs are properly formatted and priority values are between 0.0 and 1.0
3. **Google Search Console errors**: Check the sitemap validation logs for specific error messages

### Debugging
Enable logging in the sitemap services to track generation and validation processes.