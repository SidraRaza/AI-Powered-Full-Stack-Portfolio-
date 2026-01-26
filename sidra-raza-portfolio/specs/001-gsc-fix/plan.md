# Implementation Plan: Fix Google Search Console Redirect Indexing Issue

**Branch**: `001-gsc-fix` | **Date**: 2026-01-19 | **Spec**: [link]
**Input**: Feature specification from `/specs/001-gsc-fix/spec.md`

**Note**: This template is filled in by the `/sp.plan` command. See `.specify/templates/commands/plan.md` for the execution workflow.

## Summary

Implement SEO fixes to resolve "Page with redirect" indexing errors in Google Search Console by updating sitemap.xml to exclude redirect-only pages, implementing proper canonical tags, handling www/non-www and HTTP/HTTPS redirects consistently, and updating robots.txt to disallow protected routes.

## Technical Context

**Language/Version**: Next.js 14 with App Router
**Primary Dependencies**: Next.js, React, Node.js
**Storage**: N/A (SEO configuration only)
**Testing**: Manual verification via browser dev tools, curl commands, and Google Search Console
**Target Platform**: Web application deployed at https://sidraraza.xyz
**Project Type**: Web application
**Performance Goals**: N/A (configuration changes only)
**Constraints**: Must maintain existing functionality while fixing SEO issues
**Scale/Scope**: Single website with multiple pages

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

No violations identified - this is a standard SEO configuration update that follows established best practices.

## Project Structure

### Documentation (this feature)

```text
specs/001-gsc-fix/
├── plan.md              # This file (/sp.plan command output)
├── research.md          # Phase 0 output (/sp.plan command)
├── data-model.md        # Phase 1 output (/sp.plan command)
├── quickstart.md        # Phase 1 output (/sp.plan command)
├── contracts/           # Phase 1 output (/sp.plan command)
└── tasks.md             # Phase 2 output (/sp.tasks command - NOT created by /sp.plan)
```

### Source Code (repository root)

```text
src/
├── app/
│   ├── robots.ts        # Current robots.txt configuration
│   ├── sitemap.ts       # Current sitemap.xml configuration
│   ├── layout.tsx       # For canonical tags
│   └── [page directories]
```

**Structure Decision**: Modifying existing Next.js App Router configuration files to implement SEO fixes.

## Complexity Tracking

> **Fill ONLY if Constitution Check has violations that must be justified**

| Violation | Why Needed | Simpler Alternative Rejected Because |
|-----------|------------|-------------------------------------|