'use client';

import Script from 'next/script';

/**
 * Person Schema - Displayed on all pages
 * Identifies Sidra Raza as an AI Engineer & Agentic Systems Developer
 */
export function PersonSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Sidra Raza',
    jobTitle: 'AI Engineer & Agentic Systems Developer',
    url: 'https://sidraraza.xyz',
    sameAs: [
      'https://linkedin.com/in/sidraraza',
      'https://github.com/sidraraza'
    ],
    knowsAbout: [
      'Artificial Intelligence',
      'Agentic AI',
      'Workflow Automation',
      'Next.js',
      'React',
      'TypeScript',
      'Node.js',
      'Python'
    ]
  };

  return (
    <Script
      id="person-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      strategy="beforeInteractive"
    />
  );
}

/**
 * Website Schema - Displayed on homepage only
 * Identifies the portfolio website with search action
 */
export function WebsiteSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Sidra Raza Portfolio',
    url: 'https://sidraraza.xyz',
    description: 'AI Engineer & Agentic Systems Developer portfolio',
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://sidraraza.xyz/search?q={search_term_string}',
      'query-input': 'required name=search_term_string'
    }
  };

  return (
    <Script
      id="website-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      strategy="beforeInteractive"
    />
  );
}

/**
 * BlogPosting Schema - Displayed on individual blog posts only
 * Provides structured data for blog post content
 */
interface BlogPostingSchemaProps {
  post: {
    slug: string;
    title: string;
    excerpt: string;
    publishedAt: string;
    author: string;
    coverImage?: string;
  };
}

export function BlogPostingSchema({ post }: BlogPostingSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    datePublished: post.publishedAt,
    dateModified: post.publishedAt,
    author: {
      '@type': 'Person',
      name: post.author
    },
    url: `https://sidraraza.xyz/blog/${post.slug}`,
    image: post.coverImage
      ? {
          '@type': 'ImageObject',
          url: `https://sidraraza.xyz${post.coverImage}`
        }
      : undefined,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://sidraraza.xyz/blog/${post.slug}`
    },
    publisher: {
      '@type': 'Person',
      name: 'Sidra Raza'
    }
  };

  return (
    <Script
      id="blogposting-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      strategy="beforeInteractive"
    />
  );
}

/**
 * WebSite Search Box Schema - For site search functionality
 */
export function SearchActionSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    url: 'https://sidraraza.xyz',
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://sidraraza.xyz/search?q={search_term_string}',
      'query-input': 'required name=search_term_string'
    }
  };

  return (
    <Script
      id="searchaction-schema"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      strategy="beforeInteractive"
    />
  );
}
