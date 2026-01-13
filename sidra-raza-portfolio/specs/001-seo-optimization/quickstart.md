# Quickstart Guide: SEO Optimization for sidraraza.xyz

**Feature**: 001-seo-optimization
**Created**: 2026-01-12

## Overview
This guide provides quick instructions to implement essential SEO optimizations for the sidraraza.xyz website.

## Prerequisites
- Node.js 18+ installed
- Access to the sidraraza.xyz codebase
- Next.js 16.1.1 project setup
- Git repository access

## Quick Implementation Steps

### 1. Add Dynamic Metadata to Pages
1. Open the root layout file: `src/app/layout.tsx`
2. Update the metadata export to include dynamic values:
```typescript
export const metadata: Metadata = {
  title: {
    default: "Sidra Raza - AI Portfolio & Full Stack Developer",
    template: "%s | Sidra Raza - AI Portfolio",
  },
  description: "Explore Sidra Raza's AI-powered portfolio featuring advanced AI agents, full-stack development solutions, and innovative technology projects.",
  // ... other meta tags
};
```

3. For each page, add generateMetadata function:
```typescript
export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "About Sidra Raza - AI & Full Stack Developer",
    description: "Learn more about Sidra Raza, an experienced AI and full-stack developer specializing in creating innovative AI solutions and custom software applications.",
    // ... other page-specific meta tags
  };
}
```

### 2. Create Sitemap Handler
1. Create file: `src/app/sitemap.xml/route.ts`
2. Add the sitemap generation code with all website pages

### 3. Create Robots.txt Handler
1. Create file: `src/app/robots.txt/route.ts`
2. Add the robots.txt generation code

### 4. Optimize Images
1. Find all image components in the codebase
2. Replace with Next.js Image component with alt attributes:
```jsx
<Image
  src="/image.jpg"
  alt="Descriptive alt text"
  width={300}
  height={200}
  priority={false}
/>
```

### 5. Verify Heading Structure
1. Ensure each page has only one H1 tag
2. Check that headings follow proper hierarchy (H1 → H2 → H3, etc.)

### 6. Add Social Media Links
1. Update the footer component with social media links
2. Include proper Open Graph and Twitter Card meta tags

## Testing
1. Run the development server: `npm run dev`
2. Verify sitemap is accessible: `http://localhost:3000/sitemap.xml`
3. Verify robots.txt is accessible: `http://localhost:3000/robots.txt`
4. Test page metadata using browser dev tools
5. Run Lighthouse audit to verify performance scores

## Next Steps
1. Submit sitemap to Google Search Console
2. Monitor Core Web Vitals
3. Track search engine indexing
4. Continue optimizing for specific keywords