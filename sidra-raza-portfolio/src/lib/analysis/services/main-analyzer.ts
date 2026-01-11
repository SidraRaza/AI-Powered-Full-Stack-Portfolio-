import { ConfigManager } from '../config';
import { FileStructureAnalyzer } from '../modules/file-structure-analyzer';
import { TechStackDetector } from '../modules/tech-stack-detector';
import { DependencyAnalyzer } from '../modules/dependency-analyzer';
import { QualityMetricsCalculator } from '../modules/quality-metrics-calculator';
import { PerformanceAnalyzer } from '../modules/performance-analyzer';
import { CodebaseScanResult, ProjectInfo, ScanSummary } from '../types';
import { logger } from '../utils/logger';

/**
 * Main analyzer service that orchestrates all analysis modules
 */
export class MainAnalyzerService {
  private configManager: ConfigManager;
  private fileStructureAnalyzer: FileStructureAnalyzer;
  private techStackDetector: TechStackDetector;
  private dependencyAnalyzer: DependencyAnalyzer;
  private qualityMetricsCalculator: QualityMetricsCalculator;
  private performanceAnalyzer: PerformanceAnalyzer;

  constructor(configManager: ConfigManager) {
    this.configManager = configManager;
    this.fileStructureAnalyzer = new FileStructureAnalyzer(configManager);
    this.techStackDetector = new TechStackDetector(configManager);
    this.dependencyAnalyzer = new DependencyAnalyzer(configManager);
    this.qualityMetricsCalculator = new QualityMetricsCalculator(configManager);
    this.performanceAnalyzer = new PerformanceAnalyzer(configManager);
  }

  /**
   * Perform comprehensive analysis of the project
   * @param projectPath Path to the project to analyze
   * @returns Complete analysis result
   */
  async analyzeProject(projectPath: string): Promise<CodebaseScanResult> {
    const startTime = Date.now();
    logger.info('Starting comprehensive project analysis...');

    // Get basic project information
    logger.info('Gathering basic project information...');
    const projectInfo = await this.getProjectInfo(projectPath);

    // Run all analysis modules in parallel where possible
    logger.info('Running analysis modules...');

    const [
      fileStructureResult,
      techStackResult,
      dependencyResult,
      qualityMetricsResult,
      performanceIssues
    ] = await Promise.all([
      this.fileStructureAnalyzer.analyze(projectPath),
      this.techStackDetector.detect(projectPath),
      this.dependencyAnalyzer.analyze(projectPath),
      this.qualityMetricsCalculator.calculate(projectPath),
      this.performanceAnalyzer.analyze(projectPath)
    ]);

    // Combine all issues from different analyzers
    const allIssues = [
      ...qualityMetricsResult.eslintIssues,
      ...performanceIssues
    ];

    // Calculate summary statistics
    const scanSummary: ScanSummary = {
      totalFiles: fileStructureResult.totalFiles,
      analyzedFiles: fileStructureResult.totalFiles, // For now, assume all files were analyzed
      skippedFiles: 0,
      totalIssues: allIssues.length,
      criticalIssues: allIssues.filter(i => i.severity === 'error').length,
      highSeverityIssues: allIssues.filter(i => i.severity === 'warning').length,
      mediumSeverityIssues: 0, // Placeholder for now
      lowSeverityIssues: allIssues.filter(i => i.severity === 'info').length,
      scanTimeMs: Date.now() - startTime
    };

    // Create the scan result
    const result: CodebaseScanResult = {
      id: `full-scan_${Date.now()}`,
      timestamp: new Date(),
      projectPath,
      totalFiles: fileStructureResult.totalFiles,
      fileTypes: fileStructureResult.fileExtensions ? new Map(Object.entries(fileStructureResult.fileExtensions)) : new Map<string, number>(),
      totalSize: fileStructureResult.totalSize,
      scanDuration: Date.now() - startTime,
      issues: allIssues,
      summary: scanSummary
    };

    logger.info(`Analysis completed in ${(result.scanDuration / 1000).toFixed(2)} seconds`);
    logger.logSummary(scanSummary);

    return result;
  }

  /**
   * Get project information by combining data from multiple sources
   * @param projectPath Path to the project
   * @returns Project information
   */
  private async getProjectInfo(projectPath: string): Promise<ProjectInfo> {
    // Create a basic project info object since getProjectInfo is private
    const basicInfo: ProjectInfo = {
      name: projectPath.split('/').pop()?.split('\\').pop() || 'Unknown Project',
      version: '1.0.0',
      description: 'Project analysis result',
      technologies: await this.techStackDetector.detect(projectPath),
      dependencies: await this.dependencyAnalyzer.analyze(projectPath),
      totalLinesOfCode: 0
    };

    return basicInfo;
  }

  /**
   * Run a specific type of analysis
   * @param projectPath Path to the project
   * @param analysisType Type of analysis to run
   * @returns Analysis result
   */
  async runSpecificAnalysis(projectPath: string, analysisType: 'structure' | 'techstack' | 'dependencies' | 'quality' | 'performance') {
    switch (analysisType) {
      case 'structure':
        logger.info('Running file structure analysis...');
        return await this.fileStructureAnalyzer.analyze(projectPath);
      case 'techstack':
        logger.info('Running technology stack analysis...');
        return await this.techStackDetector.detect(projectPath);
      case 'dependencies':
        logger.info('Running dependency analysis...');
        return await this.dependencyAnalyzer.analyze(projectPath);
      case 'quality':
        logger.info('Running code quality analysis...');
        return await this.qualityMetricsCalculator.calculate(projectPath);
      case 'performance':
        logger.info('Running performance analysis...');
        return await this.performanceAnalyzer.analyze(projectPath);
      default:
        throw new Error(`Unknown analysis type: ${analysisType}`);
    }
  }

  /**
   * Get health score for the project based on all analysis modules
   * @param projectPath Path to the project
   * @returns Health score (0-100)
   */
  async getHealthScore(projectPath: string): Promise<number> {
    logger.info('Calculating project health score...');

    try {
      // Get results from relevant analyzers
      const qualityMetrics = await this.qualityMetricsCalculator.calculate(projectPath);
      const dependencyReport = await this.dependencyAnalyzer.generateDependencyReport(projectPath);

      // Calculate a composite health score
      // Weight different factors: quality (40%), dependencies (30%), performance (20%), structure (10%)
      const qualityWeight = 0.4;
      const dependencyWeight = 0.3;
      const performanceWeight = 0.2;
      const structureWeight = 0.1;

      // Get performance issues to calculate score
      const perfIssues = await this.performanceAnalyzer.analyze(projectPath);
      const weightedScore =
        (qualityMetrics.overallQualityScore * qualityWeight) +
        (dependencyReport.dependencyHealthScore * dependencyWeight) +
        // For performance, we'll use a simple calculation based on issues found
        ((100 - Math.min(perfIssues.length, 100)) * performanceWeight) +
        (85 * structureWeight); // Assume decent structure score by default

      logger.info(`Project health score: ${Math.round(weightedScore)}/100`);
      return Math.round(weightedScore);
    } catch (error) {
      logger.error('Could not calculate health score:', error);
      return 50; // Return neutral score if calculation fails
    }
  }
}