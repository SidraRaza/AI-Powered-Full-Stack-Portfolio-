# Data Model: SEO Configuration for Google Search Console Fix

## Entities

### Sitemap Pages
- **Definition**: Collection of URLs that should be indexed by search engines (public facing pages)
- **Fields**:
  - url: string (the page URL)
  - lastModified: Date (last modification timestamp)
  - changeFrequency: string (how often the page changes)
  - priority: number (importance relative to other pages)
- **Validation**: Must return HTTP 200 status code, must be publicly accessible
- **Relationships**: Belongs to the website's public content

### Redirect Pages
- **Definition**: URLs that redirect to other pages (authentication, dashboard, etc.)
- **Fields**:
  - url: string (the redirecting URL)
  - redirectTo: string (destination URL)
  - statusCode: number (HTTP status code for redirect, typically 302 or 307)
- **Validation**: Must redirect to a valid destination
- **State**: Should not be included in sitemap, should have noindex directive

### Canonical URLs
- **Definition**: Preferred version of a page that search engines should index
- **Fields**:
  - url: string (the preferred URL)
  - alternateVersions: array<string> (other versions that point to this canonical)
- **Validation**: Should resolve to the same content as alternate versions
- **Relationships**: Each page should have one canonical URL

## Configuration Objects

### Robots Txt Config
- **Definition**: Configuration for robots.txt file
- **Fields**:
  - userAgent: string (crawler identification)
  - allowPaths: array<string> (paths allowed for crawling)
  - disallowPaths: array<string> (paths blocked from crawling)
  - sitemapUrl: string (location of sitemap)

### Metadata Config
- **Definition**: Configuration for page metadata
- **Fields**:
  - title: string (page title)
  - description: string (page description)
  - canonical: string (canonical URL)
  - robots: string (robot directives like "noindex, nofollow")