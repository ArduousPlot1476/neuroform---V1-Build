import { Request, Response, NextFunction } from 'express';
import { ApiError } from '../utils/errors';
import { config } from '../config';
import { logger } from './logger';

export const errorHandler = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Log error
  logger.error({
    message: error.message,
    stack: error.stack,
    method: req.method,
    url: req.url,
    userId: req.user?.id
  });

  // Handle known errors
  if (error instanceof ApiError) {
    return res.status(error.statusCode).json({
      error: {
        message: error.message,
        ...(error.details && { details: error.details }),
      }
    });
  }

  // Handle unknown errors
  const statusCode = 500;
  const message = config.isProduction 
    ? 'Internal server error' 
    : error.message;

  res.status(statusCode).json({
    error: {
      message,
      ...(config.isProduction ? {} : { stack: error.stack })
    }
  });
};