import { APIRequestContext, APIResponse } from "@playwright/test";

export class ClientAPI {
  protected request: APIRequestContext;
  protected baseURL: string;

  constructor(request: APIRequestContext) {
    this.request = request;
    this.baseURL = "https://reqres.in";
  }

  /**
   * Generic GET method
   * @param path - The API endpoint path
   * @param headers - Optional custom headers
   * @returns APIResponse
   */
  protected async get(path: string, headers?: Record<string, string>): Promise<APIResponse> {
    return await this.request.get(`${this.baseURL}${path}`, {
      headers: headers || this.getDefaultHeaders()
    });
  }

  /**
   * Generic POST method
   * @param path - The API endpoint path
   * @param data - Request body data
   * @param headers - Optional custom headers
   * @returns APIResponse
   */
  protected async post(path: string, data: any, headers?: Record<string, string>): Promise<APIResponse> {
    return await this.request.post(`${this.baseURL}${path}`, {
      data,
      headers: headers || this.getDefaultHeaders()
    });
  }

  /**
   * Generic PUT method
   * @param path - The API endpoint path
   * @param data - Request body data
   * @param headers - Optional custom headers
   * @returns APIResponse
   */
  protected async put(path: string, data: any, headers?: Record<string, string>): Promise<APIResponse> {
    return await this.request.put(`${this.baseURL}${path}`, {
      data,
      headers: headers || this.getDefaultHeaders()
    });
  }

  /**
   * Generic DELETE method
   * @param path - The API endpoint path
   * @param headers - Optional custom headers
   * @returns APIResponse
   */
  protected async delete(path: string, headers?: Record<string, string>): Promise<APIResponse> {
    return await this.request.delete(`${this.baseURL}${path}`, {
      headers: headers || this.getDefaultHeaders()
    });
  }

  /**
   * Get default headers with API key and content type
   * @returns Default headers object
   */
  protected getDefaultHeaders(): Record<string, string> {
    return {
      'Content-Type': 'application/json',
      'x-api-key': ''
    };
  }
}