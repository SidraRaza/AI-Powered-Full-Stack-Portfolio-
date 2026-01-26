# Research: Add Word Weaver AI Planner Project to Portfolio

## Overview
Research findings for implementing the addition of "Word Weaver AI Planner" project to the portfolio with proper positioning and SEO optimization.

## Current State Analysis
- Portfolio uses Next.js 14 with App Router
- Projects are likely stored in a data file and rendered through components
- Need to identify where projects data is configured
- Need to understand how project cards are rendered
- Existing SEO structure already in place (from previous GSC work)

## Decision: Project Data Structure Location
**Rationale**: Locate the central project data configuration to add the new project and ensure proper ordering.
**Alternatives considered**:
- Hardcoded in JSX - rejected because it makes maintenance difficult
- API endpoint - rejected because portfolio projects are static content
- Central data file - accepted as best practice for static content
**Implementation**: Find and update the projects data file to include the new project at the beginning of the array.

## Decision: SEO Optimization Strategy
**Rationale**: Enhance SEO to connect the new project with "Sidra Raza" and improve search visibility.
**Alternatives considered**:
- Only update project metadata - rejected because broader SEO needed
- Separate SEO implementation - rejected because SEO should be integrated
- Integrated approach with structured data and meta tags - accepted as comprehensive solution
**Implementation**: Update structured data and meta tags to associate the project with "Sidra Raza" and related search terms.

## Decision: Project Card Component Approach
**Rationale**: Ensure the new project card matches existing design standards while highlighting the featured project.
**Alternatives considered**:
- Create a separate component for featured projects - rejected because it adds complexity
- Use existing ProjectCard component with conditional props - accepted as consistent approach
**Implementation**: Update ProjectCard component or pass special props to indicate featured status.

## Technical Implementation Details

### Next.js 14 App Router Project Handling
- Projects data likely stored in a .ts file in src/lib/data/
- ProjectCard component renders individual project items
- Projects page fetches data and maps to components
- Array order determines display order (first item appears first)

### SEO Best Practices for Portfolio Projects
- Include structured data (JSON-LD) linking project to author
- Use appropriate meta tags for search visibility
- Add schema markup for projects/works
- Ensure proper title and description tags

### Portfolio Structure Maintenance
- Preserve existing project order below the new top project
- Maintain consistent formatting and styling
- Ensure responsive design compatibility
- Follow existing code patterns and conventions

## Key Files to Investigate
- src/lib/data/projects.ts (likely location of project data)
- src/app/projects/page.tsx (projects page)
- src/components/projects/ProjectCard.tsx (project card component)
- src/app/layout.tsx (for global SEO)
- src/lib/config/site.ts (for site-wide config including SEO)