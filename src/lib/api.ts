/**
 * API Configuration
 * Handles base URL configuration and common API request functionality
 */

// Get the API base URL from environment variables
const getApiBaseUrl = (): string => {
  // In development, use local backend
  if (process.env.NODE_ENV === "development") {
    return process.env.NEXT_PUBLIC_DEV_API_URL || "http://localhost:8000/api";
  }

  // In production, use production API URL
  return process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";
};

export const API_BASE_URL = getApiBaseUrl();

/**
 * Centralized API request function with error handling
 */
interface ApiRequestOptions {
  method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  headers?: Record<string, string>;
  body?: any;
  token?: string;
}

export const apiRequest = async (
  endpoint: string,
  options: ApiRequestOptions = {},
): Promise<any> => {
  const { method = "GET", headers = {}, body, token } = options;

  // Build the full URL
  const url = `${API_BASE_URL}${endpoint}`;

  // Default headers
  const defaultHeaders: Record<string, string> = {
    "Content-Type": "application/json",
    ...headers,
  };

  // Add authorization header if token is provided
  if (token) {
    defaultHeaders["Authorization"] = `Bearer ${token}`;
  }

  // Prepare fetch options
  const fetchOptions: RequestInit = {
    method,
    headers: defaultHeaders,
  };

  // Add body for non-GET requests
  if (body && method !== "GET") {
    fetchOptions.body = JSON.stringify(body);
  }

  try {
    const response = await fetch(url, fetchOptions);

    // Handle non-JSON responses (like 204 No Content)
    if (response.status === 204) {
      return { success: true };
    }

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || `HTTP error! status: ${response.status}`);
    }

    return data;
  } catch (error) {
    console.error(`API request failed for ${endpoint}:`, error);
    throw error;
  }
};

/**
 * API endpoints configuration
 */
export const API_ENDPOINTS = {
  auth: {
    login: "/auth/login",
    register: "/auth/register",
    logout: "/auth/logout",
    refresh: "/auth/refresh",
    verify: "/auth/verify",
    resetPassword: "/auth/reset-password",
    forgotPassword: "/auth/forgot-password",
  },
} as const;

/**
 * Helper functions for specific API operations
 */
export const authApi = {
  login: (credentials: {
    email: string;
    password: string;
    remember?: boolean;
  }) =>
    apiRequest(API_ENDPOINTS.auth.login, {
      method: "POST",
      body: credentials,
    }),

  register: (userData: {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
  }) =>
    apiRequest(API_ENDPOINTS.auth.register, {
      method: "POST",
      body: userData,
    }),

  logout: (token: string) =>
    apiRequest(API_ENDPOINTS.auth.logout, {
      method: "POST",
      token,
    }),

  refreshToken: (refreshToken: string) =>
    apiRequest(API_ENDPOINTS.auth.refresh, {
      method: "POST",
      body: { refreshToken },
    }),
};
