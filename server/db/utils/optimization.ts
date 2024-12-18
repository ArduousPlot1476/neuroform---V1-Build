import { pool } from '../core/connection';
import { logger } from '../../utils/logger';

export const analyzeSlowQueries = async () => {
  try {
    const result = await pool.query(`
      SELECT 
        calls,
        total_time / calls as avg_time,
        rows / calls as avg_rows,
        query
      FROM pg_stat_statements
      WHERE calls > 50
      ORDER BY total_time / calls DESC
      LIMIT 10
    `);

    logger.info('Slow queries analysis:', result.rows);
    return result.rows;
  } catch (error) {
    logger.error('Failed to analyze slow queries:', error);
    throw error;
  }
};

export const vacuumTables = async () => {
  try {
    await pool.query('VACUUM ANALYZE');
    logger.info('Database vacuum completed successfully');
  } catch (error) {
    logger.error('Failed to vacuum database:', error);
    throw error;
  }
};