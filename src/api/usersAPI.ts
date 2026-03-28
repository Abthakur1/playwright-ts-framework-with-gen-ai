import { APIResponse } from '@playwright/test';
import { ClientAPI } from './clientAPI';

export class UsersAPI extends ClientAPI {
  async getUsers(path: number = 2): Promise<APIResponse> {
    return this.get(`/api/users/${path}`);
  }

  async getUser(userId: number): Promise<APIResponse> {
    return this.get(`/api/users/${userId}`);
  }

  async createUser(userData: { name: string; job: string }): Promise<APIResponse> {
    return this.post(`/api/users`, userData);
  }

  async registerUser(userData: { email: string; password?: string }): Promise<APIResponse> {
    return this.post(`/api/register`, userData);
  }

  async loginUser(userData: { email: string; password?: string }): Promise<APIResponse> {
    return this.post(`/api/login`, userData);
  }

  async updateUser(userId: number, userData: { name?: string; job?: string }): Promise<APIResponse> {
    return this.put(`/api/users/${userId}`, userData);
  }

  async deleteUser(userId: number): Promise<APIResponse> {
    return this.delete(`/api/users/${userId}`);
  }

  async getUserWithCustomHeaders(userId: number, headers: Record<string, string>): Promise<APIResponse> {
    return this.get(`/api/users/${userId}`, headers);
  }
}