import { promises as fs } from 'fs';
import path from 'path';
import { dbConnection } from '../core/connection';
import { logger } from '../../utils/logger';

export const runMigrations = async () => {
  try {
    const migrationsDir = path.join(__dirname);
    const files = await fs.readdir(migrationsDir);
    
    // Sort migration files by timestamp
    const migrations = files
      .filter(f => f.endsWith('.sql'))
      .sort();

    for (const migration of migrations) {
      const sql = await fs.readFile(
        path.join(migrationsDir, migration), 
        'utf-8'
      );

      await dbConnection.getPool().query(sql);
      logger.info(`Executed migration: ${migration}`);
    }

    logger.info('All migrations completed successfully');
  } catch (error) {
    logger.error('Migration failed:', error);
    throw error;
  }
};