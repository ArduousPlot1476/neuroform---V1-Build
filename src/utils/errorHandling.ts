import * as Sentry from '@sentry/react';

export const captureError = (error: unknown, context?: Record<string, any>) => {
  console.error('Error:', error);
  
  if (error instanceof Error) {
    Sentry.captureException(error, {
      extra: context,
    });
  } else {
    Sentry.captureMessage('An unknown error occurred', {
      extra: { error, ...context },
    });
  }
};

export const getErrorMessage = (error: unknown): string => {
  if (error instanceof Error) return error.message;
  if (typeof error === 'string') return error;
  return 'An unexpected error occurred';
};