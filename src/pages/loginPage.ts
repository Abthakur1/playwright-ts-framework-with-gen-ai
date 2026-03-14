import { Page, Locator } from '@playwright/test';
import { BasePage } from './basePage';

/**
 * Login Page Object
 * Handles all interactions with the login page
 */
export class LoginPage extends BasePage {
  // Locators
  get usernameField(): Locator {
    return this.page.locator('[data-test="username"]');
  }

  get passwordField(): Locator {
    return this.page.locator('[data-test="password"]');
  }

  get loginButton(): Locator {
    return this.page.locator('[data-test="login-button"]');
  }

  get errorMessage(): Locator {
    return this.page.locator('[data-test="error"]');
  }

  /**
   * Navigate to login page
   */
  async goto(): Promise<void> {
    this.logger.info('Navigating to login page');
    await super.goto('/');
  }

  /**
   * Enter username
   */
  async enterUsername(username: string): Promise<void> {
    this.logger.info(`Entering username: ${username}`);
    await this.fill(this.usernameField, username);
  }

  /**
   * Enter password
   */
  async enterPassword(password: string): Promise<void> {
    this.logger.info('Entering password');
    await this.fill(this.passwordField, password);
  }

  /**
   * Click login button
   */
  async clickLoginButton(): Promise<void> {
    this.logger.info('Clicking login button');
    await this.click(this.loginButton);
  }

  /**
   * Perform login with credentials
   */
  async login(username: string, password: string): Promise<void> {
    this.logger.info(`Attempting login with username: ${username}`);
    await this.enterUsername(username);
    await this.enterPassword(password);
    await this.clickLoginButton();
  }

  /**
   * Get error message text
   */
  async getErrorMessage(): Promise<string> {
    this.logger.info('Getting error message');
    await this.waitForElement(this.errorMessage);
    return await this.getText(this.errorMessage);
  }

  /**
   * Check if error message is displayed
   */
  async isErrorMessageDisplayed(): Promise<boolean> {
    this.logger.info('Checking if error message is displayed');
    return await this.isElementVisible(this.errorMessage);
  }

  /**
   * Check if login button is visible
   */
  async isLoginButtonVisible(): Promise<boolean> {
    this.logger.info('Checking if login button is visible');
    return await this.isElementVisible(this.loginButton);
  }
}