# SEO Metadata Contract

**Feature**: 002-portfolio-update  
**Date**: 2026-02-28  
**Purpose**: Define SEO metadata patterns and contracts for all pages

---

## Module: `src/components/seo/`

### File Structure

```
src/components/seo/
├── structured-data.tsx      # JSON-LD schema components
└── metadata.ts              # Metadata generation utilities (if needed)
```

---

## Root Layout Metadata

### Implementation: `src/app/layout.tsx`

```typescript
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { PersonSchema, WebsiteSchema } from '@/components/seo/structured-data';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    default: 'Sidra Raza | AI Engineer & Agentic Systems Developer',
    template: '%s | Sidra Raza'
  },
  description: 'AI Engineer & Agentic Systems Developer. I design and build intelligent AI systems that automate business workflows, increase efficiency, and drive scalable growth.',
  keywords: [
    'AI Engineer',
    'Agentic AI',
    'AI Automation',
    'Business Workflow Automation',
    'AI Systems Developer',
    'Next.js Developer',
    'Full Stack Developer',
    'Portfolio'
  ],
  authors: [{ name: 'Sidra Raza' }],
  creator: 'Sidra Raza',
  publisher: 'Sidra Raza',
  formatDetection: {
    email: false,
    address: false,
    telephone: false
  },
  metadataBase: new URL('https://sidraraza.xyz'),
  alternates: {
    canonical: '/'
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://sidraraza.xyz',
    siteName: 'Sidra Raza Portfolio',
    title: 'Sidra Raza | AI Engineer & Agentic Systems Developer',
    description: 'AI Engineer & Agentic Systems Developer. I design and build intelligent AI systems that automate business workflows.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Sidra Raza - AI Engineer & Agentic Systems Developer'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sidra Raza | AI Engineer & Agentic Systems Developer',
    description: 'AI Engineer & Agentic Systems Developer. I design and build intelligent AI systems that automate business workflows.',
    creator: '@sidraraza',
    images: ['/og-image.jpg']
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1
    }
  },
  verification: {
    google: 'your-google-site-verification-code',
    yandex: 'your-yandex-verification-code'
  }
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <PersonSchema />
        <WebsiteSchema />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
```

---

## Page-Specific Metadata

### Homepage: `src/app/page.tsx`

```typescript
import type { Metadata } from 'next';
import HeroSection from '@/components/hero/hero-section';
import BlogPreview from '@/components/blog/blog-preview';
import { getLatestBlogPosts } from '@/lib/blog';

export const metadata: Metadata = {
  title: 'Home',
  description: 'AI Engineer & Agentic Systems Developer. I design and build intelligent AI systems that automate business workflows, increase efficiency, and drive scalable growth.',
  openGraph: {
    title: 'Sidra Raza | AI Engineer & Agentic Systems Developer',
    description: 'AI Engineer & Agentic Systems Developer specializing in business workflow automation and scalable AI systems.'
  }
};

export default async function HomePage() {
  const latestPosts = await getLatestBlogPosts(3);

  return (
    <main>
      <HeroSection />
      <BlogPreview posts={latestPosts} />
    </main>
  );
}
```

---

### About Page: `src/app/about/page.tsx`

```typescript
import type { Metadata } from 'next';
import AboutHero from './about-hero';
import Expertise from './expertise';
import Personal from './personal';
import Philosophy from './philosophy';

export const metadata: Metadata = {
  title: 'About',
  description: 'Learn about Sidra Raza, an AI Engineer & Agentic Systems Developer passionate about building intelligent automation solutions for businesses.',
  keywords: ['About Sidra Raza', 'AI Engineer Background', 'Agentic AI Developer'],
  openGraph: {
    title: 'About | Sidra Raza',
    description: 'Learn about Sidra Raza, an AI Engineer & Agentic Systems Developer.',
    type: 'profile',
    profile: {
      firstName: 'Sidra',
      lastName: 'Raza'
    }
  }
};

export default function AboutPage() {
  return (
    <main>
      <AboutHero />
      <Expertise />
      <Personal />
      <Philosophy />
    </main>
  );
}
```

---

### Services Page: `src/app/services/page.tsx`

```typescript
import type { Metadata } from 'next';
import ServicesHero from './services-hero';
import ServiceTiers from './service-tiers';
import FAQ from './faq';
import ServicesCTA from './services-cta';

export const metadata: Metadata = {
  title: 'Services',
  description: 'Professional AI engineering services: agentic AI systems, workflow automation, AI consulting, and custom AI solutions for businesses.',
  keywords: [
    'AI Services',
    'Agentic AI Development',
    'Workflow Automation',
    'AI Consulting',
    'Custom AI Solutions'
  ],
  openGraph: {
    title: 'Services | Sidra Raza',
    description: 'Professional AI engineering services for businesses ready to automate and scale.',
    type: 'website'
  }
};

export default function ServicesPage() {
  return (
    <main>
      <ServicesHero />
      <ServiceTiers />
      <FAQ />
      <ServicesCTA />
    </main>
  );
}
```

---

### Projects Page: `src/app/projects/page.tsx`

```typescript
import type { Metadata } from 'next';
import ProjectsHero from './projects-hero';
import ProjectsGrid from './projects-grid';
import ProjectsCTA from './projects-cta';

export const metadata: Metadata = {
  title: 'Projects',
  description: 'Explore AI projects and agentic systems built by Sidra Raza. Real-world implementations of intelligent automation solutions.',
  keywords: ['AI Projects', 'Agentic AI Portfolio', 'Automation Projects', 'AI Case Studies'],
  openGraph: {
    title: 'Projects | Sidra Raza',
    description: 'Explore AI projects and agentic systems built by Sidra Raza.',
    type: 'website'
  }
};

export default function ProjectsPage() {
  return (
    <main>
      <ProjectsHero />
      <ProjectsGrid />
      <ProjectsCTA />
    </main>
  );
}
```

---

### Blog Listing Page: `src/app/blog/page.tsx`

```typescript
import type { Metadata } from 'next';
import { getBlogPosts } from '@/lib/blog';
import BlogListing from '@/components/blog/blog-listing';

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Read insights on AI engineering, agentic systems, workflow automation, and business technology from Sidra Raza.',
  keywords: [
    'AI Blog',
    'Agentic AI Articles',
    'Automation Insights',
    'Technology Blog'
  ],
  openGraph: {
    title: 'Blog | Sidra Raza',
    description: 'Insights on AI engineering, agentic systems, and workflow automation.',
    type: 'blog'
  }
};

export default async function BlogPage() {
  const allPosts = await getBlogPosts();

  return <BlogListing posts={allPosts} />;
}
```

---

### Blog Post Page: `src/app/blog/[slug]/page.tsx`

```typescript
import type { Metadata } from 'next';
import { getBlogPostBySlug, getBlogPosts } from '@/lib/blog';
import { notFound } from 'next/navigation';
import BlogPost from '@/components/blog/blog-post';
import { BlogPostingSchema } from '@/components/seo/structured-data';

type Props = {
  params: { slug: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await getBlogPostBySlug(params.slug);

  if (!post) {
    return {
      title: 'Blog Post Not Found'
    };
  }

  return {
    title: post.title,
    description: post.excerpt,
    keywords: post.tags,
    authors: [{ name: post.author }],
    publishedTime: post.publishedAt,
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

export async function generateStaticParams() {
  const posts = await getBlogPosts();
  return posts.map(post => ({ slug: post.slug }));
}

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
```

---

### Contact Page: `src/app/contact/page.tsx`

```typescript
import type { Metadata } from 'next';
import ContactHero from './contact-hero';
import ContactInfo from './contact-info';
import ContactForm from './contact-form';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch with Sidra Raza for AI engineering projects, consultations, and collaboration opportunities.',
  keywords: ['Contact Sidra Raza', 'AI Engineer Contact', 'Hire AI Developer'],
  openGraph: {
    title: 'Contact | Sidra Raza',
    description: 'Get in touch for AI engineering projects and consultations.'
  }
};

export default function ContactPage() {
  return (
    <main>
      <ContactHero />
      <ContactInfo />
      <ContactForm />
    </main>
  );
}
```

---

### Agents Page: `src/app/agents/page.tsx`

```typescript
import type { Metadata } from 'next';
import AgentsHero from './agents-hero';
import AgentsGrid from './agents-grid';
import AgentsCTA from './agents-cta';

export const metadata: Metadata = {
  title: 'AI Agents',
  description: 'Explore specialized AI agents for business automation: content strategist, business validator, proposal generator, and AI assistant.',
  keywords: [
    'AI Agents',
    'Agentic AI',
    'Business Automation Agents',
    'AI Assistant'
  ],
  openGraph: {
    title: 'AI Agents | Sidra Raza',
    description: 'Specialized AI agents for business automation.',
    type: 'website'
  }
};

export default function AgentsPage() {
  return (
    <main>
      <AgentsHero />
      <AgentsGrid />
      <AgentsCTA />
    </main>
  );
}
```

---

### Auth Pages: `src/app/auth/sign-in/page.tsx` & `sign-up/page.tsx`

```typescript
import type { Metadata } from 'next';
import SignIn from './sign-in-client';

export const metadata: Metadata = {
  title: 'Sign In',
  description: 'Sign in to access your dashboard and manage AI agent configurations.',
  robots: {
    index: false,
    follow: false
  }
};

export default function SignInPage() {
  return <SignIn />;
}
```

---

### Dashboard Page: `src/app/dashboard/page.tsx`

```typescript
import type { Metadata } from 'next';
import DashboardClient from './dashboard-client';

export const metadata: Metadata = {
  title: 'Dashboard',
  description: 'Manage your AI agents, view analytics, and configure automation workflows.',
  robots: {
    index: false,
    follow: false
  }
};

export default function DashboardPage() {
  return <DashboardClient />;
}
```

---

## Structured Data Components

### Implementation: `src/components/seo/structured-data.tsx`

```typescript
'use client';

import Script from 'next/script';

// Person Schema (on all pages)
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

// Website Schema (homepage only)
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

// BlogPosting Schema (blog posts only)
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
```

---

## Testing Contract

### Metadata Validation Tests

```typescript
// tests/unit/seo/metadata.test.ts

import { metadata as homeMetadata } from '@/app/page';
import { metadata as aboutMetadata } from '@/app/about/page';
// ... import other page metadata

describe('Page Metadata', () => {
  describe('Homepage', () => {
    it('has correct title', () => {
      expect(homeMetadata.title).toBeDefined();
    });

    it('has description within optimal length (150-160 chars)', () => {
      const desc = homeMetadata.description;
      expect(desc).toBeDefined();
      expect(desc!.length).toBeGreaterThanOrEqual(150);
      expect(desc!.length).toBeLessThanOrEqual(160);
    });

    it('has openGraph tags configured', () => {
      expect(homeMetadata.openGraph).toBeDefined();
      expect(homeMetadata.openGraph?.type).toBe('website');
    });

    it('has Twitter card configured', () => {
      expect(homeMetadata.twitter).toBeDefined();
      expect(homeMetadata.twitter?.card).toBe('summary_large_image');
    });

    it('has robots configured for indexing', () => {
      expect(homeMetadata.robots?.index).toBe(true);
      expect(homeMetadata.robots?.follow).toBe(true);
    });
  });

  describe('Auth Pages', () => {
    it('has robots noindex for sign-in', () => {
      expect(signInMetadata.robots?.index).toBe(false);
    });

    it('has robots noindex for sign-up', () => {
      expect(signUpMetadata.robots?.index).toBe(false);
    });
  });
});
```

### Structured Data Validation Tests

```typescript
// tests/integration/seo/structured-data.test.ts

import { render } from '@testing-library/react';
import { PersonSchema, WebsiteSchema, BlogPostingSchema } from '@/components/seo/structured-data';

describe('Structured Data', () => {
  it('renders Person schema with correct structure', () => {
    const { container } = render(<PersonSchema />);
    const script = container.querySelector('script[type="application/ld+json"]');
    expect(script).toBeTruthy();

    const schema = JSON.parse(script!.textContent || '{}');
    expect(schema['@context']).toBe('https://schema.org');
    expect(schema['@type']).toBe('Person');
    expect(schema.name).toBe('Sidra Raza');
    expect(schema.jobTitle).toBe('AI Engineer & Agentic Systems Developer');
  });

  it('renders Website schema with correct structure', () => {
    const { container } = render(<WebsiteSchema />);
    const script = container.querySelector('script[type="application/ld+json"]');
    expect(script).toBeTruthy();

    const schema = JSON.parse(script!.textContent || '{}');
    expect(schema['@type']).toBe('WebSite');
    expect(schema.name).toBe('Sidra Raza Portfolio');
  });

  it('renders BlogPosting schema with correct structure', () => {
    const mockPost = {
      slug: 'test-post',
      title: 'Test Post',
      excerpt: 'Test excerpt',
      publishedAt: '2026-02-28',
      author: 'Sidra Raza'
    };

    const { container } = render(<BlogPostingSchema post={mockPost} />);
    const script = container.querySelector('script[type="application/ld+json"]');
    expect(script).toBeTruthy();

    const schema = JSON.parse(script!.textContent || '{}');
    expect(schema['@type']).toBe('BlogPosting');
    expect(schema.headline).toBe(mockPost.title);
    expect(schema.datePublished).toBe(mockPost.publishedAt);
  });
});
```

---

## Google Rich Results Test

### Validation URLs

After implementation, validate at: https://search.google.com/test/rich-results

**Expected Valid Schemas**:
1. **Person**: All pages
2. **WebSite**: Homepage only
3. **BlogPosting**: Individual blog posts only

### Validation Steps

1. Deploy to production or staging
2. Run each URL through Rich Results Test
3. Verify no errors (warnings are acceptable)
4. Check "Person" appears on all pages
5. Check "WebSite" appears only on homepage
6. Check "BlogPosting" appears only on blog post pages

---

## Performance Impact

### Script Strategy

- `strategy="beforeInteractive"`: Critical schemas (Person, Website)
- Schemas are small JSON objects (<1KB)
- No runtime performance impact
- Improves SEO and search result appearance

### Bundle Size

- Structured data components: ~2KB gzipped
- No external dependencies
- Tree-shaken automatically by Next.js

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2026-02-28 | Initial SEO metadata and structured data contract |
