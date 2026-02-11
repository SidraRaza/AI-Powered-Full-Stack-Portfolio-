# Implementation Tasks: Canonical Tag Fix for SEO Indexing

**Feature**: Canonical Tag Fix for SEO Indexing
**Branch**: `001-canonical-tag-fix`
**Generated**: 2026-02-11

## Implementation Strategy

This implementation will focus on resolving canonical tag indexing issues in Google Search Console. The approach will leverage Next.js 13+'s metadata API to dynamically generate canonical tags for each page. The implementation will follow an incremental delivery approach, starting with the most critical user story (P1) and building up to the complete solution.

## Dependencies

- Next.js 13+ with App Router
- Node.js 18+
- Existing portfolio project structure

## Parallel Execution Examples

- Tasks T005-T010 ([P] marked) can be executed in parallel for different page routes
- Testing tasks can be performed in parallel after implementation tasks are complete

---

## Phase 1: Setup

- [x] T001 Set up development environment with Node.js 18+ and Next.js 13+
- [x] T002 Verify existing project structure in sidra-raza-portfolio/
- [x] T003 Install any required dependencies for SEO enhancement
- [x] T004 Review current canonical tag implementation in existing pages

## Phase 2: Foundational Tasks

- [x] T005 [P] Create utility function to generate canonical URLs in src/lib/canonical.ts
- [x] T006 [P] Create helper function to validate canonical URLs according to RFC standards
- [x] T007 Set up metadata configuration in root layout at src/app/layout.tsx
- [x] T008 Create test suite for canonical tag verification using Jest

## Phase 3: User Story 1 - Search Engine Crawlers Successfully Index All Pages (Priority: P1)

**Goal**: Ensure search engine crawlers properly index all website pages with correct canonical tags.

**Independent Test**: Verify that all pages with canonical tags are properly indexed in Search Console after the fix is implemented, and that search rankings improve.

- [x] T009 [US1] Update root layout.tsx to include default canonical tag for homepage
- [x] T010 [P] [US1] Implement canonical tags for main pages (about, contact, projects) in their respective layout.tsx or page.tsx files
- [x] T011 [US1] Create canonical tag verification tests for main pages
- [x] T012 [US1] Test canonical tags are present in HTML output for main pages
- [x] T013 [US1] Verify canonical tags point to correct URLs for main pages
- [x] T014 [US1] Submit sitemap to Google Search Console after canonical tag implementation

## Phase 4: User Story 2 - Proper Canonical Tag Implementation (Priority: P2)

**Goal**: Ensure all pages have proper canonical tags so search engines understand which version of a page to index when duplicate content exists.

**Independent Test**: Validate that each page contains a canonical tag pointing to the correct URL version of the page.

- [x] T015 [US2] Audit all existing pages to identify those missing canonical tags
- [x] T016 [P] [US2] Implement canonical tags for all static pages in the app directory
- [x] T017 [P] [US2] Implement canonical tags for all dynamic pages (e.g., projects/[id])
- [x] T018 [US2] Create canonical tag validation middleware to prevent circular references
- [x] T019 [US2] Test canonical tags for dynamic routes with parameters
- [x] T020 [US2] Verify canonical tags follow SEO standards and are properly formatted
- [x] T021 [US2] Create tests to validate canonical URL format according to RFC standards

## Phase 5: User Story 3 - Monitor Search Console for Canonical Issues (Priority: P3)

**Goal**: Set up monitoring to catch canonical tag issues early to maintain optimal site indexing.

**Independent Test**: Set up monitoring procedures and verify that canonical tag issues are caught and resolved quickly.

- [x] T022 [US3] Document canonical tag implementation for ongoing maintenance
- [x] T023 [US3] Set up automated tests to verify canonical tags are present on all pages
- [x] T024 [US3] Create monitoring script to periodically check canonical tags across the site (Note: Script moved to separate directory to avoid build issues)
- [x] T025 [US3] Establish process for monitoring Google Search Console for canonical tag issues
- [x] T026 [US3] Create alert mechanism for detecting canonical tag problems

## Phase 6: Polish & Cross-Cutting Concerns

- [x] T027 Perform comprehensive testing of all canonical tags across the site
- [x] T028 Verify all pages previously flagged in Search Console are resolved
- [x] T029 Run Lighthouse audit to confirm SEO improvements
- [x] T030 Update documentation with canonical tag implementation details
- [x] T031 Verify Search Console shows 0 canonical tag errors
- [x] T032 Monitor organic search traffic to confirm 15% increase within 60 days