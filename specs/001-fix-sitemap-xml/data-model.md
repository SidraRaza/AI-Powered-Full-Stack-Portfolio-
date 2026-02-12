# Data Model: Sitemap.xml for Google Search Console

## Overview
This document describes the data structures and models required for implementing the sitemap.xml generation feature to fix the Google Search Console issue.

## Entities

### SitemapEntry
Represents a single URL entry in the sitemap with associated metadata.

**Fields**:
- url: string (required) - The URL of the page
- lastmod: string (optional) - Date of last modification in ISO 8601 format (YYYY-MM-DD)
- changefreq: string (optional) - How frequently the page is likely to change (always, hourly, daily, weekly, monthly, yearly, never)
- priority: number (optional) - Priority of this URL relative to other URLs on the site (0.0 to 1.0)

**Validation rules**:
- url must be a valid absolute URL
- lastmod must be in ISO 8601 format if provided
- changefreq must be one of the allowed values if provided
- priority must be between 0.0 and 1.0 if provided

### Sitemap
Represents the complete sitemap containing multiple entries.

**Fields**:
- entries: Array<SitemapEntry> (required) - List of all URL entries in the sitemap
- version: string (required) - The sitemap protocol version (typically "0.9")
- xmlns: string (required) - The XML namespace for the sitemap protocol

**Validation rules**:
- Must contain at least one entry
- Must not exceed 50,000 entries (per sitemap protocol)
- Serialized XML must not exceed 50MB (per sitemap protocol)

### RobotsTxt
Represents the robots.txt file that references the sitemap.

**Fields**:
- sitemapUrl: string (required) - The absolute URL to the sitemap.xml file
- userAgentRules: Array<string> (optional) - Rules for different user agents
- disallowPaths: Array<string> (optional) - Paths that should not be crawled

**Validation rules**:
- sitemapUrl must be a valid absolute URL
- sitemapUrl must end with "sitemap.xml" or "sitemap_index.xml"

## Relationships
- A Sitemap contains many SitemapEntry objects
- A RobotsTxt references one Sitemap via its sitemapUrl property

## State Transitions
- Sitemap is generated during build time or request time
- Sitemap is validated before being made available publicly
- Sitemap is updated when new content is added to the website