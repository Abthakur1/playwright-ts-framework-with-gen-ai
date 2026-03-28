# API + UI Automation Framework Prompt Library

## Overview

This prompt library captures the exact Playwright + TypeScript framework implemented in this repository. It is tailored for QA engineers seeking a ready-to-run architecture with both UI and API automation:

- UI Page Object Model (`loginPage`, `inventoryPage`, `checkoutPage`)
- API client abstraction (`ClientAPI`, `UsersAPI`)
- Reusable fixtures and environment-driven behavior
- Dedicated Playwright projects for UI and API tests

---

## Goal

Recreate exactly the same architecture and implementation as this repository:

- `src/api/clientAPI.ts` generic API wrapper
- `src/api/usersAPI.ts` user CRUD operations to Reqres
- `src/tests/api/reqresApiUsers.spec.ts` API CRUD tests
- `src/tests/ui/login.spec.ts`, `src/tests/ui/checkout.spec.ts` UI tests
- `src/fixtures/testFixtures.ts` shared and authenticated fixtures
- `src/pages/*.ts` page objects for SauceDemo flows
- `playwright.config.ts` with projects: `chromium`, `api`, `uichromium`, `ui-firefox`

---

## Prerequisites

- Node.js 18.x+
- npm 9.x+
- Playwright (via `npm install --save-dev @playwright/test`)
- TypeScript (`npm install --save-dev typescript @types/node`)

Commands to run:

```bash
npm init -y
npm install --save-dev @playwright/test typescript @types/node
npx playwright install --with-deps
npx tsc --init
```

---

## Repository Structure

```
src/
  api/
    clientAPI.ts
    usersAPI.ts
  fixtures/
    testFixtures.ts
  pages/
    basePage.ts
    loginPage.ts
    inventoryPage.ts
    checkoutPage.ts
  tests/
    api/
      reqresApiUsers.spec.ts
    ui/
      login.spec.ts
      checkout.spec.ts
  config/
    testConfig.ts
  utils/
    helpers.ts
    logger.ts
playwright.config.ts
package.json
tsconfig.json
README.md
reports/
screenshots/
playwright-report/
```

---

## API Layer Setup (exact implementation)

### `src/api/clientAPI.ts`

- `ClientAPI` encapsulates `APIRequestContext`
- Generic methods: `get()`, `post()`, `put()`, `delete()` calling `https://reqres.in`
- `getDefaultHeaders()` returns `Content-Type: application/json` and Reqres API key `x-api-key`

### `src/api/usersAPI.ts`

- `UsersAPI` extends `ClientAPI`
- Methods:
  - `getUsers(page?: number = 2)`
  - `getUser(userId: number)`
  - `createUser(userData: { name: string; job: string })`
  - `updateUser(userId: number, userData: { name?: string; job?: string })`
  - `deleteUser(userId: number)`

---

## UI Layer Setup

### `src/pages/loginPage.ts`, `inventoryPage.ts`, `checkoutPage.ts`, `basePage.ts`

- `BasePage` common wrapper around `Page` and `Locator` actions
- `LoginPage` captures navigation and form interaction
- `InventoryPage` captures inventory listing, user logged state, navigation
- `CheckoutPage` captures checkout flow

---

## Fixtures Setup

### `src/fixtures/testFixtures.ts`

- Extends Playwright `test` with custom fixtures:
  - `loginPage`, `inventoryPage`, `checkoutPage`
  - `authenticatedPage` does login using `process.env.VALID_USERNAME` and `process.env.VALID_PASSWORD` fallback constants

---

## API Tests

### `src/tests/api/reqresApiUsers.spec.ts`

- CRUD workflow for Reqres users:
  - GET all users
  - GET user by id
  - POST create user
  - PUT update user
  - DELETE user
- Checks `status()` and response body shape, including `data` and properties

---

## UI Tests

### `src/tests/ui/login.spec.ts`

- `TC-001`: successful login with valid cred
- `TC-002`: login failure invalid cred
- `TC-003`: login failure empty cred
- Uses `LoginPage` and `InventoryPage` assertions

### `src/tests/ui/checkout.spec.ts`

- Checkout flow from cart to order completion
- Uses fixtures for authenticated sessions and checkout actions

---

## Playwright config

`playwright.config.ts` has:
- `testDir: './src/tests'`
- projects:
  - `chromium` (Desktop Chrome) for general UI
  - `api` (testDir './src/tests/api')
  - `uichromium` (testDir './src/tests/ui')
  - `ui-firefox` (testDir './src/tests/ui')
- `baseURL: 'https://www.saucedemo.com'`
- `trace: 'on-first-retry'`
- CI retries/workers

---

## Best Practices Applied

1. Single-responsibility page objects and API classes.
2. Centralized fixture lifecycle and cleanup.
3. Explicit typing in requests and response checks.
4. Clear test separation: API tests in `src/tests/api`, UI tests in `src/tests/ui`.
5. Config-driven environment with `process.env` for credentials.
6. Dedicated Playwright projects for API and cross-browser UI coverage.
7. Deterministic assertions with `expect` and payload validation.

---

## Quick run commands

```bash
npm test
npx playwright test --project=api
npx playwright test --project=uichromium
npx playwright test --project=ui-firefox
npx playwright show-report
```

---

## Notes

- This prompt file should match the code in this repository exactly and remain the single source of truth for architecture onboarding.
- Keep it updated whenever API endpoints, UI flows, or project names are renamed.


## Fixtures Setup

### `src/fixtures/testFixtures.ts`

- Extends `@playwright/test` with custom fixtures:
  - `usersAPI` to create/dispose request context

---

## API Tests

### `src/tests/api/users.spec.ts`

- Tests for all CRUD API actions (GET, POST, PUT, DELETE)
- Uses `UsersAPI` fixture/instance
- Assertions on response status and response body content

---

## Playwright config

`playwright.config.ts` to include projects:

- `api` with `testDir: './src/tests/api'`
- projects list in playwright config:
  {
  name: 'api',
  testDir: './src/tests/api',
  use: { ...devices['Desktop Chrome'] },
  }

---

## Best Practices Applied

1. Single-responsibility page objects and API classes.
2. Centralized fixture lifecycle and cleanup (`requestContext.dispose`).
3. Explicit typing in API methods (request/response payload model typings).
4. Clear test separation: API tests in `src/tests/api`, UI tests in `src/tests`.
5. Cleaner logs in page (via `logger.ts`) and explicit wait strategies.
6. Config-driven environment with `process.env` for credentials.
7. Running API tests in dedicated Playwright project for speed and stability.
8. Use of `await response.json()` and `expect(response.status())` for deterministic assertions.

---

README:

```md
## Prompt Library

This repository includes a complete prompt library in `api-automation-framework.prompt.md` to reproduce the Playwright API automation framework setup exactly as implemented.
```

---

## Quick run commands

```bash
npm test
npx playwright test --project=api
npx playwright show-report
```

---

## Notes

- This prompt is intended as a reusable community artifact.
- It details setup and best practices to onboard new contributors quickly.
