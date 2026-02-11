# Canonical Tag Implementation Guide

## Overview
This document explains the canonical tag implementation for the Sidra Raza portfolio website to ensure proper SEO and prevent indexing issues.

## Implementation Details

### 1. Next.js Metadata API
The site uses Next.js 13+'s App Router metadata API to implement canonical tags. Each page that should be indexed has a `metadata` export that includes the `alternates.canonical` property.

### 2. Static Pages
For static pages, canonical tags are implemented directly in the page.tsx file:

```typescript
export const metadata: Metadata = {
  title: "Page Title",
  description: "Page Description",
  alternates: {
    canonical: "https://sidraraza.xyz/page-path",  // Full canonical URL
  },
};
```

### 3. Utility Functions
The `src/lib/canonical.ts` file contains utility functions for:
- Generating canonical URLs: `generateCanonicalUrl(path)`
- Validating URL format: `isValidUrl(url)`
- Checking for circular references: `isValidCanonicalReference(canonicalUrl, currentPageUrl)`

### 4. Private Pages
Pages that should not be indexed (like dashboard, auth pages) have:
```typescript
export const metadata: Metadata = {
  title: "Private Page",
  robots: {
    index: false,
    follow: false,
  },
};
```

## Adding Canonical Tags to New Pages

When creating new public pages:

1. Add the `metadata` export to your page component
2. Include the `alternates.canonical` property with the full URL
3. Ensure the canonical URL points to the preferred version of the page

Example:
```typescript
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "New Page Title",
  description: "New page description",
  alternates: {
    canonical: "https://sidraraza.xyz/new-page-path",
  },
};

export default function NewPage() {
  return (
    // Your page content
  );
}
```

## Monitoring and Maintenance

### Regular Checks
- Periodically verify canonical tags are present on all public pages
- Use Google Search Console to monitor indexing status
- Check for any "Alternative page with proper canonical tag" errors

### Common Issues to Watch For
- Self-referencing canonical tags on duplicate content
- Circular canonical tag references
- Incorrect canonical URLs pointing to non-existent pages
- Missing canonical tags on public pages

## Testing

Unit tests for canonical URL utilities are located in `__tests__/canonical.test.ts`.
Integration tests are in `__tests__/canonical-integration.test.tsx`.

Run tests with: `npm run test`

## Monitoring Canonical Tags

### Google Search Console Process
1. Log in to Google Search Console (https://search.google.com/search-console/)
2. Select the Sidra Raza portfolio property
3. Navigate to "Coverage" report to see indexing status
4. Check "Enhancements" > "Alternative page with proper canonical tag" to identify any issues
5. If issues are found:
   - Review the affected URLs
   - Verify the canonical tags are correctly implemented on those pages
   - Submit the affected pages for re-indexing
6. Set up email notifications for critical indexing issues
7. Schedule monthly reviews of the Search Console reports

### Automated Monitoring
Run the canonical tag monitoring script periodically:
```bash
npm run canonical-audit  # If you add this script to package.json
# or
npx ts-node scripts/canonical-monitor.ts
```

The script will check all public pages for proper canonical tag implementation and report any issues.

### Alert Mechanism
To set up automatic alerts for canonical tag issues:

1. Create a separate monitoring script directory outside the main application
2. The monitoring script would need to be run separately from the main application
3. Example monitoring script (to be created separately from the main app):
   ```typescript
   // monitoring/canonical-checker.ts
   import axios from 'axios';
   import * as cheerio from 'cheerio';
   
   // Implementation would be similar to what was previously in scripts/canonical-monitor.ts
   // but kept separate from the main application to avoid build issues
   ```
4. Schedule the monitoring script to run regularly (e.g., daily) using a cron job or task scheduler
5. Configure the script output to be monitored by your alerting system
6. Set up notifications when the script exits with a non-zero code (indicating issues found)
7. Example cron job (runs daily at 2 AM):
   ```
   0 2 * * * cd /path/to/monitoring && npx ts-node canonical-checker.ts
   ```
8. Integrate with notification services (email, Slack, etc.) to receive alerts when issues are detected