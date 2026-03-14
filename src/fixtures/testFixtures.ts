import { test as base } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';
import { InventoryPage } from '../pages/inventoryPage';
import { CheckoutPage } from '../pages/checkoutPage';

/**
 * Extend Playwright base test with custom fixtures
 */
type TestFixtures = {
  loginPage: LoginPage;
  inventoryPage: InventoryPage;
  checkoutPage: CheckoutPage;
  authenticatedPage: void;
};

/**
 * Create extended test with fixtures
 */
export const test = base.extend<TestFixtures>({
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await use(loginPage);
  },

  inventoryPage: async ({ page }, use) => {
    const inventoryPage = new InventoryPage(page);
    await use(inventoryPage);
  },

  checkoutPage: async ({ page }, use) => {
    const checkoutPage = new CheckoutPage(page);
    await use(checkoutPage);
  },

  authenticatedPage: async ({ page, loginPage }, use) => {
    // Login before test
    await loginPage.goto();
    const username = process.env.VALID_USERNAME || 'standard_user';
    const password = process.env.VALID_PASSWORD || 'secret_sauce';
    await loginPage.login(username, password);

    await use();
  },
});

export { expect } from '@playwright/test';