# Tasks: Portfolio Enhancement & SEO Optimization

**Input**: Design documents from `/specs/002-portfolio-update/`
**Prerequisites**: plan.md (✓), spec.md (✓), research.md (✓), data-model.md (✓), contracts/ (✓)

**Tests**: Tests are OPTIONAL - This feature specification does not explicitly request TDD. Tests are included for critical paths (SEO validation, blog functionality, performance) but can be skipped if team prefers manual testing.

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3, US4, US5)
- Include exact file paths in descriptions

## Path Conventions

- **Single Next.js project**: `src/`, `public/` at repository root
- **App Router**: `src/app/` for routes, `src/components/` for UI components
- **Content**: `src/content/blog/` for markdown files
- Paths shown below follow the plan.md structure

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and dependency verification

- [X] T001 Verify Next.js 16.1.1 project structure exists in `sidra-raza-portfolio/`
- [X] T002 Verify Framer Motion 12.x is installed: `npm list framer-motion`
- [X] T003 [P] Install blog dependencies: `npm install gray-matter remark remark-html`
- [X] T004 [P] Create directory structure: `src/components/hero/`, `src/components/blog/`, `src/components/animations/`, `src/components/seo/`, `src/content/blog/`
- [X] T005 [P] Create type definitions file: `src/types/blog.ts`

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [X] T006 [P] Create blog utility functions: `src/lib/blog.ts` (getBlogPosts, getBlogPostBySlug, getLatestBlogPosts)
- [X] T007 [P] Create blog validation functions: `src/lib/blog-validation.ts` (validateSlug, validateTitle, validateExcerpt, validateDate)
- [X] T008 [P] Create structured data components: `src/components/seo/structured-data.tsx` (PersonSchema, WebsiteSchema, BlogPostingSchema)
- [X] T009 [P] Create scroll animation wrapper: `src/components/animations/scroll-reveal.tsx`
- [X] T010 [P] Create hover effects component: `src/components/animations/hover-effects.tsx`

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - Professional Hero Introduction (Priority: P1) 🎯 MVP

**Goal**: Implement professional hero section with Sidra Raza's introduction and 4 action buttons

**Independent Test**: Visit homepage and verify hero displays correct introduction, 4 buttons (Download CV, LinkedIn, GitHub, Contact Me), and "Book a Strategy Call" button is removed

### Tests for User Story 1 (OPTIONAL) ⚠️

> **NOTE: Write these tests FIRST, ensure they FAIL before implementation**

- [ ] T011 [P] [US1] Unit test: Hero section renders correct name and title in `tests/unit/hero/hero-section.test.tsx`
- [ ] T012 [P] [US1] Unit test: Hero section displays all 4 buttons in `tests/unit/hero/hero-buttons.test.tsx`
- [ ] T013 [US1] Integration test: Hero section responsive layout in `tests/integration/hero/hero-responsive.test.tsx`

### Implementation for User Story 1

- [X] T014 [P] [US1] Create HeroButton type in `src/types/blog.ts` (add to existing file)
- [X] T015 [P] [US1] Create hero section component: `src/components/hero/hero-section.tsx`
- [X] T016 [US1] Update homepage to use new hero: `src/app/page.tsx` (replace existing hero content)
- [ ] T017 [US1] Add CV PDF to public folder: `public/SidraRazaCV.pdf` (requires user to provide file - see public/README-CV.md)
- [X] T018 [US1] Configure external links in hero: Update LinkedIn URL in `src/components/hero/hero-section.tsx`
- [X] T019 [US1] Configure external links in hero: Update GitHub URL in `src/components/hero/hero-section.tsx`
- [X] T020 [US1] Verify "Book a Strategy Call" button removed from homepage
- [X] T021 [US1] Test hero section on mobile viewport (320px - 768px) - see docs/MOBILE-TESTING-HERO.md
- [X] T022 [US1] Add error handling for missing CV file in `src/components/hero/hero-section.tsx`

**Checkpoint**: At this point, User Story 1 should be fully functional and testable independently

---

## Phase 4: User Story 2 - Blog Discovery and Reading (Priority: P2)

**Goal**: Implement blog system with homepage preview and dynamic blog post pages

**Independent Test**: Visit /blog to see listing, click posts to read full content, verify homepage shows 3 latest blog previews

### Tests for User Story 2 (OPTIONAL) ⚠️

- [ ] T023 [P] [US2] Unit test: getBlogPosts returns sorted posts in `tests/unit/blog/blog-data.test.ts`
- [ ] T024 [P] [US2] Unit test: getBlogPostBySlug returns correct post in `tests/unit/blog/blog-slug.test.ts`
- [ ] T025 [P] [US2] Contract test: Blog post markdown parsing in `tests/contract/blog/markdown-parse.test.ts`
- [ ] T026 [US2] Integration test: Blog navigation flow (listing → post → back) in `tests/integration/blog/blog-navigation.test.tsx`

### Implementation for User Story 2

- [X] T027 [P] [US2] Create sample blog post 1: `src/content/blog/building-agentic-ai-systems.md`
- [X] T028 [P] [US2] Create sample blog post 2: `src/content/blog/automating-workflows-with-ai.md`
- [X] T029 [P] [US2] Create sample blog post 3: `src/content/blog/scaling-business-with-ai.md`
- [X] T030 [P] [US2] Create blog preview card component: `src/components/blog/blog-preview.tsx`
- [X] T031 [P] [US2] Create blog listing component: `src/components/blog/blog-listing.tsx`
- [X] T032 [P] [US2] Create blog post display component: `src/components/blog/blog-post.tsx`
- [X] T033 [US2] Create blog listing page: `src/app/blog/page.tsx`
- [X] T034 [US2] Create dynamic blog post page: `src/app/blog/[slug]/page.tsx`
- [X] T035 [US2] Add blog preview section to homepage: `src/app/page.tsx` (integrate with hero section)
- [X] T036 [US2] Implement 404 handling for missing blog posts in `src/app/blog/[slug]/page.tsx`
- [X] T037 [US2] Add blog post cover image support in `src/components/blog/blog-post.tsx`
- [ ] T038 [US2] Test blog with more than 3 posts (verify homepage shows only latest 3)
- [X] T039 [US2] Create blog cover images directory: `public/blog/covers/` (optional, for sample posts)

**Checkpoint**: At this point, User Stories 1 AND 2 should both work independently

---

## Phase 5: User Story 3 - Smooth Visual Experience (Priority: P3)

**Goal**: Implement smooth scroll animations and hover effects throughout the site

**Independent Test**: Scroll through pages observing fade+slide transitions, hover over buttons to see scale effects, verify animations feel professional

### Tests for User Story 3 (OPTIONAL) ⚠️

- [ ] T040 [P] [US3] Unit test: ScrollReveal component renders with correct animation props in `tests/unit/animations/scroll-reveal.test.tsx`
- [ ] T041 [P] [US3] Unit test: HoverEffects component applies scale on hover in `tests/unit/animations/hover-effects.test.tsx`
- [ ] T042 [US3] Integration test: Animations run at 60fps in `tests/integration/animations/performance.test.tsx`
- [ ] T043 [US3] Visual test: Animations feel professional (not flashy) - manual verification

### Implementation for User Story 3

- [X] T044 [P] [US3] Wrap homepage sections with ScrollReveal: `src/app/page.tsx` (hero, blog preview, etc.)
- [X] T045 [P] [US3] Apply HoverEffects to all buttons: `src/components/hero/hero-section.tsx`
- [X] T046 [P] [US3] Apply HoverEffects to blog preview buttons: `src/components/blog/blog-preview.tsx`
- [ ] T047 [US3] Add subtle background gradient animation: `src/app/globals.css` (or create `src/components/animations/background-gradient.tsx`)
- [ ] T048 [US3] Apply ScrollReveal to about page sections: `src/app/about/page.tsx`
- [ ] T049 [US3] Apply ScrollReveal to services page sections: `src/app/services/page.tsx`
- [ ] T050 [US3] Apply ScrollReveal to projects page sections: `src/app/projects/page.tsx`
- [ ] T051 [US3] Apply ScrollReveal to contact page sections: `src/app/contact/page.tsx`
- [ ] T052 [US3] Apply ScrollReveal to agents page sections: `src/app/agents/page.tsx`
- [ ] T053 [US3] Test reduced motion preference support in `src/components/animations/scroll-reveal.tsx`
- [ ] T054 [US3] Verify animations don't cause layout shift (CLS < 0.1)

**Checkpoint**: All user stories should now be independently functional

---

## Phase 6: User Story 4 - SEO Visibility and Discovery (Priority: P2)

**Goal**: Implement complete SEO optimization with metadata, structured data, sitemap, and robots.txt

**Independent Test**: Examine page source for metadata tags, verify JSON-LD structured data, check sitemap.xml includes all routes, confirm robots.txt allows proper crawling

### Tests for User Story 4 (OPTIONAL) ⚠️

- [ ] T055 [P] [US4] Unit test: Homepage metadata has correct title in `tests/unit/seo/metadata.test.ts`
- [ ] T056 [P] [US4] Unit test: Structured data validates against schema.org in `tests/unit/seo/structured-data.test.ts`
- [ ] T057 [US4] Integration test: Sitemap.xml includes all routes in `tests/integration/seo/sitemap.test.ts`
- [ ] T058 [US4] Integration test: Robots.txt has correct directives in `tests/integration/seo/robots.test.ts`
- [ ] T059 [US4] Validation test: Google Rich Results Test passes for all pages - manual verification

### Implementation for User Story 4

- [X] T060 [P] [US4] Update root layout metadata: `src/app/layout.tsx` (title, description, keywords, openGraph, twitter, canonical)
- [X] T061 [P] [US4] Add PersonSchema to root layout: `src/app/layout.tsx` (already in structured-data.tsx)
- [X] T062 [P] [US4] Add WebsiteSchema to root layout: `src/app/layout.tsx` (already in structured-data.tsx)
- [X] T063 [P] [US4] Create sitemap generation: `src/app/sitemap.ts`
- [X] T064 [P] [US4] Create robots.txt generation: `src/app/robots.ts`
- [X] T065 [US4] Add page-specific metadata to homepage: `src/app/page.tsx`
- [X] T066 [US4] Add page-specific metadata to about page: `src/app/about/page.tsx`
- [X] T067 [US4] Add page-specific metadata to services page: `src/app/services/page.tsx`
- [X] T068 [US4] Add page-specific metadata to projects page: `src/app/projects/page.tsx`
- [X] T069 [US4] Add page-specific metadata to blog listing: `src/app/blog/page.tsx`
- [X] T070 [US4] Add dynamic metadata to blog post pages: `src/app/blog/[slug]/page.tsx` (generateMetadata function)
- [X] T071 [US4] Add BlogPostingSchema to blog post pages: `src/app/blog/[slug]/page.tsx`
- [X] T072 [US4] Add page-specific metadata to contact page: `src/app/contact/page.tsx`
- [X] T073 [US4] Add page-specific metadata to agents page: `src/app/agents/page.tsx`
- [X] T074 [US4] Add page-specific metadata to skills page: `src/app/skills/page.tsx`
- [X] T075 [US4] Add page-specific metadata to auth pages: `src/app/auth/sign-in/page.tsx`, `src/app/auth/sign-up/page.tsx` (with robots noindex)
- [X] T076 [US4] Add page-specific metadata to dashboard: `src/app/dashboard/page.tsx` (with robots noindex)
- [X] T077 [US4] Update sitemap domain to production URL: `src/app/sitemap.ts`
- [X] T078 [US4] Update robots.txt sitemap URL: `src/app/robots.ts`
- [X] T079 [US4] Verify all pages have exactly one H1 tag - see docs/SEO-TEST-REPORT.md
- [X] T080 [US4] Test sitemap.xml in browser: `http://localhost:3000/sitemap.xml` - see docs/SEO-TEST-REPORT.md
- [X] T081 [US4] Test robots.txt in browser: `http://localhost:3000/robots.txt` - see docs/SEO-TEST-REPORT.md

**Checkpoint**: All pages should have complete SEO metadata and structured data

---

## Phase 7: User Story 5 - Fast Performance Experience (Priority: P2)

**Goal**: Optimize performance to achieve Lighthouse score 95+ with proper image optimization and lazy loading

**Independent Test**: Run Lighthouse audit verifying score 95+, check image optimization, verify lazy loading, confirm proper heading hierarchy

### Tests for User Story 5 (OPTIONAL) ⚠️

- [ ] T082 [P] [US5] Performance test: Lighthouse score ≥95 on homepage in `tests/performance/lighthouse.test.ts` (or manual)
- [ ] T083 [P] [US5] Performance test: Lighthouse score ≥95 on blog pages in `tests/performance/lighthouse-blog.test.ts` (or manual)
- [ ] T084 [US5] Integration test: Images use next/image component in `tests/integration/performance/image-optimization.test.tsx`
- [ ] T085 [US5] Integration test: Lazy loading works for below-fold images in `tests/integration/performance/lazy-loading.test.tsx`

### Implementation for User Story 5

- [ ] T086 [P] [US5] Audit all images in homepage: `src/app/page.tsx` (convert to next/image if not already)
- [ ] T087 [P] [US5] Audit all images in blog components: `src/components/blog/` (convert to next/image)
- [ ] T088 [P] [US5] Add priority prop to above-fold images: `src/app/page.tsx` (hero images)
- [ ] T089 [P] [US5] Verify lazy loading on below-fold images: `src/components/blog/blog-preview.tsx`
- [ ] T090 [US5] Optimize image sizes in `public/` directory (compress to WebP, proper dimensions)
- [ ] T091 [US5] Verify heading hierarchy: exactly one H1 per page (all pages)
- [ ] T092 [US5] Run Lighthouse audit on homepage: `npm run build && npm start` then use Chrome DevTools
- [ ] T093 [US5] Run Lighthouse audit on blog listing: `http://localhost:3000/blog`
- [ ] T094 [US5] Run Lighthouse audit on individual blog post: `http://localhost:3000/blog/[slug]`
- [ ] T095 [US5] Optimize bundle size: Run `npm run build` and analyze bundle (optional: `@next/bundle-analyzer`)
- [ ] T096 [US5] Test page load time on 4G throttling: Chrome DevTools Network throttling
- [ ] T097 [US5] Verify animation performance: Chrome DevTools Performance panel (60fps)
- [ ] T098 [US5] Fix any CLS issues identified in Lighthouse report
- [ ] T099 [US5] Fix any LCP issues identified in Lighthouse report
- [ ] T100 [US5] Fix any TBT (Total Blocking Time) issues identified in Lighthouse report

**Checkpoint**: Lighthouse score 95+ achieved on all major pages

---

## Phase 8: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories and final validation

- [ ] T101 [P] Update README.md with new features (blog, hero, animations, SEO)
- [ ] T102 [P] Run ESLint: `npm run lint` and fix all errors
- [ ] T103 [P] Run TypeScript type check: `npm run build` and fix all type errors
- [ ] T104 [P] Test all external links (LinkedIn, GitHub) open in new tab with `target="_blank" rel="noopener noreferrer"`
- [ ] T105 [P] Test Contact Me button scrolls to contact section smoothly
- [ ] T106 [P] Verify mobile responsiveness across all pages (320px - 768px viewport)
- [ ] T107 [P] Test blog navigation on mobile devices
- [ ] T108 [P] Run quickstart.md validation checklist from `specs/002-portfolio-update/quickstart.md`
- [ ] T109 [P] Test in multiple browsers: Chrome, Firefox, Safari, Edge
- [ ] T110 [P] Verify accessibility: Run axe DevTools or WAVE extension
- [ ] T111 [P] Clean up unused imports and dead code
- [ ] T112 [P] Add code comments for complex logic (animation configurations, blog parsing)
- [ ] T113 [P] Verify git status and commit all changes
- [ ] T114 [P] Create pull request with description of all changes

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phase 3-7)**: All depend on Foundational phase completion
  - User stories can then proceed in parallel (if staffed)
  - Or sequentially in priority order (P1 → P2 → P3 → P4 → P5)
- **Polish (Phase 8)**: Depends on all desired user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational (Phase 2) - No dependencies on other stories
- **User Story 2 (P2)**: Can start after Foundational (Phase 2) - Independent, but blog data utilities used by homepage
- **User Story 3 (P3)**: Can start after Foundational (Phase 2) - Depends on components from US1/US2 being in place
- **User Story 4 (P2)**: Can start after Foundational (Phase 2) - Independent, can run in parallel with other stories
- **User Story 5 (P2)**: Can start after Foundational (Phase 2) - Best done last as it optimizes work from other stories

### Within Each User Story

- Tests (if included) MUST be written and FAIL before implementation
- Components before integration
- Core implementation before polish
- Story complete before moving to next priority

### Parallel Opportunities

- **Setup Phase**: T003, T004, T005 can all run in parallel
- **Foundational Phase**: T006, T007, T008, T009, T010 can all run in parallel
- **User Story 1**: T014, T015 can run in parallel; T018, T019 can run in parallel
- **User Story 2**: T027, T028, T029, T030, T031, T032 can all run in parallel
- **User Story 3**: T044, T045, T046 can run in parallel; T048, T049, T050, T051, T052 can run in parallel
- **User Story 4**: T060, T061, T062, T063, T064 can run in parallel; T065-T076 can run in parallel across different pages
- **User Story 5**: T086, T087, T088, T089 can run in parallel
- **Polish Phase**: T101-T114 can mostly run in parallel (different files)

---

## Parallel Example: User Story 2 (Blog System)

```bash
# Launch all blog content creation together:
Task: "Create sample blog post 1: src/content/blog/building-agentic-ai-systems.md"
Task: "Create sample blog post 2: src/content/blog/automating-workflows-with-ai.md"
Task: "Create sample blog post 3: src/content/blog/scaling-business-with-ai.md"

# Launch all blog component creation together:
Task: "Create blog preview card component: src/components/blog/blog-preview.tsx"
Task: "Create blog listing component: src/components/blog/blog-listing.tsx"
Task: "Create blog post display component: src/components/blog/blog-post.tsx"

# Launch all tests together (if tests requested):
Task: "Unit test: getBlogPosts returns sorted posts in tests/unit/blog/blog-data.test.ts"
Task: "Unit test: getBlogPostBySlug returns correct post in tests/unit/blog/blog-slug.test.ts"
Task: "Contract test: Blog post markdown parsing in tests/contract/blog/markdown-parse.test.ts"
```

---

## Parallel Example: User Story 4 (SEO)

```bash
# Launch all page metadata updates in parallel (different files):
Task: "Add page-specific metadata to about page: src/app/about/page.tsx"
Task: "Add page-specific metadata to services page: src/app/services/page.tsx"
Task: "Add page-specific metadata to projects page: src/app/projects/page.tsx"
Task: "Add page-specific metadata to contact page: src/app/contact/page.tsx"
Task: "Add page-specific metadata to agents page: src/app/agents/page.tsx"

# Launch foundational SEO tasks together:
Task: "Update root layout metadata: src/app/layout.tsx"
Task: "Create sitemap generation: src/app/sitemap.ts"
Task: "Create robots.txt generation: src/app/robots.ts"
```

---

## Implementation Strategy

### MVP First (User Story 1 Only)

1. Complete Phase 1: Setup (T001-T005)
2. Complete Phase 2: Foundational (T006-T010) - CRITICAL
3. Complete Phase 3: User Story 1 (T011-T022)
4. **STOP and VALIDATE**: 
   - Test hero section displays correctly
   - Verify all 4 buttons work
   - Test responsive layout on mobile
   - Confirm "Book a Strategy Call" removed
5. Deploy/demo if ready

### Incremental Delivery

1. Complete Setup + Foundational → Foundation ready
2. Add User Story 1 (Hero) → Test independently → Deploy/Demo (MVP!)
3. Add User Story 2 (Blog) → Test independently → Deploy/Demo
4. Add User Story 3 (Animations) → Test independently → Deploy/Demo
5. Add User Story 4 (SEO) → Test independently → Deploy/Demo
6. Add User Story 5 (Performance) → Test independently → Deploy/Demo
7. Each story adds value without breaking previous stories

### Parallel Team Strategy

With multiple developers:

1. Team completes Setup + Foundational together
2. Once Foundational is done:
   - Developer A: User Story 1 (Hero)
   - Developer B: User Story 2 (Blog)
   - Developer C: User Story 4 (SEO) - can start immediately
3. After US1, US2, US4 complete:
   - Developer A: User Story 3 (Animations)
   - Developer B: User Story 5 (Performance)
4. All complete → Polish Phase together

### Recommended Sequence (Solo Developer)

1. **Day 1**: Setup + Foundational + User Story 1 (Hero MVP)
2. **Day 2**: User Story 2 (Blog system)
3. **Day 3**: User Story 4 (SEO metadata) + User Story 3 (Animations)
4. **Day 4**: User Story 5 (Performance optimization) + Polish

---

## Task Summary

| Phase | Description | Task Count |
|-------|-------------|------------|
| Phase 1 | Setup | 5 |
| Phase 2 | Foundational | 5 |
| Phase 3 | User Story 1 (Hero) | 12 (3 tests + 9 implementation) |
| Phase 4 | User Story 2 (Blog) | 16 (4 tests + 12 implementation) |
| Phase 5 | User Story 3 (Animations) | 15 (4 tests + 11 implementation) |
| Phase 6 | User Story 4 (SEO) | 27 (5 tests + 22 implementation) |
| Phase 7 | User Story 5 (Performance) | 18 (4 tests + 14 implementation) |
| Phase 8 | Polish | 14 |
| **Total** | **All Phases** | **112 tasks** |

### Task Breakdown by Type

- **Setup/Foundational**: 10 tasks
- **Tests (Optional)**: 29 tasks
- **Implementation**: 73 tasks
- **Parallelizable**: ~60 tasks (marked with [P])

### Suggested MVP Scope

Minimum viable product for quick deployment:

1. Phase 1: Setup (T001-T005)
2. Phase 2: Foundational (T006-T010)
3. Phase 3: User Story 1 (T014-T022) - skip tests for MVP
4. Phase 6: User Story 4 - SEO basics only (T060-T064, T077-T078)
5. Phase 7: User Story 5 - Performance basics only (T086-T091)

**MVP Task Count**: ~30 tasks (deployable professional hero + basic SEO + performance)

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story for traceability
- Each user story should be independently completable and testable
- Tests are OPTIONAL - skip test tasks if team prefers manual testing
- Commit after each task or logical group
- Stop at any checkpoint to validate story independently
- Verify external links use `target="_blank" rel="noopener noreferrer"`
- Test responsive design on actual mobile devices, not just browser dev tools
