import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';
import { InventoryPage } from '../pages/inventoryPage';
import { CheckoutPage } from '../pages/checkoutPage';
import { defaultShippingInfo, products } from '../config/testData';

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
    const productName = products.backpack; // Using product name from test data
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
    await checkoutPage.fillShippingInfo(defaultShippingInfo.firstName, defaultShippingInfo.lastName, defaultShippingInfo.zipCode);

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