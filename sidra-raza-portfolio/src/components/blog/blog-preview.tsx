import Link from 'next/link';
import { HoverCard } from '@/components/animations/hover-effects';
import type { BlogPost } from '@/types/blog';

interface BlogPreviewProps {
  posts: BlogPost[];
}

/**
 * BlogPreview - Displays latest 3 blog post previews on homepage
 * 
 * Features:
 * - Shows exactly 3 latest posts
 * - Each preview has title, excerpt, and Read More button
 * - Hover card animation
 * - Responsive grid layout
 */
export default function BlogPreview({ posts }: BlogPreviewProps) {
  if (!posts || posts.length === 0) {
    return null;
  }

  // Show only latest 3 posts
  const latestPosts = posts.slice(0, 3);

  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Latest Blog Posts
          </h2>
          <p className="text-lg text-text-muted max-w-2xl mx-auto">
            Insights on AI engineering, agentic systems, and workflow automation
          </p>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {latestPosts.map((post) => (
            <BlogPreviewCard key={post.slug} post={post} />
          ))}
        </div>

        {/* View All Link */}
        <div className="text-center mt-12">
          <Link
            href="/blog"
            className="inline-flex items-center text-primary hover:text-primary-light font-medium hover:underline transition-colors"
          >
            View all posts
            <svg
              className="ml-2 w-5 h-5"
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
      </div>
    </section>
  );
}

/**
 * BlogPreviewCard - Individual blog post preview card
 */
function BlogPreviewCard({ post }: { post: BlogPost }) {
  return (
    <HoverCard scale={1.02} lift={-8}>
      <article className="h-full bg-surface border border-border rounded-2xl shadow-lg overflow-hidden flex flex-col">
        {/* Cover Image (if available) */}
        {post.coverImage && (
          <div className="relative h-48 overflow-hidden bg-surface-light">
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
          {/* Title */}
          <h3 className="text-xl font-bold text-foreground mb-3 line-clamp-2">
            {post.title}
          </h3>

          {/* Excerpt */}
          <p className="text-text-muted mb-4 flex-1 line-clamp-3">
            {post.excerpt}
          </p>

          {/* Meta Info */}
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm text-text-dim">
              {new Date(post.publishedAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
              })}
            </span>
            {post.tags && post.tags.length > 0 && (
              <div className="flex gap-2">
                {post.tags.slice(0, 2).map((tag, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 text-xs font-medium text-primary bg-primary/10 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Read More Button */}
          <Link
            href={`/blog/${post.slug}`}
            className="inline-flex items-center text-primary hover:text-primary-light font-medium hover:underline group transition-colors"
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
