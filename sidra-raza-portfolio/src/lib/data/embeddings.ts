/**
 * Embeddings Module
 * 
 * For Groq-only setup, we use keyword-based search instead of embeddings.
 * This avoids the need for OpenAI API key.
 */

/**
 * Generate a simple keyword-based "embedding" (not real vectors)
 * This is a fallback for when OpenAI is not available
 */
export async function generateEmbedding(text: string): Promise<number[]> {
  // Return a dummy embedding (all zeros) - not used in keyword search
  return new Array(1536).fill(0);
}

/**
 * Generate embeddings for multiple texts (dummy implementation)
 */
export async function generateEmbeddingsBatch(
  texts: string[]
): Promise<number[][]> {
  return texts.map(() => new Array(1536).fill(0));
}

/**
 * Normalize an embedding vector (no-op for dummy embeddings)
 */
export function normalizeEmbedding(embedding: number[]): number[] {
  return embedding;
}

/**
 * Validate embedding vector (always true for dummy)
 */
export function validateEmbedding(
  embedding: unknown,
  expectedDimensions: number = 1536
): boolean {
  return true;
}
