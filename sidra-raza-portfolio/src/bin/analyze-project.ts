#!/usr/bin/env node

import * as path from 'path';
import { ConfigManager } from '../lib/analysis/config';
import { ProjectAnalyzer } from '../lib/analysis/core/project-analyzer';
import { setupLogger, Logger } from '../lib/analysis/utils/logger';
import { FileTraversalUtil } from '../lib/analysis/utils/file-traversal';

// Parse command line arguments
const args = process.argv.slice(2);
const options: { [key: string]: any } = {};
let projectPath = process.cwd(); // Default to current working directory

// Parse command line options
for (let i = 0; i < args.length; i++) {
  const arg = args[i];

  if (arg.startsWith('--')) {
    const [key, value] = arg.slice(2).split('=');
    options[key] = value || true;
  } else if (arg.startsWith('-')) {
    const flag = arg.slice(1);
    options[flag] = true;
  } else {
    // Assume it's a project path if it's not an option
    projectPath = path.resolve(arg);
  }
}

// Set up logging based on verbose flag
const logger = options.verbose || options.v
  ? setupLogger('debug', true)
  : setupLogger('info', false);

// Main execution function
async function main() {
  try {
    logger.info('Starting project analysis...');
    logger.debug(`Project path: ${projectPath}`);
    logger.debug(`Options: ${JSON.stringify(options)}`);

    // Load configuration
    const configManager = await ConfigManager.loadFromFile(options.config || '.analysisrc');

    // Update config based on command line options
    if (options.exclude) {
      const excludePatterns = Array.isArray(options.exclude) ? options.exclude : [options.exclude];
      configManager.updateConfig({
        excludePatterns: [...configManager.getConfig().excludePatterns, ...excludePatterns]
      });
    }

    if (options.format) {
      configManager.updateConfig({ reportFormat: options.format });
    }

    if (options.output) {
      configManager.updateConfig({ outputDir: options.output });
    }

    if (typeof options.timeout === 'number') {
      configManager.updateConfig({ timeoutMinutes: options.timeout });
    }

    // Create project analyzer
    const analyzer = new ProjectAnalyzer(configManager);

    // Perform analysis
    logger.info('Analyzing project structure...');
    const scanResult = await analyzer.analyzeProject(projectPath);

    // Log analysis summary
    logger.logSummary({
      totalFiles: scanResult.totalFiles,
      analyzedFiles: scanResult.summary.analyzedFiles,
      skippedFiles: scanResult.summary.skippedFiles,
      totalIssues: scanResult.summary.totalIssues,
      criticalIssues: scanResult.summary.criticalIssues,
      highSeverityIssues: scanResult.summary.highSeverityIssues,
      scanTimeMs: scanResult.scanDuration
    });

    // Output results based on format preference
    const config = configManager.getConfig();
    switch (config.reportFormat) {
      case 'json':
        await outputJson(scanResult, config.outputDir);
        break;
      case 'console':
        outputConsole(scanResult);
        break;
      case 'html':
        await outputHtml(scanResult, config.outputDir);
        break;
      default:
        outputConsole(scanResult);
    }

    logger.success('Project analysis completed successfully!');
  } catch (error) {
    logger.error('Error during project analysis:', error);
    process.exit(1);
  }
}

// Output results in JSON format
async function outputJson(scanResult: any, outputDir: string) {
  const fs = require('fs-extra');
  const outputPath = path.join(outputDir, `analysis-report-${Date.now()}.json`);

  await fs.ensureDir(outputDir);
  await fs.writeJSON(outputPath, scanResult, { spaces: 2 });

  logger.info(`JSON report saved to: ${outputPath}`);
}

// Output results to console
function outputConsole(scanResult: any) {
  console.log('\n' + '='.repeat(60));
  console.log('DETAILED ANALYSIS RESULTS');
  console.log('='.repeat(60));

  console.log('\n📁 Project Information:');
  console.log(`   Path: ${scanResult.projectPath}`);
  console.log(`   Total Files: ${scanResult.totalFiles}`);
  console.log(`   Total Size: ${formatFileSize(scanResult.totalSize)}`);

  console.log('\n📊 File Type Distribution:');
  for (const [ext, count] of scanResult.fileTypes) {
    console.log(`   ${ext}: ${count} files`);
  }

  console.log('\n🔍 Analysis Summary:');
  console.log(`   Analyzed Files: ${scanResult.summary.analyzedFiles}`);
  console.log(`   Skipped Files: ${scanResult.summary.skippedFiles}`);
  console.log(`   Scan Duration: ${scanResult.scanDuration}ms`);

  if (scanResult.issues.length > 0) {
    console.log(`\n🐛 Issues Found: ${scanResult.issues.length}`);
    for (const issue of scanResult.issues.slice(0, 10)) { // Show first 10 issues
      console.log(`   - ${issue.severity.toUpperCase()}: ${issue.message} (${issue.filePath})`);
    }
    if (scanResult.issues.length > 10) {
      console.log(`   ... and ${scanResult.issues.length - 10} more issues`);
    }
  } else {
    console.log('\n✅ No issues detected!');
  }

  console.log('='.repeat(60) + '\n');
}

// Output results in HTML format
async function outputHtml(scanResult: any, outputDir: string) {
  const fs = require('fs-extra');
  const outputPath = path.join(outputDir, `analysis-report-${Date.now()}.html`);

  const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Project Analysis Report</title>
  <style>
    body { font-family: Arial, sans-serif; margin: 20px; }
    .header { background-color: #f5f5f5; padding: 20px; border-radius: 5px; }
    .section { margin: 20px 0; }
    .issue { margin: 10px 0; padding: 10px; border-left: 4px solid; }
    .error { border-color: #e74c3c; background-color: #fadbd8; }
    .warning { border-color: #f39c12; background-color: #fdebd0; }
    .info { border-color: #3498db; background-color: #d6eaf8; }
  </style>
</head>
<body>
  <div class="header">
    <h1>Project Analysis Report</h1>
    <p>Generated on: ${new Date().toISOString()}</p>
    <p>Project: ${scanResult.projectPath}</p>
  </div>

  <div class="section">
    <h2>Project Summary</h2>
    <ul>
      <li>Total Files: ${scanResult.totalFiles}</li>
      <li>Size: ${formatFileSize(scanResult.totalSize)}</li>
      <li>Scan Duration: ${scanResult.scanDuration}ms</li>
    </ul>
  </div>

  <div class="section">
    <h2>File Type Distribution</h2>
    <ul>
      ${Array.from(scanResult.fileTypes.entries()).map((item) => {
        const [ext, count] = item;
        return `<li>${ext}: ${count} files</li>`;
      }).join('')}
    </ul>
  </div>

  <div class="section">
    <h2>Issues Found (${scanResult.issues.length})</h2>
    ${scanResult.issues.length > 0 ?
      scanResult.issues.map((issue: any) =>
        `<div class="issue ${issue.severity}">
          <strong>${issue.severity.toUpperCase()}: ${issue.message}</strong><br>
          <em>${issue.filePath}:${issue.line}</em><br>
          <small>Category: ${issue.category}</small>
        </div>`
      ).join('') :
      '<p>No issues detected!</p>'
    }
  </div>
</body>
</html>`;

  await fs.ensureDir(outputDir);
  await fs.writeFile(outputPath, htmlContent);

  logger.info(`HTML report saved to: ${outputPath}`);
}

// Helper function to format file sizes
function formatFileSize(bytes: number): string {
  if (bytes < 1024) return bytes + ' B';
  else if (bytes < 1048576) return (bytes / 1024).toFixed(2) + ' KB';
  else return (bytes / 1048576).toFixed(2) + ' MB';
}

// Run the main function
main();