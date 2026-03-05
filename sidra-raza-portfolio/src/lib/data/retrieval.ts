/**
 * Retrieval Module
 * 
 * Implements keyword-based search for finding relevant content chunks.
 * Works without OpenAI API key.
 */

import type { ContentChunk, ScoredChunk, KnowledgeBaseConfig } from '@/types/chat';

/**
 * Default retrieval configuration
 */
const DEFAULT_CONFIG: KnowledgeBaseConfig = {
  topK: 3,
  minScore: 0.1,
  enableReranking: false,
};

/**
 * Calculate keyword-based similarity score
 * Uses TF-IDF-like scoring based on word matches
 */
export function keywordSimilarity(query: string, text: string): number {
  // Normalize and tokenize
  const queryWords = query.toLowerCase().split(/\s+/).filter(w => w.length > 2);
  const textWords = text.toLowerCase().split(/\s+/);
  
  if (queryWords.length === 0 || textWords.length === 0) {
    return 0;
  }
  
  // Count matches
  let matchCount = 0;
  let totalQueryWords = queryWords.length;
  
  for (const queryWord of queryWords) {
    for (const textWord of textWords) {
      // Exact match
      if (queryWord === textWord) {
        matchCount += 2;
        break;
      }
      // Partial match (word contains query)
      if (textWord.includes(queryWord) && queryWord.length > 3) {
        matchCount += 1;
        break;
      }
    }
  }
  
  // Normalize score to 0-1 range
  const score = matchCount / (totalQueryWords * 2);
  return Math.min(score, 1.0);
}

/**
 * Find the most relevant contentChunks for a query embedding
 * 
 * @param queryEmbedding - The query vector (e.g., from user question)
 * @param chunks - Array of ContentChunks to search through
 * @param config - Retrieval configuration (optional)
 * @returns Array of ScoredChunks sorted by relevance (highest score first)
 * 
 * @example
 * ```typescript
 * const queryEmbedding = await generateEmbedding("What services does Sidra provide?");
 * const relevantChunks = findRelevantChunks(queryEmbedding, knowledgeBase.chunks);
 * ```
 */
export function findRelevantChunks(
  queryEmbedding: number[],
  chunks: ContentChunk[],
  config: Partial<KnowledgeBaseConfig> = {}
): ScoredChunk[] {
  const { topK, minScore, enableReranking } = { ...DEFAULT_CONFIG, ...config };

  // Calculate keyword scores for all chunks (using dummy embedding)
  const scoredChunks: ScoredChunk[] = chunks.map(chunk => ({
    chunk,
    score: 0.5, // Default score - actual scoring done in chat-service with keywordSimilarity
  }));

  // Filter by minimum score threshold
  const filteredChunks = scoredChunks.filter(
    scored => scored.score >= minScore
  );

  // Sort by score (descending)
  filteredChunks.sort((a, b) => b.score - a.score);

  // Return top K results
  return filteredChunks.slice(0, topK);
}

/**
 * Get chunk by ID from the knowledge base
 * 
 * @param chunks - Array of ContentChunks to search
 * @param chunkId - The ID of the chunk to find
 * @returns The ContentChunk if found, undefined otherwise
 * 
 * @example
 * ```typescript
 * const chunk = getChunkById(knowledgeBase.chunks, 'about-summary');
 * ```
 */
export function getChunkById(
  chunks: ContentChunk[],
  chunkId: string
): ContentChunk | undefined {
  return chunks.find(chunk => chunk.id === chunkId);
}

/**
 * Get chunks by section from the knowledge base
 * 
 * @param chunks - Array of ContentChunks to filter
 * @param section - The section to filter by
 * @returns Array of ContentChunks in the specified section
 * 
 * @example
 * ```typescript
 * const aboutChunks = getChunksBySection(knowledgeBase.chunks, 'about');
 * ```
 */
export function getChunksBySection(
  chunks: ContentChunk[],
  section: string
): ContentChunk[] {
  return chunks.filter(chunk => chunk.section === section);
}

/**
 * Search chunks by keyword (fallback when embeddings not available)
 * 
 * @param chunks - Array of ContentChunks to search
 * @param query - The search query string
 * @param limit - Maximum number of results to return
 * @returns Array of ContentChunks matching the query
 * 
 * @example
 * ```typescript
 * const results = searchChunksByKeyword(knowledgeBase.chunks, "AI automation");
 * ```
 */
export function searchChunksByKeyword(
  chunks: ContentChunk[],
  query: string,
  limit: number = 5
): ContentChunk[] {
  const queryLower = query.toLowerCase();
  
  // Score chunks by keyword match
  const scored = chunks
    .map(chunk => {
      const contentLower = chunk.content.toLowerCase();
      let score = 0;
      
      // Exact phrase match
      if (contentLower.includes(queryLower)) {
        score += 10;
      }
      
      // Individual word matches
      const queryWords = queryLower.split(/\s+/);
      for (const word of queryWords) {
        if (contentLower.includes(word)) {
          score += 1;
        }
      }
      
      // Title boost
      if (chunk.metadata.title?.toLowerCase().includes(queryLower)) {
        score += 5;
      }
      
      return { chunk, score };
    })
    .filter(scored => scored.score > 0)
    .sort((a, b) => b.score - a.score);
  
  return scored.slice(0, limit).map(s => s.chunk);
}

/**
 * Validate that all chunks in an array have valid embeddings
 * 
 * @param chunks - Array of ContentChunks to validate
 * @returns Object with validation results
 * 
 * @example
 * ```typescript
 * const { valid, invalidCount } = validateChunkEmbeddings(knowledgeBase.chunks);
 * ```
 */
export function validateChunkEmbeddings(
  chunks: ContentChunk[]
): { valid: boolean; invalidCount: number; totalCount: number } {
  const invalidCount = chunks.filter(
    chunk => !chunk.embedding || chunk.embedding.length !== 1536
  ).length;
  
  return {
    valid: invalidCount === 0,
    invalidCount,
    totalCount: chunks.length,
  };
}
