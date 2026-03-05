/**
 * RAG Chatbot Types
 * 
 * Type definitions for the RAG chatbot system that answers questions
 * about Sidra Raza using portfolio data as knowledge base.
 */

/**
 * Portfolio content sections for chunking
 */
export type ContentSection =
  | 'about'
  | 'skills'
  | 'services'
  | 'projects'
  | 'experience'
  | 'contact'
  | 'blog';

/**
 * Metadata for content chunks
 */
export interface ChunkMetadata {
  /** Optional title (for projects, blog posts) */
  title?: string;
  /** Optional URL (for projects, blog posts) */
  url?: string;
  /** Optional tags for filtering */
  tags?: string[];
  /** Last update timestamp (ISO 8601) */
  lastUpdated: string;
  /** Boost ranking (default: 1.0) */
  priority?: number;
}

/**
 * Represents a semantically meaningful piece of portfolio content
 * with its vector embedding for RAG retrieval
 */
export interface ContentChunk {
  /** Unique identifier (e.g., 'about-summary') */
  id: string;
  /** Portfolio section */
  section: ContentSection;
  /** Text content for retrieval */
  content: string;
  /** Vector embedding (1536 dimensions for OpenAI text-embedding-3-small) */
  embedding: number[];
  /** Chunk metadata */
  metadata: ChunkMetadata;
}

/**
 * Container for all content chunks with retrieval methods
 */
export interface KnowledgeBase {
  /** All content chunks */
  chunks: ContentChunk[];
  /** Whether embeddings are generated */
  initialized: boolean;
  /** Last build timestamp (ISO 8601) */
  lastBuilt: string | null;
  /** Schema version */
  version: string;
}

/**
 * Configuration for knowledge base retrieval
 */
export interface KnowledgeBaseConfig {
  /** Number of chunks to retrieve (default: 3) */
  topK: number;
  /** Minimum similarity score (default: 0.5) */
  minScore: number;
  /** Enable reranking (default: false) */
  enableReranking: boolean;
}

/**
 * Message role in a chat conversation
 */
export type MessageRole = 'user' | 'assistant' | 'system' | 'error';

/**
 * Metadata for chat messages
 */
export interface MessageMetadata {
  /** IDs of chunks used for response */
  usedChunks?: string[];
  /** Response confidence (0-1) */
  confidence?: number;
  /** Response time in ms */
  latency?: number;
  /** AI model used */
  model?: string;
}

/**
 * Individual message in a conversation
 */
export interface ChatMessage {
  /** Unique identifier (UUID) */
  id: string;
  /** Message role */
  role: MessageRole;
  /** Message text */
  content: string;
  /** Timestamp (ISO 8601) */
  timestamp: string;
  /** Message metadata */
  metadata?: MessageMetadata;
}

/**
 * A complete conversation between user and chatbot
 */
export interface ChatSession {
  /** Session identifier (UUID) */
  id: string;
  /** Optional: authenticated user ID */
  userId?: string;
  /** Conversation history */
  messages: ChatMessage[];
  /** Creation timestamp (ISO 8601) */
  createdAt: string;
  /** Last activity timestamp (ISO 8601) */
  lastActivity: string;
  /** Whether session is active */
  isActive: boolean;
}

/**
 * Configuration for chat sessions
 */
export interface ChatSessionConfig {
  /** Max messages per session (default: 50) */
  maxMessages: number;
  /** Session timeout in seconds (default: 3600) */
  ttlSeconds: number;
}

/**
 * Request payload for chat endpoint
 */
export interface ChatRequest {
  /** User's message (1-1000 characters) */
  message: string;
  /** Optional: existing session ID */
  sessionId?: string;
  /** Optional: context metadata */
  context?: {
    /** User agent string */
    userAgent?: string;
    /** Request timestamp */
    timestamp?: string;
  };
}

/**
 * Response from chat endpoint
 */
export interface ChatResponse {
  /** Session ID (new or existing) */
  sessionId: string;
  /** Assistant's response */
  message: ChatMessage;
  /** Response metadata */
  metadata: {
    /** Response time in ms */
    latency: number;
    /** Number of chunks retrieved */
    chunksUsed: number;
    /** Whether response is streamed */
    streaming: boolean;
  };
}

/**
 * Error codes for chat operations
 */
export enum ChatErrorCode {
  EMPTY_INPUT = 'EMPTY_INPUT',
  INVALID_SESSION = 'INVALID_SESSION',
  KNOWLEDGE_BASE_NOT_READY = 'KNOWLEDGE_BASE_NOT_READY',
  RATE_LIMIT_EXCEEDED = 'RATE_LIMIT_EXCEEDED',
  API_ERROR = 'API_ERROR',
  NETWORK_ERROR = 'NETWORK_ERROR',
  OFF_TOPIC = 'OFF_TOPIC',
}

/**
 * Chat error structure
 */
export interface ChatError {
  /** Error code */
  code: ChatErrorCode;
  /** Error message */
  message: string;
  /** Additional error details */
  details?: Record<string, unknown>;
}

/**
 * Scored content chunk for retrieval results
 */
export interface ScoredChunk {
  /** Content chunk */
  chunk: ContentChunk;
  /** Similarity score (0-1) */
  score: number;
}

/**
 * Portfolio data structure for knowledge base initialization
 */
export interface PortfolioData {
  /** About section */
  about: {
    summary: string;
    background?: string;
  };
  /** Skills by category */
  skills: Record<string, string[]>;
  /** Services list */
  services: Array<{
    title: string;
    description: string;
  }>;
  /** Projects list */
  projects: Array<{
    title: string;
    description: string;
    technologies?: string[];
    url?: string;
  }>;
  /** Experience list */
  experience: Array<{
    company: string;
    role: string;
    duration: string;
    description?: string;
  }>;
  /** Contact information */
  contact: {
    email?: string;
    linkedin?: string;
    github?: string;
    website?: string;
  };
  /** Blog post summaries */
  blog: Array<{
    title: string;
    summary: string;
    url: string;
  }>;
}
