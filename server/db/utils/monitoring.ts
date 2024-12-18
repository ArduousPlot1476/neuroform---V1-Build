import { logger } from '../../utils/logger';
import { pool } from '../core/connection';

export const monitorDatabaseHealth = async () => {
  try {
    const result = await pool.query(`
      SELECT 
        numbackends as active_connections,
        xact_commit as transactions_committed,
        xact_rollback as transactions_rolled_back,
        blks_read as disk_blocks_read,
        blks_hit as buffer_blocks_hit,
        tup_returned as rows_returned,
        tup_fetched as rows_fetched
      FROM pg_stat_database 
      WHERE datname = current_database()
    `);

    const stats = result.rows[0];
    logger.info('Database health metrics:', stats);

    return stats;
  } catch (error) {
    logger.error('Failed to collect database metrics:', error);
    throw error;
  }
};

export const checkConnectionPool = () => {
  const poolStats = {
    total: pool.totalCount,
    idle: pool.idleCount,
    waiting: pool.waitingCount,
  };

  logger.info('Connection pool stats:', poolStats);
  return poolStats;
};