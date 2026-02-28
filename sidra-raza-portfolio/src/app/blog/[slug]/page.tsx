import BlogPost from '@/components/blog/blog-post';
import { getBlogPostBySlug, getBlogPosts } from '@/lib/blog';
import { BlogPostingSchema } from '@/components/seo/structured-data';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

type Props = {
  params: { slug: string };
};

/**
 * Generate metadata for blog post page
 */
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await getBlogPostBySlug(params.slug);

  if (!post) {
    return {
      title: 'Post Not Found'
    };
  }

  return {
    title: post.title,
    description: post.excerpt,
    keywords: post.tags,
    authors: [{ name: post.author }],
    openGraph: {
      title: `${post.title} | Sidra Raza`,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.publishedAt,
      authors: [post.author],
      images: post.coverImage ? [{ url: post.coverImage }] : undefined
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt
    }
  };
}

/**
 * Generate static params for all blog posts
 * This enables static generation at build time
 */
export async function generateStaticParams() {
  const posts = await getBlogPosts();
  return posts.map(post => ({ slug: post.slug }));
}

/**
 * Blog post page component
 */
export default async function BlogPostPage({ params }: Props) {
  const post = await getBlogPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  return (
    <>
      <BlogPostingSchema post={post} />
      <BlogPost post={post} />
    </>
  );
}
