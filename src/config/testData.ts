/**
 * Test Data
 * Centralized test data for various test scenarios
 */

export interface ShippingInfo {
  firstName: string;
  lastName: string;
  zipCode: string;
}

/**
 * Default shipping information for checkout tests
 */
export const defaultShippingInfo: ShippingInfo = {
  firstName: 'John',
  lastName: 'Doe',
  zipCode: '12345',
};

// Product names for inventory tests
export const products = {
  backpack: 'Sauce Labs Backpack',
  bikeLight: 'Sauce Labs Bike Light',
};
