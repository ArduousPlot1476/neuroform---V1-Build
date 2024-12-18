import dotenv from 'dotenv';

dotenv.config();

export default {
  nodeEnv: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 5000,
  databaseUrl: process.env.DATABASE_URL,
  jwtSecret: process.env.JWT_SECRET,
  corsOrigin: process.env.FRONTEND_URL || 'http://localhost:5173',
  rateLimitWindow: 15 * 60 * 1000, // 15 minutes
  rateLimitMax: 100,
};