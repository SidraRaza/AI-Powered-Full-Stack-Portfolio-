---
id: 3
title: gsc-seo-tasks
stage: tasks
date: 2026-01-19
surface: agent
model: Claude Sonnet 4.5
feature: gsc-fix
branch: 001-gsc-fix
user:
command: /sp.tasks
labels: [seo, nextjs, gsc, redirect, indexing, tasks]
links:
  spec: specs/001-gsc-fix/spec.md
  plan: specs/001-gsc-fix/plan.md
  ticket: null
  adr: null
  pr: null
files:
  - specs/001-gsc-fix/tasks.md
tests:

---

## Prompt

$ARGUMENTS

## Response snapshot

Generated comprehensive task list for implementing SEO fixes to resolve Google Search Console redirect indexing issue. The tasks are organized by priority and user story:

- Phase 1: Setup - Verify current configuration
- Phase 2: Foundational - Update canonical tags and verify existing configurations
- Phase 3: User Story 1 (P1) - Add noindex meta tags to redirect pages (/auth/*, /dashboard)
- Phase 4: User Story 2 (P2) - Verify redirect structure (HTTP/HTTPS, www/non-www)
- Phase 5: User Story 3 (P3) - Verify clean sitemap structure
- Phase 6: Polish - Google Search Console updates and monitoring

Tasks follow proper format with IDs, story labels, and file paths. Most foundational work is already complete per research findings, so focus is on implementing the missing noindex meta tags and verification.

## Outcome

- ✅ Impact: Complete task breakdown for SEO fix implementation
- 🧪 Tests: None required for SEO configuration changes
- 📁 Files: Created tasks.md with structured implementation plan
- 🔁 Next prompts: Ready for implementation phase
- 🧠 Reflection: Tasks organized by priority with clear dependencies

## Evaluation notes (flywheel)

- Failure modes observed: None
- Graders run and results (PASS/FAIL): N/A
- Prompt variant (if applicable): N/A
- Next experiment (smallest change to try): Begin implementation of User Story 1 tasks