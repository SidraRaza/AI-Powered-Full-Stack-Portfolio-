# Research: Canonical Tag Fix for SEO Indexing

## Overview
This research document addresses the canonical tag indexing issue identified in Google Search Console for the portfolio website. The goal is to implement proper canonical tags across all pages to ensure search engines correctly index the site's content.

## Decision: Canonical Tag Implementation Approach
**Rationale**: Based on research of Next.js best practices and SEO guidelines, the recommended approach is to use Next.js 13+'s metadata API to dynamically generate canonical tags for each page.

**Alternatives considered**:
1. Hardcoding canonical tags in each page - rejected due to maintenance overhead
2. Using a third-party SEO library - rejected as Next.js provides built-in solutions
3. Server-side generation of canonical tags - overkill for static portfolio site

## Decision: Handling Dynamic URLs and Parameters
**Rationale**: For pages with potential URL parameters, canonical tags should point to the base URL unless parameters significantly change content. This follows SEO best practices to prevent duplicate content issues.

**Alternatives considered**:
1. Unique canonical tags for each parameter combination - would fragment SEO value
2. No canonical tags for dynamic pages - would leave pages vulnerable to duplicate content issues

## Decision: Verification Method
**Rationale**: Canonical tag implementation will be verified using:
1. Next.js development tools to inspect generated HTML
2. Google Search Console to monitor indexing status
3. Browser developer tools to verify tag presence on live site

## Key Findings
- Next.js 13+ provides a Metadata API that allows dynamic canonical tag generation
- The `<link rel="canonical" />` tag should be placed in the `<head>` section of each page
- Canonical tags should point to the preferred version of each page to prevent duplicate content issues
- For paginated content, self-referencing canonical tags are appropriate
- Dynamic canonical tags can be generated based on the current URL