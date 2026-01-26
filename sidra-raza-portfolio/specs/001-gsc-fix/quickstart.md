# Quickstart Guide: Fix Google Search Console Redirect Indexing Issue

## Overview
Quick implementation guide to resolve "Page with redirect" indexing errors in Google Search Console for sidraraza.xyz

## Immediate Actions Required

### 1. Update Sitemap Configuration
1. Navigate to `src/app/sitemap.ts`
2. Remove redirect-only URLs like:
   - `/auth/sign-in`
   - `/auth/sign-up`
   - `/dashboard`
3. Keep only public-facing URLs:
   - `/about`
   - `/services`
   - `/skills`
   - `/projects`
   - `/agents`
   - `/agents/ai-assistant`
   - `/contact`

### 2. Add Noindex Meta Tags to Redirect Pages
1. For pages that redirect (like `/auth/*` and `/dashboard`), add noindex meta tags:
   ```jsx
   export async function generateMetadata() {
     return {
       robots: {
         index: false,
         follow: false,
       },
     };
   }
   ```

### 3. Configure Canonical Tags
1. In your root `layout.tsx`, ensure canonical tags are properly set:
   ```jsx
   <link rel="canonical" href="https://sidraraza.xyz" />
   ```

### 4. Update robots.txt Configuration
1. Modify `src/app/robots.ts` to disallow protected routes:
   ```javascript
   export default function robots() {
     return {
       rules: {
         userAgent: '*',
         allow: '/',
         disallow: ['/auth/', '/dashboard/'],
       },
       sitemap: 'https://sidraraza.xyz/sitemap.xml',
     }
   }
   ```

### 5. Set Up Server-Side Redirects
1. Create or update `middleware.ts` to handle:
   - HTTP to HTTPS redirects
   - www to non-www redirects (or vice versa)

## Verification Steps

1. Test sitemap: Visit `https://sidraraza.xyz/sitemap.xml` and verify it only contains public pages
2. Test robots.txt: Visit `https://sidraraza.xyz/robots.txt` and verify disallow rules are present
3. Test redirect pages: Access `/auth/sign-in` and verify it has noindex header
4. Test canonical tags: Check page source for correct canonical URLs
5. Submit updated sitemap to Google Search Console

## Timeline
- Implementation: 1-2 hours
- Propagation: 1-2 days for search engines to recognize changes
- Full effect: 1-2 weeks for Google Search Console errors to clear