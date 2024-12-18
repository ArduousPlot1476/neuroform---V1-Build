import { Pool, PoolConfig } from 'pg';
import { config } from '../../config';
import { ConnectionError } from './errors';
import { logger } from '../../utils/logger';

const createPoolConfig = (): PoolConfig => ({
  connectionString: config.database.url,
  ssl: {
    rejectUnauthorized: false // Required for Supabase connection
  },
  max: 10,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

class DatabaseConnection {
  private pool: Pool;

  constructor() {
    this.pool = new Pool(createPoolConfig());
    this.setupEventHandlers();
  }

  private setupEventHandlers(): void {
    this.pool.on('error', (err) => {
      logger.error('Unexpected error on idle client', err);
      throw new ConnectionError('Database pool error', err);
    });

    this.pool.on('connect', () => {
      logger.info('New client connected to database');
    });
  }

  public async testConnection(): Promise<boolean> {
    try {
      const client = await this.pool.connect();
      await client.query('SELECT NOW()');
      client.release();
      return true;
    } catch (error) {
      logger.error('Database connection test failed:', error);
      return false;
    }
  }

  public getPool(): Pool {
    return this.pool;
  }

  public async close(): Promise<void> {
    await this.pool.end();
    logger.info('Database pool closed');
  }
}

export const dbConnection = new DatabaseConnection();