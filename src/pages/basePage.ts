import { Page, Locator } from '@playwright/test';
import { Logger } from '@utils/logger';

/**
 * Base Page Object Model
 * Provides common methods and properties shared across all page objects
 */
export class BasePage {
  protected page: Page;
  protected logger: Logger;

  constructor(page: Page) {
    this.page = page;
    this.logger = new Logger(this.constructor.name);
  }

  /**
   * Navigate to the specified URL
   */
  async goto(url: string = '/'): Promise<void> {
    this.logger.info(`Navigating to: ${url}`);
    await this.page.goto(url, { waitUntil: 'domcontentloaded' });
  }

  /**
   * Click on a locator
   */
  async click(locator: Locator | string, options?: any): Promise<void> {
    const element = typeof locator === 'string' ? this.page.locator(locator) : locator;
    this.logger.info(`Clicking element`);
    await element.click(options);
  }

  /**
   * Fill input field with text
   */
  async fill(locator: Locator | string, text: string): Promise<void> {
    const element = typeof locator === 'string' ? this.page.locator(locator) : locator;
    this.logger.info(`Filling input with: ${text}`);
    await element.fill(text);
  }

  /**
   * Get text content from an element
   */
  async getText(locator: Locator | string): Promise<string> {
    const element = typeof locator === 'string' ? this.page.locator(locator) : locator;
    const text = await element.textContent();
    this.logger.info(`Got text: ${text}`);
    return text || '';
  }

  /**
   * Wait for element to be visible
   */
  async waitForElement(locator: Locator | string, timeout: number = 5000): Promise<void> {
    const element = typeof locator === 'string' ? this.page.locator(locator) : locator;
    this.logger.info(`Waiting for element to be visible`);
    await element.waitFor({ state: 'visible', timeout });
  }

  /**
   * Check if element is visible
   */
  async isElementVisible(locator: Locator | string): Promise<boolean> {
    const element = typeof locator === 'string' ? this.page.locator(locator) : locator;
    return await element.isVisible();
  }

  /**
   * Get current URL
   */
  async getCurrentUrl(): Promise<string> {
    const url = this.page.url();
    this.logger.info(`Current URL: ${url}`);
    return url;
  }

  /**
   * Wait for URL to match pattern
   */
  async waitForURL(urlPattern: string | RegExp, timeout: number = 5000): Promise<void> {
    this.logger.info(`Waiting for URL to match: ${urlPattern}`);
    await this.page.waitForURL(urlPattern, { timeout });
  }

  /**
   * Take a screenshot
   */
  async takeScreenshot(name: string): Promise<void> {
    this.logger.info(`Taking screenshot: ${name}`);
    await this.page.screenshot({ path: `./screenshots/${name}.png` });
  }

  /**
   * Wait for a number of milliseconds
   */
  async wait(ms: number): Promise<void> {
    this.logger.info(`Waiting for ${ms}ms`);
    await this.page.waitForTimeout(ms);
  }

  /**
   * Get page title
   */
  async getPageTitle(): Promise<string> {
    const title = await this.page.title();
    this.logger.info(`Page title: ${title}`);
    return title;
  }
}