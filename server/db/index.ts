import { dbConnection } from './core/connection';
import { logger } from '../utils/logger';
import * as repositories from './repositories';
import * as monitoring from './utils/monitoring';

// Initialize database connection
const initializeDatabase = async () => {
  try {
    const isConnected = await dbConnection.testConnection();
    if (!isConnected) {
      throw new Error('Failed to connect to database');
    }
    logger.info('Database initialized successfully');
  } catch (error) {
    logger.error('Database initialization failed:', error);
    throw error;
  }
};

// Handle cleanup on shutdown
const cleanup = async () => {
  try {
    await dbConnection.close();
    logger.info('Database connections closed');
  } catch (error) {
    logger.error('Error during database cleanup:', error);
    process.exit(1);
  }
};

process.on('SIGTERM', cleanup);
process.on('SIGINT', cleanup);

// Schedule periodic health checks
setInterval(async () => {
  try {
    await monitoring.monitorDatabaseHealth();
    monitoring.checkConnectionPool();
  } catch (error) {
    logger.error('Database health check failed:', error);
  }
}, 5 * 60 * 1000); // Every 5 minutes

export {
  initializeDatabase,
  repositories,
  dbConnection
};