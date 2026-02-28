import Link from 'next/link';
import { HoverCard } from '@/components/animations/hover-effects';
import { ScrollReveal, ScrollRevealStagger, ScrollRevealItem } from '@/components/animations/scroll-reveal';
import type { BlogPost } from '@/types/blog';

interface BlogListingProps {
  posts: BlogPost[];
}

/**
 * BlogListing - Displays all blog posts in a grid layout
 * 
 * Features:
 * - Shows all published posts
 * - Grid layout (1-3 columns based on screen size)
 * - Staggered scroll animations
 * - Search and filter ready (future enhancement)
 */
export default function BlogListing({ posts }: BlogListingProps) {
  if (!posts || posts.length === 0) {
    return (
      <ScrollReveal direction="up">
        <div className="max-w-4xl mx-auto px-4 py-20 text-center">
          <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-6">
            Blog
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-400 mb-8">
            No blog posts available yet. Check back soon!
          </p>
        </div>
      </ScrollReveal>
    );
  }

  return (
    <ScrollReveal direction="up">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 dark:text-white mb-4">
            Blog
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Insights on AI engineering, agentic systems, and workflow automation
          </p>
        </div>

        {/* Posts Count */}
        <div className="mb-8 text-center">
          <p className="text-slate-500 dark:text-slate-500">
            {posts.length} {posts.length === 1 ? 'post' : 'posts'} published
          </p>
        </div>

        {/* Posts Grid */}
        <ScrollRevealStagger staggerDelay={0.1}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <ScrollRevealItem key={post.slug} direction="up">
                <BlogPostCard post={post} />
              </ScrollRevealItem>
            ))}
          </div>
        </ScrollRevealStagger>
      </div>
    </ScrollReveal>
  );
}

/**
 * BlogPostCard - Individual blog post card for listing
 */
function BlogPostCard({ post }: { post: BlogPost }) {
  return (
    <HoverCard scale={1.02} lift={-8}>
      <article className="h-full bg-white dark:bg-slate-800 rounded-2xl shadow-lg overflow-hidden flex flex-col transition-shadow hover:shadow-xl">
        {/* Cover Image (if available) */}
        {post.coverImage && (
          <div className="relative h-48 overflow-hidden bg-slate-200 dark:bg-slate-700">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={post.coverImage}
              alt={post.title}
              className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
              loading="lazy"
            />
          </div>
        )}

        {/* Content */}
        <div className="flex-1 p-6 flex flex-col">
          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {post.tags.slice(0, 3).map((tag, index) => (
                <span
                  key={index}
                  className="px-2 py-1 text-xs font-medium text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          {/* Title */}
          <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-3 line-clamp-2">
            {post.title}
          </h2>

          {/* Excerpt */}
          <p className="text-slate-600 dark:text-slate-400 mb-4 flex-1 line-clamp-3">
            {post.excerpt}
          </p>

          {/* Meta Info */}
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm text-slate-500 dark:text-slate-500">
              {new Date(post.publishedAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </span>
            <span className="text-sm text-slate-500 dark:text-slate-500">
              {post.author}
            </span>
          </div>

          {/* Read More Button */}
          <Link
            href={`/blog/${post.slug}`}
            className="inline-flex items-center text-blue-600 dark:text-blue-400 font-medium hover:underline group"
          >
            Read More
            <svg
              className="ml-1 w-4 h-4 transition-transform group-hover:translate-x-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </Link>
        </div>
      </article>
    </HoverCard>
  );
}
