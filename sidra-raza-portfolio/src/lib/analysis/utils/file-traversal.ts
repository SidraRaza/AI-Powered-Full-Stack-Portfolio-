import * as fs from 'fs-extra';
import * as path from 'path';
import { glob } from 'glob';

/**
 * Utility for traversing the file system and collecting files based on patterns
 */
export class FileTraversalUtil {
  /**
   * Recursively collect all files in a directory that match the provided extensions
   * @param directory Root directory to traverse
   * @param extensions Array of file extensions to include (e.g., ['.ts', '.js', '.tsx'])
   * @returns Array of file paths
   */
  static async collectFilesByExtension(
    directory: string,
    extensions: string[]
  ): Promise<string[]> {
    const pattern = `${directory}/**/*{${extensions.join(',')}}`;
    const files = await glob(pattern, {
      nodir: true,
      ignore: ['**/node_modules/**', '**/.git/**', '**/.next/**']
    });

    return files.map(file => path.resolve(file));
  }

  /**
   * Get detailed information about a file
   * @param filePath Path to the file
   * @returns File stats and content
   */
  static async getFileDetails(filePath: string): Promise<{
    path: string;
    size: number;
    extension: string;
    content: string;
    lastModified: Date;
  }> {
    const stats = await fs.stat(filePath);
    const content = await fs.readFile(filePath, 'utf8');

    return {
      path: filePath,
      size: stats.size,
      extension: path.extname(filePath),
      content,
      lastModified: stats.mtime
    };
  }

  /**
   * Collect all files in a directory regardless of extension
   * @param directory Root directory to traverse
   * @param excludePatterns Patterns to exclude (e.g., ['node_modules/**', '.git/**'])
   * @returns Array of file paths
   */
  static async collectAllFiles(
    directory: string,
    excludePatterns?: string[]
  ): Promise<{ filePath: string; size: number; extension: string }[]> {
    const allFilesPattern = `${directory}/**/*.*`;
    const ignorePatterns = [
      '**/node_modules/**',
      '**/.git/**',
      '**/.next/**',
      ...(excludePatterns || [])
    ];

    const files = await glob(allFilesPattern, {
      nodir: true,
      ignore: ignorePatterns
    });

    // Get file sizes and extensions
    const fileInfoPromises = files.map(async (file) => {
      try {
        const stats = await fs.stat(file);
        return {
          filePath: path.resolve(file),
          size: stats.size,
          extension: path.extname(file)
        };
      } catch (error) {
        console.warn(`Could not access file: ${file}`, error);
        return null;
      }
    });

    const fileInfoResults = await Promise.all(fileInfoPromises);
    return fileInfoResults.filter((info): info is NonNullable<typeof fileInfoResults[0]> => info !== null);
  }

  /**
   * Get directory structure information
   * @param directory Root directory to analyze
   * @returns Object with directory structure information
   */
  static async getDirectoryStructure(directory: string) {
    const structure: {
      directories: string[];
      files: string[];
      totalSize: number;
    } = {
      directories: [],
      files: [],
      totalSize: 0
    };

    const walk = async (dir: string) => {
      const items = await fs.readdir(dir);

      for (const item of items) {
        const fullPath = path.join(dir, item);
        const stat = await fs.stat(fullPath);

        if (stat.isDirectory()) {
          structure.directories.push(path.relative(directory, fullPath));
          await walk(fullPath);
        } else {
          structure.files.push(path.relative(directory, fullPath));
          structure.totalSize += stat.size;
        }
      }
    };

    await walk(directory);

    return structure;
  }
}