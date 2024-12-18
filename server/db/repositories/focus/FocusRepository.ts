import { BaseRepository } from '../../core/BaseRepository';
import { FocusSession } from '../../../types';
import { 
  FocusSessionFilters, 
  FocusSessionStats, 
  CreateFocusSessionData 
} from './types';
import { QueryError } from '../../core/errors';

export class FocusRepository extends BaseRepository {
  async create(data: CreateFocusSessionData): Promise<FocusSession> {
    const query = `
      INSERT INTO focus_sessions (user_id, start_time, duration)
      VALUES ($1, $2, $3)
      RETURNING *
    `;
    
    const result = await this.executeQuery<FocusSession>(
      query,
      [data.userId, data.startTime, data.duration]
    );

    if (!result.rows[0]) {
      throw new QueryError('Failed to create focus session');
    }

    return result.rows[0];
  }

  async complete(id: string, userId: string): Promise<FocusSession> {
    const query = `
      UPDATE focus_sessions 
      SET completed = true
      WHERE id = $1 AND user_id = $2
      RETURNING *
    `;
    
    const result = await this.executeQuery<FocusSession>(query, [id, userId]);

    if (!result.rows[0]) {
      throw new QueryError('Focus session not found');
    }

    return result.rows[0];
  }

  async getStats(filters: FocusSessionFilters): Promise<FocusSessionStats> {
    const query = `
      SELECT 
        COUNT(*) as total_sessions,
        SUM(duration) as total_minutes,
        COUNT(*) FILTER (WHERE completed = true) as completed_sessions,
        ROUND(AVG(duration)) as average_duration
      FROM focus_sessions
      WHERE user_id = $1
        AND ($2::timestamp IS NULL OR start_time >= $2)
        AND ($3::timestamp IS NULL OR start_time <= $3)
        AND ($4::boolean IS NULL OR completed = $4)
    `;
    
    const result = await this.executeQuery<FocusSessionStats>(
      query,
      [
        filters.userId,
        filters.startDate || null,
        filters.endDate || null,
        filters.completed || null
      ]
    );

    return result.rows[0];
  }
}

export const focusRepository = new FocusRepository();