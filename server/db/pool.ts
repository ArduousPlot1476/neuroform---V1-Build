import { Pool, PoolConfig } from 'pg';
import { config } from '../config';

const poolConfig: PoolConfig = {
  connectionString: config.database.url,
  ssl: {
    rejectUnauthorized: false
  },
  max: 10,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
};

export const pool = new Pool(poolConfig);