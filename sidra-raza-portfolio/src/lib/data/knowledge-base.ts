/**
 * Knowledge Base Module
 * 
 * Manages the initialization, chunking, and retrieval of portfolio content
 * for the RAG chatbot system.
 */

import { v4 as uuidv4 } from 'uuid';
import type {
  ContentChunk,
  KnowledgeBase,
  KnowledgeBaseConfig,
  PortfolioData,
  ScoredChunk,
} from '@/types/chat';
import { generateEmbedding, generateEmbeddingsBatch } from './embeddings';
import { findRelevantChunks as findRelevantChunksUtil } from './retrieval';
import { portfolioData } from './portfolio-data';

/**
 * Current knowledge base schema version
 */
const KNOWLEDGE_BASE_VERSION = '1.0.0';

/**
 * In-memory knowledge base cache
 */
let knowledgeBaseCache: KnowledgeBase | null = null;

/**
 * Chunk content into semantically meaningful pieces
 * 
 * @param data - Portfolio data to chunk
 * @returns Array of ContentChunks ready for embedding generation
 * 
 * @example
 * ```typescript
 * const chunks = chunkPortfolioContent(portfolioData);
 * ```
 */
export function chunkPortfolioContent(data: PortfolioData): ContentChunk[] {
  const chunks: ContentChunk[] = [];
  const timestamp = new Date().toISOString();

  // About section (2 chunks)
  chunks.push({
    id: 'about-summary',
    section: 'about',
    content: data.about.summary,
    embedding: [],
    metadata: {
      title: 'About Sidra Raza',
      lastUpdated: timestamp,
      priority: 2.0, // High priority for about queries
    },
  });

  if (data.about.background) {
    chunks.push({
      id: 'about-background',
      section: 'about',
      content: data.about.background,
      embedding: [],
      metadata: {
        title: 'Background & Approach',
        lastUpdated: timestamp,
        priority: 1.5,
      },
    });
  }

  // Skills by category (one chunk per category)
  for (const [category, skills] of Object.entries(data.skills)) {
    chunks.push({
      id: `skills-${category.toLowerCase().replace(/\s+/g, '-')}`,
      section: 'skills',
      content: `${category}: ${skills.join(', ')}`,
      embedding: [],
      metadata: {
        title: `${category} Skills`,
        tags: skills,
        lastUpdated: timestamp,
        priority: 1.0,
      },
    });
  }

  // Services (one chunk per service)
  data.services.forEach((service, index) => {
    chunks.push({
      id: `services-${index}`,
      section: 'services',
      content: `${service.title}: ${service.description}`,
      embedding: [],
      metadata: {
        title: service.title,
        lastUpdated: timestamp,
        priority: 1.5,
      },
    });
  });

  // Projects (one chunk per project)
  data.projects.forEach((project) => {
    const content = [
      `Project: ${project.title}`,
      `Description: ${project.description}`,
      project.technologies && `Technologies: ${project.technologies.join(', ')}`,
      project.url && `URL: ${project.url}`,
    ]
      .filter(Boolean)
      .join('\n');

    chunks.push({
      id: `projects-${project.title.toLowerCase().replace(/\s+/g, '-')}`,
      section: 'projects',
      content,
      embedding: [],
      metadata: {
        title: project.title,
        url: project.url,
        tags: project.technologies,
        lastUpdated: timestamp,
        priority: 1.2,
      },
    });
  });

  // Experience (one chunk per role)
  data.experience.forEach((exp) => {
    const content = [
      `Role: ${exp.role}`,
      `Company: ${exp.company}`,
      `Duration: ${exp.duration}`,
      exp.description && `Description: ${exp.description}`,
    ]
      .filter(Boolean)
      .join('\n');

    chunks.push({
      id: `experience-${exp.company.toLowerCase().replace(/\s+/g, '-')}-${exp.role.toLowerCase().replace(/\s+/g, '-')}`,
      section: 'experience',
      content,
      embedding: [],
      metadata: {
        title: exp.role,
        lastUpdated: timestamp,
        priority: 1.0,
      },
    });
  });

  // Contact information (single chunk)
  const contactContent = Object.entries(data.contact)
    .map(([key, value]) => `${key}: ${value}`)
    .join('\n');

  chunks.push({
    id: 'contact',
    section: 'contact',
    content: contactContent,
    embedding: [],
    metadata: {
      title: 'Contact Information',
      lastUpdated: timestamp,
      priority: 2.0, // High priority for contact queries
    },
  });

  // Blog posts (one chunk per post)
  data.blog.forEach((post) => {
    chunks.push({
      id: `blog-${post.title.toLowerCase().replace(/\s+/g, '-')}`,
      section: 'blog',
      content: `${post.title}: ${post.summary}`,
      embedding: [],
      metadata: {
        title: post.title,
        url: post.url,
        lastUpdated: timestamp,
        priority: 0.8,
      },
    });
  });

  return chunks;
}

/**
 * Generate embeddings for all chunks in the knowledge base
 * 
 * @param chunks - Array of ContentChunks without embeddings
 * @returns Promise resolving to ContentChunks with embeddings
 * 
 * @example
 * ```typescript
 * const chunksWithEmbeddings = await generateChunkEmbeddings(chunks);
 * ```
 */
export async function generateChunkEmbeddings(
  chunks: ContentChunk[]
): Promise<ContentChunk[]> {
  console.log(`Generating embeddings for ${chunks.length} chunks...`);

  // Extract content for embedding
  const contents = chunks.map(chunk => chunk.content);

  try {
    // Generate embeddings in batch
    const embeddings = await generateEmbeddingsBatch(contents);

    // Assign embeddings to chunks
    return chunks.map((chunk, index) => ({
      ...chunk,
      embedding: embeddings[index],
    }));
  } catch (error) {
    console.error('Error generating embeddings:', error);
    throw error;
  }
}

/**
 * Initialize the knowledge base from portfolio data
 * 
 * This function:
 * 1. Chunks the portfolio content
 * 2. Generates embeddings for all chunks
 * 3. Returns a ready-to-query KnowledgeBase
 * 
 * @param data - Portfolio data (defaults to exported portfolioData)
 * @returns Promise resolving to initialized KnowledgeBase
 * 
 * @example
 * ```typescript
 * const kb = await initializeKnowledgeBase(portfolioData);
 * console.log(`Knowledge base initialized with ${kb.chunks.length} chunks`);
 * ```
 */
export async function initializeKnowledgeBase(
  data: PortfolioData = portfolioData
): Promise<KnowledgeBase> {
  console.log('Initializing knowledge base...');

  // Chunk the content
  const chunks = chunkPortfolioContent(data);
  console.log(`Created ${chunks.length} content chunks`);

  // Generate embeddings
  const chunksWithEmbeddings = await generateChunkEmbeddings(chunks);
  console.log('Embeddings generated successfully');

  // Create knowledge base
  const knowledgeBase: KnowledgeBase = {
    chunks: chunksWithEmbeddings,
    initialized: true,
    lastBuilt: new Date().toISOString(),
    version: KNOWLEDGE_BASE_VERSION,
  };

  // Cache for future use
  knowledgeBaseCache = knowledgeBase;

  return knowledgeBase;
}

/**
 * Get the knowledge base (from cache or initialize)
 * 
 * @returns Promise resolving to KnowledgeBase
 * @throws Error if knowledge base is not initialized
 * 
 * @example
 * ```typescript
 * const kb = await getKnowledgeBase();
 * if (!kb.initialized) {
 *   throw new Error('Knowledge base not ready');
 * }
 * ```
 */
export async function getKnowledgeBase(): Promise<KnowledgeBase> {
  // Return cached version if available
  if (knowledgeBaseCache && knowledgeBaseCache.initialized) {
    return knowledgeBaseCache;
  }

  // Initialize if not cached
  console.log('Knowledge base not cached, initializing...');
  knowledgeBaseCache = await initializeKnowledgeBase();
  return knowledgeBaseCache;
}

/**
 * Find relevant chunks for a query
 * 
 * @param query - The search query (user question)
 * @param queryEmbedding - Pre-computed query embedding (optional)
 * @param config - Retrieval configuration (optional)
 * @returns Promise resolving to array of ScoredChunks
 * 
 * @example
 * ```typescript
 * const results = await retrieveChunks("What services does Sidra provide?");
 * ```
 */
export async function retrieveChunks(
  query: string,
  queryEmbedding?: number[],
  config?: Partial<KnowledgeBaseConfig>
): Promise<ScoredChunk[]> {
  const kb = await getKnowledgeBase();

  // Generate query embedding if not provided
  const embedding = queryEmbedding || (await import('./embeddings')).generateEmbedding(query);

  // Find relevant chunks
  return findRelevantChunksUtil(await embedding, kb.chunks, config);
}

/**
 * Get a chunk by its ID
 * 
 * @param chunkId - The chunk ID to retrieve
 * @returns The ContentChunk if found, undefined otherwise
 * 
 * @example
 * ```typescript
 * const chunk = await getChunkById('about-summary');
 * ```
 */
export async function getChunkById(chunkId: string): Promise<ContentChunk | undefined> {
  const kb = await getKnowledgeBase();
  return kb.chunks.find(chunk => chunk.id === chunkId);
}

/**
 * Get all chunks for a specific section
 * 
 * @param section - The section to retrieve (e.g., 'about', 'skills')
 * @returns Promise resolving to array of ContentChunks
 * 
 * @example
 * ```typescript
 * const aboutChunks = await getChunksBySection('about');
 * ```
 */
export async function getChunksBySection(section: string): Promise<ContentChunk[]> {
  const kb = await getKnowledgeBase();
  return kb.chunks.filter(chunk => chunk.section === section);
}

/**
 * Rebuild the knowledge base (e.g., after content updates)
 * 
 * @param data - Updated portfolio data
 * @returns Promise resolving to new KnowledgeBase
 * 
 * @example
 * ```typescript
 * const newKb = await rebuildKnowledgeBase(updatedPortfolioData);
 * ```
 */
export async function rebuildKnowledgeBase(
  data: PortfolioData = portfolioData
): Promise<KnowledgeBase> {
  console.log('Rebuilding knowledge base...');
  
  // Clear cache
  knowledgeBaseCache = null;
  
  // Reinitialize
  return initializeKnowledgeBase(data);
}

/**
 * Get knowledge base statistics
 * 
 * @returns Object with knowledge base statistics
 * 
 * @example
 * ```typescript
 * const stats = await getKnowledgeBaseStats();
 * console.log(`Total chunks: ${stats.totalChunks}`);
 * ```
 */
export async function getKnowledgeBaseStats(): Promise<{
  totalChunks: number;
  chunksBySection: Record<string, number>;
  version: string;
  lastBuilt: string | null;
  initialized: boolean;
}> {
  const kb = await getKnowledgeBase();

  const chunksBySection = kb.chunks.reduce((acc, chunk) => {
    acc[chunk.section] = (acc[chunk.section] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return {
    totalChunks: kb.chunks.length,
    chunksBySection,
    version: kb.version,
    lastBuilt: kb.lastBuilt,
    initialized: kb.initialized,
  };
}
