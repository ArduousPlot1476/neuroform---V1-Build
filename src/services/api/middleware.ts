import { rateLimiter } from '../security/rateLimit';
import { getCsrfToken, CSRF_HEADER } from '../security/csrf';
import { sessionManager } from '../security/session';
import type { RequestOptions } from './types';

export const applySecurityMiddleware = (options: RequestOptions = {}): RequestOptions => {
  // Add CSRF token
  const headers = {
    ...options.headers,
    [CSRF_HEADER]: getCsrfToken(),
  };

  // Check rate limit
  const endpoint = options.url || '';
  if (!rateLimiter.checkLimit(endpoint)) {
    throw new Error('Rate limit exceeded. Please try again later.');
  }

  // Add session token if available
  const session = sessionManager.getSession();
  if (session) {
    headers.Authorization = `Bearer ${session.id}`;
  }

  // Set secure headers
  headers['Content-Security-Policy'] = "default-src 'self'";
  headers['X-Content-Type-Options'] = 'nosniff';
  headers['X-Frame-Options'] = 'DENY';
  headers['X-XSS-Protection'] = '1; mode=block';

  return {
    ...options,
    credentials: 'include',
    headers,
  };
};