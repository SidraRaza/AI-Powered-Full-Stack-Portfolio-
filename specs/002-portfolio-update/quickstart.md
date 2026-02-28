# Quickstart Guide: Portfolio Enhancement

**Feature**: 002-portfolio-update  
**Date**: 2026-02-28  
**Purpose**: Get developers started quickly with setup and configuration

---

## Prerequisites

- Node.js 20.x or later
- npm or pnpm package manager
- Git (for version control)
- Code editor (VS Code recommended)

---

## 1. Initial Setup

### Clone and Install

```bash
cd sidra-raza-portfolio
npm install
```

### Verify Installation

```bash
npm run dev
```

Visit `http://localhost:3000` to verify the app runs.

---

## 2. Add CV PDF

### Step 1: Prepare CV File

- File name: `SidraRazaCV.pdf`
- Recommended size: < 500KB
- Format: PDF (A4 or Letter)

### Step 2: Place in Public Directory

```bash
# Copy your CV file to:
sidra-raza-portfolio/public/SidraRazaCV.pdf
```

### Step 3: Verify Access

Visit: `http://localhost:3000/SidraRazaCV.pdf`

---

## 3. Configure External Links

### Update Hero Section

Edit: `src/components/hero/hero-section.tsx`

```typescript
const heroButtons: HeroButton[] = [
  {
    label: "Download My CV",
    href: "/SidraRazaCV.pdf",
    variant: "primary"
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/in/sidraraza",  // ← Update with actual URL
    variant: "outline",
    external: true
  },
  {
    label: "GitHub",
    href: "https://github.com/sidraraza",  // ← Update with actual URL
    variant: "outline",
    external: true
  },
  {
    label: "Contact Me",
    href: "/#contact",
    variant: "secondary"
  }
];
```

---

## 4. Create Blog Posts

### Step 1: Create Blog Directory

```bash
mkdir -p src/content/blog
```

### Step 2: Create First Blog Post

Create: `src/content/blog/building-agentic-ai-systems.md`

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

# Building Agentic AI Systems That Run Your Business

## Introduction

In today's fast-paced business environment, automation isn't just a luxury—it's a necessity. Agentic AI systems represent the next evolution in business automation, offering intelligent, autonomous capabilities that go far beyond traditional rule-based systems.

## What Are Agentic AI Systems?

Agentic AI systems are intelligent agents that can:

- **Perceive** their environment and business context
- **Reason** about optimal actions and strategies
- **Act** autonomously to achieve defined goals
- **Learn** from outcomes and improve over time

## Key Components

### 1. Perception Layer

The perception layer gathers data from multiple sources...

### 2. Reasoning Engine

The reasoning engine processes information and makes decisions...

### 3. Action Executor

The action executor carries out decisions through various channels...

## Implementation Strategy

### Phase 1: Assessment

Evaluate current workflows and identify automation opportunities...

### Phase 2: Design

Design the agentic system architecture...

### Phase 3: Implementation

Build and deploy the system...

### Phase 4: Optimization

Monitor performance and refine behavior...

## Conclusion

Agentic AI systems represent a paradigm shift in business automation. By understanding and implementing these systems, businesses can achieve unprecedented levels of efficiency and scalability.

---

**Ready to transform your business with AI?** [Contact me](/contact) to discuss your automation needs.
```

### Step 3: Create Second Blog Post

Create: `src/content/blog/automating-workflows-with-ai.md`

```markdown
---
slug: "automating-workflows-with-ai"
title: "Automating Business Workflows with AI: A Practical Guide"
excerpt: "A comprehensive guide to identifying, designing, and implementing AI-powered workflow automation in your business."
publishedAt: "2026-02-25"
author: "Sidra Raza"
tags: ["AI", "Automation", "Workflow", "Business Strategy"]
coverImage: "/blog/covers/workflow-automation.jpg"
draft: false
---

# Automating Business Workflows with AI: A Practical Guide

## Introduction

Workflow automation powered by AI can transform how your business operates...

[Continue with full blog post content]
```

### Step 4: Create Third Blog Post

Create: `src/content/blog/scaling-with-ai.md`

```markdown
---
slug: "scaling-business-with-ai"
title: "Scaling Your Business with Intelligent AI Systems"
excerpt: "Discover how AI systems can help your business scale efficiently without proportional increases in headcount or costs."
publishedAt: "2026-02-20"
author: "Sidra Raza"
tags: ["AI", "Scaling", "Business Growth", "Strategy"]
coverImage: "/blog/covers/scaling-ai.jpg"
draft: false
---

# Scaling Your Business with Intelligent AI Systems

## Introduction

Scaling a business traditionally means hiring more people. AI changes this equation...

[Continue with full blog post content]
```

---

## 5. Update Hero Section Content

### Edit Hero Component

Edit: `src/components/hero/hero-section.tsx`

```typescript
export default function HeroSection() {
  return (
    <section className="hero">
      <h1>Hi, I'm Sidra Raza</h1>
      <h2>AI Engineer & Agentic Systems Developer</h2>
      <p>
        I design and build intelligent AI systems that automate business workflows,
        increase efficiency, and drive scalable growth.
      </p>
      {/* Buttons as configured in step 3 */}
    </section>
  );
}
```

---

## 6. Configure Production Domain

### Update Metadata Base URL

Edit: `src/app/layout.tsx`

```typescript
export const metadata: Metadata = {
  // ... other metadata
  metadataBase: new URL('https://sidraraza.xyz'),  // ← Update if different
  // ... other metadata
};
```

### Update Sitemap Domain

Edit: `src/app/sitemap.ts`

```typescript
export default function sitemap(): SitemapEntry[] {
  const baseUrl = 'https://sidraraza.xyz';  // ← Update if different
  // ... rest of sitemap
}
```

### Update Robots.txt Domain

Edit: `src/app/robots.ts`

```typescript
export default function robots(): Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: 'https://sidraraza.xyz/sitemap.xml',  // ← Update if different
  };
}
```

---

## 7. Development Workflow

### Start Development Server

```bash
npm run dev
```

Visit: `http://localhost:3000`

### Build for Production

```bash
npm run build
```

### Start Production Server

```bash
npm start
```

### Run Linter

```bash
npm run lint
```

---

## 8. Test Implementation

### Manual Testing Checklist

#### Hero Section
- [ ] Name displays: "Hi, I'm Sidra Raza"
- [ ] Title displays: "AI Engineer & Agentic Systems Developer"
- [ ] Description displays correctly
- [ ] All 4 buttons visible and functional
- [ ] "Book a Strategy Call" button removed
- [ ] Responsive on mobile/tablet/desktop

#### Blog Section
- [ ] Homepage shows 3 latest blog posts
- [ ] Each preview shows title, excerpt, "Read More" button
- [ ] Clicking "Read More" navigates to full post
- [ ] /blog page lists all posts
- [ ] Individual blog posts render correctly

#### Animations
- [ ] Scroll animations trigger smoothly
- [ ] Button hover effects work
- [ ] Animations feel professional (not flashy)
- [ ] No performance issues (60fps)

#### SEO
- [ ] View page source, verify meta tags present
- [ ] Check title format: "Page | Sidra Raza"
- [ ] Verify Open Graph tags
- [ ] Verify Twitter Card tags
- [ ] Check JSON-LD structured data in browser console

#### Performance
- [ ] Run Lighthouse audit
- [ ] Score ≥95 on all categories
- [ ] Images load progressively (lazy loading)
- [ ] No layout shift (CLS < 0.1)

#### Sitemap & Robots
- [ ] Visit `/sitemap.xml` - shows all routes
- [ ] Visit `/robots.txt` - shows correct directives
- [ ] Sitemap includes lastModified, priority, changeFrequency

---

## 9. Common Issues & Solutions

### Issue: CV Download Returns 404

**Solution**: Ensure file is in `public/` directory (not `src/public/`)

### Issue: Blog Posts Not Showing

**Solution**: 
1. Check `draft: false` in frontmatter
2. Verify file is in `src/content/blog/`
3. Restart dev server

### Issue: Animations Not Working

**Solution**:
1. Verify Framer Motion is installed: `npm list framer-motion`
2. Check console for errors
3. Ensure `motion` components are used correctly

### Issue: Lighthouse Score Below 95

**Solution**:
1. Check image sizes (use next/image with proper dimensions)
2. Enable lazy loading for below-fold images
3. Remove unused JavaScript
4. Check third-party script impact

### Issue: Metadata Not Appearing

**Solution**:
1. Verify `export const metadata` syntax
2. Check for TypeScript errors
3. Rebuild: `npm run build`

---

## 10. Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Import project in Vercel
3. Deploy automatically on push to main branch

### Manual Deployment

```bash
npm run build
# Deploy .next/static and generated files to hosting
```

---

## 11. Post-Deployment Verification

### SEO Verification

1. **Google Search Console**: Submit sitemap
2. **Rich Results Test**: Validate structured data
3. **Mobile-Friendly Test**: Verify responsive design

### Performance Verification

1. **PageSpeed Insights**: Check Lighthouse scores
2. **WebPageTest**: Test from multiple locations
3. **Chrome DevTools**: Profile animations

### Functional Verification

1. Test all navigation links
2. Test CV download
3. Test external links (LinkedIn, GitHub)
4. Test contact form
5. Test blog navigation

---

## 12. Maintenance

### Adding New Blog Posts

1. Create new `.md` file in `src/content/blog/`
2. Add frontmatter with unique slug
3. Write content in markdown
4. Commit and deploy

### Updating Hero Content

1. Edit `src/components/hero/hero-section.tsx`
2. Update text, buttons, or links
3. Test locally
4. Commit and deploy

### Updating External Links

1. Edit button configuration in hero component
2. Update `href` values
3. Test links
4. Commit and deploy

---

## 13. Resources

### Documentation

- [Next.js Metadata API](https://nextjs.org/docs/app/api-reference/functions/generate-metadata)
- [Framer Motion Documentation](https://www.framer.com/motion/)
- [Schema.org Structured Data](https://schema.org/docs/gs.html)
- [Google Rich Results](https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data)

### Tools

- [Lighthouse](https://developer.chrome.com/docs/lighthouse/overview/)
- [Google Rich Results Test](https://search.google.com/test/rich-results)
- [Google Search Console](https://search.google.com/search-console)
- [PageSpeed Insights](https://pagespeed.web.dev/)

---

## 14. Next Steps

After completing setup:

1. **Run Tests**: `npm test` (when test suite is configured)
2. **Code Review**: Have someone review the implementation
3. **Accessibility Audit**: Run axe DevTools or WAVE
4. **Browser Testing**: Test in Chrome, Firefox, Safari, Edge
5. **Device Testing**: Test on mobile, tablet, desktop

---

## Support

For issues or questions:

1. Check this guide first
2. Review documentation links above
3. Check existing issues in repository
4. Create new issue with detailed description

---

**Version**: 1.0 | **Last Updated**: 2026-02-28
