import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import type { BlogPost, BlogPostFrontmatter } from '@/types/blog';

// Directory containing blog posts
const blogDirectory = path.join(process.cwd(), 'src/content/blog');

/**
 * Validate blog post slug format
 */
export function validateSlug(slug: string): boolean {
  const pattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
  return pattern.test(slug) && slug.length >= 3 && slug.length <= 100;
}

/**
 * Validate blog post title
 */
export function validateTitle(title: string): boolean {
  return title.length >= 5 && title.length <= 100;
}

/**
 * Validate blog post excerpt
 */
export function validateExcerpt(excerpt: string): boolean {
  return excerpt.length >= 50 && excerpt.length <= 200;
}

/**
 * Validate blog post content
 */
export function validateContent(content: string): boolean {
  return content.length >= 100;
}

/**
 * Validate date format (YYYY-MM-DD)
 */
export function validateDate(date: string): boolean {
  const pattern = /^\d{4}-\d{2}-\d{2}$/;
  if (!pattern.test(date)) return false;
  const parsed = new Date(date);
  return !isNaN(parsed.getTime());
}

/**
 * Validate blog post tags
 */
export function validateTags(tags?: string[]): boolean {
  if (!tags) return true;
  if (tags.length > 10) return false;
  return tags.every(tag => tag.length >= 2 && tag.length <= 30);
}

/**
 * Get all published blog posts sorted by publication date
 * @returns Array of BlogPost objects, sorted by publishedAt DESC, then title ASC
 */
export async function getBlogPosts(): Promise<BlogPost[]> {
  try {
    // Check if blog directory exists
    if (!fs.existsSync(blogDirectory)) {
      return [];
    }

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

          // Validate required fields
          if (!data.title || !data.excerpt || !data.publishedAt || !data.author) {
            console.warn(`Blog post "${slug}" is missing required fields. Skipping.`);
            return null;
          }

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

    // Filter out nulls, drafts, and sort
    return posts
      .filter((post): post is BlogPost => post !== null && !post.draft)
      .sort((a, b) => {
        const dateCompare = new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
        if (dateCompare !== 0) return dateCompare;
        return a.title.localeCompare(b.title);
      });
  } catch (error) {
    console.error('Error reading blog posts:', error);
    return [];
  }
}

/**
 * Get a single blog post by its slug
 * @param slug - URL-safe identifier (e.g., "building-agentic-ai-systems")
 * @returns BlogPost object if found, null if not found or draft
 */
export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const fullPath = path.join(blogDirectory, `${slug}.md`);

    // Check if file exists
    if (!fs.existsSync(fullPath)) {
      return null;
    }

    const fileContents = fs.readFileSync(fullPath, 'utf8');

    // Parse frontmatter
    const { data, content } = matter(fileContents);

    // Validate required fields
    if (!data.title || !data.excerpt || !data.publishedAt || !data.author) {
      console.warn(`Blog post "${slug}" is missing required fields.`);
      return null;
    }

    // Check if draft
    if (data.draft ?? true) {
      return null;
    }

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
      draft: false,
      content: contentHtml,
    } as BlogPost;
  } catch (error) {
    console.error(`Error reading blog post "${slug}":`, error);
    return null;
  }
}

/**
 * Get the N most recent published blog posts
 * @param limit - Maximum number of posts to return (e.g., 3 for homepage preview)
 * @returns Array of BlogPost objects, limited to N items, sorted by publishedAt DESC
 */
export async function getLatestBlogPosts(limit: number): Promise<BlogPost[]> {
  const allPosts = await getBlogPosts();
  return allPosts.slice(0, limit);
}

/**
 * Get all unique tags used across blog posts
 * @returns Sorted array of unique tag strings
 */
export async function getAllTags(): Promise<string[]> {
  const posts = await getBlogPosts();
  const allTags = posts.flatMap(post => post.tags || []);
  const uniqueTags = Array.from(new Set(allTags));
  return uniqueTags.sort();
}

/**
 * Get all published posts with a specific tag
 * @param tag - Tag to filter by
 * @returns Array of BlogPost objects with matching tag, sorted by publishedAt DESC
 */
export async function getPostsByTag(tag: string): Promise<BlogPost[]> {
  const allPosts = await getBlogPosts();
  return allPosts.filter(post => post.tags?.includes(tag));
}
