# Tasks: RAG Chatbot for Portfolio

**Input**: Design documents from `/specs/001-rag-chatbot/`
**Prerequisites**: plan.md, spec.md, research.md, data-model.md, contracts/chat-api.md

**Tests**: Tests are OPTIONAL - included here for completeness but can be skipped if TDD is not required

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3, US4)
- Include exact file paths in descriptions

## Path Conventions

- **Single project**: `src/`, `tests/` at repository root (sidra-raza-portfolio)
- Paths assume existing Next.js structure with `src/app/`, `src/components/`, `src/lib/`

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and environment setup

- [x] T001 [P] Create .env.local with API keys (OPENAI_API_KEY, ANTHROPIC_API_KEY, UPSTASH_REDIS_REST_URL, UPSTASH_REDIS_REST_TOKEN)
- [x] T002 [P] Add .env.example to repository with placeholder values
- [x] T003 [P] Verify all dependencies installed: openai, @anthropic-ai/sdk, @upstash/ratelimit, framer-motion

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [x] T004 [P] Create types file: src/types/chat.ts with ContentChunk, KnowledgeBase, ChatMessage, ChatSession, ChatRequest, ChatResponse interfaces
- [x] T005 [P] Create knowledge base module: src/lib/data/knowledge-base.ts with initializeKnowledgeBase(), chunkPortfolioContent() functions
- [x] T006 [P] Create embeddings module: src/lib/data/embeddings.ts with generateEmbedding() function using OpenAI text-embedding-3-small
- [x] T007 [P] Create retrieval module: src/lib/data/retrieval.ts with cosineSimilarity(), findRelevantChunks() functions
- [x] T008 [P] Create portfolio data file: src/lib/data/portfolio-data.ts with structured portfolio content (about, skills, services, projects, experience, contact, blog)
- [x] T009 Create chat service: src/lib/ai/chat-service.ts with generateChatResponse() function integrating RAG pipeline
- [x] T010 [P] Setup knowledge base initialization script or build process

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - Ask Questions About Sidra Raza (Priority: P1) 🎯 MVP

**Goal**: Enable users to ask questions about Sidra Raza and receive accurate answers from the knowledge base

**Independent Test**: Can be fully tested by calling /api/chat with a question and receiving a relevant answer from portfolio data

### Tests for User Story 1 (OPTIONAL) ⚠️

> **NOTE: Write these tests FIRST, ensure they FAIL before implementation**

- [ ] T011 [P] [US1] Create API test: tests/chatbot/chat-api.test.ts with test for POST /api/chat returning valid response
- [ ] T012 [P] [US1] Create knowledge base test: tests/chatbot/knowledge-base.test.ts with test for retrieveChunks() returning relevant results

### Implementation for User Story 1

- [x] T013 [P] [US1] Create chat types export in src/types/chat.ts (ContentSection, ContentChunk, ChatMessage, ChatRequest, ChatResponse)
- [x] T014 [P] [US1] Initialize knowledge base with portfolio data chunks in src/lib/data/knowledge-base.ts
- [x] T015 [P] [US1] Implement embedding generation for content chunks in src/lib/data/embeddings.ts
- [x] T016 [US1] Implement vector similarity search in src/lib/data/retrieval.ts with cosineSimilarity() and findRelevantChunks()
- [x] T017 [US1] Create chat service with RAG pipeline in src/lib/ai/chat-service.ts (retrieve chunks → generate response)
- [x] T018 [US1] Create API route POST /api/chat in src/app/api/chat/route.ts with request handling
- [x] T019 [US1] Implement streaming response using createSSEStream() from src/lib/ai/stream.ts
- [x] T020 [US1] Add input validation (message required, max 1000 chars) in src/app/api/chat/route.ts
- [x] T021 [US1] Add system instructions for Sidra Raza persona (third person, professional, portfolio-only)
- [x] T022 [US1] Add error handling for API failures with user-friendly messages

**Checkpoint**: At this point, User Story 1 should be fully functional and testable independently via API

---

## Phase 4: User Story 2 - Access Chatbot from Any Page (Priority: P2)

**Goal**: Provide a floating chat button accessible from every page with smooth animations

**Independent Test**: Can be tested by navigating to any page and verifying the floating button is visible, clickable, and opens the chat panel

### Tests for User Story 2 (OPTIONAL) ⚠️

- [ ] T023 [P] [US2] Create component test: tests/chatbot/components.test.ts with test for ChatWidget rendering and click handling
- [ ] T024 [P] [US2] Create integration test: tests/chatbot/chat-integration.test.ts with test for full chat flow (button → send → receive)

### Implementation for User Story 2

- [x] T025 [P] [US2] Create ChatWidget component: src/components/chatbot/ChatWidget.tsx with floating button (fixed bottom-right)
- [x] T026 [P] [US2] Create ChatWindow component: src/components/chatbot/ChatWindow.tsx with chat panel container
- [x] T027 [P] [US2] Create MessageBubble component: src/components/chatbot/MessageBubble.tsx for displaying messages
- [x] T028 [P] [US2] Create ChatInput component: src/components/chatbot/ChatInput.tsx with text input and send button
- [x] T029 [US2] Add Framer Motion animations to ChatWidget (scale on hover, fixed position)
- [x] T030 [US2] Add Framer Motion animations to ChatWindow (slide up from bottom, fade transitions)
- [x] T031 [US2] Implement open/close state management in ChatWidget.tsx
- [x] T032 [US2] Add close button to ChatWindow with smooth fade exit animation
- [x] T033 [US2] Integrate ChatWidget into layout: modify src/app/layout.tsx to include ChatWidget
- [x] T034 [US2] Implement message display with scrollable conversation view in ChatWindow.tsx
- [x] T035 [US2] Add typing/loading indicator while waiting for response

**Checkpoint**: At this point, User Stories 1 AND 2 should both work independently - users can access chatbot and get answers

---

## Phase 5: User Story 3 - Receive Accurate Domain-Specific Responses (Priority: P3)

**Goal**: Ensure chatbot only answers questions about Sidra Raza and politely declines off-topic questions

**Independent Test**: Can be tested by asking both relevant and irrelevant questions and verifying appropriate responses

### Tests for User Story 3 (OPTIONAL) ⚠️

- [ ] T036 [P] [US3] Create validation test: tests/chatbot/validation.test.ts with tests for empty input, off-topic questions, rate limiting

### Implementation for User Story 3

- [x] T037 [US3] Add off-topic detection in chat-service.ts (check if query relates to Sidra Raza portfolio)
- [x] T038 [US3] Implement standard decline message: "I specialize in answering questions about Sidra Raza and her work."
- [x] T039 [US3] Add empty input validation in ChatInput.tsx (disable send, show friendly message)
- [x] T040 [US3] Integrate rate limiting in /api/chat route using checkRateLimit() from src/lib/ai/rate-limit.ts
- [x] T041 [US3] Add rate limit error handling with "Too many requests" message
- [x] T042 [US3] Implement input sanitization (strip HTML tags, prevent XSS) in /api/chat route
- [x] T043 [US3] Add prompt injection prevention in system instructions
- [x] T044 [US3] Add retry logic for API failures with user-friendly error message

**Checkpoint**: At this point, User Stories 1, 2, AND 3 should all work independently - chatbot is secure and domain-specific

---

## Phase 6: User Story 4 - Use Chatbot on Any Device (Priority: P4)

**Goal**: Ensure chatbot works perfectly on all screen sizes (320px to 1440px) with responsive design

**Independent Test**: Can be tested by opening chatbot on different screen sizes and verifying proper layout without overflow or shift

### Tests for User Story 4 (OPTIONAL) ⚠️

- [ ] T045 [P] [US4] Create responsive test: tests/chatbot/responsive.test.ts with tests for 320px, 375px, 768px, 1024px, 1440px breakpoints

### Implementation for User Story 4

- [x] T046 [P] [US4] Add responsive styles for ChatWidget: mobile (smaller button) and desktop (standard size)
- [x] T047 [US4] Implement desktop layout for ChatWindow: 380px width, fixed right position
- [x] T048 [US4] Implement mobile layout for ChatWindow: full-width bottom sheet
- [x] T049 [US4] Implement tablet layout for ChatWindow: adaptive width (768px breakpoint)
- [x] T050 [US4] Add CSS for preventing layout shift (position: fixed, no document flow impact)
- [x] T051 [US4] Add CSS for preventing content overflow (max-height, overflow-y: auto)
- [x] T052 [US4] Test and adjust touch targets for mobile (min 44px)
- [x] T053 [US4] Test and verify no horizontal scrolling on any screen size
- [x] T054 [US4] Add responsive message bubble styles (word-wrap, max-width)

**Checkpoint**: All user stories should now be independently functional - chatbot is fully responsive

---

## Phase 7: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories

- [x] T055 [P] Add health check endpoint: GET /api/chat/health in src/app/api/chat/route.ts
- [ ] T056 [P] Add structured logging for chat operations (request count, latency, chunks used)
- [ ] T057 [P] Create quickstart documentation in docs/chatbot-quickstart.md or update existing docs
- [ ] T058 [P] Lazy load chatbot components with dynamic imports for bundle optimization
- [ ] T059 [P] Run Lighthouse audit and verify score >90 (performance, accessibility)
- [ ] T060 [P] Run bundle analysis and verify chatbot adds <50KB (lazy loaded)
- [ ] T061 Code cleanup and refactoring across all chatbot files
- [ ] T062 [P] Add JSDoc comments to all exported functions
- [ ] T063 [P] Verify all TypeScript types are exported and properly documented
- [ ] T064 [P] Test all scenarios from quickstart.md (Who is Sidra Raza?, services, projects, contact, Elon Musk)
- [ ] T065 [P] Verify error scenarios (empty input, API failure, rate limit, network error)

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phase 3-6)**: All depend on Foundational phase completion
  - User stories can then proceed in parallel (if staffed)
  - Or sequentially in priority order (P1 → P2 → P3 → P4)
- **Polish (Phase 7)**: Depends on all desired user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational (Phase 2) - No dependencies on other stories
  - MVP: T013-T022 (API working, can test with curl/Postman)
- **User Story 2 (P2)**: Can start after Foundational (Phase 2) - Depends on US1 API being ready
  - MVP: T025-T035 (UI components, layout integration)
- **User Story 3 (P3)**: Can start after Foundational (Phase 2) - Integrates with US1 chat service
  - MVP: T037-T044 (security, rate limiting, input validation)
- **User Story 4 (P4)**: Can start after US2 components are created - Pure styling
  - MVP: T046-T054 (responsive CSS, breakpoint testing)

### Within Each User Story

- Tests (if included) MUST be written and FAIL before implementation
- Types/models before services
- Services before endpoints/UI
- Core implementation before integration
- Story complete before moving to next priority

### Parallel Opportunities

**Phase 1 (Setup)**:
- T001, T002, T003 can all run in parallel

**Phase 2 (Foundational)**:
- T004, T005, T006, T007, T008 can all run in parallel (different files)
- T009 depends on T004, T005, T006, T007 completion
- T010 depends on T005, T008 completion

**Phase 3 (US1)**:
- T011, T012 (tests) can run in parallel
- T013, T014, T015, T016 can run in parallel (different modules)
- T017 depends on T014, T015, T016
- T018, T019, T020, T021, T022 are sequential (API route)

**Phase 4 (US2)**:
- T023, T024 (tests) can run in parallel
- T025, T026, T027, T028 can run in parallel (different components)
- T029, T030 depend on T025, T026
- T031, T032, T033, T034, T035 are mostly sequential (component integration)

**Phase 5 (US3)**:
- T036 (test) can run alone
- T037, T038 depend on T017 (chat service)
- T039 depends on T028 (ChatInput)
- T040, T041, T042, T043, T044 can run in parallel

**Phase 6 (US4)**:
- T045 (test) can run alone
- T046, T047, T048, T049 can run in parallel (different breakpoints)
- T050, T051, T052, T053, T054 can run in parallel

**Phase 7 (Polish)**:
- T055, T056, T057, T058, T059, T060 can all run in parallel
- T061, T062, T063 can run in parallel
- T064, T065 should be last (final validation)

---

## Parallel Example: User Story 1

```bash
# Launch all tests for User Story 1 together (if tests requested):
Task: "T011 [P] [US1] Create API test: tests/chatbot/chat-api.test.ts"
Task: "T012 [P] [US1] Create knowledge base test: tests/chatbot/knowledge-base.test.ts"

# Launch all foundational modules for User Story 1 together:
Task: "T014 [P] [US1] Initialize knowledge base in src/lib/data/knowledge-base.ts"
Task: "T015 [P] [US1] Implement embeddings in src/lib/data/embeddings.ts"
Task: "T016 [P] [US1] Implement retrieval in src/lib/data/retrieval.ts"
```

---

## Parallel Example: User Story 2

```bash
# Launch all component tests together:
Task: "T023 [P] [US2] Create component test: tests/chatbot/components.test.ts"

# Launch all components in parallel (different files):
Task: "T025 [P] [US2] Create ChatWidget: src/components/chatbot/ChatWidget.tsx"
Task: "T026 [P] [US2] Create ChatWindow: src/components/chatbot/ChatWindow.tsx"
Task: "T027 [P] [US2] Create MessageBubble: src/components/chatbot/MessageBubble.tsx"
Task: "T028 [P] [US2] Create ChatInput: src/components/chatbot/ChatInput.tsx"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup (T001-T003)
2. Complete Phase 2: Foundational (T004-T010)
3. Complete Phase 3: User Story 1 (T013-T022)
4. **STOP and VALIDATE**: Test /api/chat with curl or Postman
5. Verify: Ask "Who is Sidra Raza?" → Get accurate answer
6. Deploy/demo if ready (API-only MVP)

### Incremental Delivery

1. Complete Setup + Foundational → Foundation ready
2. Add User Story 1 → Test via API → Deploy/Demo (MVP: API-only chatbot)
3. Add User Story 2 → Test UI → Deploy/Demo (MVP: Working chatbot UI)
4. Add User Story 3 → Test security → Deploy/Demo (MVP: Production-ready)
5. Add User Story 4 → Test responsive → Deploy/Demo (Final: Fully responsive)
6. Each story adds value without breaking previous stories

### Parallel Team Strategy

With multiple developers:

1. Team completes Setup + Foundational together (T001-T010)
2. Once Foundational is done:
   - Developer A: User Story 1 (T013-T022) - API & RAG
   - Developer B: User Story 2 (T025-T035) - UI Components
   - Developer C: User Story 3 (T037-T044) - Security & Validation
3. After US2 components done:
   - Developer D: User Story 4 (T046-T054) - Responsive Design
4. All stories complete and integrate independently
5. Team completes Polish phase together (T055-T065)

---

## Task Summary

| Phase | Description | Task Count |
|-------|-------------|------------|
| Phase 1 | Setup | 3 |
| Phase 2 | Foundational | 7 |
| Phase 3 | User Story 1 (P1) | 12 (10 impl + 2 tests) |
| Phase 4 | User Story 2 (P2) | 13 (11 impl + 2 tests) |
| Phase 5 | User Story 3 (P3) | 9 (8 impl + 1 test) |
| Phase 6 | User Story 4 (P4) | 10 (9 impl + 1 test) |
| Phase 7 | Polish | 11 |
| **Total** | **All phases** | **65 tasks** |

### Task Breakdown by Type

- **Setup**: 3 tasks
- **Foundational**: 7 tasks
- **Implementation**: 47 tasks
- **Tests (optional)**: 8 tasks

### MVP Scope (User Story 1 Only)

Minimum viable product includes:
- Phase 1: Setup (3 tasks)
- Phase 2: Foundational (7 tasks)
- Phase 3: User Story 1 implementation (10 tasks, skip tests)
- **Total MVP**: 20 tasks

This delivers a working chat API that can be tested with curl/Postman before UI is built.

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story for traceability
- Each user story should be independently completable and testable
- Verify tests fail before implementing (if using TDD)
- Commit after each task or logical group
- Stop at any checkpoint to validate story independently
- Avoid: vague tasks, same file conflicts, cross-story dependencies that break independence
- **Important**: Tests are OPTIONAL - skip T011, T012, T023, T024, T036, T045 if not using TDD
