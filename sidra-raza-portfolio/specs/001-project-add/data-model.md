# Data Model: Project Configuration for Portfolio Enhancement

## Entities

### Project
- **Definition**: Individual project in the portfolio with details and metadata
- **Fields**:
  - id: string (unique identifier for the project)
  - title: string (display title of the project)
  - description: string (detailed description of the project)
  - tagline: string (short tagline for the project)
  - url: string (URL to the live project)
  - icon: string (icon identifier or path for the project)
  - highlights: string (highlight text with emojis)
  - featured: boolean (whether this is a featured/top project)
  - position: number (position in the list)
- **Validation**: Title and URL are required, URL must be valid
- **Relationships**: Belongs to the portfolio's project collection

### ProjectCollection
- **Definition**: Collection of projects in the portfolio
- **Fields**:
  - projects: Array<Project> (list of projects)
  - featuredProject: Project (the top/featured project)
- **Validation**: Must contain at least one project
- **State**: Ordered by position property of individual projects

### SEOMetadata
- **Definition**: SEO information associated with a project
- **Fields**:
  - title: string (meta title for search engines)
  - description: string (meta description for search engines)
  - keywords: Array<string> (keywords for search visibility)
  - author: string (author association)
  - structuredData: object (JSON-LD structured data)
- **Validation**: Title and description must meet length guidelines
- **Relationships**: Associated with individual projects

## Configuration Objects

### ProjectConfig
- **Definition**: Configuration for how projects are displayed and ordered
- **Fields**:
  - featuredPosition: number (position for featured projects, typically 0)
  - sortOrder: string (method for sorting projects)
  - displayOptions: object (options for how projects are displayed)