# Playwright TypeScript Test Automation Framework

A professional, production-ready test automation framework built with Playwright and TypeScript for testing the SauceDemo web application.

## Features

- **Page Object Model (POM)**: Well-structured page objects for maintainable code
- **TypeScript**: Full type safety and modern JavaScript features
- **Custom Fixtures**: Reusable test fixtures for common setup
- **Configuration Management**: Environment-based configuration
- **Logging**: Custom logging utility for test execution tracking
- **Helper Utilities**: Common helper functions for test automation
- **CI/CD Ready**: GitHub Actions workflow for automated testing
- **Cross-browser Testing**: Support for Chromium, Firefox, and WebKit
- **Parallel Execution**: Run tests in parallel for faster execution

## Prerequisites

- Node.js 18.x or higher
- npm 9.x or higher

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd playwright-ts-framework
```

2. Install dependencies:
```bash
npm install
```

3. Install Playwright browsers:
```bash
npx playwright install
```

## Configuration

1. Copy the environment file:
```bash
cp .env.example .env
```

2. Update the `.env` file with your test configuration if needed.

## Running Tests

### Run all tests
```bash
npm test
```

### Run tests in headed mode (visible browser)
```bash
npm run test:headed
```

### Run tests with Playwright UI mode
```bash
npm run test:ui
```

### Run tests in debug mode
```bash
npm run test:debug
```

### Run specific test file
```bash
npx playwright test src/tests/login.spec.ts
```

### Run tests with specific browser
```bash
npx playwright test --project=chromium
```

## Project Structure

```
playwright-ts-framework/
├── .github/
│   └── workflows/
│       └── playwright.yml          # CI/CD pipeline
├── src/
│   ├── tests/
│   │   ├── login.spec.ts           # Login test scenarios
│   │   └── checkout.spec.ts        # Checkout test scenarios
│   ├── pages/
│   │   ├── basePage.ts             # Base page object with common methods
│   │   ├── loginPage.ts            # Login page object
│   │   ├── inventoryPage.ts        # Inventory/products page object
│   │   └── checkoutPage.ts         # Checkout page object
│   ├── fixtures/
│   │   └── testFixtures.ts         # Custom Playwright fixtures
│   ├── utils/
│   │   ├── logger.ts               # Custom logging utility
│   │   └── helpers.ts              # Helper utility functions
│   └── config/
│       └── testConfig.ts           # Test configuration management
├── .env.example                    # Environment variables template
├── .env                            # Environment variables (gitignored)
├── .gitignore                      # Git ignore rules
├── playwright.config.ts            # Playwright configuration
├── package.json                    # Project dependencies and scripts
├── tsconfig.json                   # TypeScript configuration
└── README.md                       # This file
```

## Test Scenarios

### Login Tests (login.spec.ts)
- **TC-001**: Successful login with valid credentials
- **TC-002**: Login failure with invalid credentials
- **TC-003**: Login failure with empty credentials

### Checkout Tests (checkout.spec.ts)
- **TC-004**: Complete successful order

## Configuration

The framework supports multiple environments (local, staging, production) through the `testConfig.ts` file. Environment-specific settings can be configured using environment variables.

## Logging

The framework includes a custom logger that provides structured logging for test execution. Logs include timestamps, test names, and log levels.

## Contributing

1. Follow the existing code structure and naming conventions
2. Add appropriate TypeScript types
3. Include JSDoc comments for new methods
4. Add tests for new functionality
5. Update documentation as needed

## License

This project is licensed under the ISC License.