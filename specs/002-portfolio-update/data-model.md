# Data Model: Blog System

**Feature**: 002-portfolio-update  
**Date**: 2026-02-28  
**Purpose**: Define data structures, validation rules, and state transitions for blog functionality

---

## Entities

### BlogPost

**Description**: Represents a single blog post with metadata and content.

**Attributes**:
| Field | Type | Required | Constraints | Description |
|-------|------|----------|-------------|-------------|
| slug | string | Yes | Unique, lowercase, hyphenated, 3-100 chars | URL-safe identifier |
| title | string | Yes | 5-100 chars | Display title |
| excerpt | string | Yes | 50-200 chars | Short description for previews |
| content | string | Yes | Min 100 chars (markdown) | Full post content |
| publishedAt | string | Yes | ISO 8601 date (YYYY-MM-DD) | Publication date |
| author | string | Yes | Default: "Sidra Raza" | Author name |
| tags | string[] | No | Max 10 tags, 2-30 chars each | Categorization |
| coverImage | string | No | Valid path in /public/blog/covers/ | Hero image |
| draft | boolean | No | Default: true | Publication status |

**Relationships**:
- Author → Person (embedded, always "Sidra Raza" for this portfolio)
- Tags → Controlled vocabulary (AI, Agentic AI, Automation, Next.js, etc.)

**Validation Rules**:
```typescript
interface BlogPostValidation {
  slug: {
    pattern: /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
    minLength: 3;
    maxLength: 100;
    unique: true;
  };
  title: {
    minLength: 5;
    maxLength: 100;
  };
  excerpt: {
    minLength: 50;
    maxLength: 200;
  };
  content: {
    minLength: 100;
    format: 'markdown';
  };
  publishedAt: {
    format: 'ISO 8601';
    pattern: /^\d{4}-\d{2}-\d{2}$/;
  };
  author: {
    minLength: 2;
    maxLength: 100;
  };
  tags: {
    maxItems: 10;
    itemMinLength: 2;
    itemMaxLength: 30;
  };
  coverImage: {
    pattern: /^\/blog\/covers\/[a-z0-9-]+\.(jpg|jpeg|png|webp)$/;
  };
}
```

**State Transitions**:
```
Draft → Published  (when draft: false and publishedAt <= today)
Published → Draft  (when draft: true is set)
```

**Example**:
```markdown
---
slug: "building-agentic-ai-systems"
title: "Building Agentic AI Systems That Run Your Business"
excerpt: "Learn how to design and build intelligent AI systems that automate business workflows, increase efficiency, and drive scalable growth."
publishedAt: "2026-02-28"
author: "Sidra Raza"
tags: ["AI", "Agentic AI", "Automation", "Business"]
coverImage: "/blog/covers/agentic-ai.jpg"
draft: false
---

# Building Agentic AI Systems...

[Full markdown content]
```

---

## BlogPostCollection

**Description**: Virtual collection representing all blog posts, used for listing and pagination.

**Derived Attributes**:
| Field | Type | Calculation | Description |
|-------|------|-------------|-------------|
| totalCount | number | Count of all posts | Total blog posts |
| publishedCount | number | Count where draft=false | Published posts only |
| latestPosts | BlogPost[] | Sort by publishedAt DESC, limit N | Most recent posts |
| allTags | string[] | Union of all post tags | Tag cloud generation |

**Sorting Rules**:
- Primary sort: `publishedAt DESC` (newest first)
- Secondary sort: `title ASC` (alphabetical for same date)

**Filtering Rules**:
- Published filter: `draft === false`
- Tag filter: `tags.includes(targetTag)`
- Date filter: `publishedAt <= today`

---

## HeroSection

**Description**: Configuration for the homepage hero section.

**Attributes**:
| Field | Type | Required | Default | Description |
|-------|------|----------|---------|-------------|
| name | string | Yes | "Sidra Raza" | Display name |
| title | string | Yes | "AI Engineer & Agentic Systems Developer" | Professional title |
| description | string | Yes | Full professional description | Hero description |
| buttons | HeroButton[] | Yes | 4 buttons | Action buttons |
| showBookCall | boolean | No | false | Show "Book a Strategy Call" |

### HeroButton

**Attributes**:
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| label | string | Yes | Button text |
| href | string | Yes | Destination URL or anchor |
| variant | enum | Yes | "primary" | "secondary" | "outline" |
| external | boolean | No | false | Open in new tab |
| icon | string | No | Optional icon name |

**Configuration**:
```typescript
const heroButtons: HeroButton[] = [
  {
    label: "Download My CV",
    href: "/SidraRazaCV.pdf",
    variant: "primary",
    external: false
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/in/sidraraza",
    variant: "outline",
    external: true
  },
  {
    label: "GitHub",
    href: "https://github.com/sidraraza",
    variant: "outline",
    external: true
  },
  {
    label: "Contact Me",
    href: "/#contact",
    variant: "secondary",
    external: false
  }
];
```

---

## SEO Metadata

**Description**: Metadata structure for each page.

### PageMetadata

**Attributes**:
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| title | string | Yes | Page title |
| description | string | Yes | Meta description |
| keywords | string[] | No | SEO keywords |
| canonical | string | Yes | Canonical URL |
| openGraph | OpenGraph | No | Open Graph tags |
| twitter | TwitterCard | No | Twitter Card tags |
| robots | Robots | No | Crawler directives |

### OpenGraph

**Attributes**:
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| title | string | No | OG title (defaults to page title) |
| description | string | No | OG description |
| type | enum | Yes | "website" | "article" |
| url | string | Yes | Canonical URL |
| images | OGImage[] | No | OG image URLs |
| siteName | string | No | Site name |
| locale | string | No | Default: "en_US" |

### TwitterCard

**Attributes**:
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| card | enum | Yes | "summary_large_image" |
| creator | string | No | Twitter handle (@username) |
| title | string | No | Twitter title |
| description | string | No | Twitter description |
| images | string[] | No | Twitter image URLs |

### Robots

**Attributes**:
| Field | Type | Required | Default | Description |
|-------|------|----------|---------|-------------|
| index | boolean | No | true | Allow indexing |
| follow | boolean | No | true | Follow links |
| noimageindex | boolean | No | false | Don't index images |
| maxImagePreview | enum | No | "large" | Image preview size |
| maxVideoPreview | enum | No | "auto" | Video preview size |

---

## SitemapEntry

**Description**: Single entry in sitemap.xml.

**Attributes**:
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| url | string | Yes | Full URL or path |
| lastModified | string | Yes | ISO 8601 datetime |
| changeFrequency | enum | Yes | "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never" |
| priority | number | Yes | 0.0 to 1.0 |

**Priority Guidelines**:
- Homepage: 1.0
- Main sections (About, Services, Projects, Blog, Contact): 0.8-0.9
- Individual blog posts: 0.6-0.7
- Agent pages: 0.7-0.8
- Auth pages: 0.3-0.5

**Change Frequency Guidelines**:
- Homepage: weekly
- About, Services: monthly
- Blog listing: daily
- Blog posts: yearly
- Contact: monthly
- Projects: weekly
- Agents: weekly

**Example**:
```typescript
{
  url: '/blog/building-agentic-ai-systems',
  lastModified: '2026-02-28T10:00:00Z',
  changeFrequency: 'yearly',
  priority: 0.6
}
```

---

## Type Definitions (TypeScript)

```typescript
// src/types/blog.ts

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  publishedAt: string;
  author: string;
  tags?: string[];
  coverImage?: string;
  draft: boolean;
}

export interface BlogPostFrontmatter {
  slug: string;
  title: string;
  excerpt: string;
  publishedAt: string;
  author: string;
  tags?: string[];
  coverImage?: string;
  draft?: boolean;
}

export interface HeroButton {
  label: string;
  href: string;
  variant: 'primary' | 'secondary' | 'outline';
  external?: boolean;
  icon?: string;
}

export interface HeroSection {
  name: string;
  title: string;
  description: string;
  buttons: HeroButton[];
  showBookCall?: boolean;
}

export interface PageMetadata {
  title: string;
  description: string;
  keywords?: string[];
  canonical: string;
  openGraph?: OpenGraph;
  twitter?: TwitterCard;
  robots?: Robots;
}

export interface OpenGraph {
  title?: string;
  description?: string;
  type: 'website' | 'article';
  url: string;
  images?: Array<{ url: string; width?: number; height?: number }>;
  siteName?: string;
  locale?: string;
}

export interface TwitterCard {
  card: 'summary' | 'summary_large_image';
  creator?: string;
  title?: string;
  description?: string;
  images?: string[];
}

export interface Robots {
  index?: boolean;
  follow?: boolean;
  noimageindex?: boolean;
  maxImagePreview?: 'none' | 'standard' | 'large';
  maxVideoPreview?: 'none' | 'standard' | 'auto';
}

export interface SitemapEntry {
  url: string;
  lastModified: string;
  changeFrequency: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority: number;
}
```

---

## Validation Functions

```typescript
// src/lib/blog-validation.ts

export function validateSlug(slug: string): boolean {
  const pattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
  return pattern.test(slug) && slug.length >= 3 && slug.length <= 100;
}

export function validateTitle(title: string): boolean {
  return title.length >= 5 && title.length <= 100;
}

export function validateExcerpt(excerpt: string): boolean {
  return excerpt.length >= 50 && excerpt.length <= 200;
}

export function validateContent(content: string): boolean {
  return content.length >= 100;
}

export function validateDate(date: string): boolean {
  const pattern = /^\d{4}-\d{2}-\d{2}$/;
  if (!pattern.test(date)) return false;
  const parsed = new Date(date);
  return !isNaN(parsed.getTime());
}

export function validateTags(tags?: string[]): boolean {
  if (!tags) return true;
  if (tags.length > 10) return false;
  return tags.every(tag => tag.length >= 2 && tag.length <= 30);
}
```

---

## State Management

**Blog Posts**: Static (file-based, no runtime state)
**Hero Section**: Static (configured at build time)
**Metadata**: Static (generated at build time per page)

No client-side state management needed. All data is static and fetched at build time or server-side.

---

## Data Flow

```
Markdown Files (src/content/blog/)
         ↓
  Parse Frontmatter
         ↓
  Validate BlogPost
         ↓
  Sort by publishedAt
         ↓
  Render to HTML (markdown → react)
         ↓
  Display in Blog Listing / Post Page
```

---

## Error Handling

| Error | Cause | Handling |
|-------|-------|----------|
| Invalid slug format | User error in frontmatter | Build error with descriptive message |
| Missing required field | Incomplete frontmatter | Build error listing missing fields |
| Duplicate slug | Copy-paste error | Build error with both file paths |
| Invalid date format | Typo in publishedAt | Build error with expected format |
| Markdown parse failure | Corrupted file | Build error with line number |
| Cover image not found | Wrong path | Build warning, fallback to default |

---

## Migration Notes

- No database migration needed (file-based storage)
- Existing routes preserved (about, services, projects, contact, agents, dashboard, auth)
- New routes added: `/blog`, `/blog/[slug]`
- Sitemap and robots.txt generated dynamically
