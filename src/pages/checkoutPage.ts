import { Page, Locator } from '@playwright/test';
import { BasePage } from './basePage';

/**
 * Checkout Page Object
 * Handles all interactions with the checkout pages
 */
export class CheckoutPage extends BasePage {
  // Checkout Step 1 Locators
  get firstNameField(): Locator {
    return this.page.locator('[data-test="firstName"]');
  }

  get lastNameField(): Locator {
    return this.page.locator('[data-test="lastName"]');
  }

  get zipCodeField(): Locator {
    return this.page.locator('[data-test="postalCode"]');
  }

  get continueButton(): Locator {
    return this.page.locator('[data-test="continue"]');
  }

  get cancelButton(): Locator {
    return this.page.locator('[data-test="cancel"]');
  }

  // Checkout Summary Locators
  get finishButton(): Locator {
    return this.page.locator('[data-test="finish"]');
  }

  get cartItems(): Locator {
    return this.page.locator('[data-test="cart-item"]');
  }

  // Order Confirmation Locators
  get confirmationMessage(): Locator {
    return this.page.locator('[data-test="complete-header"]');
  }

  get orderNumber(): Locator {
    return this.page.locator('[data-test="complete-text"]');
  }

  get backHomeButton(): Locator {
    return this.page.locator('[data-test="back-to-products"]');
  }

  /**
   * Fill in shipping information
   */
  async fillShippingInfo(firstName: string, lastName: string, zipCode: string): Promise<void> {
    this.logger.info(`Filling shipping info: ${firstName} ${lastName} ${zipCode}`);
    await this.fill(this.firstNameField, firstName);
    await this.fill(this.lastNameField, lastName);
    await this.fill(this.zipCodeField, zipCode);
  }

  /**
   * Click continue button on checkout step 1
   */
  async clickContinue(): Promise<void> {
    this.logger.info('Clicking continue button');
    await this.click(this.continueButton);
  }

  /**
   * Click finish button to complete order
   */
  async clickFinish(): Promise<void> {
    this.logger.info('Clicking finish button');
    await this.click(this.finishButton);
  }

  /**
   * Click cancel button
   */
  async clickCancel(): Promise<void> {
    this.logger.info('Clicking cancel button');
    await this.click(this.cancelButton);
  }

  /**
   * Get confirmation message
   */
  async getConfirmationMessage(): Promise<string> {
    this.logger.info('Getting confirmation message');
    await this.waitForElement(this.confirmationMessage);
    return await this.getText(this.confirmationMessage);
  }

  /**
   * Get order details
   */
  async getOrderDetails(): Promise<string> {
    this.logger.info('Getting order details');
    await this.waitForElement(this.orderNumber);
    return await this.getText(this.orderNumber);
  }

  /**
   * Check if order confirmation page is displayed
   */
  async isOrderConfirmationDisplayed(): Promise<boolean> {
    this.logger.info('Checking if order confirmation is displayed');
    return await this.isElementVisible(this.confirmationMessage);
  }

  /**
   * Get cart item count on checkout
   */
  async getCartItemCount(): Promise<number> {
    this.logger.info('Getting cart item count');
    return await this.cartItems.count();
  }

  /**
   * Click back to home button
   */
  async backToHome(): Promise<void> {
    this.logger.info('Going back to home');
    await this.click(this.backHomeButton);
  }
}