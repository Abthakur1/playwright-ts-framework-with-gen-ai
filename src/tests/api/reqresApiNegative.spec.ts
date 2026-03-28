import { test, expect } from "@playwright/test";
import { UsersAPI } from "../../api/usersAPI";

test.describe("Reqres API Negative Tests", () => {
  let usersAPI: UsersAPI;

  test.beforeEach(async ({ playwright }) => {
    const requestContext = await playwright.request.newContext();
    usersAPI = new UsersAPI(requestContext);
  });

  test("NEGATIVE GET - Verify non-existent user returns 404 with empty body", async () => {
    const response = await usersAPI.getUser(999);
    expect(response.status()).toBe(404);

    const responseBody = await response.json();
    expect(responseBody).toEqual({});
  });

  test("NEGATIVE POST - Verify register with missing password returns 400", async () => {
    const response = await usersAPI.registerUser({
      email: "sydney@fife",
    });

    expect(response.status()).toBe(400);

    const responseBody = await response.json();
    expect(responseBody).toHaveProperty("error", "Missing password");
  });

  test("NEGATIVE POST - Verify login with missing password returns 400", async () => {
    const response = await usersAPI.loginUser({
      email: "peter@klaven",
    });

    expect(response.status()).toBe(400);

    const responseBody = await response.json();
    expect(responseBody).toHaveProperty("error", "Missing password");
  });

  test.only("NEGATIVE GET - Verify invalid API key returns 403", async () => {
    const response = await usersAPI.getUserWithCustomHeaders(2, {
      "Content-Type": "application/json",
      "x-api-key": "invalid_api_key",
    });
    expect(response.status()).toBe(403);
  });

  test("NEGATIVE GET - Verify missing headers returns 4xx", async () => {
    const response = await usersAPI.getUserWithCustomHeaders(2, {});
    console.log(response.status());
    expect(response.status()).toBe(403);
  });
});
