# Data Model: RAG Chatbot

**Feature**: 001-rag-chatbot  
**Date**: 2026-03-02  
**Purpose**: Define data structures, entities, and relationships

---

## 1. Core Entities

### 1.1 ContentChunk

Represents a semantically meaningful piece of portfolio content with its vector embedding.

```typescript
// src/types/chat.ts
export type ContentSection = 
  | 'about' 
  | 'skills' 
  | 'services' 
  | 'projects' 
  | 'experience' 
  | 'contact' 
  | 'blog';

export interface ContentChunk {
  id: string;                      // Unique identifier (e.g., 'about-summary')
  section: ContentSection;         // Portfolio section
  content: string;                 // Text content for retrieval
  embedding: number[];             // Vector embedding (1536 dimensions)
  metadata: ChunkMetadata;
}

export interface ChunkMetadata {
  title?: string;                  // Optional title (for projects, blog posts)
  url?: string;                    // Optional URL (for projects, blog posts)
  tags?: string[];                 // Optional tags for filtering
  lastUpdated: string;             // ISO 8601 timestamp
  priority?: number;               // Boost ranking (default: 1.0)
}
```

**Validation Rules**:
- `id`: Required, unique, alphanumeric with hyphens
- `section`: Required, must be one of ContentSection values
- `content`: Required, 50-1000 tokens
- `embedding`: Required after initialization, exactly 1536 dimensions
- `metadata.lastUpdated`: Required, valid ISO 8601

---

### 1.2 KnowledgeBase

Container for all content chunks with retrieval methods.

```typescript
// src/types/chat.ts
export interface KnowledgeBase {
  chunks: ContentChunk[];          // All content chunks
  initialized: boolean;            // Whether embeddings are generated
  lastBuilt: string | null;        // ISO 8601 timestamp
  version: string;                 // Schema version
}

export interface KnowledgeBaseConfig {
  topK: number;                    // Default: 3 (chunks to retrieve)
  minScore: number;                // Default: 0.5 (minimum similarity score)
  enableReranking: boolean;        // Default: false
}
```

**Validation Rules**:
- `chunks`: Required, non-empty array after initialization
- `initialized`: Boolean, false until embeddings generated
- `lastBuilt`: Required if initialized=true
- `version`: Semantic versioning (e.g., '1.0.0')

---

### 1.3 ChatMessage

Individual message in a conversation.

```typescript
// src/types/chat.ts
export type MessageRole = 'user' | 'assistant' | 'system' | 'error';

export interface ChatMessage {
  id: string;                      // Unique identifier (UUID)
  role: MessageRole;
  content: string;                 // Message text
  timestamp: string;               // ISO 8601 timestamp
  metadata?: MessageMetadata;
}

export interface MessageMetadata {
  usedChunks?: string[];           // IDs of chunks used for response
  confidence?: number;             // Response confidence (0-1)
  latency?: number;                // Response time in ms
  model?: string;                  // AI model used
}
```

**Validation Rules**:
- `id`: Required, unique UUID
- `role`: Required, one of MessageRole
- `content`: Required, non-empty string
- `timestamp`: Required, ISO 8601
- `metadata.usedChunks`: Optional, array of ContentChunk IDs

---

### 1.4 ChatSession

A complete conversation between user and chatbot.

```typescript
// src/types/chat.ts
export interface ChatSession {
  id: string;                      // Session identifier (UUID)
  userId?: string;                 // Optional: authenticated user ID
  messages: ChatMessage[];         // Conversation history
  createdAt: string;               // ISO 8601 timestamp
  lastActivity: string;            // ISO 8601 timestamp
  isActive: boolean;               // Whether session is active
}

export interface ChatSessionConfig {
  maxMessages: number;             // Default: 50 (max messages per session)
  ttlSeconds: number;              // Default: 3600 (session timeout)
}
```

**Validation Rules**:
- `id`: Required, unique UUID
- `messages`: Required, can be empty for new session
- `createdAt`: Required, ISO 8601
- `lastActivity`: Updated on each message
- `isActive`: Boolean, false after TTL or explicit close

---

### 1.5 ChatRequest

API request payload for chat endpoint.

```typescript
// src/types/chat.ts
export interface ChatRequest {
  message: string;                 // User's message
  sessionId?: string;              // Optional: existing session ID
  context?: {
    userAgent?: string;
    timestamp?: string;
  };
}

export interface ChatResponse {
  sessionId: string;               // Session ID (new or existing)
  message: ChatMessage;            // Assistant's response
  metadata: {
    latency: number;               // Response time in ms
    chunksUsed: number;            // Number of chunks retrieved
    streaming: boolean;            // Whether response is streamed
  };
}
```

**Validation Rules**:
- `message`: Required, non-empty, max 1000 characters
- `sessionId`: Optional, valid UUID if provided
- `context`: Optional, for analytics

---

## 2. State Transitions

### 2.1 KnowledgeBase Lifecycle

```
[Empty] --initialize()--> [Building] --generateEmbeddings()--> [Ready]
    |                          |                                   |
    |                          |                                   |
    v                          v                                   v
chunks=[]                 chunks=[]                           chunks=[...]
initialized=false         initialized=false                   initialized=true
                          building=true
```

### 2.2 ChatSession Lifecycle

```
[Created] --addMessage()--> [Active] --inactivity(1h)--> [Expired]
    |                            |                            |
    |                            |                            |
    v                            v                            v
messages=[]                 messages=[...]                isActive=false
isActive=true               isActive=true
```

---

## 3. Relationships

```
┌─────────────────┐
│  KnowledgeBase  │
│                 │
│  - chunks[]     │
│  - initialized  │
└────────┬────────┘
         │
         │ retrieves
         │ (similarity search)
         ▼
┌─────────────────┐
│  ContentChunk   │
│                 │
│  - id           │
│  - content      │
│  - embedding    │
└─────────────────┘

┌─────────────────┐
│  ChatSession    │
│                 │
│  - id           │
│  - messages[]   │
│  - isActive     │
└────────┬────────┘
         │
         │ contains
         │
         ▼
┌─────────────────┐
│   ChatMessage   │
│                 │
│  - role         │
│  - content      │
│  - metadata     │
└─────────────────┘
```

---

## 4. Data Access Patterns

### 4.1 Knowledge Base Operations

```typescript
// Initialize knowledge base
const kb = await initializeKnowledgeBase(portfolioData);

// Retrieve relevant chunks
const chunks = await retrieveChunks(kb, query, { topK: 3 });

// Get chunk by ID
const chunk = getChunkById(kb, 'about-summary');

// Rebuild knowledge base (e.g., after content update)
await rebuildKnowledgeBase(portfolioData);
```

### 4.2 Chat Session Operations

```typescript
// Create new session
const session = createChatSession();

// Add message to session
session = addMessage(session, { role: 'user', content: 'Hello' });

// Get session by ID
const session = getSessionById(sessionId);

// Expire old session
session = expireSession(session);
```

---

## 5. Validation Schema (Zod)

```typescript
// src/types/chat.ts
import { z } from 'zod';

export const ContentChunkSchema = z.object({
  id: z.string().min(1),
  section: z.enum(['about', 'skills', 'services', 'projects', 'experience', 'contact', 'blog']),
  content: z.string().min(50).max(5000),
  embedding: z.array(z.number()).length(1536),
  metadata: z.object({
    title: z.string().optional(),
    url: z.string().url().optional(),
    tags: z.array(z.string()).optional(),
    lastUpdated: z.string().datetime(),
    priority: z.number().min(0).max(10).optional(),
  }),
});

export const ChatMessageSchema = z.object({
  id: z.string().uuid(),
  role: z.enum(['user', 'assistant', 'system', 'error']),
  content: z.string().min(1),
  timestamp: z.string().datetime(),
  metadata: z.object({
    usedChunks: z.array(z.string()).optional(),
    confidence: z.number().min(0).max(1).optional(),
    latency: z.number().min(0).optional(),
    model: z.string().optional(),
  }).optional(),
});

export const ChatRequestSchema = z.object({
  message: z.string().min(1).max(1000),
  sessionId: z.string().uuid().optional(),
  context: z.object({
    userAgent: z.string().optional(),
    timestamp: z.string().datetime().optional(),
  }).optional(),
});
```

---

## 6. Error Types

```typescript
// src/types/chat.ts
export enum ChatErrorCode {
  EMPTY_INPUT = 'EMPTY_INPUT',
  INVALID_SESSION = 'INVALID_SESSION',
  KNOWLEDGE_BASE_NOT_READY = 'KNOWLEDGE_BASE_NOT_READY',
  RATE_LIMIT_EXCEEDED = 'RATE_LIMIT_EXCEEDED',
  API_ERROR = 'API_ERROR',
  NETWORK_ERROR = 'NETWORK_ERROR',
  OFF_TOPIC = 'OFF_TOPIC',
}

export interface ChatError {
  code: ChatErrorCode;
  message: string;
  details?: Record<string, unknown>;
}
```

---

## 7. Performance Considerations

### 7.1 Memory Usage

- **ContentChunk**: ~2KB per chunk (content + embedding)
- **Total KB**: ~70KB for 35 chunks (negligible)
- **ChatSession**: ~10KB for 50 messages
- **In-Memory Total**: <1MB (acceptable)

### 7.2 Caching Strategy

```typescript
// Cache knowledge base in module scope
let knowledgeBaseCache: KnowledgeBase | null = null;

export async function getKnowledgeBase(): Promise<KnowledgeBase> {
  if (!knowledgeBaseCache || !knowledgeBaseCache.initialized) {
    knowledgeBaseCache = await initializeKnowledgeBase(portfolioData);
  }
  return knowledgeBaseCache;
}
```

---

## Next Steps

1. ✅ Data model defined with validation rules
2. ✅ State transitions documented
3. ✅ Relationships mapped
4. → Proceed to API Contracts
