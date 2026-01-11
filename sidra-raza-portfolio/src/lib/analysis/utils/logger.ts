import chalk from 'chalk';

export type LogLevel = 'debug' | 'info' | 'warn' | 'error';

/**
 * Logger utility with progress indicators for the analysis system
 */
export class Logger {
  private static readonly LOG_LEVELS: { [key in LogLevel]: number } = {
    debug: 0,
    info: 1,
    warn: 2,
    error: 3
  };

  private minLogLevel: LogLevel;
  private verbose: boolean;

  constructor(minLogLevel: LogLevel = 'info', verbose: boolean = false) {
    this.minLogLevel = minLogLevel;
    this.verbose = verbose;
  }

  /**
   * Log a debug message
   * @param message The message to log
   * @param meta Optional metadata to include
   */
  debug(message: string, meta?: any): void {
    if (this.shouldLog('debug')) {
      this.printMessage('debug', chalk.gray(message), meta);
    }
  }

  /**
   * Log an info message
   * @param message The message to log
   * @param meta Optional metadata to include
   */
  info(message: string, meta?: any): void {
    if (this.shouldLog('info')) {
      this.printMessage('info', chalk.blue(message), meta);
    }
  }

  /**
   * Log a warning message
   * @param message The message to log
   * @param meta Optional metadata to include
   */
  warn(message: string, meta?: any): void {
    if (this.shouldLog('warn')) {
      this.printMessage('warn', chalk.yellow(message), meta);
    }
  }

  /**
   * Log an error message
   * @param message The message to log
   * @param meta Optional metadata to include
   */
  error(message: string, meta?: any): void {
    if (this.shouldLog('error')) {
      this.printMessage('error', chalk.red(message), meta);
    }
  }

  /**
   * Log a success message
   * @param message The message to log
   * @param meta Optional metadata to include
   */
  success(message: string, meta?: any): void {
    this.printMessage('info', chalk.green(message), meta);
  }

  /**
   * Display a progress indicator
   * @param message Progress message
   * @param progress Current progress (0-100)
   * @param total Total progress value (default: 100)
   */
  progress(message: string, progress: number, total: number = 100): void {
    const percent = Math.round((progress / total) * 100);
    const progressBar = this.createProgressBar(percent);

    console.log(`${progressBar} ${message} (${percent}%)`);
  }

  /**
   * Create a progress bar visualization
   * @param percent Percentage complete (0-100)
   * @returns String representation of the progress bar
   */
  private createProgressBar(percent: number): string {
    const width = 40;
    const filled = Math.round((percent / 100) * width);
    const empty = width - filled;

    const bar = chalk.bgGreen(' '.repeat(filled)) + chalk.bgWhite(' '.repeat(empty));
    return `[${bar}]`;
  }

  /**
   * Log an analysis summary
   * @param summary Analysis summary data
   */
  logSummary(summary: {
    totalFiles: number;
    analyzedFiles: number;
    skippedFiles: number;
    totalIssues: number;
    criticalIssues: number;
    highSeverityIssues: number;
    scanTimeMs: number;
  }): void {
    console.log('\n' + '='.repeat(50));
    console.log(chalk.bold('ANALYSIS SUMMARY'));
    console.log('='.repeat(50));
    console.log(`📁 Total files: ${chalk.cyan(summary.totalFiles)}`);
    console.log(`🔍 Analyzed: ${chalk.cyan(summary.analyzedFiles)}`);
    console.log(`⏭️  Skipped: ${chalk.cyan(summary.skippedFiles)}`);
    console.log(`🐛 Issues found: ${chalk.yellow(summary.totalIssues)}`);
    console.log(`🚨 Critical: ${chalk.red(summary.criticalIssues)}`);
    console.log(`⚠️  High: ${chalk.yellow(summary.highSeverityIssues)}`);
    console.log(`⏱️  Time taken: ${chalk.magenta(`${(summary.scanTimeMs / 1000).toFixed(2)}s`)}`);
    console.log('='.repeat(50) + '\n');
  }

  /**
   * Check if a log level should be printed based on minimum level
   * @param level The level to check
   * @returns True if the level should be logged
   */
  private shouldLog(level: LogLevel): boolean {
    return Logger.LOG_LEVELS[level] >= Logger.LOG_LEVELS[this.minLogLevel];
  }

  /**
   * Print a formatted message
   * @param level Log level
   * @param message Colored message string
   * @param meta Optional metadata to include
   */
  private printMessage(level: LogLevel, message: string, meta?: any): void {
    const timestamp = new Date().toISOString();
    const levelTag = chalk.white.bgHex(this.getLevelColor(level))(level.toUpperCase());

    let output = `${timestamp} ${levelTag} ${message}`;

    if (meta && this.verbose) {
      output += `\n${chalk.gray(JSON.stringify(meta, null, 2))}`;
    }

    console.log(output);
  }

  /**
   * Get color hex code for a log level
   * @param level The log level
   * @returns Hex color code
   */
  private getLevelColor(level: LogLevel): string {
    switch (level) {
      case 'debug': return '#888888';
      case 'info': return '#3498db';
      case 'warn': return '#f39c12';
      case 'error': return '#e74c3c';
      default: return '#ffffff';
    }
  }
}

// Global logger instance
export const logger = new Logger();

// Set up logger based on environment or configuration
export const setupLogger = (minLogLevel: LogLevel = 'info', verbose: boolean = false): Logger => {
  return new Logger(minLogLevel, verbose);
};