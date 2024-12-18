import { pool } from '../pool';
import { retryOperation } from '../utils/dbUtils';
import type { QueryResult } from 'pg';

export class DatabaseQuery {
  protected async executeQuery<T>(
    query: string,
    params?: any[]
  ): Promise<QueryResult<T>> {
    return retryOperation(async () => {
      const client = await pool.connect();
      try {
        return await client.query<T>(query, params);
      } finally {
        client.release();
      }
    });
  }
}

export * from './userQueries';
export * from './taskQueries';
export * from './journalQueries';
export * from './focusQueries';
export * from './mentorQueries';