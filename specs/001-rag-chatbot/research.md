# Research: RAG Chatbot Implementation

**Feature**: 001-rag-chatbot  
**Date**: 2026-03-02  
**Purpose**: Resolve all NEEDS CLARIFICATION items and research technical decisions

---

## 1. Embedding Strategy

### Decision: Use OpenAI Embeddings (text-embedding-3-small)

**Rationale**:
- Project already has `openai` package (v6.15.0) in dependencies
- text-embedding-3-small offers excellent cost/performance ratio
- 1536 dimensions provide sufficient semantic resolution for portfolio content
- Compatible with existing AI infrastructure
- Well-documented TypeScript SDK

**Alternatives Considered**:
- **Cohere Embeddings**: Good quality but requires additional dependency
- **HuggingFace Transformers**: Overkill for portfolio-scale content
- **Groq Embeddings**: Not available in current Groq SDK (v0.37.0)

**Implementation**:
```typescript
// src/lib/data/embeddings.ts
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function generateEmbedding(text: string): Promise<number[]> {
  const response = await openai.embeddings.create({
    model: 'text-embedding-3-small',
    input: text,
  });
  return response.data[0].embedding;
}
```

---

## 2. Vector Similarity Search

### Decision: Cosine Similarity with In-Memory Storage

**Rationale**:
- Portfolio content is small (~50-100 chunks max)
- In-memory search is fast enough (<10ms for <1000 vectors)
- No additional database dependencies required
- Cosine similarity is standard for text embeddings
- Simple implementation, easy to test

**Alternatives Considered**:
- **Pinecone**: Overkill for portfolio scale, adds external dependency
- **pgvector**: Requires PostgreSQL migration, unnecessary complexity
- **ChromaDB**: Additional service to manage
- **Dot Product**: Requires normalized vectors; cosine more intuitive

**Implementation**:
```typescript
// src/lib/data/retrieval.ts
function cosineSimilarity(a: number[], b: number[]): number {
  let dotProduct = 0;
  let magnitudeA = 0;
  let magnitudeB = 0;
  
  for (let i = 0; i < a.length; i++) {
    dotProduct += a[i] * b[i];
    magnitudeA += a[i] * a[i];
    magnitudeB += b[i] * b[i];
  }
  
  return dotProduct / (Math.sqrt(magnitudeA) * Math.sqrt(magnitudeB));
}

export function findRelevantChunks(
  queryEmbedding: number[],
  chunks: ContentChunk[],
  topK: number = 3
): ContentChunk[] {
  const scored = chunks.map(chunk => ({
    chunk,
    score: cosineSimilarity(queryEmbedding, chunk.embedding)
  }));
  
  return scored
    .sort((a, b) => b.score - a.score)
    .slice(0, topK)
    .map(s => s.chunk);
}
```

---

## 3. Content Chunking Strategy

### Decision: Semantic Chunking by Portfolio Sections

**Rationale**:
- Portfolio content has natural boundaries (About, Skills, Projects, etc.)
- Semantic chunks preserve context better than fixed-size
- Chunk sizes align with user query patterns
- Easier to maintain and update

**Chunk Structure**:
| Section | Estimated Chunks | Avg Size |
|---------|-----------------|----------|
| About | 2-3 | 200-300 tokens |
| Skills | 3-4 | 100-150 tokens each |
| Services | 2-3 | 150-200 tokens |
| Projects | 5-8 | 200-300 tokens each |
| Experience | 3-4 | 150-200 tokens |
| Contact | 1 | 100 tokens |
| Blog (summaries) | 5-10 | 150-200 tokens |

**Total**: ~25-35 chunks (well within in-memory limits)

**Alternatives Considered**:
- **Fixed-size chunks**: Simpler but loses semantic meaning
- **Sentence-level chunking**: Too granular, loses context
- **Paragraph-level**: Good middle ground, but section-level better for portfolio

**Implementation**:
```typescript
// src/lib/data/knowledge-base.ts
export interface ContentChunk {
  id: string;
  section: 'about' | 'skills' | 'services' | 'projects' | 'experience' | 'contact' | 'blog';
  content: string;
  embedding: number[];
  metadata: {
    title?: string;
    url?: string;
    lastUpdated: string;
  };
}

export function chunkPortfolioContent(portfolio: PortfolioData): ContentChunk[] {
  const chunks: ContentChunk[] = [];
  
  // About section
  chunks.push({
    id: 'about-summary',
    section: 'about',
    content: portfolio.about.summary,
    embedding: [], // Generated at build time
    metadata: { lastUpdated: new Date().toISOString() }
  });
  
  // Skills by category
  for (const [category, skills] of Object.entries(portfolio.skills)) {
    chunks.push({
      id: `skills-${category}`,
      section: 'skills',
      content: `${category}: ${skills.join(', ')}`,
      embedding: [],
      metadata: { lastUpdated: new Date().toISOString() }
    });
  }
  
  // ... similar for projects, services, etc.
  
  return chunks;
}
```

---

## 4. Framer Motion Integration

### Decision: Use Existing Framer Motion Patterns

**Rationale**:
- Project already uses `framer-motion` (v12.23.26)
- Existing MotionProvider in layout.tsx
- Consistent with project animation patterns
- Cursor component uses Framer Motion successfully

**Animation Patterns**:
- **Floating Button**: Scale on hover (1.0 → 1.1), subtle shadow
- **Chat Panel**: Slide up from bottom (mobile), slide left (desktop)
- **Messages**: Fade in with slight upward motion
- **Typing Indicator**: Pulse animation

**Implementation**:
```typescript
// src/components/chatbot/ChatWidget.tsx
import { motion, AnimatePresence } from 'framer-motion';

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <>
      <motion.button
        initial={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 ..."
      >
        💬
      </motion.button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            className="chat-panel"
          >
            {/* Chat content */}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
```

---

## 5. Streaming Response Pattern

### Decision: Extend Existing Stream Utilities

**Rationale**:
- Project has existing `src/lib/ai/stream.ts` with streaming utilities
- `createSSEStream` and `parseSSEStream` already implemented
- Consistent with existing API patterns (agents API)
- Supports both OpenAI and Anthropic streaming

**Implementation**:
```typescript
// src/app/api/chat/route.ts
import { createSSEStream } from '@/lib/ai/stream';
import { generateChatResponse } from '@/lib/ai/chat-service';

export async function POST(req: Request) {
  const { message, history } = await req.json();
  
  const stream = await generateChatResponse(message, history);
  
  return new Response(createSSEStream(stream), {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
    },
  });
}
```

---

## 6. Rate Limiting Integration

### Decision: Use Existing Upstash Rate Limiter

**Rationale**:
- Project already has `@upstash/ratelimit` and `@upstash/redis`
- Existing `src/lib/ai/rate-limit.ts` module
- Production-ready with Redis backend
- Configurable limits per endpoint

**Implementation**:
```typescript
// src/app/api/chat/route.ts
import { checkRateLimit } from '@/lib/ai/rate-limit';

export async function POST(req: Request) {
  const ip = req.headers.get('x-forwarded-for') || 'anonymous';
  const result = await checkRateLimit(ip, 'chat');
  
  if (!result.success) {
    return Response.json(
      { error: 'Rate limit exceeded' },
      { 
        status: 429,
        headers: createRateLimitHeaders(result)
      }
    );
  }
  
  // ... proceed with chat
}
```

---

## 7. Environment Variables

### Decision: Standard .env.local Pattern

**Required Variables**:
```bash
# .env.local
OPENAI_API_KEY=sk-...        # For embeddings
ANTHROPIC_API_KEY=sk-ant-... # For chat (or use Groq/OpenAI)
GROQ_API_KEY=gsk_...         # Alternative for chat
UPSTASH_REDIS_REST_URL=...   # For rate limiting
UPSTASH_REDIS_REST_TOKEN=... # For rate limiting
```

**Security**:
- `.env.local` added to `.gitignore` (existing)
- `.env.example` created with placeholder values
- No secrets committed to repository

---

## 8. Error Handling Strategy

### Decision: Graceful Degradation with User Feedback

**Error Scenarios**:
1. **Empty Input**: Client-side validation, friendly message
2. **API Failure**: Retry once, then show error with fallback
3. **Rate Limit**: Show "too many requests" message
4. **Off-Topic Question**: Polite decline (system instruction)
5. **Network Error**: Offline message, retry option

**Implementation**:
```typescript
// src/components/chatbot/ChatWindow.tsx
const [error, setError] = useState<string | null>(null);

const handleError = (err: Error) => {
  if (err.message.includes('rate limit')) {
    setError('Too many requests. Please wait a moment.');
  } else if (err.message.includes('network')) {
    setError('Connection lost. Please check your internet.');
  } else {
    setError('Something went wrong. Please try again.');
  }
};
```

---

## Summary of Technical Decisions

| Decision | Choice | Justification |
|----------|--------|---------------|
| Embeddings | OpenAI text-embedding-3-small | Existing dependency, cost-effective |
| Vector Search | Cosine similarity, in-memory | Simple, fast for portfolio scale |
| Chunking | Semantic by section | Preserves context, maintainable |
| Animations | Framer Motion | Existing in project, consistent |
| Streaming | Extend existing utilities | Reuses proven patterns |
| Rate Limiting | Upstash Redis | Already configured |
| Storage | In-memory knowledge base | No DB migration needed |
| Error Handling | Graceful degradation | Better UX |

---

## Next Steps

1. ✅ All NEEDS CLARIFICATION items resolved
2. ✅ Technical decisions documented with rationale
3. ✅ Implementation patterns established
4. → Proceed to Phase 1: Data Model & API Contracts
