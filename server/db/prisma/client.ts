import { PrismaClient } from '@prisma/client';
import { config } from '../../config';

const prisma = new PrismaClient({
  log: config.isProduction ? [] : ['query', 'error', 'warn'],
  datasources: {
    db: {
      url: config.database.url
    }
  }
});

// Middleware for logging
prisma.$use(async (params, next) => {
  const before = Date.now();
  const result = await next(params);
  const after = Date.now();
  console.log(`Query ${params.model}.${params.action} took ${after - before}ms`);
  return result;
});

// Handle connection errors
prisma.$connect()
  .then(() => {
    console.log('Successfully connected to database');
  })
  .catch((error) => {
    console.error('Failed to connect to database:', error);
    process.exit(1);
  });

// Handle cleanup
process.on('beforeExit', async () => {
  await prisma.$disconnect();
});

export { prisma };