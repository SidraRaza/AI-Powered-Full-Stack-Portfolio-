import BlogListing from '@/components/blog/blog-listing';
import { getBlogPosts } from '@/lib/blog';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Sidra Raza – Full Stack & Agentic AI Developer",
  description: "Read insights on AI engineering, agentic systems, workflow automation, and business technology.",
  keywords: [
    'AI Blog',
    'Agentic AI Articles',
    'Automation Insights',
    'Technology Blog',
    'AI Engineering',
    'Workflow Automation'
  ],
  openGraph: {
    title: "Sidra Raza – Full Stack & Agentic AI Developer",
    description: "Insights on AI engineering, agentic systems, and workflow automation.",
    type: 'website',
    url: 'https://sidraraza.xyz/blog'
  },
  twitter: {
    card: 'summary_large_image',
    title: "Sidra Raza – Full Stack & Agentic AI Developer",
    description: 'Insights on AI engineering, agentic systems, and workflow automation.'
  }
};

export default async function BlogPage() {
  const allPosts = await getBlogPosts();

  return <BlogListing posts={allPosts} />;
}
