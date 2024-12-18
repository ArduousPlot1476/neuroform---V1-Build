import { QueryResult } from 'pg';

export interface DatabaseClient {
  query<T>(query: string, params?: unknown[]): Promise<QueryResult<T>>;
  release(): void;
}

export interface TransactionClient extends DatabaseClient {
  query(query: string, params?: unknown[]): Promise<QueryResult>;
}

export interface QueryOptions {
  maxRetries?: number;
  timeout?: number;
}

export interface TransactionOptions extends QueryOptions {
  isolationLevel?: 'READ COMMITTED' | 'REPEATABLE READ' | 'SERIALIZABLE';
}