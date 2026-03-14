import { Page, Locator } from '@playwright/test';
import { BasePage } from './basePage';

/**
 * Inventory Page Object
 * Handles all interactions with the inventory/products page
 */
export class InventoryPage extends BasePage {
  // Locators
  get productItems(): Locator {
    return this.page.locator('[data-test="inventory-item"]').first();
  }

  productName(productName: string): Locator {
    return this.page.locator(`text=${productName}`).first();
  }

  addToCartButton(productName: string): Locator {
    return this.page.locator(
      `//div[contains(text(), '${productName}')]/ancestor::div[@data-test="inventory-item"]//button[contains(text(), 'Add to cart')]`
    );
  }

  get cartIcon(): Locator {
    return this.page.locator('[data-test="shopping-cart-link"]');
  }

  get cartBadge(): Locator {
    return this.page.locator('[data-test="shopping-cart-badge"]');
  }

  get userMenu(): Locator {
    return this.page.locator('[data-test="secondary-header"]');
  }

  get userName(): Locator {
    return this.page.locator('[data-test="secondary-header"] [data-test="username"]');
  }

  /**
   * Wait for inventory page to load
   */
  async waitForInventoryPage(timeout: number = 10000): Promise<void> {
    this.logger.info('Waiting for inventory page to load');
    await this.waitForElement(this.productItems, timeout);
  }

  /**
   * Get number of products displayed
   */
  async getProductCount(): Promise<number> {
    this.logger.info('Getting product count');
    return await this.productItems.count();
  }

  /**
   * Add product to cart by name
   */
  async addProductToCart(productName: string): Promise<void> {
    this.logger.info(`Adding product to cart: ${productName}`);
    await this.click(this.addToCartButton(productName));
  }

  /**
   * Click on cart icon
   */
  async goToCart(): Promise<void> {
    this.logger.info('Going to cart');
    await this.click(this.cartIcon);
  }

  /**
   * Get cart item count
   */
  async getCartItemCount(): Promise<string> {
    this.logger.info('Getting cart item count');
    if (await this.isElementVisible(this.cartBadge)) {
      return await this.getText(this.cartBadge);
    }
    return '0';
  }

  /**
   * Verify user is logged in by checking user menu
   */
  async isUserLoggedIn(): Promise<boolean> {
    this.logger.info('Checking if user is logged in');
    return await this.isElementVisible(this.userMenu);
  }

  /**
   * Get logged in username
   */
  async getLoggedInUsername(): Promise<string> {
    this.logger.info('Getting logged in username');
    if (await this.isElementVisible(this.userName)) {
      return await this.getText(this.userName);
    }
    return '';
  }
}