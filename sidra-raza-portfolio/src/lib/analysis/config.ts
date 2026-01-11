import * as fs from 'fs-extra';
import * as path from 'path';
import { z } from 'zod';

// Define the configuration schema using Zod for validation
const ConfigSchema = z.object({
  excludePatterns: z.array(z.string()).optional().default([]),
  includeSecurity: z.boolean().optional().default(true),
  includePerformance: z.boolean().optional().default(true),
  includeArchitecture: z.boolean().optional().default(true),
  maxFileSizeKB: z.number().optional().default(10000),
  reportFormat: z.enum(['json', 'html', 'console']).optional().default('json'),
  outputDir: z.string().optional().default('./analysis-reports'),
  timeoutMinutes: z.number().optional().default(10),
  verbose: z.boolean().optional().default(false),
});

export type AnalysisConfig = z.infer<typeof ConfigSchema>;

/**
 * Configuration management utility for the analysis system
 */
export class ConfigManager {
  private static readonly DEFAULT_CONFIG: AnalysisConfig = {
    excludePatterns: [
      'node_modules/**',
      '.git/**',
      '.next/**',
      'dist/**',
      'build/**',
      '*.log',
      '.env*',
      '.DS_Store',
      'Thumbs.db',
      '.vscode/**',
      '.idea/**'
    ],
    includeSecurity: true,
    includePerformance: true,
    includeArchitecture: true,
    maxFileSizeKB: 10000,
    reportFormat: 'json',
    outputDir: './analysis-reports',
    timeoutMinutes: 10,
    verbose: false
  };

  private config: AnalysisConfig;

  constructor(config?: Partial<AnalysisConfig>) {
    this.config = { ...ConfigManager.DEFAULT_CONFIG, ...config };
  }

  /**
   * Load configuration from a file
   * @param configPath Path to the configuration file
   * @returns ConfigManager instance
   */
  static async loadFromFile(configPath: string = '.analysisrc'): Promise<ConfigManager> {
    try {
      const configData = await fs.readJSON(configPath);
      const parsedConfig = ConfigSchema.parse(configData);
      return new ConfigManager(parsedConfig);
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
        // If config file doesn't exist, use default config
        console.warn(`Configuration file ${configPath} not found. Using default configuration.`);
        return new ConfigManager();
      } else {
        console.error('Error loading configuration:', error);
        throw error;
      }
    }
  }

  /**
   * Save configuration to a file
   * @param configPath Path to save the configuration file
   */
  async saveToFile(configPath: string = '.analysisrc'): Promise<void> {
    try {
      await fs.writeJSON(configPath, this.config, { spaces: 2 });
    } catch (error) {
      console.error('Error saving configuration:', error);
      throw error;
    }
  }

  /**
   * Get the current configuration
   */
  getConfig(): AnalysisConfig {
    return { ...this.config }; // Return a copy to prevent external mutations
  }

  /**
   * Check if a file path should be excluded based on exclude patterns
   * @param filePath The file path to check
   * @returns True if the file should be excluded, false otherwise
   */
  shouldExcludeFile(filePath: string): boolean {
    const normalizedPath = path.normalize(filePath).replace(/\\/g, '/');

    return this.config.excludePatterns.some(pattern => {
      // Convert glob pattern to RegExp for matching
      const regexPattern = this.globToRegExp(pattern);
      return regexPattern.test(normalizedPath);
    });
  }

  /**
   * Convert a glob pattern to a regular expression
   * @param glob The glob pattern to convert
   * @returns Regular expression
   */
  private globToRegExp(glob: string): RegExp {
    // Escape special regex characters except for glob-specific ones
    let regex = glob.replace(/[.+^${}()|[\]\\]/g, '\\$&');

    // Replace glob wildcards with regex equivalents
    regex = regex
      .replace(/\*\*/g, '(.*)') // ** matches any number of directories
      .replace(/\*/g, '([^/]*)') // * matches any number of characters except /
      .replace(/\?/g, '[^/]'); // ? matches a single character except /

    return new RegExp(`^${regex}$`);
  }

  /**
   * Update configuration with new values
   * @param updates Partial configuration updates
   */
  updateConfig(updates: Partial<AnalysisConfig>): void {
    this.config = { ...this.config, ...updates };
  }
}