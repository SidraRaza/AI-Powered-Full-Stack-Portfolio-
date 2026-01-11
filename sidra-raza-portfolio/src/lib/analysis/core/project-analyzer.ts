import * as path from 'path';
import * as fs from 'fs-extra';
import { FileTraversalUtil } from '../utils/file-traversal';
import { ConfigManager } from '../config';
import { FileFilter } from '../utils/file-filter';
import { CodebaseScanResult, ProjectInfo, ScanSummary } from '../types';

/**
 * Analyzes the overall project structure and collects basic information
 */
export class ProjectAnalyzer {
  private configManager: ConfigManager;
  private fileFilter: FileFilter;

  constructor(configManager: ConfigManager) {
    this.configManager = configManager;
    this.fileFilter = new FileFilter(configManager);
  }

  /**
   * Analyze the project structure and return comprehensive information
   * @param projectPath Path to the project to analyze
   * @returns Project analysis result
   */
  async analyzeProject(projectPath: string): Promise<CodebaseScanResult> {
    const startTime = Date.now();

    // Get directory structure
    const structure = await FileTraversalUtil.getDirectoryStructure(projectPath);

    // Collect all files
    const allFiles = await FileTraversalUtil.collectAllFiles(
      projectPath,
      this.configManager.getConfig().excludePatterns
    );

    // Filter files based on configuration
    const filteredFilePaths = allFiles.map(file => file.filePath);
    const filteredFiles = await this.fileFilter.filterFiles(filteredFilePaths);

    // Get file details
    const fileDetails = [];
    for (const filePath of filteredFiles) {
      try {
        const details = await FileTraversalUtil.getFileDetails(filePath);
        fileDetails.push(details);
      } catch (error) {
        console.warn(`Could not read file: ${filePath}`, error);
      }
    }

    // Create file type distribution map
    const fileTypesMap = new Map<string, number>();
    fileDetails.forEach(detail => {
      const ext = detail.extension.toLowerCase() || 'no-extension';
      fileTypesMap.set(ext, (fileTypesMap.get(ext) || 0) + 1);
    });

    // Create project info
    const projectInfo = await this.getProjectInfo(projectPath);

    // Create scan summary
    const scanSummary: ScanSummary = {
      totalFiles: allFiles.length,
      analyzedFiles: fileDetails.length,
      skippedFiles: allFiles.length - fileDetails.length,
      totalIssues: 0, // Will be populated by issue detection modules
      criticalIssues: 0,
      highSeverityIssues: 0,
      mediumSeverityIssues: 0,
      lowSeverityIssues: 0,
      scanTimeMs: Date.now() - startTime
    };

    // Create the scan result
    const result: CodebaseScanResult = {
      id: `scan_${Date.now()}`,
      timestamp: new Date(),
      projectPath,
      totalFiles: allFiles.length,
      fileTypes: fileTypesMap,
      totalSize: structure.totalSize,
      scanDuration: Date.now() - startTime,
      issues: [], // Will be populated by issue detection modules
      summary: scanSummary
    };

    return result;
  }

  /**
   * Get project-specific information from package.json, README, etc.
   * @param projectPath Path to the project
   * @returns Project information
   */
  private async getProjectInfo(projectPath: string): Promise<ProjectInfo> {
    // Default project info
    const projectInfo: ProjectInfo = {
      name: path.basename(projectPath),
      version: '1.0.0',
      description: '',
      technologies: [],
      dependencies: [],
      totalLinesOfCode: 0
    };

    try {
      // Try to read package.json for project details
      const packageJsonPath = path.join(projectPath, 'package.json');
      if (await fs.pathExists(packageJsonPath)) {
        const packageJson = await fs.readJSON(packageJsonPath);

        projectInfo.name = packageJson.name || projectInfo.name;
        projectInfo.version = packageJson.version || projectInfo.version;
        projectInfo.description = packageJson.description || projectInfo.description;

        // Identify technologies from dependencies
        const deps = { ...packageJson.dependencies, ...packageJson.devDependencies };
        projectInfo.technologies = Object.keys(deps);

        // Create dependency objects
        for (const [name, version] of Object.entries(deps)) {
          projectInfo.dependencies.push({
            name,
            version: typeof version === 'string' ? version : JSON.stringify(version),
            type: packageJson.dependencies?.[name] ? 'production' : 'development',
            isOutdated: false, // Determined by a separate check
            securityIssues: [], // Populated by security analysis
            license: '' // Retrieved from package registry
          });
        }
      }
    } catch (error) {
      console.warn('Could not read package.json for project info:', error);
    }

    try {
      // Try to read README for description
      const readmePaths = ['README.md', 'README.txt', 'readme.md', 'Readme.md'];
      for (const readmePath of readmePaths) {
        const fullPath = path.join(projectPath, readmePath);
        if (await fs.pathExists(fullPath)) {
          const readmeContent = await fs.readFile(fullPath, 'utf8');
          // Extract first paragraph as description if not already set
          if (!projectInfo.description) {
            const firstParagraph = readmeContent.split('\n\n')[0]?.trim();
            if (firstParagraph && !firstParagraph.startsWith('#')) {
              projectInfo.description = firstParagraph.substring(0, 200) + '...';
            }
          }
          break;
        }
      }
    } catch (error) {
      console.warn('Could not read README for project info:', error);
    }

    // Count total lines of code
    try {
      const allFiles = await FileTraversalUtil.collectAllFiles(
        projectPath,
        this.configManager.getConfig().excludePatterns
      );

      let totalLines = 0;
      for (const file of allFiles) {
        if (this.fileFilter.isTextFile(file.filePath)) {
          try {
            const content = await fs.readFile(file.filePath, 'utf8');
            totalLines += content.split('\n').length;
          } catch (error) {
            // Skip files that can't be read
          }
        }
      }

      projectInfo.totalLinesOfCode = totalLines;
    } catch (error) {
      console.warn('Could not count lines of code:', error);
    }

    return projectInfo;
  }

  /**
   * Get technology stack information from the project
   * @param projectPath Path to the project
   * @returns Array of technologies detected
   */
  async getTechnologyStack(projectPath: string): Promise<string[]> {
    const technologies: string[] = [];

    // Check for common configuration files that indicate technologies
    const techIndicators = {
      'TypeScript': ['tsconfig.json'],
      'JavaScript': ['package.json'],
      'React': ['react', 'react-dom', '@types/react'],
      'Next.js': ['next', 'next.config.js', 'next.config.ts'],
      'Node.js': ['package.json', 'server.js', 'app.js'],
      'Python': ['.py', 'requirements.txt', 'setup.py'],
      'Java': ['.java', 'pom.xml', 'build.gradle'],
      'C#': ['.cs', '.csproj'],
      'Go': ['.go', 'go.mod', 'Gopkg.toml'],
      'Rust': ['.rs', 'Cargo.toml'],
      'Docker': ['Dockerfile', 'docker-compose.yml'],
      'Kubernetes': ['.yaml', '.yml'], // k8s files are often yaml
      'GraphQL': ['schema.graphql', '.graphql', '.gql'],
      'PostgreSQL': ['postgresql.conf', 'pg_hba.conf'],
      'MySQL': ['my.cnf'],
      'MongoDB': ['mongod.conf'],
      'Redis': ['redis.conf'],
    };

    // Check for package.json dependencies
    try {
      const packageJsonPath = path.join(projectPath, 'package.json');
      if (await fs.pathExists(packageJsonPath)) {
        const packageJson = await fs.readJSON(packageJsonPath);
        const allDeps = { ...packageJson.dependencies, ...packageJson.devDependencies };
        const depNames = Object.keys(allDeps);

        // Check which technologies are indicated by dependencies
        for (const [tech, indicators] of Object.entries(techIndicators)) {
          if (tech === 'React' || tech === 'Next.js') {
            // Special case for framework detection based on dependencies
            const hasTech = indicators.some(indicator => depNames.includes(indicator));
            if (hasTech) {
              technologies.push(tech);
            }
          } else if (indicators.some(indicator => depNames.includes(indicator))) {
            technologies.push(tech);
          }
        }
      }
    } catch (error) {
      console.warn('Could not analyze package.json for technology stack:', error);
    }

    // Check for specific files that indicate technologies
    for (const [tech, indicators] of Object.entries(techIndicators)) {
      for (const indicator of indicators) {
        // Skip if already added via dependencies
        if (technologies.includes(tech)) continue;

        // Only check for config files, not extensions here
        if (!indicator.startsWith('.')) {
          const indicatorPath = path.join(projectPath, indicator);
          if (await fs.pathExists(indicatorPath)) {
            technologies.push(tech);
            break;
          }
        }
      }
    }

    return [...new Set(technologies)]; // Remove duplicates
  }
}