---
id: 2
title: gsc-seo-planning
stage: plan
date: 2026-01-19
surface: agent
model: Claude Sonnet 4.5
feature: gsc-fix
branch: 001-gsc-fix
user:
command: /sp.plan
labels: [seo, nextjs, gsc, redirect, indexing, planning]
links:
  spec: specs/001-gsc-fix/spec.md
  ticket: null
  adr: null
  pr: null
files:
  - specs/001-gsc-fix/plan.md
  - specs/001-gsc-fix/research.md
  - specs/001-gsc-fix/data-model.md
  - specs/001-gsc-fix/quickstart.md
  - specs/001-gsc-fix/contracts
tests:

---

## Prompt

$ARGUMENTS

## Response snapshot

Completed implementation planning for fixing Google Search Console redirect indexing issue. Found that most SEO configurations were already properly implemented:

- Sitemap already excludes redirect-only pages like /auth/* and /dashboard
- robots.txt already blocks /auth/ and /dashboard/ paths
- middleware already handles www to non-www redirects properly

The main required changes identified are:
- Add noindex meta tags to auth pages (/auth/sign-in, /auth/sign-up)
- Add noindex meta tags to dashboard page when showing "Access Denied" state
- Ensure canonical tags are properly implemented throughout the site

Created comprehensive planning artifacts including:
- Implementation plan (plan.md)
- Research findings (research.md)
- Data model (data-model.md)
- Quickstart guide (quickstart.md)
- Contracts directory

## Outcome

- ✅ Impact: Complete planning for SEO fixes with research-backed approach
- 🧪 Tests: None needed for planning phase
- 📁 Files: Created multiple planning artifacts
- 🔁 Next prompts: Ready for task generation with /sp.tasks
- 🧠 Reflection: Current configuration is largely correct; minimal changes needed

## Evaluation notes (flywheel)

- Failure modes observed: None
- Graders run and results (PASS/FAIL): N/A
- Prompt variant (if applicable): N/A
- Next experiment (smallest change to try): Proceed to task generation