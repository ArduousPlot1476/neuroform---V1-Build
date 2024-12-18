import { Pool, PoolConfig } from 'pg';
import { config } from './index';

const poolConfig: PoolConfig = {
  connectionString: config.database.url,
  ssl: {
    rejectUnauthorized: false // Required for Supabase connection
  },
  // Connection pool settings optimized for Supabase
  max: 10, // Maximum number of clients in the pool
  idleTimeoutMillis: 30000, // Close idle clients after 30 seconds
  connectionTimeoutMillis: 2000, // Return an error after 2 seconds if connection could not be established
};

// Create the connection pool
export const pool = new Pool(poolConfig);

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