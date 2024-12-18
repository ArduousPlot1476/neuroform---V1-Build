import { API_CONFIG } from './config';
import { applySecurityMiddleware } from './middleware';
import type { ApiResponse, RequestOptions } from './types';

class ApiClient {
  private baseUrl: string;

  constructor() {
    this.baseUrl = API_CONFIG.baseUrl;
  }

  private async request<T>(
    endpoint: string,
    options: RequestOptions = {}
  ): Promise<ApiResponse<T>> {
    // Apply security middleware
    const secureOptions = applySecurityMiddleware(options);

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), API_CONFIG.timeout);

    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        ...secureOptions,
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Request failed');
      }

      const data = await response.json();
      return {
        data,
        status: response.status,
        headers: response.headers,
      };
    } catch (error) {
      clearTimeout(timeoutId);
      throw error;
    }
  }

  // ... rest of the ApiClient implementation remains the same
}

export const apiClient = new ApiClient();