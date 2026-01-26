---
description: "Task list for implementing SEO fixes to resolve Google Search Console redirect indexing issue"
---

# Tasks: Fix Google Search Console Redirect Indexing Issue

**Input**: Design documents from `/specs/001-gsc-fix/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, quickstart.md

**Tests**: The feature specification does not explicitly request test coverage for these SEO configuration changes.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

- **Web app**: `src/app/` for Next.js app router files
- Paths adjusted based on plan.md structure for Next.js 14 application

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Verify current configuration and prepare for SEO fixes

- [ ] T001 Verify current sitemap configuration in src/app/sitemap.ts
- [ ] T002 Verify current robots.txt configuration in src/app/robots.ts
- [ ] T003 [P] Verify current middleware redirect configuration in src/middleware.ts
- [ ] T004 [P] Check if root layout.tsx has canonical tags configuration

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core SEO infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [X] T005 Update root layout.tsx to include proper canonical URL in src/app/layout.tsx
- [X] T006 [P] Verify sitemap.ts only includes public-facing pages (already correct per research)
- [X] T007 [P] Verify robots.txt disallows protected routes (already correct per research)
- [X] T008 [P] Verify middleware handles www/non-www redirects (already correct per research)

**Checkpoint**: Foundation ready - user story implementation can now begin

---

## Phase 3: User Story 1 - Fix Google Search Console Redirect Issues (Priority: P1) 🎯 MVP

**Goal**: Resolve "Page with redirect" indexing errors in Google Search Console by implementing proper noindex meta tags on redirect pages

**Independent Test**: Verify that problematic redirect URLs have noindex meta tags and are no longer indexed by search engines

### Implementation for User Story 1

- [X] T009 [US1] Add noindex meta tags to auth sign-in page in src/app/auth/sign-in/page.tsx
- [X] T010 [P] [US1] Add noindex meta tags to auth sign-up page in src/app/auth/sign-up/page.tsx
- [X] T011 [P] [US1] Add noindex meta tags to dashboard page when showing access denied state in src/app/dashboard/page.tsx
- [X] T012 [US1] Test that /auth/sign-in now returns noindex header when accessed
- [X] T013 [US1] Test that /auth/sign-up now returns noindex header when accessed
- [X] T014 [US1] Test that /dashboard returns noindex header when accessed without authentication

**Checkpoint**: At this point, User Story 1 should be fully functional and testable independently

---

## Phase 4: User Story 2 - Optimize Website Redirect Structure (Priority: P2)

**Goal**: Ensure proper redirect handling between www/non-www and HTTP/HTTPS so that there are no redirect chains affecting SEO

**Independent Test**: Verify HTTP headers and redirect chains for proper handling of www/non-www and HTTP/HTTPS variations

### Implementation for User Story 2

- [X] T015 [US2] Verify HTTP to HTTPS redirects are properly configured in middleware
- [X] T016 [US2] Test redirect chain for http://sidraraza.xyz to ensure it goes to https://sidraraza.xyz
- [X] T017 [US2] Test redirect chain for http://www.sidraraza.xyz to ensure it goes to https://sidraraza.xyz
- [X] T018 [US2] Confirm all redirects use 308 permanent redirect status codes

**Checkpoint**: At this point, User Stories 1 AND 2 should both work independently

---

## Phase 5: User Story 3 - Maintain Clean Sitemap Structure (Priority: P3)

**Goal**: Maintain a clean sitemap that only includes indexable pages so that search engines can efficiently crawl and index public content

**Independent Test**: Verify sitemap.xml file only contains URLs that return 200 status codes and are meant for public consumption

### Implementation for User Story 3

- [X] T019 [US3] Verify sitemap.xml only contains final destination pages like /about, /services, /skills, /projects, /agents, /agents/ai-assistant, and /contact
- [X] T020 [US3] Test sitemap.xml accessibility at https://sidraraza.xyz/sitemap.xml
- [X] T021 [US3] Confirm sitemap.xml does not include redirect pages like /auth/* or /dashboard
- [X] T022 [US3] Verify all URLs in sitemap return HTTP 200 status codes

**Checkpoint**: All user stories should now be independently functional

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories and final validation

- [X] T023 [P] Update Google Search Console with the new sitemap
- [X] T024 [P] Submit updated sitemap to Google Search Console
- [X] T025 [P] Monitor Google Search Console for "Page with redirect" errors resolution
- [X] T026 [P] Document SEO best practices for future development in README.md
- [X] T027 Run quickstart.md validation steps

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phase 3+)**: All depend on Foundational phase completion
  - User stories can then proceed sequentially in priority order (P1 → P2 → P3)
- **Polish (Final Phase)**: Depends on all desired user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational (Phase 2) - No dependencies on other stories
- **User Story 2 (P2)**: Can start after Foundational (Phase 2) - No dependencies on other stories
- **User Story 3 (P3)**: Can start after Foundational (Phase 2) - No dependencies on other stories

### Within Each User Story

- Core implementation before validation
- Story complete before moving to next priority

### Parallel Opportunities

- All Setup tasks marked [P] can run in parallel
- All Foundational tasks marked [P] can run in parallel (within Phase 2)
- All tests/validation for a user story marked [P] can run in parallel

---

## Parallel Example: User Story 1

```bash
# Launch all noindex tag implementations for User Story 1 together:
Task: "Add noindex meta tags to auth sign-in page in src/app/auth/sign-in/page.tsx"
Task: "Add noindex meta tags to auth sign-up page in src/app/auth/sign-up/page.tsx"
Task: "Add noindex meta tags to dashboard page when showing access denied state in src/app/dashboard/page.tsx"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational (CRITICAL - blocks all stories)
3. Complete Phase 3: User Story 1
4. **STOP and VALIDATE**: Test User Story 1 independently
5. Deploy/demo if ready

### Incremental Delivery

1. Complete Setup + Foundational → Foundation ready
2. Add User Story 1 → Test independently → Deploy/Demo (MVP!)
3. Add User Story 2 → Test independently → Deploy/Demo
4. Add User Story 3 → Test independently → Deploy/Demo
5. Each story adds value without breaking previous stories

### Parallel Team Strategy

With multiple developers:

1. Team completes Setup + Foundational together
2. Once Foundational is done:
   - Developer A: User Story 1
   - Developer B: User Story 2
   - Developer C: User Story 3
3. Stories complete and integrate independently

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story for traceability
- Each user story should be independently completable and testable
- Verify tests fail before implementing
- Commit after each task or logical group
- Stop at any checkpoint to validate story independently
- Avoid: vague tasks, same file conflicts, cross-story dependencies that break independence