# Research & Discovery: Portfolio Enhancement

**Feature**: 002-portfolio-update  
**Date**: 2026-02-28  
**Purpose**: Document technology choices, patterns, and best practices for implementation

---

## 1. Framer Motion Best Practices for Next.js 16 + React 19

### Decision
Use Framer Motion 12.x with React 19's latest patterns for scroll-triggered animations and hover effects.

### Rationale
- Framer Motion is already installed (v12.23.26) - no new dependencies
- Excellent React 19 compatibility
- Built-in support for scroll animations via `whileInView`, `viewport` props
- Performance optimized with automatic layout animations
- Supports reduced-motion preferences via `reduceMotion` config

### Implementation Pattern
```tsx
// Scroll reveal animation
import { motion } from 'framer-motion';

<motion.div
  initial={{ opacity: 0, y: 50 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, margin: "-100px" }}
  transition={{ duration: 0.6, ease: "easeOut" }}
>
  {children}
</motion.div>

// Button hover scale
<motion.button
  whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
  transition={{ type: "spring", stiffness: 400, damping: 17 }}
>
  {label}
</motion.button>
```

### Alternatives Considered
- **GSAP**: More powerful but heavier, overkill for subtle animations
- **CSS transitions only**: Less flexible, no scroll-triggered animations
- **React Spring**: Good but Framer Motion has better Next.js integration

### Performance Guidelines
- Use `transform` and `opacity` only (GPU-accelerated)
- Avoid animating layout properties (width, height, top, left)
- Set `viewport={{ once: true }}` to prevent re-animation on scroll
- Respect `prefers-reduced-motion` via Framer Motion's built-in support

---

## 2. Next.js 16 SEO Patterns

### Decision
Use Next.js 16's Metadata API for all SEO metadata, sitemap.ts, and robots.ts for dynamic generation.

### Rationale
- Next.js 16 uses App Router with built-in metadata support
- Static metadata generation at build time
- Dynamic metadata supported via `generateMetadata()` function
- sitemap.ts and robots.ts conventions for automatic generation

### Metadata Pattern
```tsx
// app/layout.tsx - Root metadata
export const metadata: Metadata = {
  title: {
    default: 'Sidra Raza | AI Engineer & Agentic Systems Developer',
    template: '%s | Sidra Raza'
  },
  description: 'AI Engineer & Agentic Systems Developer. I design and build intelligent AI systems that automate business workflows.',
  keywords: ['AI Engineer', 'Agentic AI', 'Automation', 'Next.js', 'Portfolio'],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://sidraraza.xyz',
    siteName: 'Sidra Raza Portfolio'
  },
  twitter: {
    card: 'summary_large_image',
    creator: '@sidraraza'
  },
  robots: {
    index: true,
    follow: true
  }
};

// app/about/page.tsx - Page-specific metadata
export const metadata: Metadata = {
  title: 'About',
  description: 'Learn more about Sidra Raza...',
  openGraph: {
    title: 'About | Sidra Raza',
    description: '...'
  }
};
```

### Canonical URLs
```tsx
export const metadata: Metadata = {
  alternates: {
    canonical: 'https://sidraraza.xyz/about'
  }
};
```

### Alternatives Considered
- **next-seo package**: Unnecessary with Next.js 16's built-in metadata API
- **Manual head tags**: Deprecated with App Router

---

## 3. JSON-LD Structured Data

### Decision
Implement JSON-LD structured data using inline `<script>` tags with `application/ld+json` type.

### Rationale
- Google recommends JSON-LD over Microdata/RDFa
- Easy to implement with React components
- Validates in Google Rich Results Test
- Improves search engine understanding

### Person Schema (All Pages)
```json
{
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Sidra Raza",
  "jobTitle": "AI Engineer & Agentic Systems Developer",
  "url": "https://sidraraza.xyz",
  "sameAs": [
    "https://linkedin.com/in/sidraraza",
    "https://github.com/sidraraza"
  ]
}
```

### Website Schema (Homepage)
```json
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Sidra Raza Portfolio",
  "url": "https://sidraraza.xyz",
  "description": "AI Engineer & Agentic Systems Developer portfolio",
  "potentialAction": {
    "@type": "SearchAction",
    "target": "https://sidraraza.xyz/search?q={search_term_string}",
    "query-input": "required name=search_term_string"
  }
}
```

### BlogPosting Schema (Blog Posts)
```json
{
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "headline": "Post Title",
  "datePublished": "2026-02-28",
  "author": {
    "@type": "Person",
    "name": "Sidra Raza"
  }
}
```

### Implementation Pattern
```tsx
// src/components/seo/structured-data.tsx
export function PersonSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Person",
    // ... properties
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
```

---

## 4. Blog Architecture Patterns

### Decision
Use static markdown files with file-system based routing and dynamic segments for blog posts.

### Rationale
- No database needed for simple blog
- Fast build-time generation
- Easy content management (markdown files)
- Next.js app router supports dynamic segments natively

### File Structure
```
src/content/blog/
├── building-agentic-ai-systems.md
├── automating-business-workflows.md
└── scaling-with-ai.md

src/lib/blog.ts
├── getBlogPosts()
├── getBlogPostBySlug(slug)
└── getLatestBlogPosts(limit)
```

### Markdown Frontmatter
```markdown
---
title: "Building Agentic AI Systems"
excerpt: "Learn how to design and build intelligent AI systems that automate business workflows."
publishedAt: "2026-02-28"
author: "Sidra Raza"
tags: ["AI", "Agentic AI", "Automation"]
coverImage: "/blog/covers/agentic-ai.jpg"
---

# Blog post content in markdown...
```

### Dynamic Route Pattern
```tsx
// app/blog/[slug]/page.tsx
import { getBlogPostBySlug } from '@/lib/blog';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
  const posts = await getBlogPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export default async function BlogPost({ params }: { params: { slug: string } }) {
  const post = await getBlogPostBySlug(params.slug);
  if (!post) notFound();
  
  return <article>{/* Render post */}</article>;
}
```

### Alternatives Considered
- **Headless CMS (Contentful, Sanity)**: Overkill for simple portfolio blog
- **Database-backed blog**: Unnecessary complexity, no user-generated content
- **MDX**: Could add interactivity but markdown is sufficient for now

---

## 5. Performance Optimization for Lighthouse 95+

### Decision
Implement comprehensive image optimization, code splitting, lazy loading, and performance monitoring.

### Rationale
- Lighthouse 95+ is achievable with Next.js built-in optimizations
- Focus on Core Web Vitals: LCP, FID, CLS

### Image Optimization Strategy
```tsx
// Use next/image for all images
import Image from 'next/image';

<Image
  src="/hero-image.jpg"
  alt="Professional hero"
  width={1200}
  height={630}
  priority  // For above-fold images
  quality={85}
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
/>

// Lazy loading for below-fold (default behavior)
<Image
  src="/blog-preview.jpg"
  alt="Blog preview"
  width={400}
  height={300}
  loading="lazy"  // Default, explicit for clarity
/>
```

### Code Splitting
- Next.js automatically code-splits by route
- Use dynamic imports for heavy components:
```tsx
import dynamic from 'next/dynamic';

const HeavyChart = dynamic(() => import('./HeavyChart'), {
  loading: () => <p>Loading...</p>
});
```

### Lazy Loading Strategy
```tsx
// Components below fold
const BlogSection = dynamic(() => import('@/components/blog/blog-section'));

// In page:
<BlogSection />  // Loads only when needed
```

### Performance Budget
- **LCP (Largest Contentful Paint)**: <2.5s
- **FID (First Input Delay)**: <100ms
- **CLS (Cumulative Layout Shift)**: <0.1
- **Total Blocking Time**: <200ms

### Optimization Checklist
- [ ] All images use next/image with proper dimensions
- [ ] Above-fold images use `priority` prop
- [ ] Below-fold images use lazy loading
- [ ] Fonts use `next/font` with `display: swap`
- [ ] Third-party scripts load asynchronously
- [ ] CSS is tree-shaken (Tailwind does this automatically)
- [ ] No unused JavaScript (bundle analysis)

### Tools
- **Lighthouse CI**: Automated performance testing
- **@next/bundle-analyzer**: Bundle size analysis
- **Chrome DevTools Performance tab**: Animation profiling

---

## 6. Accessibility & Reduced Motion

### Decision
Support `prefers-reduced-motion` media query for users who prefer minimal animations.

### Implementation
```tsx
// Framer Motion respects this automatically, but can be explicit:
import { useReducedMotion } from 'framer-motion';

const shouldReduceMotion = useReducedMotion();

<motion.div
  initial={shouldReduceMotion ? false : { opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: shouldReduceMotion ? 0 : 0.6 }}
>
```

---

## Summary of Technology Choices

| Concern | Choice | Justification |
|---------|--------|---------------|
| Animations | Framer Motion 12.x | Already installed, React 19 compatible, performant |
| Metadata | Next.js 16 Metadata API | Built-in, type-safe, no extra dependencies |
| Structured Data | JSON-LD script tags | Google recommended, easy to implement |
| Blog Storage | Markdown files | Simple, fast, no database needed |
| Image Optimization | next/image | Built-in, automatic WebP, lazy loading |
| Styling | Tailwind CSS (existing) | Already configured, utility-first |
| Testing | Existing test suite | Consistent with project patterns |

---

## Next Steps

1. **Data Model**: Define blog post types and validation rules
2. **Contracts**: Implement blog utility functions
3. **Quickstart**: Document setup steps for CV, blog content, external links
