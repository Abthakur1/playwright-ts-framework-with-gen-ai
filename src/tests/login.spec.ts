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