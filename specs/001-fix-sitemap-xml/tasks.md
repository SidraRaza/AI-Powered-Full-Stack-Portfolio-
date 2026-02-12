---

description: "Task list for fixing sitemap.xml issue for Google Search Console"
---

# Tasks: Fix Sitemap.xml Issue for Google Search Console

**Input**: Design documents from `/specs/001-fix-sitemap-xml/`
**Prerequisites**: plan.md (required), spec.md (required for user stories), research.md, data-model.md, contracts/

**Tests**: The examples below include test tasks. Tests are OPTIONAL - only include them if explicitly requested in the feature specification.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

- **Single project**: `src/`, `tests/` at repository root
- **Web app**: `backend/src/`, `frontend/src/`
- **Mobile**: `api/src/`, `ios/src/` or `android/src/`
- Paths shown below assume single project - adjust based on plan.md structure

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [x] T001 Install Next.js sitemap package in sidra-raza-portfolio/
- [x] T002 [P] Create src/lib/ directory structure in sidra-raza-portfolio/src/lib/
- [x] T003 [P] Create src/app/ directory structure in sidra-raza-portfolio/src/app/
- [x] T004 [P] Create tests/ directory structure in sidra-raza-portfolio/tests/

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

Examples of foundational tasks (adjust based on your project):

- [x] T005 Configure next.config.js to serve sitemap.xml with correct content-type header in sidra-raza-portfolio/next.config.js
- [x] T006 [P] Create sitemap generator utility in sidra-raza-portfolio/src/lib/sitemap-generator.ts
- [x] T007 [P] Create sitemap entry type definition in sidra-raza-portfolio/src/types/sitemap.ts
- [x] T008 Update robots.txt to reference sitemap in sidra-raza-portfolio/public/robots.txt
- [x] T009 Create sitemap validation tests in sidra-raza-portfolio/tests/sitemap.test.ts

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - Search Engine Accesses Sitemap (Priority: P1) 🎯 MVP

**Goal**: Enable search engine crawlers to access the sitemap.xml file without errors, allowing proper indexing of the website

**Independent Test**: The sitemap.xml file can be accessed by search engine crawlers without errors, allowing proper indexing of the website

### Tests for User Story 1 (OPTIONAL - only if tests requested) ⚠️

> **NOTE: Write these tests FIRST, ensure they FAIL before implementation**

- [ ] T010 [P] [US1] Contract test for sitemap.xml endpoint in sidra-raza-portfolio/tests/contract/test_sitemap_api.py
- [ ] T011 [P] [US1] Integration test for sitemap accessibility in sidra-raza-portfolio/tests/integration/test_sitemap_accessibility.py

### Implementation for User Story 1

- [x] T012 [P] [US1] Create SitemapEntry model in sidra-raza-portfolio/src/models/sitemap-entry.ts
- [x] T013 [P] [US1] Create Sitemap model in sidra-raza-portfolio/src/models/sitemap.ts
- [x] T014 [US1] Implement sitemap generation service in sidra-raza-portfolio/src/services/sitemap-service.ts
- [x] T015 [US1] Create sitemap endpoint in sidra-raza-portfolio/src/app/sitemap.ts
- [x] T016 [US1] Add XML format validation to sitemap generation
- [x] T017 [US1] Add logging for sitemap access operations

**Checkpoint**: At this point, User Story 1 should be fully functional and testable independently

---

## Phase 4: User Story 2 - Website Maintains SEO Health (Priority: P2)

**Goal**: Ensure the sitemap is properly formatted and accessible to maintain optimal SEO performance

**Independent Test**: The website maintains good SEO health with properly indexed pages as verified through Google Search Console

### Tests for User Story 2 (OPTIONAL - only if tests requested) ⚠️

- [ ] T018 [P] [US2] Contract test for sitemap-info API endpoint in sidra-raza-portfolio/tests/contract/test_sitemap_info_api.py
- [ ] T019 [P] [US2] Integration test for sitemap validation in sidra-raza-portfolio/tests/integration/test_sitemap_validation.py

### Implementation for User Story 2

- [x] T020 [P] [US2] Create SitemapInfo model in sidra-raza-portfolio/src/models/sitemap-info.ts
- [x] T021 [US2] Implement sitemap validation service in sidra-raza-portfolio/src/services/sitemap-validation-service.ts
- [x] T022 [US2] Create sitemap-info API endpoint in sidra-raza-portfolio/src/app/api/sitemap-info/route.ts
- [x] T023 [US2] Integrate with User Story 1 components (if needed)

**Checkpoint**: At this point, User Stories 1 AND 2 should both work independently

---

## Phase 5: User Story 3 - Automated Sitemap Generation (Priority: P3)

**Goal**: Automatically generate the sitemap based on the site structure to keep it up-to-date with new content

**Independent Test**: New pages added to the website are automatically included in the sitemap without requiring manual updates

### Tests for User Story 3 (OPTIONAL - only if tests requested) ⚠️

- [ ] T024 [P] [US3] Contract test for dynamic sitemap generation in sidra-raza-portfolio/tests/contract/test_dynamic_sitemap.py
- [ ] T025 [P] [US3] Integration test for new page inclusion in sidra-raza-portfolio/tests/integration/test_new_page_inclusion.py

### Implementation for User Story 3

- [x] T026 [P] [US3] Create page discovery service in sidra-raza-portfolio/src/services/page-discovery-service.ts
- [x] T027 [US3] Implement automated sitemap regeneration in sidra-raza-portfolio/src/services/auto-sitemap-service.ts
- [x] T028 [US3] Update sitemap generation to include dynamic pages in sidra-raza-portfolio/src/app/sitemap.ts

**Checkpoint**: All user stories should now be independently functional

---

## Phase 6: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories

- [x] T029 [P] Documentation updates in sidra-raza-portfolio/docs/
- [x] T030 Code cleanup and refactoring
- [x] T031 Performance optimization across all stories
- [x] T032 [P] Additional unit tests (if requested) in sidra-raza-portfolio/tests/unit/
- [x] T033 Security hardening
- [x] T034 Run quickstart.md validation

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phase 3+)**: All depend on Foundational phase completion
  - User stories can then proceed in parallel (if staffed)
  - Or sequentially in priority order (P1 → P2 → P3)
- **Polish (Final Phase)**: Depends on all desired user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational (Phase 2) - No dependencies on other stories
- **User Story 2 (P2)**: Can start after Foundational (Phase 2) - May integrate with US1 but should be independently testable
- **User Story 3 (P3)**: Can start after Foundational (Phase 2) - May integrate with US1/US2 but should be independently testable

### Within Each User Story

- Tests (if included) MUST be written and FAIL before implementation
- Models before services
- Services before endpoints
- Core implementation before integration
- Story complete before moving to next priority

### Parallel Opportunities

- All Setup tasks marked [P] can run in parallel
- All Foundational tasks marked [P] can run in parallel (within Phase 2)
- Once Foundational phase completes, all user stories can start in parallel (if team capacity allows)
- All tests for a user story marked [P] can run in parallel
- Models within a story marked [P] can run in parallel
- Different user stories can be worked on in parallel by different team members

---

## Parallel Example: User Story 1

```bash
# Launch all tests for User Story 1 together (if tests requested):
Task: "Contract test for sitemap.xml endpoint in sidra-raza-portfolio/tests/contract/test_sitemap_api.py"
Task: "Integration test for sitemap accessibility in sidra-raza-portfolio/tests/integration/test_sitemap_accessibility.py"

# Launch all models for User Story 1 together:
Task: "Create SitemapEntry model in sidra-raza-portfolio/src/models/sitemap-entry.ts"
Task: "Create Sitemap model in sidra-raza-portfolio/src/models/sitemap.ts"
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