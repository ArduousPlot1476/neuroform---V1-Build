// API error handling utilities
export class ApiError extends Error {
  constructor(
    public statusCode: number,
    message: string,
    public code?: string,
    public details?: unknown
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

export const handleApiError = (error: unknown): never => {
  if (error instanceof ApiError) {
    throw error;
  }

  if (error instanceof Error) {
    throw new ApiError(500, error.message);
  }

  throw new ApiError(500, 'An unknown error occurred');
};

export const createErrorResponse = (
  statusCode: number,
  message: string,
  code?: string,
  details?: unknown
) => {
  return {
    error: {
      statusCode,
      message,
      code,
      details,
    },
  };
};