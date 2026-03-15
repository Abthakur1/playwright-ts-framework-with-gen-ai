# Playwright TypeScript Test Automation Framework Generation

## Overview
As an Automation Test Leader, I’ve designed a production‑ready Playwright TypeScript test automation framework that blends industry best practices with the power of Generative AI.
This framework is more than just a testing solution—it’s a learning resource for QA professionals who want to explore how GenAI can accelerate automation, improve adaptability, and enhance test design.
👉 Using SauceDemo as a placeholder application, the framework demonstrates how to automate web application testing seamlessly. The best part? It’s fully adaptable—you can extend it to any web application of your choice.
My goal is to help the QA community learn, adopt, and innovate with GenAI in their automation journey.

---

## Phase 1: Prerequisites Verification

### Step 1.1: Node.js Installation Verification

Before proceeding, please verify that Node.js is installed on your system:

```bash
node --version
npm --version
```

**Requirements:**
- Node.js version: 18.x or higher
- npm version: 9.x or higher

**If Node.js is not installed:**

1. Visit [nodejs.org](https://nodejs.org)
2. Download the LTS (Long Term Support) version
3. Run the installer and follow the setup wizard
4. After installation, verify using the commands above

### Step 1.2: Playwright Installation with TypeScript

Once Node.js is verified, follow these steps to understand Playwright + TypeScript setup:

**Manual Installation Commands:**

```bash
# Create a new project directory
mkdir playwright-ts-framework
cd playwright-ts-framework

# Initialize npm project
npm init -y

# Install Playwright with TypeScript
npm install --save-dev @playwright/test
npm install --save-dev typescript
npm install --save-dev @types/node

# Initialize TypeScript
npx tsc --init

# Install additional useful dependencies
npm install --save-dev dotenv
npm install --save-dev ts-node
```

**Or Quick Setup (if using create-playwright):**

```bash
npm init playwright@latest
```

### Step 1.3: Verify Installation

Run this command to ensure Playwright is properly installed:

```bash
npx playwright --version
```

You should see a version number (e.g., 1.44.0 or higher)

---

## ✅ Prerequisites Confirmation Checkpoint

**Please confirm the following have been completed:**

- [ ] Node.js 18.x or higher is installed and verified
- [ ] npm 9.x or higher is installed and verified
- [ ] You have created the project directory structure
- [ ] npm dependencies are installed
- [ ] Playwright version is verified and working
- [ ] TypeScript is configured

**Next Step:** Once all checkboxes are confirmed, please state: "Prerequisites complete. Ready to generate framework."

---

## Phase 2: Framework Generation

Once prerequisites are confirmed, generate the following framework structure:

### Directory Structure

```
playwright-ts-framework/
├── .github/
│   └── workflows/
│       └── playwright.yml
├── src/
│   ├── tests/
│   │   ├── login.spec.ts
│   │   └── checkout.spec.ts
│   ├── pages/
│   │   ├── basePage.ts
│   │   ├── loginPage.ts
│   │   ├── inventoryPage.ts
│   │   └── checkoutPage.ts
│   ├── fixtures/
│   │   └── testFixtures.ts
│   ├── utils/
│   │   ├── logger.ts
│   │   └── helpers.ts
│   └── config/
│       └── testConfig.ts
├── .env.example
├── .env
├── .gitignore
├── playwright.config.ts
├── package.json
├── tsconfig.json
├── README.md
└── reports/
    └── [generated test reports]
```

### File Contents

Below are the exact file contents to use when generating the framework. Copy these directly to ensure no issues.

#### .github/workflows/playwright.yml
```yaml
name: Playwright Tests
on:
  push:
    branches: [ main, master ]
  pull_request:
    branches: [ main, master ]
jobs:
  test:
    timeout-minutes: 60
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v4
    - uses: actions/setup-node@v4
      with:
        node-version: lts/*
    - name: Install dependencies
      run: npm ci
    - name: Install Playwright Browsers
      run: npx playwright install --with-deps
    - name: Run Playwright tests
      run: npx playwright test
    - uses: actions/upload-artifact@v4
      if: ${{ !cancelled() }}
      with:
        name: playwright-report
        path: playwright-report/
        retention-days: 30
```

#### src/pages/basePage.ts
```typescript
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
```

#### src/pages/loginPage.ts
```typescript
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
```

#### src/pages/inventoryPage.ts
```typescript
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
```

#### src/pages/checkoutPage.ts
```typescript
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
```

#### src/tests/login.spec.ts
```typescript
import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';
import { InventoryPage } from '../pages/inventoryPage';

test.describe('Login Tests', () => {
  let loginPage: LoginPage;
  let inventoryPage: InventoryPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);
    await loginPage.goto();
  });

  test('TC-001: Successful login with valid credentials', async ({ page }) => {
    // Given: User is on SauceDemo login page
    const isLoginButtonVisible = await loginPage.isLoginButtonVisible();
    expect(isLoginButtonVisible).toBeTruthy();

    // When: User enters valid username and password and clicks login
    const username = process.env.VALID_USERNAME || 'standard_user';
    const password = process.env.VALID_PASSWORD || 'secret_sauce';
    await loginPage.login(username, password);

    // Then: User should be redirected to inventory page
    inventoryPage = new InventoryPage(page);
    await inventoryPage.waitForInventoryPage();

    const currentUrl = await inventoryPage.getCurrentUrl();
    expect(currentUrl).toContain('inventory');

    // And: User menu should display the logged-in username
    const isUserLoggedIn = await inventoryPage.isUserLoggedIn();
    expect(isUserLoggedIn).toBeTruthy();
  });

  test('TC-002: Login failure with invalid credentials', async ({ page }) => {
    // Given: User is on SauceDemo login page
    const isLoginButtonVisible = await loginPage.isLoginButtonVisible();
    expect(isLoginButtonVisible).toBeTruthy();

    // When: User enters invalid username and password and clicks login
    await loginPage.login('invalid_user', 'invalid_password');

    // Then: Error message should be displayed
    const isErrorDisplayed = await loginPage.isErrorMessageDisplayed();
    expect(isErrorDisplayed).toBeTruthy();

    // And: User should remain on the login page
    const currentUrl = await loginPage.getCurrentUrl();
    expect(currentUrl).toContain('saucedemo.com');
    expect(currentUrl).not.toContain('inventory');
  });

  test('TC-003: Login failure with empty credentials', async ({ page }) => {
    // Given: User is on SauceDemo login page
    const isLoginButtonVisible = await loginPage.isLoginButtonVisible();
    expect(isLoginButtonVisible).toBeTruthy();

    // When: User clicks login without entering credentials
    await loginPage.clickLoginButton();

    // Then: Error message should be displayed
    const isErrorDisplayed = await loginPage.isErrorMessageDisplayed();
    expect(isErrorDisplayed).toBeTruthy();

    const errorMessage = await loginPage.getErrorMessage();
    expect(errorMessage.toLowerCase()).toContain('required');
  });
});
```

#### src/tests/checkout.spec.ts
```typescript
import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';
import { InventoryPage } from '../pages/inventoryPage';
import { CheckoutPage } from '../pages/checkoutPage';

test.describe('Checkout Tests', () => {
  let loginPage: LoginPage;
  let inventoryPage: InventoryPage;
  let checkoutPage: CheckoutPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    inventoryPage = new InventoryPage(page);
    checkoutPage = new CheckoutPage(page);

    // Login before each test
    await loginPage.goto();
    const username = process.env.VALID_USERNAME || 'standard_user';
    const password = process.env.VALID_PASSWORD || 'secret_sauce';
    await loginPage.login(username, password);

    // Wait for inventory page to load
    await inventoryPage.waitForInventoryPage();
  });

  test('TC-004: Complete successful order', async ({ page }) => {
    // Given: User is logged in to the application
    const isUserLoggedIn = await inventoryPage.isUserLoggedIn();
    expect(isUserLoggedIn).toBeTruthy();

    // When: User selects a product and adds it to cart
    const productName = 'Sauce Labs Backpack';
    await inventoryPage.addProductToCart(productName);

    // Verify item was added to cart
    let cartCount = await inventoryPage.getCartItemCount();
    expect(cartCount).toBeTruthy();

    // And: User proceeds to checkout
    inventoryPage = new InventoryPage(page);
    await inventoryPage.goToCart();

    // Wait for checkout button and click it
    const checkoutButton = page.locator('[data-test="checkout"]');
    await checkoutButton.waitFor({ state: 'visible' });
    await checkoutButton.click();

    // And: User fills in shipping information
    checkoutPage = new CheckoutPage(page);
    await checkoutPage.fillShippingInfo('John', 'Doe', '12345');

    // And: User confirms order
    await checkoutPage.clickContinue();

    // Wait for summary page to load
    await page.waitForURL(/.*checkout-step-two/);

    await checkoutPage.clickFinish();

    // Then: Order confirmation page should be displayed
    const isConfirmationDisplayed = await checkoutPage.isOrderConfirmationDisplayed();
    expect(isConfirmationDisplayed).toBeTruthy();

    // And: Confirmation message should contain order number
    const confirmationMessage = await checkoutPage.getConfirmationMessage();
    expect(confirmationMessage).toBeTruthy();

    const orderDetails = await checkoutPage.getOrderDetails();
    expect(orderDetails.toLowerCase()).toContain('order');
  });
});
```

#### src/fixtures/testFixtures.ts
```typescript
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
```

#### src/config/testConfig.ts
```typescript
/**
 * Test Configuration
 * Centralized configuration for test environment
 */

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
      baseURL: 'https://www.saucedemo.com',
      username: process.env.VALID_USERNAME || 'standard_user',
      password: process.env.VALID_PASSWORD || 'secret_sauce',
      timeout: 30000,
      retries: 0,
    },
    staging: {
      baseURL: process.env.BASE_URL || 'https://staging.saucedemo.com',
      username: process.env.VALID_USERNAME || 'standard_user',
      password: process.env.VALID_PASSWORD || 'secret_sauce',
      timeout: 30000,
      retries: 1,
    },
    production: {
      baseURL: process.env.BASE_URL || 'https://www.saucedemo.com',
      username: process.env.VALID_USERNAME || 'standard_user',
      password: process.env.VALID_PASSWORD || 'secret_sauce',
      timeout: 30000,
      retries: 1,
    },
  };

  return config[environment] || config.local;
}
```

#### src/utils/logger.ts
```typescript
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
```

#### src/utils/helpers.ts
```typescript
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
```

#### tsconfig.json
```json
{
  "compilerOptions": {
    "target": "ES2020",
    "useDefineForClassFields": true,
    "lib": ["ES2020", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "skipLibCheck": true,
    "strict": true,
    "esModuleInterop": true,
    "moduleResolution": "node",
    "allowSyntheticDefaultImports": true,
    "resolveJsonModule": true,
    "declaration": true,
    "declarationMap": true,
    "sourceMap": true,
    "outDir": "./dist",
    "rootDir": "./",
    "baseUrl": "./",
    "paths": {
      "@pages/*": ["src/pages/*"],
      "@tests/*": ["src/tests/*"],
      "@fixtures/*": ["src/fixtures/*"],
      "@utils/*": ["src/utils/*"],
      "@config/*": ["src/config/*"]
    }
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "dist"]
}
```

#### .gitignore
```
# Dependencies
node_modules/
yarn.lock

# Build outputs
dist/
build/

# Playwright
.playwright/
test-results/
blob-report/
playwright-report/
.auth/

# Environment
.env
.env.local
.env.*.local
```

#### package.json
```json
{
  "name": "playwright-ts-framework",
  "version": "1.0.0",
  "description": "Professional Playwright TypeScript test automation framework for SauceDemo",
  "main": "index.js",
  "scripts": {
    "test": "playwright test",
    "test:headed": "playwright test --headed",
    "test:debug": "playwright test --debug",
    "test:ui": "playwright test --ui",
    "test:report": "playwright show-report",
    "test:chrome": "playwright test --project=chromium",
    "test:firefox": "playwright test --project=firefox",
    "test:serial": "playwright test --workers=1",
    "test:parallel": "playwright test --workers=4",
    "test:parallel:all": "playwright test --workers=4 --project=chromium --project=firefox --project=webkit",
    "lint": "eslint src/**/*.ts"
  },
  "keywords": [
    "playwright",
    "typescript",
    "test automation",
    "qa",
    "e2e"
  ],
  "author": "",
  "license": "MIT",
  "devDependencies": {
    "@playwright/test": "^1.44.0",
    "@types/node": "^20.0.0",
    "typescript": "^5.0.0",
    "dotenv": "^16.0.0",
    "ts-node": "^10.9.0",
    "@typescript-eslint/eslint-plugin": "^6.0.0",
    "@typescript-eslint/parser": "^6.0.0",
    "eslint": "^8.0.0"
  }
}
```

#### playwright.config.ts
```typescript
import { defineConfig, devices } from '@playwright/test';
import * as dotenv from 'dotenv';

dotenv.config();

/**
 * Playwright configuration for test automation
 * Read more: https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: './src/tests',
  /* Test timeout per test */
  timeout: 30 * 1000,
  expect: {
    timeout: 15000,
  },
  /* Parallel Execution Configuration */
  fullyParallel: true,
  /* Number of parallel workers: 4 for local, 1 for CI */
  workers: process.env.CI ? 1 : 4,
  /* Forbid .only on CI */
//   forbidOnly: !!process.env.CI,
  /* Retries: 1 for CI, 0 for local */
  retries: process.env.CI ? 1 : 0,
  reporter: [
    ['html'],
    ['json', { outputFile: 'test-results/results.json' }],
    ['junit', { outputFile: 'test-results/junit.xml' }],
    ['list'],
  ],
  use: {
    baseURL: process.env.BASE_URL || 'https://www.saucedemo.com',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    actionTimeout: 10 * 1000,
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'] },
    // },
    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },

    // /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run dev',
  //   url: 'http://127.0.0.1:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
```

### Framework Requirements & Best Practices

#### 1. Base Page Object Model
- Implement a base page class with common methods (click, fill, navigate, etc.)
- Include proper wait strategies
- Add logging for all interactions
- Use locators efficiently with data attributes when possible

#### 2. Page Objects
- **LoginPage**: Handle login form interactions (username, password fields, login button)
- **InventoryPage**: Handle product list, cart interactions, product selection
- **CheckoutPage**: Handle checkout flow (shipping info, payment, confirmation)

#### 3. Test Cases

**Login Tests (login.spec.ts):**
- ✅ Test Case 1: Successful login with valid credentials
  - Username: `standard_user`
  - Password: `secret_sauce`
  - Verify user is redirected to inventory page
  - Verify user menu is visible with user name displayed

- ❌ Test Case 2: Login failure with invalid credentials
  - Username: `invalid_user`
  - Password: `invalid_password`
  - Verify error message is displayed
  - Verify user remains on login page

- ❌ Test Case 3: Login failure with empty credentials
  - Leave username and password empty
  - Verify error message for required fields

**Checkout Test (checkout.spec.ts):**
- ✅ Test Case 4: Complete successful order
  - Login with valid credentials
  - Add product to cart (e.g., "Sauce Labs Backpack")
  - Proceed to checkout
  - Fill in shipping information (First Name, Last Name, Zip Code)
  - Complete order
  - Verify order confirmation message is displayed
  - Verify order confirmation message displays order number

#### 4. Test Configuration (playwright.config.ts)
- Base URL: `https://www.saucedemo.com`
- Timeout: 30 seconds per test
- Retries: 1 for CI, 0 for local
- Screenshots on failure
- Video recording for failed tests only
- **Parallel Execution**:
  - Enable fully parallel mode: `fullyParallel: true`
  - Workers: 4 for local execution, 1 for CI
  - Sharding strategy for distributed testing
  - Isolated test environments to prevent conflicts
- Configure multiple projects (Chrome, Firefox) (optional)

#### 5. Fixtures (testFixtures.ts)
- Create a page fixture that initializes page object
- Create a loginFixture that logs in the user automatically
- Use Playwright's built-in fixtures extension
- Ensure fixtures are compatible with parallel execution (isolated state per worker)

#### 6. Environment Configuration
- Use `.env` file for storing credentials and URLs
- Support environment variables for different environments (local, staging, production)
- Never commit secrets to repository

#### 7. Utilities & Helpers
- **Logger**: Custom logging utility for test execution tracking
- **Helpers**: Common helper functions (random data generation, wait functions, etc.)

#### 8. CI/CD Setup (GitHub Actions)

**File: .github/workflows/playwright.yml**

Requirements:
- Trigger on push to main/master and pull requests
- Run tests on Ubuntu latest
- Install dependencies
- Run Playwright tests in CI mode
- Upload test reports as artifacts
- Configure concurrency and job status notifications
- Matrix strategy to test on multiple Node.js versions (18.x, 20.x)

#### 9. Test Reports and Artifacts

**Report Formats:**
- HTML Report: Interactive, visual test results with videos and screenshots
- JSON Report: Structured data for CI/CD integration and custom processing
- JUnit XML Report: Standard format for CI/CD tools (Jenkins, GitLab, etc.)
- List Report: Console output of test results

**Report Features:**
- Screenshots of failed tests
- Video recordings of failed test executions
- Detailed failure traces and error messages
- Test execution duration and timings
- Browser/project breakdown for parallel results
- HTML report includes timeline view and test categorization

**Viewing Reports:**
```bash
# Open HTML report in browser
npm run test:report

# Reports location:
# - playwright-report/         (HTML - interactive)
# - test-results/results.json  (JSON - structured)
# - test-results/junit.xml     (JUnit XML - CI tools)
# - blob-report/               (Artifacts from parallel execution)
```

#### 10. Code Quality Standards
- Use TypeScript strict mode
- Implement proper error handling
- Follow ESLint rules (configure in project)
- Use async/await consistently
- Implement meaningful assertion messages
- Add proper comments and documentation

#### 11. Documentation
- Comprehensive README.md with:
  - Project overview
  - Prerequisites
  - Installation steps
  - How to run tests locally
  - How to run tests with different configurations
  - Report generation and viewing
  - CI/CD pipeline description
  - Best practices followed
  - Troubleshooting guide

---

## Phase 3: Sample Test Implementation Details

### Test Scenario 1: Login with Valid Credentials
```
Given: User is on SauceDemo login page
When: User enters valid username and password and clicks login
Then: User should be redirected to inventory page
And: User menu should display the logged-in username
```

### Test Scenario 2: Login with Invalid Credentials
```
Given: User is on SauceDemo login page
When: User enters invalid username and password and clicks login
Then: Error message should be displayed
And: User should remain on the login page
```

### Test Scenario 3: Successful Order Checkout
```
Given: User is logged in to the application
When: User selects a product and adds it to cart
And: User proceeds to checkout
And: User fills in shipping information
And: User confirms the order
Then: Order confirmation page should be displayed
And: Confirmation message should contain order number
```

---

## Phase 4: Additional Requirements

### Package.json Scripts
```json
{
  "scripts": {
    "test": "playwright test",
    "test:headed": "playwright test --headed",
    "test:debug": "playwright test --debug",
    "test:ui": "playwright test --ui",
    "test:report": "playwright show-report",
    "test:chrome": "playwright test --project=chromium",
    "test:firefox": "playwright test --project=firefox",
    "test:serial": "playwright test --workers=1",
    "test:parallel": "playwright test --workers=4",
    "test:parallel:all": "playwright test --workers=4 --project=chromium --project=firefox --project=webkit",
    "lint": "eslint src/**/*.ts"
  }
}
```

### .gitignore Content
- node_modules/
- dist/
- .env (but include .env.example)
- test-results/
- playwright-report/
- blob-report/
- playwright/.cache/
- .DS_Store

### Secrets Management
- Use GitHub Secrets for storing sensitive data in CI/CD
- Configure GitHub Actions to use secrets for credentials

---

## Validation Checklist

Once the framework is generated, verify:

- [ ] All directory structure is created as specified
- [ ] Page Object Model classes are implemented correctly
- [ ] All test cases are written and passing
- [ ] Base page object has proper wait strategies
- [ ] Logger utility is working
- [ ] Environment configuration (.env) is set up
- [ ] Playwright config includes all required settings
- [ ] GitHub Actions workflow file is created
- [ ] Tests run successfully locally in headless mode
- [ ] Tests generate reports (HTML, JSON)
- [ ] README.md contains complete setup instructions
- [ ] Code follows TypeScript best practices
- [ ] No hardcoded credentials in code

---

## Running the Framework

### Local Execution
```bash
# Run all tests in parallel (4 workers by default)
npm test

# Run in headed mode (see browser)
npm run test:headed

# Run specific test file
npx playwright test src/tests/login.spec.ts

# Run in UI mode (interactive)
npm run test:ui

# Run tests serially (one at a time)
npm run test:serial

# Run tests with explicit parallel workers
npm run test:parallel

# Run tests in parallel across all browsers
npm run test:parallel:all

# View test reports (HTML)
npm run test:report

# View test results in different formats:
# - HTML Report: playwright-report/index.html (interactive UI)
# - JSON Report: test-results/results.json (structured data)
# - JUnit XML: test-results/junit.xml (CI/CD tools)
```

### Generating and Viewing Reports

After test execution, Playwright automatically generates comprehensive reports:

```bash
# View HTML report in browser
npm run test:report

# View JSON results for custom processing
cat test-results/results.json

# Check JUnit XML for CI/CD integration
cat test-results/junit.xml
```

**Report Artifacts:**
- Screenshots of failed tests in `playwright-report/`
- Video recordings of failed tests (if configured)
- Test timings and execution details
- Error traces and stack traces
- Browser/project-specific breakdowns for parallel runs

### CI/CD Execution
- Tests will run automatically on push to main/master
- Tests will run on pull requests
- Reports will be generated and attached to workflow runs
- Multi-browser matrix execution (Node.js 18.x, 20.x)
- Artifact uploads with 30-day retention
- Test results published to workflow summary

**CI/CD Report Artifacts:**
- Playwright HTML reports per Node.js version
- JUnit XML for test result publishing
- Test results JSON for CI/CD analysis
- Screenshots and videos from failed tests (30-day retention)

---

## Phase 3: Running and Validating the Framework

Once the framework files are generated and dependencies are installed, follow these steps to run the tests on your machine:

### Step 3.1: Install Dependencies

```bash
npm install
```

### Step 3.2: Install Playwright Browsers

```bash
npx playwright install
```

### Step 3.3: Run the Tests

**Run all tests:**
```bash
npm run test:all
```

**Run tests in headed mode (visible browser):**
```bash
npm run test:headed
```

**Run tests with Playwright UI mode:**
```bash
npm run test:ui
```

**Run specific test file:**
```bash
npx playwright test src/tests/login.spec.ts
```

### Step 3.4: View Test Reports

After running tests, view the HTML report:
```bash
npm run test:report
```

This will open the interactive Playwright report in your browser showing test results, screenshots, and videos.

### Step 3.5: Verify Everything Works

- Tests should pass for the SauceDemo application
- Reports should generate successfully
- Screenshots should be captured on failures
- CI/CD pipeline should work when pushed to GitHub

**Expected Output:**
- All tests pass (green checkmarks)
- HTML report opens with detailed results
- No installation or runtime errors

---

**Framework is now ready to use!** You can modify the tests, add new page objects, or adapt it for other web applications.

## Next Steps

1. **Confirm prerequisites are complete**
2. **Request framework generation**
3. **Run framework locally**
4. **Execute tests and verify passing**
5. **Push to GitHub repository**
6. **Verify CI/CD pipeline works**

---

**Ready to proceed?**

Please state "Prerequisites complete. Ready to generate framework." when you have completed all prerequisite checks and are ready for the framework generation phase.
