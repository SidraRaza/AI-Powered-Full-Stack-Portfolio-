import * as path from 'path';
import * as fs from 'fs-extra';
import { ESLint } from 'eslint';
import { FileTraversalUtil } from '../utils/file-traversal';
import { ConfigManager } from '../config';
import { Issue } from '../types';

/**
 * Calculates code quality metrics for a project
 */
export class QualityMetricsCalculator {
  private configManager: ConfigManager;
  private eslint: ESLint | null = null;

  constructor(configManager: ConfigManager) {
    this.configManager = configManager;

    // Initialize ESLint if available
    try {
      this.eslint = new ESLint({
        cwd: process.cwd(),
        useEslintrc: true,
        extensions: ['.js', '.ts', '.jsx', '.tsx'],
        overrideConfig: {
          parser: '@typescript-eslint/parser',
          plugins: ['@typescript-eslint'],
          extends: ['eslint:recommended', '@typescript-eslint/recommended'],
        },
      });
    } catch (error) {
      console.warn('ESLint not available, skipping advanced code quality analysis:', error);
    }
  }

  /**
   * Calculate quality metrics for the project
   * @param projectPath Path to the project to analyze
   * @returns Quality metrics and issues
   */
  async calculate(projectPath: string) {
    // Get all relevant files
    const jsTsFiles = await FileTraversalUtil.collectFilesByExtension(projectPath, ['.js', '.ts', '.jsx', '.tsx']);

    // Calculate basic metrics
    const basicMetrics = await this.calculateBasicMetrics(jsTsFiles);

    // Run ESLint analysis if available
    const eslintIssues: Issue[] = [];
    if (this.eslint) {
      eslintIssues.push(...await this.runESLintAnalysis(jsTsFiles));
    }

    // Calculate cyclomatic complexity and other advanced metrics
    const advancedMetrics = await this.calculateAdvancedMetrics(jsTsFiles);

    return {
      basicMetrics,
      eslintIssues,
      advancedMetrics,
      overallQualityScore: this.calculateOverallScore(basicMetrics, advancedMetrics)
    };
  }

  /**
   * Calculate basic quality metrics
   * @param filePaths Array of file paths to analyze
   * @returns Basic quality metrics
   */
  private async calculateBasicMetrics(filePaths: string[]): Promise<{
    totalFiles: number;
    totalLines: number;
    averageLinesPerFile: number;
    totalCharacters: number;
    duplicateFiles: string[];
    deeplyNestedFiles: string[];
    fileSizes: { filePath: string; size: number }[];
  }> {
    let totalLines = 0;
    let totalCharacters = 0;
    const fileSizes: { filePath: string; size: number }[] = [];
    const duplicateFiles: string[] = [];

    // Track deeply nested files (> 5 levels)
    const deeplyNestedFiles: string[] = [];

    for (const filePath of filePaths) {
      try {
        const content = await fs.readFile(filePath, 'utf8');
        const lines = content.split('\n');

        totalLines += lines.length;
        totalCharacters += content.length;

        // Check file size
        const stats = await fs.stat(filePath);
        fileSizes.push({ filePath, size: stats.size });

        // Check for deep nesting
        const pathParts = filePath.split(path.sep);
        if (pathParts.length > 5) {
          deeplyNestedFiles.push(filePath);
        }
      } catch (error) {
        console.warn(`Could not read file for metrics: ${filePath}`, error);
      }
    }

    return {
      totalFiles: filePaths.length,
      totalLines,
      averageLinesPerFile: filePaths.length > 0 ? Math.round(totalLines / filePaths.length) : 0,
      totalCharacters,
      duplicateFiles,
      deeplyNestedFiles,
      fileSizes
    };
  }

  /**
   * Run ESLint analysis on files
   * @param filePaths Array of file paths to analyze
   * @returns Array of ESLint issues
   */
  private async runESLintAnalysis(filePaths: string[]): Promise<Issue[]> {
    if (!this.eslint) {
      return [];
    }

    const issues: Issue[] = [];

    try {
      // Run ESLint on all files
      const results = await this.eslint.lintFiles(filePaths);

      // Process results
      for (const result of results) {
        for (const message of result.messages) {
          issues.push({
            id: `eslint-${result.filePath}-${message.ruleId || 'unknown'}`,
            ruleId: message.ruleId || 'unknown',
            severity: message.severity === 2 ? 'error' : 'warning',
            message: message.message,
            filePath: result.filePath,
            line: message.line,
            column: message.column,
            codeSnippet: message.message, // ESLint doesn't provide snippets directly
            category: 'quality',
            recommendation: `Fix the ${message.ruleId || 'issue'} in this code`,
            confidence: 90 // ESLint provides high confidence
          });
        }
      }
    } catch (error) {
      console.warn('Could not run ESLint analysis:', error);
    }

    return issues;
  }

  /**
   * Calculate advanced quality metrics
   * @param filePaths Array of file paths to analyze
   * @returns Advanced quality metrics
   */
  private async calculateAdvancedMetrics(filePaths: string[]): Promise<{
    averageCyclomaticComplexity: number;
    functionsPerFile: number;
    deeplyNestedBlocks: number;
    longParameterLists: number;
    largeFiles: string[];
    magicNumbers: number;
    duplicatedCodeBlocks: number;
    cognitiveComplexity: number;
  }> {
    let totalComplexity = 0;
    let totalFunctions = 0;
    let deeplyNestedBlocks = 0;
    let longParameterLists = 0;
    let magicNumbers = 0;
    let totalCognitiveComplexity = 0;
    const largeFiles: string[] = [];

    for (const filePath of filePaths) {
      try {
        const content = await fs.readFile(filePath, 'utf8');

        // Estimate cyclomatic complexity by counting control flow statements
        const complexity = this.estimateCyclomaticComplexity(content);
        totalComplexity += complexity;

        // Count functions
        const functions = this.countFunctions(content);
        totalFunctions += functions;

        // Check for deeply nested blocks (more than 3 levels)
        const nestedBlocks = this.countDeeplyNestedBlocks(content);
        deeplyNestedBlocks += nestedBlocks;

        // Check for functions with too many parameters (> 5)
        const params = this.countLongParameterLists(content);
        longParameterLists += params;

        // Check for magic numbers
        const magicNums = this.countMagicNumbers(content);
        magicNumbers += magicNums;

        // Estimate cognitive complexity
        const cognitiveComplexity = this.estimateCognitiveComplexity(content);
        totalCognitiveComplexity += cognitiveComplexity;

        // Track large files (> 500 lines)
        const lines = content.split('\n');
        if (lines.length > 500) {
          largeFiles.push(filePath);
        }
      } catch (error) {
        console.warn(`Could not analyze file for advanced metrics: ${filePath}`, error);
      }
    }

    return {
      averageCyclomaticComplexity: filePaths.length > 0 ? totalComplexity / filePaths.length : 0,
      functionsPerFile: filePaths.length > 0 ? totalFunctions / filePaths.length : 0,
      deeplyNestedBlocks,
      longParameterLists,
      largeFiles,
      magicNumbers,
      duplicatedCodeBlocks: 0, // Placeholder - would need more sophisticated analysis
      cognitiveComplexity: filePaths.length > 0 ? totalCognitiveComplexity / filePaths.length : 0
    };
  }

  /**
   * Estimate cyclomatic complexity by counting control flow statements
   * @param content File content
   * @returns Estimated cyclomatic complexity
   */
  private estimateCyclomaticComplexity(content: string): number {
    // Base complexity is 1
    let complexity = 1;

    // Count control flow statements
    const controlFlowRegex = /\b(if|else|elif|for|while|switch|case|try|catch|finally|&&|\|\||\?|:)\b/g;
    const matches = content.match(controlFlowRegex);

    if (matches) {
      complexity += matches.length;
    }

    return complexity;
  }

  /**
   * Count the number of functions in the code
   * @param content File content
   * @returns Number of functions
   */
  private countFunctions(content: string): number {
    // Count function declarations, expressions, and arrow functions
    const funcRegex = /\b(function\s+\w+|const\s+\w+\s*=.*=>|let\s+\w+\s*=.*=>|var\s+\w+\s*=.*=>|^\s*\w+\s*[:]\s*\([^)]*\)\s*=>)/gm;
    const matches = content.match(funcRegex);
    return matches ? matches.length : 0;
  }

  /**
   * Count deeply nested blocks (more than 3 levels)
   * @param content File content
   * @returns Number of deeply nested blocks
   */
  private countDeeplyNestedBlocks(content: string): number {
    let maxDepth = 0;
    let currentDepth = 0;

    for (const char of content) {
      if (char === '{' || char === '[' || char === '(') {
        currentDepth++;
        maxDepth = Math.max(maxDepth, currentDepth);
      } else if (char === '}' || char === ']' || char === ')') {
        currentDepth--;
      }
    }

    // Return 1 if max depth is greater than 3, 0 otherwise
    return maxDepth > 3 ? 1 : 0;
  }

  /**
   * Count functions with long parameter lists (> 5 parameters)
   * @param content File content
   * @returns Number of functions with long parameter lists
   */
  private countLongParameterLists(content: string): number {
    // Match function definitions and count parameters
    const funcParamRegex = /\b(?:function\s+\w+\s*\(|\w+\s*[:]\s*\(|const\s+\w+\s*=\s*\(|\(\w+\s*,?\s*\)+\s*=>)/g;
    let match;
    let count = 0;

    while ((match = funcParamRegex.exec(content)) !== null) {
      // This is a simplified approach - a full parser would be more accurate
      const funcMatch = match[0];
      if (funcMatch.includes('(') && funcMatch.includes(')')) {
        const paramsPart = funcMatch.substring(funcMatch.indexOf('(') + 1, funcMatch.lastIndexOf(')'));
        const paramCount = paramsPart.split(',').length;
        if (paramCount > 5) {
          count++;
        }
      }
    }

    return count;
  }

  /**
   * Count magic numbers in the code
   * @param content File content
   * @returns Number of magic numbers
   */
  private countMagicNumbers(content: string): number {
    // Match numeric literals that are not part of common patterns
    const magicNumberRegex = /(?<![\w.])[-+]?(?:0|[1-9][0-9]*)(?:\.[0-9]+)?(?:[eE][-+]?[0-9]+)?(?!\w)/g;
    const matches = content.match(magicNumberRegex);

    if (!matches) return 0;

    // Filter out common legitimate numbers (0, 1, 2, etc. in certain contexts)
    const filteredMatches = matches.filter(num => {
      const numValue = parseFloat(num);
      // Exclude common loop counters and array indices
      return !(numValue === 0 || numValue === 1 || numValue === 2 || numValue === 10 || numValue === 100);
    });

    return filteredMatches.length;
  }

  /**
   * Estimate cognitive complexity of the code
   * @param content File content
   * @returns Estimated cognitive complexity
   */
  private estimateCognitiveComplexity(content: string): number {
    let complexity = 0;

    // Count nesting levels and breaks in linear flow
    const lines = content.split('\n');
    for (const line of lines) {
      // Increase complexity for nested control structures
      if (/\b(if|else|for|while|switch|try|catch|finally)\b/.test(line)) {
        complexity += 1;
      }

      // Increase complexity for boolean operators that break linear flow
      if (/(?:&&|\|\|)/.test(line)) {
        complexity += 1;
      }
    }

    return complexity;
  }

  /**
   * Calculate overall quality score based on metrics
   * @param basicMetrics Basic quality metrics
   * @param advancedMetrics Advanced quality metrics
   * @returns Overall quality score (0-100)
   */
  private calculateOverallScore(
    basicMetrics: any,
    advancedMetrics: any
  ): number {
    let score = 100;

    // Penalize for large average file sizes
    if (basicMetrics.averageLinesPerFile > 200) {
      score -= 20;
    } else if (basicMetrics.averageLinesPerFile > 100) {
      score -= 10;
    }

    // Penalize for deeply nested files
    if (basicMetrics.deeplyNestedFiles.length > 0) {
      score -= basicMetrics.deeplyNestedFiles.length * 2;
    }

    // Penalize for high cyclomatic complexity
    if (advancedMetrics.averageCyclomaticComplexity > 10) {
      score -= 15;
    } else if (advancedMetrics.averageCyclomaticComplexity > 5) {
      score -= 5;
    }

    // Penalize for large files
    if (advancedMetrics.largeFiles.length > 0) {
      score -= advancedMetrics.largeFiles.length * 3;
    }

    // Penalize for magic numbers
    if (advancedMetrics.magicNumbers > 0) {
      score -= Math.min(advancedMetrics.magicNumbers, 20); // Cap penalty
    }

    // Penalize for deeply nested blocks
    if (advancedMetrics.deeplyNestedBlocks > 0) {
      score -= advancedMetrics.deeplyNestedBlocks * 2;
    }

    return Math.max(0, Math.round(score));
  }

  /**
   * Identify potential code quality issues
   * @param projectPath Path to the project
   * @returns Array of quality issues
   */
  async identifyQualityIssues(projectPath: string): Promise<string[]> {
    const issues: string[] = [];

    try {
      const jsTsFiles = await FileTraversalUtil.collectFilesByExtension(projectPath, ['.js', '.ts', '.jsx', '.tsx']);
      const metrics = await this.calculate(projectPath);

      // Check for files that are too large
      if (metrics.advancedMetrics.largeFiles.length > 0) {
        issues.push(`${metrics.advancedMetrics.largeFiles.length} files are too large (>500 lines). Consider breaking them up.`);
      }

      // Check for high cyclomatic complexity
      if (metrics.advancedMetrics.averageCyclomaticComplexity > 10) {
        issues.push(`Average cyclomatic complexity is high (${metrics.advancedMetrics.averageCyclomaticComplexity.toFixed(2)}). Consider simplifying functions.`);
      }

      // Check for deeply nested blocks
      if (metrics.advancedMetrics.deeplyNestedBlocks > 0) {
        issues.push(`Found ${metrics.advancedMetrics.deeplyNestedBlocks} deeply nested code blocks. Consider refactoring for clarity.`);
      }

      // Check for magic numbers
      if (metrics.advancedMetrics.magicNumbers > 0) {
        issues.push(`Found ${metrics.advancedMetrics.magicNumbers} potential magic numbers. Consider using constants.`);
      }

      // Check for long parameter lists
      if (metrics.advancedMetrics.longParameterLists > 0) {
        issues.push(`Found functions with too many parameters. Consider using objects or reducing complexity.`);
      }

      // Check for deeply nested directory structure
      if (metrics.basicMetrics.deeplyNestedFiles.length > 0) {
        issues.push(`Found ${metrics.basicMetrics.deeplyNestedFiles.length} files in deeply nested directories. Consider reorganizing.`);
      }

    } catch (error) {
      console.warn('Could not identify quality issues:', error);
    }

    return issues;
  }
}