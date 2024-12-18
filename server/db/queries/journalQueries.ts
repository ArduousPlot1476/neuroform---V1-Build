import { DatabaseQuery } from './index';
import type { JournalEntry } from '../../types';

class JournalQueries extends DatabaseQuery {
  async create(entry: Omit<JournalEntry, 'id'>): Promise<JournalEntry> {
    const query = `
      INSERT INTO journals (type, content, user_id)
      VALUES ($1, $2, $3)
      RETURNING *
    `;
    const result = await this.executeQuery<JournalEntry>(
      query,
      [entry.type, entry.content, entry.userId]
    );
    return result.rows[0];
  }

  async findByUser(userId: string): Promise<JournalEntry[]> {
    const query = `
      SELECT * FROM journals 
      WHERE user_id = $1 
      ORDER BY created_at DESC
    `;
    const result = await this.executeQuery<JournalEntry>(query, [userId]);
    return result.rows;
  }

  async update(id: string, content: string): Promise<JournalEntry | null> {
    const query = `
      UPDATE journals 
      SET content = $2
      WHERE id = $1
      RETURNING *
    `;
    const result = await this.executeQuery<JournalEntry>(query, [id, content]);
    return result.rows[0] || null;
  }
}

export const journalQueries = new JournalQueries();