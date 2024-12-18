import { QueryResult } from 'pg';
import { dbConnection } from './connection';
import { DatabaseClient, QueryOptions, TransactionOptions } from './types';
import { QueryError, TransactionError } from './errors';
import { logger } from '../../utils/logger';

export abstract class BaseRepository {
  protected async executeQuery<T>(
    query: string,
    params?: unknown[],
    options: QueryOptions = {}
  ): Promise<QueryResult<T>> {
    const client = await dbConnection.getPool().connect();
    
    try {
      const startTime = Date.now();
      const result = await client.query<T>(query, params);
      const duration = Date.now() - startTime;

      logger.debug('Query executed', {
        query,
        duration,
        rowCount: result.rowCount
      });

      return result;
    } catch (error) {
      throw new QueryError('Query execution failed', { query, params, error });
    } finally {
      client.release();
    }
  }

  protected async executeTransaction<T>(
    callback: (client: DatabaseClient) => Promise<T>,
    options: TransactionOptions = {}
  ): Promise<T> {
    const client = await dbConnection.getPool().connect();
    
    try {
      await client.query('BEGIN');
      
      if (options.isolationLevel) {
        await client.query(`SET TRANSACTION ISOLATION LEVEL ${options.isolationLevel}`);
      }

      const result = await callback(client);
      await client.query('COMMIT');
      
      return result;
    } catch (error) {
      await client.query('ROLLBACK');
      throw new TransactionError('Transaction failed', error);
    } finally {
      client.release();
    }
  }
}