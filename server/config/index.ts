import dotenv from 'dotenv';

dotenv.config();

export const config = {
  isProduction: process.env.NODE_ENV === 'production',
  
  server: {
    port: parseInt(process.env.PORT || '5000', 10),
    cors: {
      origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    },
  },
  
  database: {
    url: process.env.DATABASE_URL as string,
  },
  
  jwt: {
    secret: process.env.JWT_SECRET as string,
    expiresIn: '24h',
  },
  
  security: {
    rateLimit: {
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 100,
    },
    bcryptRounds: 12,
  },
} as const;