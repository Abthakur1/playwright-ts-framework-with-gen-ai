# Playwright TypeScript UI + API Automation Framework

Production-ready Playwright + TypeScript framework that supports:
- UI automation for SauceDemo using Page Object Model.
- API automation for ReqRes endpoints with shared client utilities.

## Highlights

- Unified test framework for both UI and API test layers.
- Page Object Model for scalable and maintainable UI tests.
- Reusable API client abstraction with default headers.
- Test fixtures, config, utilities, and test data separation.
- Multi-project Playwright setup (UI browsers + API project).
- HTML reporting and CI workflow support.

## Prerequisites

- Node.js 18+
- npm 9+

## Setup

1. Install dependencies:

```bash
npm install
```

2. Install Playwright browsers:

```bash
npx playwright install
```

3. Optional environment setup:

```bash
copy .env.example .env
```

## Run Tests

Run all tests:

```bash
npm test
```

Run API tests only:

```bash
npm run test:api
```

Run UI tests (Chromium project):

```bash
npm run test:ui:chromium
```

Run UI tests (Firefox project):

```bash
npm run test:ui:firefox
```

Run UI tests in headed mode:

```bash
npm run test:headed
```

Run tests in debug mode:

```bash
npm run test:debug
```

Open the Playwright HTML report:

```bash
npm run report
```

## Framework Structure

```
playwright-ts-framework-with-genAI/
├── .github/
│   └── workflows/
│       └── playwright.yml
├── reports/
├── screenshots/
├── playwright-report/
├── test-results/
├── src/
│   ├── api/
│   │   ├── clientAPI.ts               # Base API client (GET/POST/PUT/DELETE + default headers)
│   │   └── usersAPI.ts                # ReqRes users/auth API methods
│   ├── config/
│   │   ├── testConfig.ts              # Runtime/test environment configuration
│   │   └── testData.ts                # Reusable test data
│   ├── fixtures/
│   │   └── testFixtures.ts            # Shared Playwright fixtures
│   ├── pages/
│   │   ├── basePage.ts                # Base page actions
│   │   ├── loginPage.ts               # Login page object
│   │   ├── inventoryPage.ts           # Inventory page object
│   │   └── checkoutPage.ts            # Checkout page object
│   ├── tests/
│   │   ├── api/
│   │   │   ├── reqresApiPositive.spec.ts
│   │   │   └── reqresApiNegative.spec.ts
│   │   └── ui/
│   │       ├── login.spec.ts
│   │       └── checkout.spec.ts
│   └── utils/
│       ├── helpers.ts                 # Common utility methods
│       └── logger.ts                  # Logging utility
├── playwright.config.ts               # Playwright projects/configuration
├── package.json                       # NPM scripts and dependencies
├── tsconfig.json                      # TypeScript compiler settings
├── playwright-blueprint.prompt.md
├── ui-api-automation-framework.prompt.md
└── README.md
```

## Playwright Projects

Configured projects in playwright.config.ts:
- chromium: default browser test project.
- api: API-only tests from src/tests/api.
- uichromium: UI tests from src/tests/ui on Desktop Chrome.
- ui-firefox: UI tests from src/tests/ui on Desktop Firefox.

## NPM Scripts

- npm test
- npm run test:api
- npm run test:ui:chromium
- npm run test:ui:firefox
- npm run test:headed
- npm run test:debug
- npm run report
- npm run lint
- npm run lint:fix
- npm run type-check

## Notes

- UI base URL is configured in playwright.config.ts.
- API tests use ReqRes endpoints via src/api/clientAPI.ts and src/api/usersAPI.ts.
- Default API headers (including x-api-key) are centralized in clientAPI.ts.

## License

This project is licensed under the ISC License.