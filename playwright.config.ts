import { defineConfig, devices } from '@playwright/test';

/**
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: './src/tests',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: 'html',
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('/')`. */
    baseURL: 'https://www.saucedemo.com',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
  },

  /* Configure projects for major browsers */
  projects: [

    // default desktop browsers for UI testing
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },

    // API testing projects
    {
      name: 'api',
      testDir: './src/tests/api',
      use: { ...devices['Desktop Chrome'] },
    },

    // Additional UI testing projects for cross-browser coverage
    {
      name: 'uichromium',
      testDir: './src/tests/ui',
      use: { ...devices['Desktop Chrome'] },
      timeout: 60000
    },
    {
      name: 'ui-firefox',
      testDir: './src/tests/ui',
      use: { ...devices['Desktop Firefox'] },
      timeout: 60000
    }
  ],
});
