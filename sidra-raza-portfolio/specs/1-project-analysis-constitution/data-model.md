# Data Model: Project Analysis and Constitution Generation

## Entities

### CodebaseScanResult
- id: string
- timestamp: Date
- projectPath: string
- totalFiles: number
- fileTypes: Map<string, number>
- totalSize: number
- scanDuration: number
- issues: Issue[]
- summary: ScanSummary

### Issue
- id: string
- ruleId: string
- severity: "error" | "warning" | "info"
- message: string
- filePath: string
- line: number
- column: number
- codeSnippet: string
- category: "security" | "quality" | "performance" | "architecture" | "best-practice"
- recommendation: string
- confidence: number // 0-100%

### ScanSummary
- totalFiles: number
- analyzedFiles: number
- skippedFiles: number
- totalIssues: number
- criticalIssues: number
- highSeverityIssues: number
- mediumSeverityIssues: number
- lowSeverityIssues: number
- scanTimeMs: number

### ConstitutionDocument
- id: string
- title: string
- version: string
- createdAt: Date
- updatedAt: Date
- sections: ConstitutionSection[]
- principles: Principle[]
- authors: string[]

### ConstitutionSection
- id: string
- title: string
- content: string
- order: number

### Principle
- id: string
- name: string
- description: string
- category: "development" | "architecture" | "security" | "testing" | "deployment"
- priority: "high" | "medium" | "low"

### Recommendation
- id: string
- issueId: string
- title: string
- description: string
- implementationSteps: string[]
- estimatedEffort: "minutes" | "hours" | "days"
- riskLevel: "low" | "medium" | "high"
- relatedFiles: string[]

### AnalysisReport
- id: string
- title: string
- createdAt: Date
- projectInfo: ProjectInfo
- scanResults: CodebaseScanResult
- constitution: ConstitutionDocument
- recommendations: Recommendation[]
- executiveSummary: string

### ProjectInfo
- name: string
- version: string
- description: string
- technologies: string[]
- dependencies: Dependency[]
- totalLinesOfCode: number

### Dependency
- name: string
- version: string
- type: "production" | "development"
- isOutdated: boolean
- securityIssues: SecurityIssue[]
- license: string

### SecurityIssue
- id: string
- title: string
- severity: "critical" | "high" | "moderate" | "low"
- description: string
- recommendation: string
- vulnerableVersions: string[]
- patchedVersions: string[]