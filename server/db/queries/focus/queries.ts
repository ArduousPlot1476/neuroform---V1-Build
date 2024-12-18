import { BaseQuery } from '../../core/BaseQuery';
import type { FocusSession } from '../../../types';
import type { FocusSessionStats, FocusSessionFilters } from './types';

export class FocusQueries extends BaseQuery {
  async create(session: Omit<FocusSession, 'id'>): Promise<FocusSession> {
    const query = `
      INSERT INTO focus_sessions (start_time, duration, user_id)
      VALUES ($1, $2, $3)
      RETURNING *
    `;
    const result = await this.executeQuery<FocusSession>(
      query,
      [session.startTime, session.duration, session.userId]
    );
    return result.rows[0];
  }

  async complete(id: string): Promise<FocusSession | null> {
    const query = `
      UPDATE focus_sessions 
      SET completed = true
      WHERE id = $1
      RETURNING *
    `;
    const result = await this.executeQuery<FocusSession>(query, [id]);
    return result.rows[0] || null;
  }

  async getStats(filters: FocusSessionFilters): Promise<FocusSessionStats> {
    const query = `
      SELECT 
        COUNT(*) as total_sessions,
        SUM(duration) as total_minutes,
        COUNT(*) FILTER (WHERE completed = true) as completed_sessions
      FROM focus_sessions
      WHERE user_id = $1
        AND start_time BETWEEN $2 AND $3
    `;
    const result = await this.executeQuery<FocusSessionStats>(
      query,
      [filters.userId, filters.startDate, filters.endDate]
    );
    return result.rows[0];
  }
}

export const focusQueries = new FocusQueries();