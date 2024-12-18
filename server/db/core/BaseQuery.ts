import { QueryResult } from 'pg';
import { pool } from './pool';
import { DatabaseError } from '../errors/DatabaseError';
import { retryOperation } from '../utils/retryUtils';

export abstract class BaseQuery {
  protected async executeQuery<T>(
    query: string,
    params?: unknown[]
  ): Promise<QueryResult<T>> {
    return retryOperation(async () => {
      const client = await pool.connect();
      try {
        return await client.query<T>(query, params);
      } catch (error) {
        throw new DatabaseError(
          'Database query failed',
          { query, params, error }
        );
      } finally {
        client.release();
      }
    });
  }

  protected async executeTransaction<T>(
    callback: (client: any) => Promise<T>
  ): Promise<T> {
    const client = await pool.connect();
    try {
      await client.query('BEGIN');
      const result = await callback(client);
      await client.query('COMMIT');
      return result;
    } catch (error) {
      await client.query('ROLLBACK');
      throw new DatabaseError(
        'Transaction failed',
        { error }
      );
    } finally {
      client.release();
    }
  }
}