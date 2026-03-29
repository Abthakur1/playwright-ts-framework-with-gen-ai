# API + UI Automation Framework Prompt Library

## Overview

This prompt library reflects the current Playwright + TypeScript implementation in this repository for both UI and API automation.

Current focus areas:

- Page Object Model for SauceDemo UI flows
- API abstraction for Reqres endpoints
- Shared fixtures for reusable test setup
- Multi-project Playwright execution for UI and API
- CI pipeline with secret injection and separate UI/API report artifacts

---

## Goal

Recreate the same architecture and behavior as the current repository state.

Primary implementation targets:

- src/api/clientAPI.ts
- src/api/usersAPI.ts
- src/fixtures/testFixtures.ts
- src/pages/basePage.ts
- src/pages/loginPage.ts
- src/pages/inventoryPage.ts
- src/pages/checkoutPage.ts
- src/tests/ui/login.spec.ts
- src/tests/ui/checkout.spec.ts
- src/tests/api/reqresApiPositive.spec.ts
- src/tests/api/reqresApiNegative.spec.ts
- playwright.config.ts
- .github/workflows/playwright.yml

---

## Prerequisites

- Node.js 18+
- npm 9+

Initial setup:

```bash
npm install
npx playwright install --with-deps
```

Optional local env setup:

```bash
copy .env.example .env
```

---

## Repository Structure

```text
src/
  api/
    clientAPI.ts
    usersAPI.ts
  config/
    testConfig.ts
    testData.ts
  fixtures/
    testFixtures.ts
  pages/
    basePage.ts
    loginPage.ts
    inventoryPage.ts
    checkoutPage.ts
  tests/
    api/
      reqresApiPositive.spec.ts
      reqresApiNegative.spec.ts
    ui/
      login.spec.ts
      checkout.spec.ts
  utils/
    helpers.ts
    logger.ts
playwright.config.ts
.github/workflows/playwright.yml
README.md
```

---

## API Layer

### src/api/clientAPI.ts

- Base API wrapper around APIRequestContext
- Loads environment variables using dotenv/config
- Uses REQRES_BASE_URL with fallback
- Provides generic HTTP helpers: get, post, put, delete
- Default headers include Content-Type and x-api-key from REQRES_API_KEY

### src/api/usersAPI.ts

- Extends ClientAPI with Reqres-specific methods
- Includes positive and negative path helpers:
  - getUsers
  - getUser
  - createUser
  - registerUser
  - loginUser
  - updateUser
  - deleteUser
  - getUserWithCustomHeaders

---

## UI Layer

### Page Objects

- basePage.ts: common interactions and explicit waits
- loginPage.ts: login actions and login-page assertions
- inventoryPage.ts: inventory assertions and item/cart interactions
- checkoutPage.ts: checkout flow actions and completion assertions

### Fixtures

src/fixtures/testFixtures.ts

- Extends Playwright test with:
  - loginPage
  - inventoryPage
  - checkoutPage
  - authenticatedPage
- authenticatedPage logs in using:
  - VALID_USERNAME fallback standard_user
  - VALID_PASSWORD fallback secret_sauce

---

## Test Suites

### API tests

src/tests/api/reqresApiPositive.spec.ts

- Verifies GET, POST, PUT, DELETE happy paths
- Validates status codes and response payload structure

src/tests/api/reqresApiNegative.spec.ts

- Verifies negative scenarios like non-existent user and invalid API key

### UI tests

src/tests/ui/login.spec.ts

- TC-001 successful login
- TC-002 invalid credentials
- TC-003 empty credentials
- Uses dotenv/config and safe credential fallback for CI stability

src/tests/ui/checkout.spec.ts

- End-to-end checkout flow using authenticated fixture

---

## Playwright Configuration

Current configuration in playwright.config.ts:

- testDir: ./src/tests
- fullyParallel enabled
- CI-aware retries and workers
- reporter: html
- use.baseURL: https://www.saucedemo.com
- trace: on-first-retry
- projects:
  - chromium
  - api (testDir ./src/tests/api)
  - uichromium (testDir ./src/tests/ui, timeout 60000)
  - ui-firefox (testDir ./src/tests/ui, timeout 60000)

---

## CI Pipeline (Latest)

Workflow: .github/workflows/playwright.yml

Key behavior:

- Installs dependencies and Playwright browsers
- Injects REQRES_API_KEY from GitHub Secrets into .env at runtime
- Runs UI tests and API tests as separate Playwright commands
- Both UI and API test steps use always() so API can still run if UI fails
- Uses separate html output directories per run:
  - PLAYWRIGHT_HTML_OUTPUT_DIR=playwright-report/ui
  - PLAYWRIGHT_HTML_OUTPUT_DIR=playwright-report/api
- Uploads artifacts with separate names:
  - playwright-ui-tests-report
  - playwright-api-tests-report

GitHub Secret required:

- REQRES_API_KEY

---

## Run Commands

```bash
npm test
npm run test:api
npm run test:ui:chromium
npm run test:ui:firefox
npm run test:headed
npm run test:debug
npm run report
```

---

## Maintenance Notes

- Keep this file synchronized with real test names and paths after refactors.
- Update CI section whenever workflow step order, conditions, secrets, or artifact names change.
- Treat this document as the onboarding source of truth for architecture and execution behavior.
