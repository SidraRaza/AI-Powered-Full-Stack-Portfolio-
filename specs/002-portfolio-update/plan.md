# Implementation Plan: Portfolio Enhancement & SEO Optimization

**Branch**: `002-portfolio-update` | **Date**: 2026-02-28 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification from `/specs/002-portfolio-update/spec.md`

## Summary

Comprehensive portfolio update including: hero section redesign with professional introduction and action buttons, blog functionality with homepage previews and dynamic routing, smooth scroll animations using Framer Motion, complete SEO optimization (metadata, structured data, sitemap, robots.txt), performance improvements targeting Lighthouse 95+, and modern responsive UI refinements.

## Technical Context

**Language/Version**: TypeScript 5.x, React 19.2.3, Next.js 16.1.1
**Primary Dependencies**: Framer Motion 12.x (animations), next/image (optimization), next/seo patterns
**Storage**: Static content (blog posts in data files), public assets (CV PDF)
**Testing**: Existing test suite in `__tests__/`, `tests/` directories
**Target Platform**: Web (responsive desktop/mobile)
**Project Type**: Single Next.js application (app router)
**Performance Goals**: Lighthouse score 95+, page load <2s on 4G, 60fps animations
**Constraints**: Maintain existing authentication/authorization, preserve existing routes, backward compatibility
**Scale/Scope**: Portfolio site (~10 pages, blog system, contact form, dashboard)

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

### Principle Compliance

| Principle | Status | Notes |
|-----------|--------|-------|
| Test-First (NON-NEGOTIABLE) | ✅ PASS | Tests will be written before implementation for all new components |
| Integration Testing | ✅ PASS | Blog system, SEO metadata, animations require integration tests |
| Observability | ✅ PASS | Structured logging for blog views, error boundaries for animations |
| Simplicity (YAGNI) | ✅ PASS | Using existing Framer Motion dependency, no new libraries |
| Library-First | N/A | Feature is application-level, no reusable libraries needed |

**GATE RESULT**: PASS - All applicable principles satisfied. Proceed to Phase 0.

## Project Structure

### Documentation (this feature)

```text
specs/002-portfolio-update/
├── plan.md              # This file (/sp.plan command output)
├── research.md          # Phase 0 output (/sp.plan command)
├── data-model.md        # Phase 1 output (/sp.plan command)
├── quickstart.md        # Phase 1 output (/sp.plan command)
├── contracts/           # Phase 1 output (/sp.plan command)
└── tasks.md             # Phase 2 output (/sp.tasks command - NOT created by /sp.plan)
```

### Source Code (repository root)

```text
sidra-raza-portfolio/
src/
├── app/
│   ├── layout.tsx               # Root layout (metadata, structured data)
│   ├── page.tsx                 # Homepage (hero, blog preview)
│   ├── blog/
│   │   ├── page.tsx             # Blog listing page
│   │   └── [slug]/
│   │       └── page.tsx         # Dynamic blog post page
│   ├── sitemap.ts               # Sitemap generation
│   ├── robots.ts                # Robots.txt generation
│   └── [existing routes]        # about, services, projects, contact, agents, etc.
├── components/
│   ├── hero/
│   │   └── hero-section.tsx     # New professional hero component
│   ├── blog/
│   │   ├── blog-preview.tsx     # Blog preview card component
│   │   ├── blog-listing.tsx     # Blog listing component
│   │   └── blog-post.tsx        # Blog post display component
│   ├── animations/
│   │   ├── scroll-reveal.tsx    # Scroll animation wrapper
│   │   └── hover-effects.tsx    # Button hover animations
│   └── seo/
│       ├── metadata.ts          # Metadata generation utilities
│       └── structured-data.tsx  # JSON-LD structured data components
├── content/
│   └── blog/                    # Blog post markdown/data files
│       ├── post-1.md
│       ├── post-2.md
│       └── post-3.md
├── lib/
│   └── blog.ts                  # Blog post utilities (fetch, parse)
└── types/
    └── blog.ts                  # Blog post type definitions

public/
├── SidraRazaCV.pdf              # CV file for download
└── [existing assets]
```

**Structure Decision**: Single Next.js application (app router). Using existing `src/app`, `src/components`, `src/content`, `src/lib`, `src/types` directories. No new top-level directories needed.

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| None | All principles satisfied | N/A - No violations to justify |

## Phase 0: Research & Discovery

### Research Tasks

1. **Framer Motion Best Practices**: Research optimal animation patterns for Next.js 16 + React 19, focusing on scroll-triggered animations and performance
2. **Next.js 16 SEO Patterns**: Research latest metadata API, sitemap.ts, and robots.ts generation patterns in Next.js 16.x
3. **JSON-LD Structured Data**: Research Person and Website schema requirements for professional portfolios
4. **Blog Architecture Patterns**: Research static vs dynamic blog generation in Next.js app router
5. **Performance Optimization**: Research next/image optimization strategies, lazy loading patterns for Lighthouse 95+

**Output**: `research.md` documenting all technology choices and patterns

## Phase 1: Design & Contracts

### Data Model Design

**Blog Post Entity**:
- slug: string (unique identifier, URL-safe)
- title: string (display title)
- excerpt: string (short description for previews)
- content: string (full markdown content)
- publishedAt: date (publication date for sorting)
- author: string (author name, default "Sidra Raza")
- tags: string[] (optional categorization)
- coverImage: string (optional hero image path)

**Validation Rules**:
- slug: required, unique, lowercase, hyphenated
- title: required, 5-100 characters
- excerpt: required, 50-200 characters
- content: required, minimum 100 characters
- publishedAt: required, ISO 8601 format

### API Contracts

**Blog Data Access** (file-based, no API routes needed):
- `getBlogPosts()`: Returns all published posts sorted by date
- `getBlogPostBySlug(slug)`: Returns single post or 404
- `getLatestBlogPosts(limit)`: Returns N most recent posts

**Contract Location**: `src/lib/blog.ts`

### SEO Contracts

**Metadata Pattern**:
- Each page exports `metadata` object (Next.js 16 convention)
- Root layout provides default metadata
- Individual pages override/extend as needed

**Structured Data Pattern**:
- JSON-LD script tags injected via components
- Person schema on all pages
- Website schema on homepage
- BlogPosting schema on individual blog posts

**Contract Location**: `src/components/seo/`

### Quickstart Guide

**Setup Steps**:
1. Add CV PDF to `public/SidraRazaCV.pdf`
2. Create blog post markdown files in `src/content/blog/`
3. Update hero content in new `src/components/hero/hero-section.tsx`
4. Configure external links (LinkedIn, GitHub URLs)
5. Update sitemap with production domain

**Development Commands**:
```bash
cd sidra-raza-portfolio
npm run dev          # Start development server
npm run build        # Production build
npm run lint         # ESLint validation
```

**Testing Commands**:
```bash
npm test            # Run test suite (when configured)
```

## Phase 2: Implementation Tasks

> **Note**: Tasks will be generated by `/sp.tasks` command. This section is a placeholder.

### Task Breakdown (Preview)

- **Task 1**: Create hero section component with professional intro and buttons
- **Task 2**: Implement blog data layer and content structure
- **Task 3**: Build blog listing and dynamic post pages
- **Task 4**: Add homepage blog preview section
- **Task 5**: Implement scroll animations with Framer Motion
- **Task 6**: Add button hover effects and transitions
- **Task 7**: Configure metadata for all pages
- **Task 8**: Implement JSON-LD structured data
- **Task 9**: Generate sitemap.xml dynamically
- **Task 10**: Generate robots.txt
- **Task 11**: Optimize images with next/image
- **Task 12**: Implement lazy loading for below-fold content
- **Task 13**: Verify heading hierarchy (H1 per page)
- **Task 14**: Run Lighthouse audit and optimize
- **Task 15**: Mobile responsiveness testing and fixes

## Phase 3: Testing Strategy

### Unit Tests
- Hero section renders correct content and buttons
- Blog post parsing handles valid/invalid markdown
- Metadata generation produces correct output
- Structured data validates against schema.org

### Integration Tests
- Blog navigation (listing → post → back)
- External links open correctly with security attributes
- Scroll animations trigger on viewport entry
- Contact Me button scrolls to contact section

### Performance Tests
- Lighthouse score ≥95 on homepage and blog pages
- Page load time <2s on 4G throttling
- Animation frame rate ≥60fps
- Image optimization verified (WebP format, lazy loading)

### SEO Tests
- All pages have complete metadata
- Structured data validates in Google Rich Results Test
- Sitemap.xml accessible and contains all routes
- Robots.txt accessible and correctly configured

## Risks & Mitigation

| Risk | Impact | Mitigation |
|------|--------|------------|
| CV PDF missing | Medium | Add placeholder or hide button gracefully |
| Blog content delays | Low | Use sample posts, easy to update later |
| Animation performance issues | Medium | Test on low-end devices, provide reduced-motion fallback |
| SEO metadata conflicts | Low | Centralize metadata configuration, audit all pages |
| Lighthouse score below 95 | Medium | Profile early, optimize images and bundles incrementally |

## Definition of Done

- [ ] All 18 functional requirements implemented and tested
- [ ] All 13 success criteria met and verified
- [ ] Lighthouse score ≥95 on homepage, blog, and key pages
- [ ] All pages have complete metadata and structured data
- [ ] Blog system fully functional with sample posts
- [ ] Hero section updated with professional content
- [ ] Animations smooth and professional (60fps)
- [ ] Mobile responsive across all breakpoints
- [ ] Sitemap.xml and robots.txt generated and accessible
- [ ] All tests passing (unit, integration, performance)
- [ ] Code reviewed and linted
- [ ] PHR created for implementation phase
