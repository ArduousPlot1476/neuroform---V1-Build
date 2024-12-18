import { Pool, PoolConfig } from 'pg';
import { config } from '../../config';

const createPoolConfig = (): PoolConfig => ({
  connectionString: config.database.url,
  ssl: {
    rejectUnauthorized: false // Required for Supabase
  },
  max: 10, // Maximum number of clients
  idleTimeoutMillis: 30000, // Close idle clients after 30 seconds
  connectionTimeoutMillis: 2000, // Return error after 2 seconds if connection could not be established
});

export const pool = new Pool(createPoolConfig());

// Add event listeners for connection issues
pool.on('error', (err) => {
  console.error('Unexpected error on idle client', err);
  process.exit(-1);
});

pool.on('connect', () => {
  console.log('Connected to Supabase database');
});

// Graceful shutdown
process.on('SIGTERM', () => {
  pool.end(() => {
    console.log('Database pool has ended');
    process.exit(0);
  });
});