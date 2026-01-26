# Feature Specification: Fix Google Search Console Redirect Indexing Issue

**Feature Branch**: `001-gsc-fix`
**Created**: 2026-01-19
**Status**: Draft
**Input**: User description: "You are an expert SEO and Next.js developer. I need your help to fix a Google Search Console issue.

My website: https://sidraraza.xyz
Problem: GSC is showing \"New reason preventing your pages from being indexed: Page with redirect\". Some URLs in my sitemap or internal links are being flagged as redirects and are not being indexed.

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
- Best practices to avoid \"Page with redirect\" errors in the future

Make it actionable and easy to follow, assuming I will implement it in Next.js 14 with App Router."

## User Scenarios & Testing *(mandatory)*

### User Story 1 - Fix Google Search Console Redirect Issues (Priority: P1)

As a website owner, I want to resolve the "Page with redirect" indexing issue in Google Search Console so that my public pages are properly indexed and visible in search results.

**Why this priority**: This is critical for SEO and organic traffic - if pages aren't being indexed properly, the website won't rank well in search engines.

**Independent Test**: Can be fully tested by verifying that problematic redirect URLs are no longer submitted to search engines and only final destination pages are indexed.

**Acceptance Scenarios**:

1. **Given** a Google Search Console showing "Page with redirect" errors, **When** the website's sitemap and robots.txt are updated, **Then** only final destination pages are submitted to search engines and indexed properly.

2. **Given** redirect URLs like /auth/* and /dashboard, **When** proper canonical tags and noindex directives are implemented, **Then** search engines understand these pages should not be indexed.

---

### User Story 2 - Optimize Website Redirect Structure (Priority: P2)

As a website administrator, I want to ensure proper redirect handling between www/non-www and HTTP/HTTPS so that there are no redirect chains affecting SEO.

**Why this priority**: Proper redirect structure prevents SEO penalties and ensures consistent indexing of the preferred version of the website.

**Independent Test**: Can be tested by checking HTTP headers and redirect chains for proper handling of www/non-www and HTTP/HTTPS variations.

**Acceptance Scenarios**:

1. **Given** a request to http://sidraraza.xyz or http://www.sidraraza.xyz, **When** the server processes the request, **Then** it redirects to https://sidraraza.xyz (preferred canonical version).

---

### User Story 3 - Maintain Clean Sitemap Structure (Priority: P3)

As an SEO specialist, I want to maintain a clean sitemap that only includes indexable pages so that search engines can efficiently crawl and index public content.

**Why this priority**: A clean sitemap improves crawl efficiency and ensures search engines focus on important public pages rather than redirect pages.

**Independent Test**: Can be verified by examining the sitemap.xml file to ensure it only contains URLs that return 200 status codes and are meant for public consumption.

**Acceptance Scenarios**:

1. **Given** the current sitemap containing redirect pages, **When** the sitemap is updated, **Then** it only includes final destination pages like /about, /services, /skills, /projects, /agents, /agents/ai-assistant, and /contact.

---

## Edge Cases

- What happens when a user accesses a redirect page directly - should it show a proper error or redirect to login?
- How should the system handle temporary redirects vs permanent redirects for authentication pages?
- What if there are multiple redirect chains that create loops?

## Requirements *(mandatory)*

### Functional Requirements

- **FR-001**: System MUST exclude redirect-only pages (/auth/*, /dashboard) from sitemap.xml
- **FR-002**: System MUST implement proper canonical tags on all pages pointing to the preferred URL version
- **FR-003**: System MUST handle www vs non-www redirects consistently (preferably to non-www)
- **FR-004**: System MUST enforce HTTPS redirects for all HTTP requests
- **FR-005**: System MUST add noindex meta tags to pages that should not be indexed (redirect pages)
- **FR-006**: System MUST update robots.txt to disallow crawling of protected/authenticated routes
- **FR-007**: System MUST maintain public pages like /about, /services, /skills, /projects, /agents, /agents/ai-assistant, and /contact in the sitemap
- **FR-008**: System MUST submit updated sitemap to Google Search Console after changes

### Key Entities

- **Sitemap Pages**: Collection of URLs that should be indexed by search engines (public facing pages)
- **Redirect Pages**: URLs that redirect to other pages (authentication, dashboard, etc.)
- **Canonical URLs**: Preferred version of a page that search engines should index

## Success Criteria *(mandatory)*

### Measurable Outcomes

- **SC-001**: Google Search Console no longer shows "Page with redirect" indexing errors within 2 weeks of implementation
- **SC-002**: Sitemap.xml contains only pages that return HTTP 200 status codes (no redirect pages)
- **SC-003**: All HTTP requests redirect to HTTPS and www/non-www variations are handled consistently
- **SC-004**: Protected routes like /auth/* and /dashboard return noindex meta tags preventing indexing
- **SC-005**: Public pages continue to be indexed and maintain their search rankings