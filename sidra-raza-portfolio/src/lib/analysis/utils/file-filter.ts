import * as path from 'path';
import { ConfigManager } from '../config';

/**
 * File filtering utility to determine which files should be included in analysis
 */
export class FileFilter {
  private configManager: ConfigManager;

  constructor(configManager: ConfigManager) {
    this.configManager = configManager;
  }

  /**
   * Filter files based on configuration and size limits
   * @param filePaths Array of file paths to filter
   * @returns Array of file paths that pass all filters
   */
  async filterFiles(filePaths: string[]): Promise<string[]> {
    const config = this.configManager.getConfig();
    const maxFileSize = config.maxFileSizeKB * 1024; // Convert KB to bytes

    const filteredFiles = [];

    for (const filePath of filePaths) {
      if (this.shouldExcludeFile(filePath)) {
        continue;
      }

      if (await this.isFileSizeAcceptable(filePath, maxFileSize)) {
        filteredFiles.push(filePath);
      }
    }

    return filteredFiles;
  }

  /**
   * Check if a file should be excluded based on configuration patterns
   * @param filePath The file path to check
   * @returns True if the file should be excluded, false otherwise
   */
  private shouldExcludeFile(filePath: string): boolean {
    return this.configManager.shouldExcludeFile(filePath);
  }

  /**
   * Check if a file size is within the acceptable limit
   * @param filePath The file path to check
   * @param maxSizeBytes The maximum allowed file size in bytes
   * @returns True if the file size is acceptable, false otherwise
   */
  private async isFileSizeAcceptable(filePath: string, maxSizeBytes: number): Promise<boolean> {
    try {
      const fs = await import('fs-extra');
      const stats = await fs.stat(filePath);
      return stats.size <= maxSizeBytes;
    } catch (error) {
      // If we can't access the file, exclude it
      return false;
    }
  }

  /**
   * Filter files by extension
   * @param filePaths Array of file paths to filter
   * @param allowedExtensions Array of allowed extensions (e.g., ['.ts', '.js'])
   * @returns Array of file paths with allowed extensions
   */
  filterByExtension(filePaths: string[], allowedExtensions: string[]): string[] {
    return filePaths.filter(filePath => {
      const ext = path.extname(filePath).toLowerCase();
      return allowedExtensions.includes(ext);
    });
  }

  /**
   * Filter files by directory patterns
   * @param filePaths Array of file paths to filter
   * @param allowedDirectories Array of allowed directory patterns (relative to project root)
   * @returns Array of file paths in allowed directories
   */
  filterByDirectory(filePaths: string[], allowedDirectories: string[]): string[] {
    return filePaths.filter(filePath => {
      const relativePath = path.relative(process.cwd(), filePath);
      return allowedDirectories.some(dir => relativePath.startsWith(dir));
    });
  }

  /**
   * Check if a file is a text-based file that can be analyzed
   * @param filePath The file path to check
   * @returns True if the file is text-based, false otherwise
   */
  isTextFile(filePath: string): boolean {
    const textExtensions = [
      '.ts', '.js', '.tsx', '.jsx', '.json', '.md', '.txt', '.html', '.css',
      '.scss', '.sass', '.less', '.yaml', '.yml', '.xml', '.sql', '.py',
      '.java', '.cpp', '.c', '.h', '.cs', '.go', '.rs', '.swift', '.rb',
      '.php', '.kt', '.kts', '.gradle', '.toml', '.env', '.dockerfile',
      'dockerfile', '.gitignore', '.npmignore', '.prettierignore', '.eslintignore',
      '.editorconfig', '.lock', '.sh', '.bash', '.zsh', '.bat', '.cmd'
    ];

    const ext = path.extname(filePath).toLowerCase();
    const basename = path.basename(filePath).toLowerCase();

    // Check if it's a known text file extension
    if (textExtensions.includes(ext)) {
      return true;
    }

    // Check if it's a known text file without extension
    if (textExtensions.includes(basename)) {
      return true;
    }

    // For files without extension, check if they're likely to be text
    if (!ext) {
      // Check if it's a common executable script name
      const scriptNames = ['package.json', 'package-lock.json', 'yarn.lock', 'pnpm-lock.yaml'];
      return scriptNames.includes(basename);
    }

    return false;
  }
}