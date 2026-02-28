// Blog post type definitions

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  publishedAt: string;
  author: string;
  tags?: string[];
  coverImage?: string;
  draft: boolean;
}

export interface BlogPostFrontmatter {
  slug: string;
  title: string;
  excerpt: string;
  publishedAt: string;
  author: string;
  tags?: string[];
  coverImage?: string;
  draft?: boolean;
}

// Hero section type definitions
export interface HeroButton {
  label: string;
  href: string;
  variant: 'primary' | 'secondary' | 'outline';
  external?: boolean;
  icon?: string;
}

export interface HeroSection {
  name: string;
  title: string;
  description: string;
  buttons: HeroButton[];
  showBookCall?: boolean;
}

// SEO metadata type definitions
export interface PageMetadata {
  title: string;
  description: string;
  keywords?: string[];
  canonical: string;
  openGraph?: OpenGraph;
  twitter?: TwitterCard;
  robots?: Robots;
}

export interface OpenGraph {
  title?: string;
  description?: string;
  type: 'website' | 'article';
  url: string;
  images?: Array<{ url: string; width?: number; height?: number }>;
  siteName?: string;
  locale?: string;
}

export interface TwitterCard {
  card: 'summary' | 'summary_large_image';
  creator?: string;
  title?: string;
  description?: string;
  images?: string[];
}

export interface Robots {
  index?: boolean;
  follow?: boolean;
  noimageindex?: boolean;
  maxImagePreview?: 'none' | 'standard' | 'large';
  maxVideoPreview?: 'none' | 'standard' | 'auto';
}

export interface SitemapEntry {
  url: string;
  lastModified: string;
  changeFrequency: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority: number;
}
