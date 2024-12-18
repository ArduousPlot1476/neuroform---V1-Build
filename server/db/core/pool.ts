import { Pool, PoolConfig } from 'pg';
import { config } from '../../config';

const createPoolConfig = (): PoolConfig => ({
  connectionString: config.database.url,
  ssl: {
    rejectUnauthorized: false
  },
  max: 10,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

export const pool = new Pool(createPoolConfig());

pool.on('error', (err) => {
  console.error('Unexpected error on idle client', err);
  process.exit(-1);
});

pool.on('connect', () => {
  console.log('Connected to database');
});