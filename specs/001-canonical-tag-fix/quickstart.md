# Quickstart Guide: Canonical Tag Implementation

## Overview
This guide provides a quick overview of how to implement canonical tags in the Next.js portfolio project.

## Prerequisites
- Node.js 18+ installed
- Next.js 13+ project with App Router
- Basic understanding of Next.js metadata API

## Implementation Steps

### 1. Configure Root Layout
In `src/app/layout.tsx`, configure the metadata property to include default canonical tags:

```typescript
export const metadata = {
  metadataBase: new URL('https://yourdomain.com'),
  title: 'Your Portfolio',
  description: 'Your portfolio description',
  alternates: {
    canonical: '/',
  },
};
```

### 2. Configure Individual Pages
For each page that needs a specific canonical tag, define the metadata property:

```typescript
// src/app/page.tsx
export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Home - Your Portfolio',
    alternates: {
      canonical: '/',
    },
  };
}
```

### 3. Handle Dynamic Routes
For dynamic routes, generate canonical tags based on the route parameters:

```typescript
// src/app/projects/[id]/page.tsx
export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const project = await getProject(params.id);
  
  return {
    title: `${project.title} - Projects`,
    alternates: {
      canonical: `/projects/${params.id}`,
    },
  };
}
```

### 4. Testing Implementation
1. Run the development server: `npm run dev`
2. Inspect the HTML source of each page to verify canonical tags are present
3. Use browser developer tools to check for the `<link rel="canonical" />` tag in the head section

### 5. Verification
- Use Google Search Console to monitor indexing status
- Verify canonical tags are correctly implemented across all pages
- Test with various URL parameters to ensure proper canonical tag generation