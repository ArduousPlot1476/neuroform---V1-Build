import { BaseRepository } from '../../core/BaseRepository';
import { MentorSession } from '../../../types';
import { 
  MentorSessionFilters, 
  MentorStats, 
  CreateMentorSessionData,
  UpdateMentorSessionData,
  AvailabilityCheck 
} from './types';
import { QueryError } from '../../core/errors';

export class MentorRepository extends BaseRepository {
  async schedule(data: CreateMentorSessionData): Promise<MentorSession> {
    const query = `
      INSERT INTO mentor_sessions (
        mentor_id, 
        user_id, 
        start_time, 
        duration, 
        notes
      )
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *
    `;
    
    const result = await this.executeQuery<MentorSession>(
      query,
      [
        data.mentorId,
        data.userId,
        data.startTime,
        data.duration,
        data.notes || null
      ]
    );

    if (!result.rows[0]) {
      throw new QueryError('Failed to schedule mentor session');
    }

    return result.rows[0];
  }

  async findByUser(filters: MentorSessionFilters): Promise<MentorSession[]> {
    const conditions: string[] = ['user_id = $1'];
    const params: any[] = [filters.userId];
    let paramCount = 1;

    if (filters.mentorId) {
      paramCount++;
      conditions.push(`mentor_id = $${paramCount}`);
      params.push(filters.mentorId);
    }

    if (filters.startDate) {
      paramCount++;
      conditions.push(`start_time >= $${paramCount}`);
      params.push(filters.startDate);
    }

    if (filters.endDate) {
      paramCount++;
      conditions.push(`start_time <= $${paramCount}`);
      params.push(filters.endDate);
    }

    if (filters.completed !== undefined) {
      paramCount++;
      conditions.push(`completed = $${paramCount}`);
      params.push(filters.completed);
    }

    const query = `
      SELECT * FROM mentor_sessions
      WHERE ${conditions.join(' AND ')}
      ORDER BY start_time DESC
    `;

    const result = await this.executeQuery<MentorSession>(query, params);
    return result.rows;
  }

  async update(id: string, userId: string, data: UpdateMentorSessionData): Promise<MentorSession> {
    const updates: string[] = [];
    const values: any[] = [id, userId];
    let paramCount = 2;

    if (data.startTime !== undefined) {
      paramCount++;
      updates.push(`start_time = $${paramCount}`);
      values.push(data.startTime);
    }

    if (data.duration !== undefined) {
      paramCount++;
      updates.push(`duration = $${paramCount}`);
      values.push(data.duration);
    }

    if (data.notes !== undefined) {
      paramCount++;
      updates.push(`notes = $${paramCount}`);
      values.push(data.notes);
    }

    if (data.completed !== undefined) {
      paramCount++;
      updates.push(`completed = $${paramCount}`);
      values.push(data.completed);
    }

    if (updates.length === 0) {
      throw new QueryError('No updates provided');
    }

    const query = `
      UPDATE mentor_sessions
      SET ${updates.join(', ')}
      WHERE id = $1 AND user_id = $2
      RETURNING *
    `;

    const result = await this.executeQuery<MentorSession>(query, values);

    if (!result.rows[0]) {
      throw new QueryError('Mentor session not found');
    }

    return result.rows[0];
  }

  async cancel(id: string, userId: string): Promise<void> {
    const query = `
      DELETE FROM mentor_sessions
      WHERE id = $1 AND user_id = $2
    `;

    const result = await this.executeQuery(query, [id, userId]);

    if (result.rowCount === 0) {
      throw new QueryError('Mentor session not found');
    }
  }

  async checkAvailability(data: AvailabilityCheck): Promise<boolean> {
    const query = `
      SELECT COUNT(*) as conflicts
      FROM mentor_sessions
      WHERE mentor_id = $1
        AND start_time < $2 + ($3 || ' minutes')::interval
        AND start_time + (duration || ' minutes')::interval > $2
        AND completed = false
    `;

    const result = await this.executeQuery<{ conflicts: string }>(
      query,
      [data.mentorId, data.startTime, data.duration]
    );

    return Number(result.rows[0].conflicts) === 0;
  }

  async getStats(userId: string): Promise<MentorStats> {
    const query = `
      WITH session_stats AS (
        SELECT 
          mentor_id,
          COUNT(*) as session_count,
          COUNT(*) FILTER (WHERE completed = true) as completed_count,
          COUNT(*) FILTER (WHERE start_time > CURRENT_TIMESTAMP) as upcoming_count,
          ROUND(AVG(duration)) as avg_duration,
          SUM(duration) as total_minutes
        FROM mentor_sessions
        WHERE user_id = $1
        GROUP BY mentor_id
      )
      SELECT 
        SUM(session_count) as total_sessions,
        SUM(completed_count) as completed_sessions,
        SUM(upcoming_count) as upcoming_sessions,
        ROUND(AVG(avg_duration)) as average_duration,
        ROUND(SUM(total_minutes) / 60.0, 1) as total_hours,
        json_agg(json_build_object(
          'mentorId', mentor_id,
          'sessionCount', session_count,
          'totalHours', ROUND((total_minutes / 60.0)::numeric, 1)
        )) as mentor_breakdown
      FROM session_stats
    `;

    const result = await this.executeQuery<{
      total_sessions: string;
      completed_sessions: string;
      upcoming_sessions: string;
      average_duration: string;
      total_hours: string;
      mentor_breakdown: string;
    }>(query, [userId]);

    if (!result.rows[0]) {
      return {
        totalSessions: 0,
        completedSessions: 0,
        upcomingSessions: 0,
        averageDuration: 0,
        totalHours: 0,
        mentorBreakdown: []
      };
    }

    const stats = result.rows[0];

    return {
      totalSessions: Number(stats.total_sessions),
      completedSessions: Number(stats.completed_sessions),
      upcomingSessions: Number(stats.upcoming_sessions),
      averageDuration: Number(stats.average_duration),
      totalHours: Number(stats.total_hours),
      mentorBreakdown: JSON.parse(stats.mentor_breakdown)
    };
  }
}

export const mentorRepository = new MentorRepository();