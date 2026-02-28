import Link from 'next/link';
import { ScrollReveal } from '@/components/animations/scroll-reveal';
import type { BlogPost } from '@/types/blog';

interface BlogPostProps {
  post: BlogPost;
}

/**
 * BlogPost - Displays full blog post content
 * 
 * Features:
 * - Full post content with markdown rendering
 * - Cover image display
 * - Tags and metadata
 * - Author and publication date
 * - Navigation to other posts
 */
export default function BlogPost({ post }: BlogPostProps) {
  return (
    <article className="min-h-screen bg-white dark:bg-slate-900">
      {/* Hero Section with Cover Image */}
      {post.coverImage && (
        <div className="relative h-64 sm:h-80 md:h-96 w-full overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={post.coverImage}
            alt={post.title}
            className="w-full h-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-12">
            <ScrollReveal direction="up" duration={0.6}>
              <div className="max-w-4xl mx-auto">
                {/* Tags */}
                {post.tags && post.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-4">
                    {post.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 text-sm font-medium text-white bg-blue-600/90 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
                
                {/* Title */}
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
                  {post.title}
                </h1>

                {/* Meta */}
                <div className="flex items-center gap-4 text-white/90">
                  <span>{post.author}</span>
                  <span>•</span>
                  <time dateTime={post.publishedAt}>
                    {new Date(post.publishedAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </time>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      )}

      {/* Content Container */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Excerpt */}
        <ScrollReveal direction="up" duration={0.6} delay={0.1}>
          <p className="text-xl sm:text-2xl text-slate-600 dark:text-slate-300 mb-12 leading-relaxed">
            {post.excerpt}
          </p>
        </ScrollReveal>

        {/* Main Content */}
        <ScrollReveal direction="up" duration={0.6} delay={0.2}>
          <div 
            className="prose prose-lg dark:prose-invert max-w-none
              prose-headings:font-bold prose-headings:text-slate-900 dark:prose-headings:text-white
              prose-h1:text-4xl prose-h2:text-3xl prose-h3:text-2xl prose-h4:text-xl
              prose-p:text-slate-700 dark:prose-p:text-slate-300
              prose-a:text-blue-600 dark:prose-a:text-blue-400 prose-a:no-underline hover:prose-a:underline
              prose-strong:font-semibold prose-strong:text-slate-900 dark:prose-strong:text-white
              prose-ul:list-disc prose-ol:list-decimal
              prose-li:text-slate-700 dark:prose-li:text-slate-300
              prose-blockquote:border-l-4 prose-blockquote:border-blue-500
              prose-blockquote:pl-4 prose-blockquote:italic
              prose-blockquote:text-slate-700 dark:prose-blockquote:text-slate-300
              prose-code:bg-slate-100 dark:prose-code:bg-slate-800
              prose-code:px-2 prose-code:py-1 prose-code:rounded
              prose-code:text-sm prose-code:text-red-600 dark:prose-code:text-red-400
              prose-pre:bg-slate-900 prose-pre:text-white
              prose-pre:border prose-pre:border-slate-700
              prose-hr:border-slate-200 dark:prose-hr:border-slate-700"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </ScrollReveal>

        {/* Back to Blog Link */}
        <ScrollReveal direction="up" duration={0.6} delay={0.3}>
          <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-700">
            <Link
              href="/blog"
              className="inline-flex items-center text-blue-600 dark:text-blue-400 font-medium hover:underline group"
            >
              <svg
                className="mr-2 w-5 h-5 transition-transform group-hover:-translate-x-1"
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
              Back to all posts
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </article>
  );
}
