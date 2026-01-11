import * as fs from 'fs-extra';
import * as path from 'path';
import { FileTraversalUtil } from '../utils/file-traversal';
import { ConfigManager } from '../config';
import { Issue } from '../types';

/**
 * Analyzes code for performance bottlenecks and optimization opportunities
 */
export class PerformanceAnalyzer {
  private configManager: ConfigManager;

  constructor(configManager: ConfigManager) {
    this.configManager = configManager;
  }

  /**
   * Analyze files for performance bottlenecks
   * @param projectPath Path to the project to analyze
   * @returns Array of performance issues and optimization opportunities
   */
  async analyze(projectPath: string): Promise<Issue[]> {
    const issues: Issue[] = [];

    // Get all relevant files
    const files = await FileTraversalUtil.collectFilesByExtension(projectPath, ['.js', '.ts', '.jsx', '.tsx', '.py', '.java', '.go', '.cs']);

    for (const filePath of files) {
      try {
        const content = await fs.readFile(filePath, 'utf8');
        const fileIssues = await this.analyzeFileForPerformanceIssues(filePath, content);
        issues.push(...fileIssues);
      } catch (error) {
        console.warn(`Could not analyze file for performance issues: ${filePath}`, error);
      }
    }

    return issues;
  }

  /**
   * Analyze a single file for performance issues
   * @param filePath Path to the file
   * @param content File content
   * @returns Array of performance issues found in the file
   */
  private async analyzeFileForPerformanceIssues(filePath: string, content: string): Promise<Issue[]> {
    const issues: Issue[] = [];

    // Check for inefficient loops and operations
    issues.push(...this.findInefficientLoops(content, filePath));

    // Check for potential memory leaks
    issues.push(...this.findPotentialMemoryLeaks(content, filePath));

    // Check for blocking operations
    issues.push(...this.findBlockingOperations(content, filePath));

    // Check for inefficient data structures
    issues.push(...this.findInefficientDataStructures(content, filePath));

    // Check for API call patterns that could be optimized
    issues.push(...this.findInefficientAPIPatterns(content, filePath));

    // Check for unnecessary computations
    issues.push(...this.findUnnecessaryComputations(content, filePath));

    return issues;
  }

  /**
   * Find inefficient loops and operations
   * @param content File content
   * @param filePath Path to the file
   * @returns Array of performance issues related to loops
   */
  private findInefficientLoops(content: string, filePath: string): Issue[] {
    const issues: Issue[] = [];
    const lines = content.split('\n');

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      const lineNumber = i + 1;

      // Check for nested loops that could be optimized
      if ((line.match(/for\s*\(/g) || []).length > 1) {
        issues.push({
          id: `perf-nested-loops-${filePath}-${lineNumber}`,
          ruleId: 'nested-loops',
          severity: 'warning',
          message: 'Multiple nested loops detected, consider optimization',
          filePath,
          line: lineNumber,
          column: line.indexOf('for'),
          codeSnippet: line.trim(),
          category: 'performance',
          recommendation: 'Consider using more efficient algorithms or data structures to reduce time complexity',
          confidence: 70
        });
      }

      // Check for inefficient array operations inside loops
      if (line.includes('for') && (line.includes('.indexOf(') || line.includes('.includes(') || line.includes('.find('))) {
        issues.push({
          id: `perf-inefficient-array-op-${filePath}-${lineNumber}`,
          ruleId: 'inefficient-array-op',
          severity: 'warning',
          message: 'Inefficient array operation inside loop detected',
          filePath,
          line: lineNumber,
          column: 0,
          codeSnippet: line.trim(),
          category: 'performance',
          recommendation: 'Consider using Set or Map for O(1) lookups instead of O(n) array operations',
          confidence: 80
        });
      }

      // Check for string concatenation in loops
      if (line.includes('for') && (line.includes('+') || line.includes('+=') && line.includes('string'))) {
        issues.push({
          id: `perf-string-concat-${filePath}-${lineNumber}`,
          ruleId: 'string-concat-in-loop',
          severity: 'warning',
          message: 'String concatenation in loop detected',
          filePath,
          line: lineNumber,
          column: 0,
          codeSnippet: line.trim(),
          category: 'performance',
          recommendation: 'Use array.join() or template literals for better performance',
          confidence: 75
        });
      }
    }

    return issues;
  }

  /**
   * Find potential memory leaks
   * @param content File content
   * @param filePath Path to the file
   * @returns Array of potential memory leak issues
   */
  private findPotentialMemoryLeaks(content: string, filePath: string): Issue[] {
    const issues: Issue[] = [];
    const lines = content.split('\n');

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      const lineNumber = i + 1;

      // Check for event listeners that might not be removed
      if (line.includes('.addEventListener(') && !line.includes('.removeEventListener(')) {
        issues.push({
          id: `perf-event-listener-leak-${filePath}-${lineNumber}`,
          ruleId: 'event-listener-leak',
          severity: 'warning',
          message: 'Event listener without corresponding removal detected',
          filePath,
          line: lineNumber,
          column: line.indexOf('.addEventListener'),
          codeSnippet: line.trim(),
          category: 'performance',
          recommendation: 'Ensure event listeners are properly removed to prevent memory leaks',
          confidence: 85
        });
      }

      // Check for closures that might retain large objects
      if (line.includes('function') && (line.includes('=>') || line.includes('function(')) && line.includes('this')) {
        issues.push({
          id: `perf-closure-leak-${filePath}-${lineNumber}`,
          ruleId: 'closure-leak',
          severity: 'warning',
          message: 'Potential closure memory leak detected',
          filePath,
          line: lineNumber,
          column: 0,
          codeSnippet: line.trim(),
          category: 'performance',
          recommendation: 'Be careful with closures that retain large objects or DOM elements',
          confidence: 60
        });
      }

      // Check for global variable assignments
      if (line.trim().startsWith('window.') || line.trim().startsWith('global.')) {
        issues.push({
          id: `perf-global-leak-${filePath}-${lineNumber}`,
          ruleId: 'global-variable-leak',
          severity: 'warning',
          message: 'Global variable assignment detected',
          filePath,
          line: lineNumber,
          column: 0,
          codeSnippet: line.trim(),
          category: 'performance',
          recommendation: 'Avoid global variable assignments which can prevent garbage collection',
          confidence: 70
        });
      }
    }

    return issues;
  }

  /**
   * Find blocking operations
   * @param content File content
   * @param filePath Path to the file
   * @returns Array of blocking operation issues
   */
  private findBlockingOperations(content: string, filePath: string): Issue[] {
    const issues: Issue[] = [];
    const lines = content.split('\n');

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      const lineNumber = i + 1;

      // Check for synchronous operations in JavaScript/TypeScript
      if (line.includes('fs.') && (line.includes('Sync') || line.includes('readFileSync') || line.includes('writeFileSync'))) {
        issues.push({
          id: `perf-blocking-sync-${filePath}-${lineNumber}`,
          ruleId: 'blocking-sync-op',
          severity: 'warning',
          message: 'Synchronous file operation detected',
          filePath,
          line: lineNumber,
          column: 0,
          codeSnippet: line.trim(),
          category: 'performance',
          recommendation: 'Use asynchronous versions of file operations to avoid blocking the event loop',
          confidence: 90
        });
      }

      // Check for blocking sleep/delay functions
      if (line.includes('sleep(') || line.includes('time.sleep(') || line.includes('Thread.sleep(')) {
        issues.push({
          id: `perf-blocking-sleep-${filePath}-${lineNumber}`,
          ruleId: 'blocking-sleep',
          severity: 'warning',
          message: 'Blocking sleep/delay operation detected',
          filePath,
          line: lineNumber,
          column: 0,
          codeSnippet: line.trim(),
          category: 'performance',
          recommendation: 'Consider using non-blocking alternatives or moving to background tasks',
          confidence: 85
        });
      }

      // Check for heavy computation in UI update cycles
      if ((line.includes('render') || line.includes('update') || line.includes('paint')) &&
          (line.includes('for') || line.includes('while') || line.includes('map') || line.includes('filter') || line.includes('reduce'))) {
        issues.push({
          id: `perf-heavy-computation-${filePath}-${lineNumber}`,
          ruleId: 'heavy-computation-in-render',
          severity: 'warning',
          message: 'Heavy computation in UI update cycle detected',
          filePath,
          line: lineNumber,
          column: 0,
          codeSnippet: line.trim(),
          category: 'performance',
          recommendation: 'Move heavy computations outside of UI update cycles or use Web Workers',
          confidence: 75
        });
      }
    }

    return issues;
  }

  /**
   * Find inefficient data structures
   * @param content File content
   * @param filePath Path to the file
   * @returns Array of inefficient data structure issues
   */
  private findInefficientDataStructures(content: string, filePath: string): Issue[] {
    const issues: Issue[] = [];
    const lines = content.split('\n');

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      const lineNumber = i + 1;

      // Check for arrays used as sets (frequent includes/indexOf operations)
      if (line.includes('.includes(') || line.includes('.indexOf(') || line.includes('.find(')) {
        issues.push({
          id: `perf-inefficient-data-structure-${filePath}-${lineNumber}`,
          ruleId: 'array-used-as-set',
          severity: 'warning',
          message: 'Array used for frequent lookups detected',
          filePath,
          line: lineNumber,
          column: 0,
          codeSnippet: line.trim(),
          category: 'performance',
          recommendation: 'Consider using Set or Map for O(1) lookups instead of O(n) array operations',
          confidence: 80
        });
      }

      // Check for unsorted arrays that are frequently searched
      if (line.includes('sort(') && (line.includes('.includes(') || line.includes('.indexOf('))) {
        issues.push({
          id: `perf-unsorted-search-${filePath}-${lineNumber}`,
          ruleId: 'unsorted-search',
          severity: 'warning',
          message: 'Searching in unsorted array detected',
          filePath,
          line: lineNumber,
          column: 0,
          codeSnippet: line.trim(),
          category: 'performance',
          recommendation: 'Consider keeping arrays sorted for binary search or using Set/Map',
          confidence: 70
        });
      }
    }

    return issues;
  }

  /**
   * Find inefficient API call patterns
   * @param content File content
   * @param filePath Path to the file
   * @returns Array of inefficient API pattern issues
   */
  private findInefficientAPIPatterns(content: string, filePath: string): Issue[] {
    const issues: Issue[] = [];
    const lines = content.split('\n');

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      const lineNumber = i + 1;

      // Check for API calls inside loops
      if (line.includes('for') && (line.includes('fetch(') || line.includes('axios.') || line.includes('.get(') || line.includes('.post('))) {
        issues.push({
          id: `perf-api-in-loop-${filePath}-${lineNumber}`,
          ruleId: 'api-call-in-loop',
          severity: 'warning',
          message: 'API call inside loop detected',
          filePath,
          line: lineNumber,
          column: 0,
          codeSnippet: line.trim(),
          category: 'performance',
          recommendation: 'Consider batching API calls or using a more efficient approach',
          confidence: 90
        });
      }

      // Check for multiple similar API calls that could be batched
      if ((line.includes('fetch(') || line.includes('axios.') || line.includes('.get(') || line.includes('.post(')) &&
          content.split(line).length > 2) { // If this line appears multiple times in the file
        issues.push({
          id: `perf-multiple-api-calls-${filePath}-${lineNumber}`,
          ruleId: 'multiple-similar-api-calls',
          severity: 'warning',
          message: 'Multiple similar API calls detected',
          filePath,
          line: lineNumber,
          column: 0,
          codeSnippet: line.trim(),
          category: 'performance',
          recommendation: 'Consider batching these API calls or using a single endpoint',
          confidence: 75
        });
      }
    }

    return issues;
  }

  /**
   * Find unnecessary computations
   * @param content File content
   * @param filePath Path to the file
   * @returns Array of unnecessary computation issues
   */
  private findUnnecessaryComputations(content: string, filePath: string): Issue[] {
    const issues: Issue[] = [];
    const lines = content.split('\n');

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      const lineNumber = i + 1;

      // Check for repeated calculations
      if (line.includes('Math.') && (line.includes('*') || line.includes('+') || line.includes('-') || line.includes('/'))) {
        issues.push({
          id: `perf-repeated-calculation-${filePath}-${lineNumber}`,
          ruleId: 'repeated-calculation',
          severity: 'warning',
          message: 'Potentially repeated calculation detected',
          filePath,
          line: lineNumber,
          column: 0,
          codeSnippet: line.trim(),
          category: 'performance',
          recommendation: 'Consider caching results of expensive calculations',
          confidence: 65
        });
      }

      // Check for redundant DOM queries
      if (line.includes('document.') && (line.includes('querySelector') || line.includes('getElement'))) {
        const occurrences = (content.match(new RegExp(line.trim().replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g')) || []).length;
        if (occurrences > 1) {
          issues.push({
            id: `perf-redundant-dom-query-${filePath}-${lineNumber}`,
            ruleId: 'redundant-dom-query',
            severity: 'warning',
            message: 'Redundant DOM query detected',
            filePath,
            line: lineNumber,
            column: 0,
            codeSnippet: line.trim(),
            category: 'performance',
            recommendation: 'Cache DOM element references to avoid repeated queries',
            confidence: 80
          });
        }
      }
    }

    return issues;
  }

  /**
   * Identify performance optimization opportunities
   * @param projectPath Path to the project
   * @returns Array of performance optimization suggestions
   */
  async identifyOptimizationOpportunities(projectPath: string): Promise<string[]> {
    const opportunities: string[] = [];

    try {
      // Get all relevant files
      const files = await FileTraversalUtil.collectFilesByExtension(projectPath, ['.js', '.ts', '.jsx', '.tsx']);

      // Count different types of performance issues
      let inefficientLoops = 0;
      let memoryLeaks = 0;
      let blockingOps = 0;
      let inefficientDataStructures = 0;
      let apiIssues = 0;
      let unnecessaryComputations = 0;

      for (const filePath of files) {
        try {
          const content = await fs.readFile(filePath, 'utf8');
          const issues = await this.analyzeFileForPerformanceIssues(filePath, content);

          for (const issue of issues) {
            switch (issue.ruleId) {
              case 'nested-loops':
              case 'inefficient-array-op':
              case 'string-concat-in-loop':
                inefficientLoops++;
                break;
              case 'event-listener-leak':
              case 'closure-leak':
              case 'global-variable-leak':
                memoryLeaks++;
                break;
              case 'blocking-sync-op':
              case 'blocking-sleep':
              case 'heavy-computation-in-render':
                blockingOps++;
                break;
              case 'array-used-as-set':
              case 'unsorted-search':
                inefficientDataStructures++;
                break;
              case 'api-call-in-loop':
              case 'multiple-similar-api-calls':
                apiIssues++;
                break;
              case 'repeated-calculation':
              case 'redundant-dom-query':
                unnecessaryComputations++;
                break;
            }
          }
        } catch (error) {
          console.warn(`Could not analyze file for performance opportunities: ${filePath}`, error);
        }
      }

      // Add optimization opportunities based on findings
      if (inefficientLoops > 0) {
        opportunities.push(`${inefficientLoops} inefficient loops detected. Consider algorithmic improvements.`);
      }

      if (memoryLeaks > 0) {
        opportunities.push(`${memoryLeaks} potential memory leaks identified. Implement proper cleanup.`);
      }

      if (blockingOps > 0) {
        opportunities.push(`${blockingOps} blocking operations found. Use async alternatives.`);
      }

      if (inefficientDataStructures > 0) {
        opportunities.push(`${inefficientDataStructures} inefficient data structures detected. Use appropriate data structures.`);
      }

      if (apiIssues > 0) {
        opportunities.push(`${apiIssues} inefficient API call patterns found. Consider batching or caching.`);
      }

      if (unnecessaryComputations > 0) {
        opportunities.push(`${unnecessaryComputations} unnecessary computations detected. Implement caching.`);
      }

    } catch (error) {
      console.warn('Could not identify performance optimization opportunities:', error);
    }

    return opportunities;
  }
}