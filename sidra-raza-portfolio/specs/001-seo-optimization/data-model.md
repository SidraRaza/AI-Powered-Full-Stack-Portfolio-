# Data Model: SEO Optimization for sidraraza.xyz

**Feature**: 001-seo-optimization
**Created**: 2026-01-12

## SEO Metadata Entity

**Description**: Contains metadata information for SEO optimization of each page

**Fields**:
- pagePath: string (URL path of the page, e.g., "/", "/about", "/contact")
- title: string (Page title, under 60 characters)
- description: string (Meta description, 150-160 characters)
- keywords: string[] (Array of relevant keywords for the page)
- canonicalUrl: string (Canonical URL to prevent duplicate content)
- ogTitle: string (Open Graph title)
- ogDescription: string (Open Graph description)
- ogImage: string (Open Graph image URL)
- ogType: string (Open Graph type, e.g., "website", "article")
- twitterCard: string (Twitter card type, e.g., "summary", "summary_large_image")
- twitterTitle: string (Twitter title)
- twitterDescription: string (Twitter description)
- twitterImage: string (Twitter image URL)
- structuredData: object (JSON-LD structured data)
- lastModified: Date (Last modification date for sitemap)
- changeFrequency: string (How often page changes: "always", "hourly", "daily", "weekly", "monthly", "yearly", "never")
- priority: number (Priority in sitemap: 0.0 to 1.0)

**Relationships**:
- One-to-one relationship with each page in the application
- Referenced by sitemap generation process

## Sitemap Entry Entity

**Description**: Contains information for sitemap.xml generation

**Fields**:
- url: string (Full URL of the page)
- lastmod: Date (Last modification date)
- changefreq: string (Change frequency)
- priority: number (Priority, 0.0 to 1.0)
- pagePath: string (Reference to page path in SEO Metadata)

**Validation Rules**:
- url must be a valid absolute URL
- lastmod must be a valid date
- changefreq must be one of the allowed values
- priority must be between 0.0 and 1.0

## Structured Data Schema

**Description**: JSON-LD schema for rich snippets and search engine understanding

**Types**:
- WebSite: For main website information
- WebPage: For individual page information
- Person: For author/personal information
- Organization: For company/organization information
- Article: For blog/article content (if applicable)

**Fields** (depending on type):
- @context: string (Schema context URL)
- @type: string (Schema type)
- name: string (Name of entity)
- description: string (Description of entity)
- url: string (URL of entity)
- image: string (Image URL)
- author: object (Author information)
- datePublished: Date (Publication date)
- dateModified: Date (Modification date)
- headline: string (Headline for articles/pages)

## Social Media Link Entity

**Description**: Contains social media link information for footer

**Fields**:
- platform: string (Platform name: "github", "linkedin", "twitter", "instagram", "facebook")
- url: string (Complete URL to profile)
- icon: string (Icon identifier for display)
- displayName: string (Display name for the link)
- isActive: boolean (Whether the link is active)

**Validation Rules**:
- url must be a valid URL
- platform must be one of the allowed values
- isActive must be boolean