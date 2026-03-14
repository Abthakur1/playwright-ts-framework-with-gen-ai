/**
 * Helper Utility Functions
 * Common helper functions for test execution
 */

/**
 * Generate random string
 */
export function generateRandomString(length: number = 10): string {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

/**
 * Generate random email
 */
export function generateRandomEmail(): string {
  return `user_${generateRandomString(8)}@example.com`;
}

/**
 * Wait for a number of milliseconds
 */
export async function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Get current date in YYYY-MM-DD format
 */
export function getCurrentDate(): string {
  const date = new Date();
  return date.toISOString().split('T')[0];
}

/**
 * Get current time in HH:MM:SS format
 */
export function getCurrentTime(): string {
  const date = new Date();
  return date.toISOString().split('T')[1].split('.')[0];
}

/**
 * Check if value exists and is not empty
 */
export function isValidValue(value: any): boolean {
  return value !== null && value !== undefined && value !== '';
}

/**
 * Retry logic for flaky operations
 */
export async function retryAsync<T>(
  operation: () => Promise<T>,
  maxRetries: number = 3,
  delayMs: number = 1000
): Promise<T> {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await operation();
    } catch (error) {
      if (attempt === maxRetries) {
        throw error;
      }
      await delay(delayMs * attempt);
    }
  }
  throw new Error('Retry operation failed');
}