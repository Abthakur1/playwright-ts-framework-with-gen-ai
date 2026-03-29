/**
 * Test Configuration
 * Centralized configuration for test environment
 */
import 'dotenv/config';

export interface TestConfig {
  baseURL: string;
  username: string;
  password: string;
  timeout: number;
  retries: number;
}

/**
 * Get test configuration based on environment
 */
export function getTestConfig(): TestConfig {
  const environment = process.env.NODE_ENV || 'local';

  const config: { [key: string]: TestConfig } = {
    local: {
      baseURL: process.env.BASE_URL || '',
      username: process.env.VALID_USERNAME || '',
      password: process.env.VALID_PASSWORD || '',
      timeout: 30000,
      retries: 0,
    },
    staging: {
      baseURL: process.env.BASE_URL || '',
      username: process.env.VALID_USERNAME || '',
      password: process.env.VALID_PASSWORD || '',
      timeout: 30000,
      retries: 1,
    },
    production: {
      baseURL: process.env.BASE_URL || '',
      username: process.env.VALID_USERNAME || '',
      password: process.env.VALID_PASSWORD || '',
      timeout: 30000,
      retries: 1,
    },
  };

  return config[environment] || config.local;
}