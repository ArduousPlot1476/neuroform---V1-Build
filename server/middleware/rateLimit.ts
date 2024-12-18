import rateLimit from 'express-rate-limit';
import { config } from '../config';

export const createRateLimiter = (options: Partial<rateLimit.Options> = {}) => {
  return rateLimit({
    windowMs: config.security.rateLimit.windowMs,
    max: config.security.rateLimit.max,
    standardHeaders: true,
    legacyHeaders: false,
    ...options,
  });
};