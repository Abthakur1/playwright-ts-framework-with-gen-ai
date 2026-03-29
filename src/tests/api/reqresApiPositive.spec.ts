import { test, expect, APIRequestContext } from "@playwright/test";
import { UsersAPI } from "../../api/usersAPI";

test.describe("Reqres API Users CRUD workflow (GET/POST/PUT/DELETE)", () => {
  let usersAPI: UsersAPI;

  test.beforeEach(async ({ playwright }) => {
    const requestContext = await playwright.request.newContext();
    usersAPI = new UsersAPI(requestContext);
  });

  test("GET - Verify users list returns 200 and data array exists", async () => {
    const response = await usersAPI.getUsers();
    expect(response.status()).toBe(200);
    const responseBody = await response.json();

    expect(responseBody).toHaveProperty("data");
  });

  test("GET - Verify existing user by ID returns 200 and user schema properties exist", async () => {
    const id: number = 1;
    const response = await usersAPI.getUser(id);
    expect(response.status()).toBe(200);
    const responseBody = await response.json();

    expect(responseBody).toHaveProperty("data");
    expect(responseBody.data).toHaveProperty("id", id);
    expect(responseBody.data).toHaveProperty("email");
    expect(responseBody.data).toHaveProperty("first_name");
    expect(responseBody.data).toHaveProperty("last_name");
    expect(responseBody.data).toHaveProperty("avatar");
  });

  test("POST - Verify create user returns 201 and response includes id, createdAt, name, job", async () => {
    const userData = {
      name: "John Doe",
      job: "Software Engineer",
    };

    const response = await usersAPI.createUser(userData);
    expect(response.status()).toBe(201);
    const responseBody = await response.json();

    expect(responseBody).toHaveProperty("id");
    expect(responseBody).toHaveProperty("createdAt");
    expect(responseBody.name).toBe(userData.name);
    expect(responseBody.job).toBe(userData.job);
  });

  test("PUT - Verify update user returns 200 and response body reflects updated name/job", async () => {
    const userData = {
      name: "Jane Doe",
      job: "Senior Engineer",
    };

    const response = await usersAPI.updateUser(2, userData);
    const responseBody = await response.json();
    expect(response.status()).toBe(200);

    expect(responseBody.name).toBe(userData.name);
    expect(responseBody.job).toBe(userData.job);
  });

  test("DELETE - Verify delete user returns 204 and response is empty object", async () => {
    const response = await usersAPI.deleteUser(2);
    expect(response.status()).toBe(204);
  
    expect(await response.text()).toBe("");
  });
});
