// API request utilities
import { RequestOptions } from '../types';

export const createQueryString = (params: Record<string, string>): string => {
  return Object.entries(params)
    .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
    .join('&');
};

export const mergeHeaders = (
  defaultHeaders: HeadersInit,
  customHeaders?: HeadersInit
): HeadersInit => {
  if (!customHeaders) return defaultHeaders;
  
  const merged = new Headers(defaultHeaders);
  const custom = new Headers(customHeaders);
  
  custom.forEach((value, key) => {
    merged.set(key, value);
  });
  
  return merged;
};

export const createRequestOptions = (
  method: string,
  data?: unknown,
  options: RequestOptions = {}
): RequestOptions => {
  const baseOptions: RequestOptions = {
    method,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
  };

  if (data) {
    baseOptions.body = JSON.stringify(data);
  }

  return {
    ...baseOptions,
    ...options,
    headers: mergeHeaders(baseOptions.headers || {}, options.headers),
  };
};