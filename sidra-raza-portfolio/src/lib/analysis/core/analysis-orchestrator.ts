import { ConfigManager } from '../config';
import { MainAnalyzerService } from '../services/main-analyzer';
import { FileStructureAnalyzer } from '../modules/file-structure-analyzer';
import { TechStackDetector } from '../modules/tech-stack-detector';
import { DependencyAnalyzer } from '../modules/dependency-analyzer';
import { QualityMetricsCalculator } from '../modules/quality-metrics-calculator';
import { PerformanceAnalyzer } from '../modules/performance-analyzer';
import { CodebaseScanResult, ProjectInfo, ScanSummary, AnalysisReport, ConstitutionDocument } from '../types';
import { logger } from '../utils/logger';

/**
 * Orchestrates the complete analysis workflow
 */
export class AnalysisOrchestrator {
  private configManager: ConfigManager;
  private mainAnalyzerService: MainAnalyzerService;

  constructor(configManager: ConfigManager) {
    this.configManager = configManager;
    this.mainAnalyzerService = new MainAnalyzerService(configManager);
  }

  /**
   * Execute the complete analysis workflow
   * @param projectPath Path to the project to analyze
   * @returns Complete analysis report
   */
  async executeAnalysis(projectPath: string): Promise<AnalysisReport> {
    const startTime = Date.now();
    const maxTime = this.configManager.getConfig().timeoutMinutes * 60 * 1000; // Convert minutes to milliseconds
    logger.info(`Starting complete analysis workflow (max time: ${this.configManager.getConfig().timeoutMinutes} minutes)...`);

    // Initialize the report
    const report: AnalysisReport = {
      id: `report_${Date.now()}`,
      title: `Analysis Report for ${projectPath}`,
      createdAt: new Date(),
      projectInfo: {} as ProjectInfo, // Will be populated below
      scanResults: {} as CodebaseScanResult, // Will be populated below
      constitution: {} as ConstitutionDocument, // Will be populated in next phase
      recommendations: [], // Will be populated based on issues found
      executiveSummary: ''
    };

    try {
      // Check if we're approaching the time limit
      if (Date.now() - startTime > maxTime * 0.8) { // 80% of max time
        logger.warn(`Approaching time limit. Elapsed: ${((Date.now() - startTime) / 1000).toFixed(2)}s, Max: ${this.configManager.getConfig().timeoutMinutes * 60}s`);
      }

      // Phase 1: Run comprehensive analysis
      logger.info('Phase 1: Running comprehensive analysis...');
      const analysisStartTime = Date.now();
      report.scanResults = await this.mainAnalyzerService.analyzeProject(projectPath);
      const analysisTime = Date.now() - analysisStartTime;
      logger.info(`Comprehensive analysis completed in ${(analysisTime / 1000).toFixed(2)} seconds`);

      // Check time again after analysis
      if (Date.now() - startTime > maxTime * 0.9) { // 90% of max time
        logger.warn(`Approaching time limit after analysis. Elapsed: ${((Date.now() - startTime) / 1000).toFixed(2)}s`);
      }

      // Get project info separately to avoid circular dependency
      const projectInfoStartTime = Date.now();
      report.projectInfo = await this.getProjectInfo(projectPath);
      const projectInfoTime = Date.now() - projectInfoStartTime;
      logger.info(`Project info gathering completed in ${(projectInfoTime / 1000).toFixed(2)} seconds`);

      // Phase 2: Generate constitution (this will be done in Phase 4)
      // For now, we'll create a placeholder that will be filled later
      report.constitution = {
        id: `constitution_${Date.now()}`,
        title: `Project Constitution for ${report.projectInfo.name || 'Unknown Project'}`,
        version: '1.0.0',
        createdAt: new Date(),
        updatedAt: new Date(),
        sections: [],
        principles: [],
        authors: []
      };

      // Phase 3: Generate recommendations based on findings
      logger.info('Phase 3: Generating recommendations...');
      const recommendationsStartTime = Date.now();
      report.recommendations = await this.generateRecommendations(report.scanResults, projectPath);
      const recommendationsTime = Date.now() - recommendationsStartTime;
      logger.info(`Recommendations generation completed in ${(recommendationsTime / 1000).toFixed(2)} seconds`);

      // Phase 4: Create executive summary
      logger.info('Phase 4: Creating executive summary...');
      const summaryStartTime = Date.now();
      report.executiveSummary = await this.createExecutiveSummary(report);
      const summaryTime = Date.now() - summaryStartTime;
      logger.info(`Executive summary creation completed in ${(summaryTime / 1000).toFixed(2)} seconds`);

      // Calculate total time
      const totalTime = Date.now() - startTime;
      report.scanResults.scanDuration = totalTime;

      // Check if we stayed within the time limit
      if (totalTime > maxTime) {
        logger.warn(`Analysis exceeded time limit: ${(totalTime / 1000).toFixed(2)}s > ${this.configManager.getConfig().timeoutMinutes * 60}s`);
      } else {
        logger.success(`Analysis completed within time limit: ${(totalTime / 1000).toFixed(2)}s < ${this.configManager.getConfig().timeoutMinutes * 60}s`);
      }

      logger.success(`Analysis workflow completed in ${(totalTime / 1000).toFixed(2)} seconds`);
      logger.logSummary(report.scanResults.summary);

      return report;
    } catch (error) {
      logger.error('Error during analysis workflow:', error);
      throw error;
    }
  }

  /**
   * Execute analysis with specific modules
   * @param projectPath Path to the project to analyze
   * @param modules Analysis modules to run
   * @returns Analysis result
   */
  async executePartialAnalysis(
    projectPath: string,
    modules: ('structure' | 'techstack' | 'dependencies' | 'quality' | 'performance')[]
  ): Promise<Partial<AnalysisReport>> {
    const startTime = Date.now();
    logger.info(`Running partial analysis for modules: ${modules.join(', ')}`);

    const report: Partial<AnalysisReport> = {
      id: `partial-report_${Date.now()}`,
      title: `Partial Analysis Report for ${projectPath}`,
      createdAt: new Date(),
    };

    try {
      // Run only specified modules
      const results: { [key: string]: any } = {};

      for (const module of modules) {
        logger.info(`Running ${module} analysis...`);
        results[module] = await this.mainAnalyzerService.runSpecificAnalysis(projectPath, module);
      }

      // Create a partial scan result
      report.scanResults = {
        id: `partial-scan_${Date.now()}`,
        timestamp: new Date(),
        projectPath,
        totalFiles: 0, // Placeholder
        fileTypes: new Map(), // Placeholder
        totalSize: 0, // Placeholder
        scanDuration: Date.now() - startTime,
        issues: [], // Placeholder
        summary: {
          totalFiles: 0,
          analyzedFiles: 0,
          skippedFiles: 0,
          totalIssues: 0,
          criticalIssues: 0,
          highSeverityIssues: 0,
          mediumSeverityIssues: 0,
          lowSeverityIssues: 0,
          scanTimeMs: Date.now() - startTime
        }
      };

      // Get project info
      report.projectInfo = await this.getProjectInfo(projectPath);

      logger.success(`Partial analysis completed in ${((Date.now() - startTime) / 1000).toFixed(2)} seconds`);
      return report;
    } catch (error) {
      logger.error('Error during partial analysis:', error);
      throw error;
    }
  }

  /**
   * Get project information
   * @param projectPath Path to the project
   * @returns Project information
   */
  private async getProjectInfo(projectPath: string): Promise<ProjectInfo> {
    // Get basic project info from the project analyzer
    const { ProjectAnalyzer } = await import('./project-analyzer');
    const projectAnalyzer = new ProjectAnalyzer(this.configManager);
    return await projectAnalyzer.getProjectInfo(projectPath);
  }

  /**
   * Generate recommendations based on analysis results
   * @param scanResult The scan result to generate recommendations for
   * @param projectPath Path to the project
   * @returns Array of recommendations
   */
  private async generateRecommendations(scanResult: CodebaseScanResult, projectPath: string) {
    const recommendations = [];
    const issues = scanResult.issues;

    // Generate recommendations based on different types of issues
    for (const issue of issues) {
      recommendations.push({
        id: `rec_${issue.id}`,
        issueId: issue.id,
        title: `Fix: ${issue.message}`,
        description: issue.message,
        implementationSteps: [issue.recommendation],
        estimatedEffort: this.estimateEffort(issue.severity) as 'minutes' | 'hours' | 'days',
        riskLevel: this.estimateRiskLevel(issue.severity) as 'low' | 'medium' | 'high',
        relatedFiles: [issue.filePath]
      });
    }

    // Add additional recommendations based on overall metrics
    const qualityMetrics = await this.getQualityMetrics(projectPath);
    if (qualityMetrics.overallQualityScore < 70) {
      recommendations.push({
        id: `rec_quality_improvement_${Date.now()}`,
        issueId: 'quality-score-low',
        title: 'Improve overall code quality',
        description: `Current quality score is ${qualityMetrics.overallQualityScore}/100, which is below recommended threshold`,
        implementationSteps: [
          'Review and fix ESLint issues',
          'Simplify complex functions',
          'Improve test coverage',
          'Refactor large files'
        ],
        estimatedEffort: 'days',
        riskLevel: 'low',
        relatedFiles: []
      });
    }

    // Add dependency-related recommendations
    const dependencyAnalyzer = new DependencyAnalyzer(this.configManager);
    const dependencyIssues = await dependencyAnalyzer.identifyDependencyIssues(projectPath);
    for (const issue of dependencyIssues) {
      recommendations.push({
        id: `rec_dep_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`,
        issueId: 'dependency-issue',
        title: 'Address dependency issues',
        description: issue,
        implementationSteps: ['Review and update dependencies as recommended'],
        estimatedEffort: 'hours',
        riskLevel: 'medium',
        relatedFiles: ['package.json']
      });
    }

    return recommendations;
  }

  /**
   * Create an executive summary based on the analysis report
   * @param report The analysis report
   * @returns Executive summary
   */
  private async createExecutiveSummary(report: AnalysisReport): Promise<string> {
    const summary = report.scanResults.summary;
    const projectInfo = report.projectInfo;

    let execSummary = `# Executive Summary\n\n`;
    execSummary += `## Project Overview\n`;
    execSummary += `- **Project**: ${projectInfo.name}\n`;
    execSummary += `- **Description**: ${projectInfo.description || 'No description provided'}\n`;
    execSummary += `- **Technologies**: ${projectInfo.technologies.slice(0, 5).join(', ')}\n`;
    execSummary += `- **Total Files**: ${summary.totalFiles}\n`;
    execSummary += `- **Lines of Code**: ${projectInfo.totalLinesOfCode}\n\n`;

    execSummary += `## Analysis Results\n`;
    execSummary += `- **Issues Found**: ${summary.totalIssues}\n`;
    execSummary += `  - Critical: ${summary.criticalIssues}\n`;
    execSummary += `  - High: ${summary.highSeverityIssues}\n`;
    execSummary += `  - Medium: ${summary.mediumSeverityIssues}\n`;
    execSummary += `  - Low: ${summary.lowSeverityIssues}\n\n`;

    execSummary += `## Health Assessment\n`;
    const healthScore = await this.mainAnalyzerService.getHealthScore(report.scanResults.projectPath);
    execSummary += `- **Overall Health Score**: ${healthScore}/100\n`;
    execSummary += `- **Status**: ${this.getHealthStatus(healthScore)}\n\n`;

    execSummary += `## Key Recommendations\n`;
    execSummary += `Based on the analysis, we recommend addressing the most critical issues first. ${report.recommendations.length} recommendations have been generated to improve the codebase quality.\n\n`;

    execSummary += `## Next Steps\n`;
    execSummary += `1. Prioritize fixing critical and high severity issues\n`;
    execSummary += `2. Review and implement the generated recommendations\n`;
    execSummary += `3. Re-run analysis after implementing changes to verify improvements\n`;

    return execSummary;
  }

  /**
   * Get quality metrics for a project
   * @param projectPath Path to the project
   * @returns Quality metrics
   */
  private async getQualityMetrics(projectPath: string) {
    const qualityMetricsCalculator = new QualityMetricsCalculator(this.configManager);
    return await qualityMetricsCalculator.calculate(projectPath);
  }

  /**
   * Estimate effort level based on issue severity
   * @param severity Issue severity
   * @returns Estimated effort level
   */
  private estimateEffort(severity: string): 'minutes' | 'hours' | 'days' {
    switch (severity) {
      case 'error':
        return 'hours';
      case 'warning':
        return 'minutes';
      case 'info':
        return 'minutes';
      default:
        return 'minutes';
    }
  }

  /**
   * Estimate risk level based on issue severity
   * @param severity Issue severity
   * @returns Risk level
   */
  private estimateRiskLevel(severity: string): 'low' | 'medium' | 'high' {
    switch (severity) {
      case 'error':
        return 'high';
      case 'warning':
        return 'medium';
      case 'info':
        return 'low';
      default:
        return 'low';
    }
  }

  /**
   * Get health status based on score
   * @param score Health score
   * @returns Health status description
   */
  private getHealthStatus(score: number): string {
    if (score >= 80) return 'Good';
    if (score >= 60) return 'Fair';
    if (score >= 40) return 'Poor';
    return 'Critical';
  }
}