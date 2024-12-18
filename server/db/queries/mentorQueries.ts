import { DatabaseQuery } from './index';
import type { MentorSession } from '../../types';

class MentorQueries extends DatabaseQuery {
  async schedule(session: Omit<MentorSession, 'id'>): Promise<MentorSession> {
    const query = `
      INSERT INTO mentor_sessions (mentor_id, user_id, start_time, duration, notes)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *
    `;
    const result = await this.executeQuery<MentorSession>(
      query,
      [session.mentorId, session.userId, session.startTime, session.duration, session.notes]
    );
    return result.rows[0];
  }

  async update(id: string, updates: Partial<MentorSession>): Promise<MentorSession | null> {
    const setClause = Object.keys(updates)
      .map((key, i) => `${key} = $${i + 2}`)
      .join(', ');
    
    const query = `
      UPDATE mentor_sessions 
      SET ${setClause}
      WHERE id = $1
      RETURNING *
    `;
    
    const values = [id, ...Object.values(updates)];
    const result = await this.executeQuery<MentorSession>(query, values);
    return result.rows[0] || null;
  }

  async cancel(id: string): Promise<MentorSession | null> {
    const query = `
      DELETE FROM mentor_sessions 
      WHERE id = $1
      RETURNING *
    `;
    const result = await this.executeQuery<MentorSession>(query, [id]);
    return result.rows[0] || null;
  }
}

export const mentorQueries = new MentorQueries();