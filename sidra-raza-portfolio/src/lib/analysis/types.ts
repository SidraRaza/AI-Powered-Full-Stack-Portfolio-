// Core data models for the analysis system
export interface CodebaseScanResult {
  id: string;
  timestamp: Date;
  projectPath: string;
  totalFiles: number;
  fileTypes: Map<string, number>;
  totalSize: number;
  scanDuration: number;
  issues: Issue[];
  summary: ScanSummary;
}

export interface Issue {
  id: string;
  ruleId: string;
  severity: 'error' | 'warning' | 'info';
  message: string;
  filePath: string;
  line: number;
  column: number;
  codeSnippet: string;
  category: 'security' | 'quality' | 'performance' | 'architecture' | 'best-practice';
  recommendation: string;
  confidence: number; // 0-100%
}

export interface ScanSummary {
  totalFiles: number;
  analyzedFiles: number;
  skippedFiles: number;
  totalIssues: number;
  criticalIssues: number;
  highSeverityIssues: number;
  mediumSeverityIssues: number;
  lowSeverityIssues: number;
  scanTimeMs: number;
}

export interface ConstitutionDocument {
  id: string;
  title: string;
  version: string;
  createdAt: Date;
  updatedAt: Date;
  sections: ConstitutionSection[];
  principles: Principle[];
  authors: string[];
}

export interface ConstitutionSection {
  id: string;
  title: string;
  content: string;
  order: number;
}

export interface Principle {
  id: string;
  name: string;
  description: string;
  category: 'development' | 'architecture' | 'security' | 'testing' | 'deployment';
  priority: 'high' | 'medium' | 'low';
}

export interface Recommendation {
  id: string;
  issueId: string;
  title: string;
  description: string;
  implementationSteps: string[];
  estimatedEffort: 'minutes' | 'hours' | 'days';
  riskLevel: 'low' | 'medium' | 'high';
  relatedFiles: string[];
}

export interface AnalysisReport {
  id: string;
  title: string;
  createdAt: Date;
  projectInfo: ProjectInfo;
  scanResults: CodebaseScanResult;
  constitution: ConstitutionDocument;
  recommendations: Recommendation[];
  executiveSummary: string;
}

export interface ProjectInfo {
  name: string;
  version: string;
  description: string;
  technologies: string[];
  dependencies: Dependency[];
  totalLinesOfCode: number;
}

export interface Dependency {
  name: string;
  version: string;
  type: 'production' | 'development';
  isOutdated: boolean;
  securityIssues: SecurityIssue[];
  license: string;
}

export interface SecurityIssue {
  id: string;
  title: string;
  severity: 'critical' | 'high' | 'moderate' | 'low';
  description: string;
  recommendation: string;
  vulnerableVersions: string[];
  patchedVersions: string;
}