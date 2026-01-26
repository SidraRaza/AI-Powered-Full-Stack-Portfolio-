---
id: 1
title: gsc-redirect-fix
stage: spec
date: 2026-01-19
surface: agent
model: Claude Sonnet 4.5
feature: gsc-fix
branch: 001-gsc-fix
user:
command: /sp.specify
labels: [seo, nextjs, gsc, redirect, indexing]
links:
  spec: specs/001-gsc-fix/spec.md
  ticket: null
  adr: null
  pr: null
files:
  - specs/001-gsc-fix/spec.md
  - specs/001-gsc-fix/checklists/requirements.md
tests:

---

## Prompt

You are an expert SEO and Next.js developer. I need your help to fix a Google Search Console issue.

My website: https://sidraraza.xyz
Problem: GSC is showing "New reason preventing your pages from being indexed: Page with redirect". Some URLs in my sitemap or internal links are being flagged as redirects and are not being indexed.

Here are the details:

1. I have a sitemap in Next.js using the App Router, which currently includes URLs like:
/about, /services, /skills, /projects, /agents, /agents/ai-assistant, /contact, /auth/sign-in, /auth/sign-up, /dashboard

2. Some URLs like /dashboard, /auth/sign-in redirect to login or other protected pages.

3. My site may have redirect issues between www vs non-www or HTTP → HTTPS.

4. The robots.txt currently looks like this:

User-Agent: *
Allow: /
Sitemap: https://sidraraza.xyz/sitemap.xml

5. I want Google to index only the **final, public pages**, not the redirect-only pages like /auth/* or /dashboard.

Please generate a **step-by-step action plan** that includes:

- How to clean up the sitemap (which URLs to keep, which to remove)
- How to set up redirects in Next.js (www vs non-www, HTTP → HTTPS)
- How to use canonical tags
- Any changes needed in robots.txt
- Any GSC steps needed after the fix
- Best practices to avoid "Page with redirect" errors in the future

Make it actionable and easy to follow, assuming I will implement it in Next.js 14 with App Router.

## Response snapshot

Created feature specification for fixing Google Search Console redirect indexing issue. The specification includes:

- User scenarios for resolving redirect issues in GSC
- Functional requirements to exclude redirect-only pages from sitemap
- Requirements for proper canonical tags and redirect handling
- Success criteria for measuring the resolution of indexing errors
- Edge cases to consider during implementation

The spec defines clear acceptance criteria for ensuring only public-facing pages are indexed while protecting redirect pages from search engine indexing.

## Outcome

- ✅ Impact: Created complete feature specification for GSC redirect fix
- 🧪 Tests: None needed for specification creation
- 📁 Files: Created spec.md and requirements checklist
- 🔁 Next prompts: Ready for planning phase with /sp.plan
- 🧠 Reflection: Specification addresses all user concerns about redirect indexing issues

## Evaluation notes (flywheel)

- Failure modes observed: None
- Graders run and results (PASS/FAIL): N/A
- Prompt variant (if applicable): N/A
- Next experiment (smallest change to try): Proceed to planning phase