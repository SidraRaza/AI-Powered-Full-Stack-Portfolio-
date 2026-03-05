# Implementation Plan: RAG Chatbot for Portfolio

**Branch**: `001-rag-chatbot` | **Date**: 2026-03-02 | **Spec**: [spec.md](./spec.md)
**Input**: Feature specification for RAG chatbot that answers questions about Sidra Raza using portfolio data as knowledge base

## Summary

Build a production-ready RAG (Retrieval-Augmented Generation) chatbot system for Sidra Raza's portfolio. The chatbot will use existing AI infrastructure (Anthropic/OpenAI/Groq) with vector-based retrieval from structured portfolio content. Implementation includes: knowledge base module for content chunking and embedding, API route for chat with streaming responses, React components for chat UI (floating button, chat panel, message bubbles), and integration with existing rate limiting and authentication systems.

## Technical Context

**Language/Version**: TypeScript 5.x, React 19.2.3, Next.js 16.1.1
**Primary Dependencies**: @anthropic-ai/sdk, openai, groq-sdk, framer-motion (existing in package.json)
**Storage**: In-memory knowledge base (portfolio content chunks), Upstash Redis for rate limiting (existing)
**Testing**: Jest (existing __tests__ directory), React Testing Library
**Target Platform**: Web (Next.js App Router), responsive mobile + desktop
**Project Type**: Single web application (sidra-raza-portfolio)
**Performance Goals**: Response time <3 seconds (SC-001), Lighthouse score >90 (SC-004), 100 concurrent sessions (SC-005)
**Constraints**: Bundle size optimization (lazy loading), zero layout shift, API keys in environment variables
**Scale/Scope**: Portfolio website traffic, knowledge base covers: About, Skills, Services, Projects, Experience, Contact, Blog

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

Based on CLAUDE.md (project constitution):

1. ✅ **Authoritative Source Mandate**: Plan uses verified project structure, existing dependencies, and confirmed API patterns
2. ✅ **Spec-Driven Development**: Feature spec completed before planning; PHR will be created
3. ✅ **Smallest Viable Diff**: Chatbot scoped to portfolio questions only; no unrelated refactoring
4. ✅ **No Hardcoded Secrets**: API keys will use environment variables (.env)
5. ✅ **Code References**: Plan references existing files (src/lib/ai/, src/app/layout.tsx)
6. ✅ **PHR Creation**: Will create PHR at history/prompts/001-rag-chatbot/
7. ✅ **ADR Suggestions**: Will suggest ADR for RAG architecture decisions

**Gate Result**: PASS - All constitution principles satisfied

## Project Structure

### Documentation (this feature)

```text
specs/001-rag-chatbot/
├── plan.md              # This file
├── research.md          # Phase 0 output
├── data-model.md        # Phase 1 output
├── quickstart.md        # Phase 1 output
├── contracts/           # Phase 1 output
└── tasks.md             # Phase 2 output
```

### Source Code (repository root)

```text
sidra-raza-portfolio/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── chat/           # New: Chat API route
│   │   │       └── route.ts
│   │   └── layout.tsx          # Modified: Add ChatWidget
│   ├── components/
│   │   └── chatbot/            # New: Chatbot components
│   │       ├── ChatWidget.tsx
│   │       ├── ChatWindow.tsx
│   │       ├── MessageBubble.tsx
│   │       └── ChatInput.tsx
│   ├── lib/
│   │   ├── data/               # New: Knowledge base module
│   │   │   ├── knowledge-base.ts
│   │   │   ├── embeddings.ts
│   │   │   └── retrieval.ts
│   │   └── ai/                 # Existing: Extend with chat
│   │       └── chat-service.ts
│   └── types/
│       └── chat.ts             # New: Chat types
├── .env.local                  # New: Environment variables
└── tests/
    └── chatbot/                # New: Chatbot tests
        ├── chat-api.test.ts
        └── components.test.ts
```

**Structure Decision**: Single project structure (Option 1) - chatbot integrates into existing sidra-raza-portfolio codebase

## Complexity Tracking

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|
| RAG Architecture | Required for accurate, knowledge-based responses | Simple keyword matching insufficient for semantic queries |
| Vector embeddings | Enables similarity search across portfolio content | Rule-based retrieval too rigid for natural language |
| Streaming responses | Better UX for AI-generated content | Non-streaming would increase perceived latency |

## Phase 0: Research Tasks

### Unknowns to Resolve

1. **Embedding Strategy**: Research best embedding approach for portfolio content
   - Task: Research embedding models compatible with existing AI providers (OpenAI, Anthropic, Groq)
   - Task: Determine embedding storage (in-memory vs. persistent)

2. **Vector Similarity**: Research vector search implementation
   - Task: Research lightweight vector similarity libraries for TypeScript
   - Task: Evaluate cosine similarity vs. dot product for use case

3. **Content Chunking**: Research optimal chunking strategy
   - Task: Research chunk sizes for portfolio content types
   - Task: Determine chunking boundaries (semantic vs. fixed-size)

4. **Framer Motion Integration**: Research animation patterns
   - Task: Research existing Framer Motion usage in project
   - Task: Determine animation patterns for chat transitions

## Phase 1: Design & Contracts

### Data Model (from spec entities)

- **Knowledge Base**: Portfolio content chunks with embeddings
- **Chat Session**: User conversation context
- **Message**: User query + chatbot response pairs
- **Embedding**: Vector representation of content chunks
- **Content Chunk**: Semantically meaningful portfolio content pieces

### API Contracts (from FR-001 to FR-020)

- **POST /api/chat**: Chat endpoint with streaming
- **GET /api/chat/health**: Health check endpoint

### Agent Context Update

Update Qwen agent context with new technologies:
- RAG architecture patterns
- Vector similarity search
- Content chunking strategies
- Streaming chat implementations

## Phase 2: Implementation Plan

### Sprint 1: Knowledge Base (Days 1-2)
- Create knowledge-base.ts with portfolio data
- Implement content chunking
- Generate embeddings
- Build retrieval service

### Sprint 2: API Development (Days 3-4)
- Create /api/chat route
- Implement RAG pipeline
- Add streaming responses
- Integrate rate limiting

### Sprint 3: UI Components (Days 5-7)
- Build ChatWidget (floating button)
- Create ChatWindow panel
- Implement MessageBubble components
- Add ChatInput with validation

### Sprint 4: Integration & Testing (Days 8-10)
- Integrate with layout.tsx
- Add responsive styles
- Write unit/integration tests
- Performance optimization

## Success Criteria Validation

- ✅ SC-001: <3 second response time (streaming + efficient retrieval)
- ✅ SC-002: 95% accuracy (RAG with portfolio-only retrieval)
- ✅ SC-003: 100% off-topic decline (system instructions)
- ✅ SC-004: Lighthouse >90 (lazy loading, code splitting)
- ✅ SC-005: 100 concurrent sessions (Upstash rate limiting)
- ✅ SC-006: 90% task completion (user testing)
- ✅ SC-007: Zero layout shift (responsive CSS)
- ✅ SC-008: Graceful errors (error boundaries, fallbacks)
