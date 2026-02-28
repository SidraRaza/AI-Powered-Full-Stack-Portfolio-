# Blog Data Access Contract

**Feature**: 002-portfolio-update  
**Date**: 2026-02-28  
**Purpose**: Define blog data access functions and interfaces

---

## Module: `src/lib/blog.ts`

### Functions

#### `getBlogPosts()`

**Description**: Returns all published blog posts sorted by publication date.

**Signature**:
```typescript
export async function getBlogPosts(): Promise<BlogPost[]>;
```

**Returns**: Array of BlogPost objects, sorted by `publishedAt DESC`, then `title ASC`.

**Behavior**:
- Reads all `.md` files from `src/content/blog/`
- Parses frontmatter
- Filters out draft posts (`draft: true`)
- Sorts by publishedAt (newest first)
- Returns full post objects

**Example**:
```typescript
const posts = await getBlogPosts();
// Returns:
// [
//   {
//     slug: "building-agentic-ai-systems",
//     title: "Building Agentic AI Systems...",
//     excerpt: "...",
//     publishedAt: "2026-02-28",
//     ...
//   },
//   ...
// ]
```

---

#### `getBlogPostBySlug(slug)`

**Description**: Returns a single blog post by its slug.

**Signature**:
```typescript
export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null>;
```

**Parameters**:
- `slug`: string - URL-safe identifier (e.g., "building-agentic-ai-systems")

**Returns**: BlogPost object if found, `null` if not found or draft.

**Behavior**:
- Reads specific `.md` file from `src/content/blog/${slug}.md`
- Parses frontmatter and content
- Returns null if file doesn't exist or is draft
- Returns full post object with rendered content

**Example**:
```typescript
const post = await getBlogPostBySlug("building-agentic-ai-systems");
if (!post) {
  // Handle 404
}
// Returns:
// {
//   slug: "building-agentic-ai-systems",
//   title: "Building Agentic AI Systems...",
//   content: "# Building Agentic AI Systems...\n\n...",
//   ...
// }
```

---

#### `getLatestBlogPosts(limit)`

**Description**: Returns the N most recent published blog posts.

**Signature**:
```typescript
export async function getLatestBlogPosts(limit: number): Promise<BlogPost[]>;
```

**Parameters**:
- `limit`: number - Maximum number of posts to return (e.g., 3 for homepage preview)

**Returns**: Array of BlogPost objects, limited to N items, sorted by `publishedAt DESC`.

**Behavior**:
- Calls `getBlogPosts()` internally
- Returns first N items from sorted list
- Used for homepage blog preview section

**Example**:
```typescript
const latestPosts = await getLatestBlogPosts(3);
// Returns exactly 3 most recent posts (or fewer if less exist)
```

---

#### `getAllTags()`

**Description**: Returns all unique tags used across blog posts.

**Signature**:
```typescript
export async function getAllTags(): Promise<string[]>;
```

**Returns**: Sorted array of unique tag strings.

**Behavior**:
- Reads all published posts
- Extracts all tags
- Removes duplicates
- Sorts alphabetically

**Example**:
```typescript
const tags = await getAllTags();
// Returns: ["AI", "Agentic AI", "Automation", "Business", "Next.js"]
```

---

#### `getPostsByTag(tag)`

**Description**: Returns all published posts with a specific tag.

**Signature**:
```typescript
export async function getPostsByTag(tag: string): Promise<BlogPost[]>;
```

**Parameters**:
- `tag`: string - Tag to filter by

**Returns**: Array of BlogPost objects with matching tag, sorted by `publishedAt DESC`.

**Example**:
```typescript
const aiPosts = await getPostsByTag("Agentic AI");
```

---

## Content Format

### Markdown File Structure

```markdown
---
slug: "building-agentic-ai-systems"
title: "Building Agentic AI Systems That Run Your Business"
excerpt: "Learn how to design and build intelligent AI systems that automate business workflows."
publishedAt: "2026-02-28"
author: "Sidra Raza"
tags: ["AI", "Agentic AI", "Automation"]
coverImage: "/blog/covers/agentic-ai.jpg"
draft: false
---

# Building Agentic AI Systems That Run Your Business

Introduction paragraph...

## Section Heading

Content...

## Another Section

More content...
```

---

## Implementation Details

### Dependencies

```bash
npm install gray-matter remark remark-html
```

- **gray-matter**: Parse frontmatter from markdown files
- **remark**: Markdown parser
- **remark-html**: Convert markdown to HTML

### File Reading Pattern

```typescript
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

const blogDirectory = path.join(process.cwd(), 'src/content/blog');

export async function getBlogPosts(): Promise<BlogPost[]> {
  // Get all .md files
  const fileNames = fs.readdirSync(blogDirectory);
  
  // Parse each file
  const posts = await Promise.all(
    fileNames
      .filter(fileName => fileName.endsWith('.md'))
      .map(async fileName => {
        const slug = fileName.replace(/\.md$/, '');
        const fullPath = path.join(blogDirectory, fileName);
        const fileContents = fs.readFileSync(fullPath, 'utf8');
        
        // Parse frontmatter
        const { data, content } = matter(fileContents);
        
        // Convert markdown to HTML
        const processedContent = await remark()
          .use(html)
          .process(content);
        const contentHtml = processedContent.toString();
        
        return {
          slug,
          title: data.title,
          excerpt: data.excerpt,
          publishedAt: data.publishedAt,
          author: data.author,
          tags: data.tags,
          coverImage: data.coverImage,
          draft: data.draft ?? true,
          content: contentHtml,
        } as BlogPost;
      })
  );
  
  // Filter drafts and sort
  return posts
    .filter(post => !post.draft)
    .sort((a, b) => {
      const dateCompare = new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
      if (dateCompare !== 0) return dateCompare;
      return a.title.localeCompare(b.title);
    });
}
```

---

## Error Handling

### Expected Errors

| Error | When | Handling |
|-------|------|----------|
| `ENOENT` | Blog directory doesn't exist | Return empty array |
| `YAMLException` | Invalid frontmatter YAML | Throw with descriptive message |
| `ValidationError` | Missing required fields | Throw with field details |

### Error Messages

```typescript
// Missing required field
throw new Error(
  `Blog post "${slug}" is missing required field: ${fieldName}. ` +
  `Required fields: slug, title, excerpt, publishedAt, author, content.`
);

// Invalid date format
throw new Error(
  `Blog post "${slug}" has invalid publishedAt: "${data.publishedAt}". ` +
  `Expected format: YYYY-MM-DD (e.g., "2026-02-28").`
);

// Duplicate slug
throw new Error(
  `Duplicate blog post slug: "${slug}". ` +
  `Found in: ${existingPath} and ${newPath}. ` +
  `Each post must have a unique slug.`
);
```

---

## Testing Contract

### Unit Tests

```typescript
// tests/unit/blog.test.ts

describe('getBlogPosts', () => {
  it('returns all published posts sorted by date', async () => {
    // Arrange: Mock fs.readdirSync and fs.readFileSync
    // Act: const posts = await getBlogPosts()
    // Assert: posts.length, sort order, draft exclusion
  });

  it('excludes draft posts', async () => {
    // Arrange: Include draft post in mock data
    // Act: const posts = await getBlogPosts()
    // Assert: draft posts not in results
  });

  it('returns empty array when no posts exist', async () => {
    // Arrange: Mock empty directory
    // Act: const posts = await getBlogPosts()
    // Assert: posts.length === 0
  });
});

describe('getBlogPostBySlug', () => {
  it('returns post for valid slug', async () => {
    // Arrange: Mock valid post file
    // Act: const post = await getBlogPostBySlug('test-post')
    // Assert: post.slug === 'test-post', all fields present
  });

  it('returns null for non-existent slug', async () => {
    // Arrange: Mock file not found
    // Act: const post = await getBlogPostBySlug('non-existent')
    // Assert: post === null
  });

  it('returns null for draft posts', async () => {
    // Arrange: Mock draft post
    // Act: const post = await getBlogPostBySlug('draft-post')
    // Assert: post === null
  });
});

describe('getLatestBlogPosts', () => {
  it('returns exactly N posts', async () => {
    // Arrange: Mock 10 posts
    // Act: const posts = await getLatestBlogPosts(3)
    // Assert: posts.length === 3
  });

  it('returns most recent posts', async () => {
    // Arrange: Mock posts with various dates
    // Act: const posts = await getLatestBlogPosts(3)
    // Assert: posts are 3 most recent
  });
});
```

### Integration Tests

```typescript
// tests/integration/blog.test.ts

describe('Blog Data Flow', () => {
  it('loads real blog posts from filesystem', async () => {
    // Act: const posts = await getBlogPosts()
    // Assert: posts.length > 0, valid structure
  });

  it('renders markdown to HTML correctly', async () => {
    // Arrange: Create test post with markdown
    // Act: const post = await getBlogPostBySlug('test')
    // Assert: post.content contains HTML tags, not markdown
  });
});
```

---

## Usage Examples

### Homepage Blog Preview

```tsx
// src/app/page.tsx

import { getLatestBlogPosts } from '@/lib/blog';
import BlogPreview from '@/components/blog/blog-preview';

export default async function HomePage() {
  const latestPosts = await getLatestBlogPosts(3);

  return (
    <main>
      {/* Hero Section */}
      <HeroSection />

      {/* Blog Preview */}
      <section>
        <h2>Latest Blog Posts</h2>
        {latestPosts.map(post => (
          <BlogPreview key={post.slug} post={post} />
        ))}
      </section>
    </main>
  );
}
```

### Blog Listing Page

```tsx
// src/app/blog/page.tsx

import { getBlogPosts } from '@/lib/blog';
import BlogListing from '@/components/blog/blog-listing';

export default async function BlogPage() {
  const allPosts = await getBlogPosts();

  return <BlogListing posts={allPosts} />;
}
```

### Dynamic Blog Post Page

```tsx
// src/app/blog/[slug]/page.tsx

import { getBlogPostBySlug } from '@/lib/blog';
import { notFound } from 'next/navigation';
import BlogPost from '@/components/blog/blog-post';

export async function generateStaticParams() {
  const posts = await getBlogPosts();
  return posts.map(post => ({ slug: post.slug }));
}

export default async function BlogPostPage({
  params
}: {
  params: { slug: string };
}) {
  const post = await getBlogPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  return <BlogPost post={post} />;
}
```

---

## Performance Considerations

### Build-Time Optimization

- All blog posts are fetched and rendered at build time
- No runtime data fetching for static content
- ISR (Incremental Static Regeneration) can be enabled if needed

### Caching Strategy

```typescript
// Enable ISR with revalidation
export const revalidate = 3600; // Revalidate every hour
```

### Bundle Size

- Markdown processing happens at build time
- Only HTML is sent to client
- No markdown parser in client bundle

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2026-02-28 | Initial contract definition |
