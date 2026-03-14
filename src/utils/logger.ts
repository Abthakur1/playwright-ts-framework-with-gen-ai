/**
 * Custom Logger Utility
 * Provides logging functionality for test execution tracking
 */
export class Logger {
  private testName: string;

  constructor(testName: string) {
    this.testName = testName;
  }

  /**
   * Log info level message
   */
  info(message: string): void {
    const timestamp = new Date().toISOString();
    console.log(`[${timestamp}] [${this.testName}] [INFO] ${message}`);
  }

  /**
   * Log warning level message
   */
  warn(message: string): void {
    const timestamp = new Date().toISOString();
    console.warn(`[${timestamp}] [${this.testName}] [WARN] ${message}`);
  }

  /**
   * Log error level message
   */
  error(message: string): void {
    const timestamp = new Date().toISOString();
    console.error(`[${timestamp}] [${this.testName}] [ERROR] ${message}`);
  }

  /**
   * Log debug level message
   */
  debug(message: string): void {
    const timestamp = new Date().toISOString();
    console.debug(`[${timestamp}] [${this.testName}] [DEBUG] ${message}`);
  }
}