import * as path from 'path';
import * as fs from 'fs-extra';
import { exec } from 'child_process';
import { promisify } from 'util';
import { ConfigManager } from '../config';
import { Dependency, SecurityIssue } from '../types';

const execAsync = promisify(exec);

/**
 * Analyzes project dependencies for security, version, and quality issues
 */
export class DependencyAnalyzer {
  private configManager: ConfigManager;

  constructor(configManager: ConfigManager) {
    this.configManager = configManager;
  }

  /**
   * Analyze project dependencies
   * @param projectPath Path to the project to analyze
   * @returns Array of dependencies with security and quality information
   */
  async analyze(projectPath: string): Promise<Dependency[]> {
    const dependencies: Dependency[] = [];

    try {
      // Read package.json to get dependencies
      const packageJsonPath = path.join(projectPath, 'package.json');
      if (await fs.pathExists(packageJsonPath)) {
        const packageJson = await fs.readJSON(packageJsonPath);
        const allDeps = { ...packageJson.dependencies, ...packageJson.devDependencies };

        for (const [name, version] of Object.entries(allDeps)) {
          const dep: Dependency = {
            name,
            version: typeof version === 'string' ? version : JSON.stringify(version),
            type: packageJson.dependencies?.[name] ? 'production' : 'development',
            isOutdated: false,
            securityIssues: [],
            license: ''
          };

          // Check if the dependency is outdated
          dep.isOutdated = await this.checkIfOutdated(name, dep.version);

          // Get license information
          dep.license = await this.getLicense(name);

          // Check for security vulnerabilities
          dep.securityIssues = await this.checkSecurityVulnerabilities(name, dep.version);

          dependencies.push(dep);
        }
      }
    } catch (error) {
      console.warn('Could not analyze dependencies:', error);
    }

    return dependencies;
  }

  /**
   * Check if a dependency is outdated
   * @param packageName Name of the package
   * @param currentVersion Current version of the package
   * @returns True if the package is outdated, false otherwise
   */
  private async checkIfOutdated(packageName: string, currentVersion: string): Promise<boolean> {
    try {
      // Skip if the version is a git URL or local path
      if (currentVersion.startsWith('git+') || currentVersion.startsWith('file:')) {
        return false;
      }

      // Get the latest version from npm
      const { stdout } = await execAsync(`npm view ${packageName} version --json`);
      const latestVersion = stdout.trim().replace(/"/g, ''); // Remove quotes

      if (latestVersion && this.compareVersions(currentVersion, latestVersion) < 0) {
        return true;
      }
    } catch (error) {
      // If npm view fails, assume it's not outdated
      console.debug(`Could not check if ${packageName} is outdated:`, error);
    }

    return false;
  }

  /**
   * Get license information for a package
   * @param packageName Name of the package
   * @returns License string
   */
  private async getLicense(packageName: string): Promise<string> {
    try {
      const { stdout } = await execAsync(`npm view ${packageName} license --json`);
      return stdout.trim().replace(/"/g, '') || 'Unknown';
    } catch (error) {
      console.debug(`Could not get license for ${packageName}:`, error);
      return 'Unknown';
    }
  }

  /**
   * Check for security vulnerabilities in a package
   * @param packageName Name of the package
   * @param version Version of the package
   * @returns Array of security issues
   */
  private async checkSecurityVulnerabilities(packageName: string, version: string): Promise<SecurityIssue[]> {
    const securityIssues: SecurityIssue[] = [];

    try {
      // Skip if the version is a git URL or local path
      if (version.startsWith('git+') || version.startsWith('file:')) {
        return securityIssues;
      }

      // Use npm audit to check for vulnerabilities
      const projectPath = process.cwd(); // This should be updated to the actual project path
      const auditResult = await this.auditPackage(projectPath);

      if (auditResult && auditResult.advisories) {
        for (const advisory of Object.values(auditResult.advisories)) {
          // @ts-ignore - Type may not match exactly but we'll handle it
          if (advisory.module_name === packageName) {
            securityIssues.push({
              id: advisory.id.toString(),
              title: advisory.title,
              severity: this.mapNpmSeverity(advisory.severity),
              description: advisory.overview || advisory.description || '',
              recommendation: advisory.recommendation || `Update to ${advisory.patched_versions?.[0] || 'latest version'}`,
              vulnerableVersions: advisory.vulnerable_versions || [],
              patchedVersions: advisory.patched_versions?.join(', ') || ''
            });
          }
        }
      }
    } catch (error) {
      console.debug(`Could not check security for ${packageName}@${version}:`, error);
    }

    return securityIssues;
  }

  /**
   * Audit the entire project for security vulnerabilities
   * @param projectPath Path to the project
   * @returns Audit results
   */
  private async auditPackage(projectPath: string) {
    try {
      const { stdout } = await execAsync(`cd ${projectPath} && npm audit --json`);
      return JSON.parse(stdout);
    } catch (error: any) {
      // npm audit returns non-zero exit code when vulnerabilities are found
      // We still want to parse the output in this case
      if (error.stdout) {
        try {
          return JSON.parse(error.stdout);
        } catch (parseError) {
          console.debug('Could not parse npm audit output:', parseError);
          return { advisories: {} };
        }
      }
      console.debug('Could not run npm audit:', error);
      return { advisories: {} };
    }
  }

  /**
   * Map npm severity levels to our standard levels
   * @param npmSeverity NPM severity level
   * @returns Standard severity level
   */
  private mapNpmSeverity(npmSeverity: string): 'critical' | 'high' | 'moderate' | 'low' {
    switch (npmSeverity?.toLowerCase()) {
      case 'critical':
        return 'critical';
      case 'high':
        return 'high';
      case 'moderate':
        return 'moderate';
      case 'low':
        return 'low';
      default:
        return 'low';
    }
  }

  /**
   * Compare two version strings
   * @param v1 First version
   * @param v2 Second version
   * @returns -1 if v1 < v2, 0 if equal, 1 if v1 > v2
   */
  private compareVersions(v1: string, v2: string): number {
    // Remove any prefixes like '^' or '~'
    const cleanV1 = v1.replace(/^[~^]/, '');
    const cleanV2 = v2.replace(/^[~^]/, '');

    const parts1 = cleanV1.split('.').map(Number);
    const parts2 = cleanV2.split('.').map(Number);

    for (let i = 0; i < Math.max(parts1.length, parts2.length); i++) {
      const a = parts1[i] || 0;
      const b = parts2[i] || 0;

      if (a > b) return 1;
      if (a < b) return -1;
    }

    return 0;
  }

  /**
   * Identify potential dependency issues
   * @param projectPath Path to the project
   * @returns Array of dependency issues
   */
  async identifyDependencyIssues(projectPath: string): Promise<string[]> {
    const issues: string[] = [];

    try {
      const dependencies = await this.analyze(projectPath);

      // Count outdated dependencies
      const outdatedDeps = dependencies.filter(dep => dep.isOutdated);
      if (outdatedDeps.length > 0) {
        issues.push(`${outdatedDeps.length} outdated dependencies detected. Consider updating: ${outdatedDeps.map(d => d.name).join(', ')}`);
      }

      // Count dependencies with security issues
      const vulnerableDeps = dependencies.filter(dep => dep.securityIssues.length > 0);
      if (vulnerableDeps.length > 0) {
        issues.push(`${vulnerableDeps.length} dependencies have security vulnerabilities. Run 'npm audit' for details.`);
      }

      // Check for license compatibility issues
      const problematicLicenses = dependencies.filter(dep =>
        dep.license.includes('GPL') || dep.license.includes('AGPL')
      );
      if (problematicLicenses.length > 0) {
        issues.push(`Dependencies with copyleft licenses detected: ${problematicLicenses.map(d => `${d.name} (${d.license})`).join(', ')}. Verify license compatibility.`);
      }

      // Check for development dependencies in production
      const prodDepsWithDevFlags = dependencies.filter(dep =>
        dep.type === 'production' && (dep.name.includes('-dev') || dep.name.includes('test'))
      );
      if (prodDepsWithDevFlags.length > 0) {
        issues.push(`Potential development dependencies found in production: ${prodDepsWithDevFlags.map(d => d.name).join(', ')}`);
      }

      // Check for dependencies with no recent updates
      // This is harder to check without additional API calls, so we'll skip for now
    } catch (error) {
      console.warn('Could not identify dependency issues:', error);
    }

    return issues;
  }

  /**
   * Generate dependency report summary
   * @param projectPath Path to the project
   * @returns Dependency report summary
   */
  async generateDependencyReport(projectPath: string) {
    try {
      const dependencies = await this.analyze(projectPath);

      const totalDeps = dependencies.length;
      const prodDeps = dependencies.filter(d => d.type === 'production').length;
      const devDeps = dependencies.filter(d => d.type === 'development').length;
      const outdatedDeps = dependencies.filter(d => d.isOutdated).length;
      const vulnerableDeps = dependencies.filter(d => d.securityIssues.length > 0).length;
      const uniqueLicenses = [...new Set(dependencies.map(d => d.license))];

      return {
        totalDependencies: totalDeps,
        productionDependencies: prodDeps,
        developmentDependencies: devDeps,
        outdatedDependencies: outdatedDeps,
        vulnerableDependencies: vulnerableDeps,
        uniqueLicenses: uniqueLicenses,
        dependencyHealthScore: this.calculateHealthScore(dependencies)
      };
    } catch (error) {
      console.warn('Could not generate dependency report:', error);
      return {
        totalDependencies: 0,
        productionDependencies: 0,
        developmentDependencies: 0,
        outdatedDependencies: 0,
        vulnerableDependencies: 0,
        uniqueLicenses: [],
        dependencyHealthScore: 0
      };
    }
  }

  /**
   * Calculate a health score for dependencies based on various factors
   * @param dependencies Array of dependencies
   * @returns Health score from 0-100
   */
  private calculateHealthScore(dependencies: Dependency[]): number {
    if (dependencies.length === 0) return 100;

    let score = 100;

    // Subtract points for outdated dependencies
    const outdatedCount = dependencies.filter(d => d.isOutdated).length;
    score -= (outdatedCount / dependencies.length) * 30;

    // Subtract points for vulnerable dependencies
    const vulnerableCount = dependencies.filter(d => d.securityIssues.length > 0).length;
    score -= (vulnerableCount / dependencies.length) * 50;

    // Subtract points for problematic licenses
    const problematicLicenses = dependencies.filter(d =>
      d.license.includes('GPL') || d.license.includes('AGPL')
    ).length;
    score -= (problematicLicenses / dependencies.length) * 20;

    return Math.max(0, Math.round(score));
  }
}