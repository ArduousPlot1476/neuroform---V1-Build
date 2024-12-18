export const productionConfig = {
  server: {
    trustProxy: true,
    compression: true,
    cors: {
      origin: process.env.FRONTEND_URL,
      credentials: true,
    },
  },
  
  security: {
    rateLimit: {
      windowMs: 15 * 60 * 1000,
      max: 100,
    },
    helmet: {
      contentSecurityPolicy: {
        directives: {
          defaultSrc: ["'self'"],
          scriptSrc: ["'self'"],
          styleSrc: ["'self'", "'unsafe-inline'"],
          imgSrc: ["'self'", "data:", "https:"],
          connectSrc: ["'self'", "https:"],
        },
      },
    },
  },
  
  logging: {
    level: 'info',
    format: 'json',
  },
};