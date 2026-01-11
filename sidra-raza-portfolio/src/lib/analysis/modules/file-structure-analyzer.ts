import * as path from 'path';
import * as fs from 'fs-extra';
import { FileTraversalUtil } from '../utils/file-traversal';
import { ConfigManager } from '../config';

/**
 * Analyzes the file structure of a project
 */
export class FileStructureAnalyzer {
  private configManager: ConfigManager;

  constructor(configManager: ConfigManager) {
    this.configManager = configManager;
  }

  /**
   * Analyze the file structure of a project
   * @param projectPath Path to the project to analyze
   * @returns Object containing file structure information
   */
  async analyze(projectPath: string) {
    const structure = await FileTraversalUtil.getDirectoryStructure(projectPath);

    // Count files by directory
    const filesByDir: { [dir: string]: string[] } = {};
    for (const file of structure.files) {
      const dir = path.dirname(file);
      if (!filesByDir[dir]) {
        filesByDir[dir] = [];
      }
      filesByDir[dir].push(path.basename(file));
    }

    // Identify potential architectural patterns based on directory structure
    const architecturalPatterns = this.identifyArchitecturalPatterns(filesByDir);

    // Calculate depth statistics
    const depthStats = this.calculateDepthStats(structure.directories);

    return {
      totalFiles: structure.files.length,
      totalDirectories: structure.directories.length,
      totalSize: structure.totalSize,
      filesByDirectory: filesByDir,
      directoryDepth: depthStats,
      architecturalPatterns,
      largestDirectories: this.getLargestDirectories(filesByDir, 5),
      fileExtensions: this.getFileExtensions(structure.files)
    };
  }

  /**
   * Identify potential architectural patterns based on directory structure
   * @param filesByDir Files organized by directory
   * @returns Array of identified architectural patterns
   */
  private identifyArchitecturalPatterns(filesByDir: { [dir: string]: string[] }): string[] {
    const patterns: string[] = [];

    // Check for common architectural patterns
    const dirs = Object.keys(filesByDir);

    // Check for layered architecture (e.g., MVC)
    if (dirs.some(dir => dir.toLowerCase().includes('controller') || dir.toLowerCase().includes('controllers'))) {
      patterns.push('MVC/Layered Architecture');
    }

    if (dirs.some(dir => dir.toLowerCase().includes('component') || dir.toLowerCase().includes('components'))) {
      patterns.push('Component-Based Architecture');
    }

    if (dirs.some(dir => dir.toLowerCase().includes('service') || dir.toLowerCase().includes('services'))) {
      patterns.push('Service-Oriented Architecture');
    }

    if (dirs.some(dir => dir.toLowerCase().includes('model') || dir.toLowerCase().includes('models'))) {
      patterns.push('Model-View Architecture');
    }

    if (dirs.some(dir => dir.toLowerCase().includes('api') || dir.toLowerCase().includes('routes'))) {
      patterns.push('API-First Architecture');
    }

    if (dirs.some(dir => dir.toLowerCase().includes('test') || dir.toLowerCase().includes('spec'))) {
      patterns.push('Test-Driven Development Pattern');
    }

    // Check for monorepo patterns
    if (dirs.some(dir => dir.toLowerCase().includes('packages') || dir.toLowerCase().includes('apps'))) {
      patterns.push('Monorepo Structure');
    }

    return patterns;
  }

  /**
   * Calculate directory depth statistics
   * @param directories List of directory paths
   * @returns Depth statistics
   */
  private calculateDepthStats(directories: string[]): {
    maxDepth: number;
    avgDepth: number;
    deepestPaths: string[]
  } {
    if (directories.length === 0) {
      return { maxDepth: 0, avgDepth: 0, deepestPaths: [] };
    }

    const depths = directories.map(dir => dir.split(path.sep).length);
    const maxDepth = Math.max(...depths);
    const avgDepth = depths.reduce((sum, depth) => sum + depth, 0) / depths.length;

    const deepestPaths = directories.filter(dir => dir.split(path.sep).length === maxDepth);

    return { maxDepth, avgDepth, deepestPaths };
  }

  /**
   * Get the directories with the most files
   * @param filesByDir Files organized by directory
   * @param count Number of directories to return
   * @returns Array of directories with the most files
   */
  private getLargestDirectories(filesByDir: { [dir: string]: string[] }, count: number): { directory: string; fileCount: number }[] {
    const dirCounts = Object.entries(filesByDir)
      .map(([dir, files]) => ({ directory: dir, fileCount: files.length }))
      .sort((a, b) => b.fileCount - a.fileCount);

    return dirCounts.slice(0, count);
  }

  /**
   * Get file extensions and their counts
   * @param filePaths Array of file paths
   * @returns Object mapping extensions to their counts
   */
  private getFileExtensions(filePaths: string[]): { [ext: string]: number } {
    const extCounts: { [ext: string]: number } = {};

    for (const filePath of filePaths) {
      const ext = path.extname(filePath).toLowerCase() || 'no-extension';
      extCounts[ext] = (extCounts[ext] || 0) + 1;
    }

    return extCounts;
  }

  /**
   * Identify potential structural issues
   * @param projectPath Path to the project to analyze
   * @returns Array of structural issues
   */
  async identifyStructuralIssues(projectPath: string): Promise<string[]> {
    const issues: string[] = [];
    const structure = await FileTraversalUtil.getDirectoryStructure(projectPath);

    // Check for extremely deep nesting
    const depthStats = this.calculateDepthStats(structure.directories);
    if (depthStats.maxDepth > 10) {
      issues.push(`Deep directory nesting detected (max depth: ${depthStats.maxDepth}). Consider flattening the structure.`);
    }

    // Check for directories with too many files
    const filesByDir = await this.getFilesByDirectory(projectPath);
    for (const [dir, files] of Object.entries(filesByDir)) {
      if (files.length > 100) {
        issues.push(`Directory '${dir}' has ${files.length} files. Consider organizing into subdirectories.`);
      }
    }

    // Check for common anti-patterns
    if (structure.files.some(file => file.toLowerCase().includes('temp') || file.toLowerCase().includes('tmp'))) {
      issues.push("Temporary files detected in the codebase. These should be added to .gitignore.");
    }

    // Check for configuration sprawl
    const configFiles = structure.files.filter(file =>
      file.toLowerCase().includes('config') ||
      file.endsWith('.env') ||
      file.endsWith('.env.local')
    );
    if (configFiles.length > 10) {
      issues.push(`High number of configuration files (${configFiles.length}) detected. Consider consolidating.`);
    }

    return issues;
  }

  /**
   * Get files organized by directory
   * @param projectPath Path to the project
   * @returns Object mapping directories to arrays of files
   */
  private async getFilesByDirectory(projectPath: string) {
    const structure = await FileTraversalUtil.getDirectoryStructure(projectPath);

    const filesByDir: { [dir: string]: string[] } = {};
    for (const file of structure.files) {
      const dir = path.dirname(file);
      if (!filesByDir[dir]) {
        filesByDir[dir] = [];
      }
      filesByDir[dir].push(path.basename(file));
    }

    return filesByDir;
  }
}