import { BaseRepository } from '../../core/BaseRepository';
import { JournalEntry } from '../../../types';
import { 
  JournalEntryFilters, 
  JournalStats, 
  CreateJournalEntryData,
  UpdateJournalEntryData 
} from './types';
import { QueryError } from '../../core/errors';

export class JournalRepository extends BaseRepository {
  async create(data: CreateJournalEntryData): Promise<JournalEntry> {
    const query = `
      INSERT INTO journals (user_id, type, content)
      VALUES ($1, $2, $3)
      RETURNING *
    `;
    
    const result = await this.executeQuery<JournalEntry>(
      query,
      [data.userId, data.type, data.content]
    );

    if (!result.rows[0]) {
      throw new QueryError('Failed to create journal entry');
    }

    return result.rows[0];
  }

  async findByUser(filters: JournalEntryFilters): Promise<JournalEntry[]> {
    const query = `
      SELECT * FROM journals
      WHERE user_id = $1
        AND ($2::text IS NULL OR type = $2)
        AND ($3::timestamp IS NULL OR created_at >= $3)
        AND ($4::timestamp IS NULL OR created_at <= $4)
      ORDER BY created_at DESC
    `;

    const result = await this.executeQuery<JournalEntry>(
      query,
      [
        filters.userId,
        filters.type || null,
        filters.startDate || null,
        filters.endDate || null
      ]
    );

    return result.rows;
  }

  async update(id: string, userId: string, data: UpdateJournalEntryData): Promise<JournalEntry> {
    const query = `
      UPDATE journals
      SET content = $1
      WHERE id = $2 AND user_id = $3
      RETURNING *
    `;

    const result = await this.executeQuery<JournalEntry>(
      query,
      [data.content, id, userId]
    );

    if (!result.rows[0]) {
      throw new QueryError('Journal entry not found');
    }

    return result.rows[0];
  }

  async getStats(userId: string): Promise<JournalStats> {
    const query = `
      WITH daily_entries AS (
        SELECT 
          DATE(created_at) as entry_date,
          type,
          COUNT(*) as entries
        FROM journals
        WHERE user_id = $1
        GROUP BY DATE(created_at), type
      ),
      streaks AS (
        SELECT 
          entry_date,
          entry_date - (ROW_NUMBER() OVER (ORDER BY entry_date))::integer as streak_group
        FROM (
          SELECT DISTINCT entry_date
          FROM daily_entries
        ) dates
      ),
      streak_lengths AS (
        SELECT 
          streak_group,
          COUNT(*) as streak_length
        FROM streaks
        GROUP BY streak_group
      )
      SELECT 
        COUNT(*) as total_entries,
        COUNT(*) FILTER (WHERE type = 'morning') as morning_entries,
        COUNT(*) FILTER (WHERE type = 'evening') as evening_entries,
        COUNT(*) FILTER (WHERE type = 'ftd') as ftd_entries,
        COALESCE(
          (
            SELECT streak_length 
            FROM streak_lengths 
            WHERE streak_group = (
              SELECT streak_group 
              FROM streaks 
              WHERE entry_date = CURRENT_DATE
              LIMIT 1
            )
          ),
          0
        ) as current_streak,
        COALESCE(
          (
            SELECT MAX(streak_length) 
            FROM streak_lengths
          ),
          0
        ) as longest_streak
      FROM journals
      WHERE user_id = $1
    `;

    const result = await this.executeQuery<JournalStats & {
      morning_entries: number;
      evening_entries: number;
      ftd_entries: number;
    }>(query, [userId]);

    if (!result.rows[0]) {
      return {
        totalEntries: 0,
        entriesByType: { morning: 0, evening: 0, ftd: 0 },
        currentStreak: 0,
        longestStreak: 0
      };
    }

    const { 
      total_entries,
      morning_entries,
      evening_entries,
      ftd_entries,
      current_streak,
      longest_streak
    } = result.rows[0];

    return {
      totalEntries: Number(total_entries),
      entriesByType: {
        morning: Number(morning_entries),
        evening: Number(evening_entries),
        ftd: Number(ftd_entries)
      },
      currentStreak: Number(current_streak),
      longestStreak: Number(longest_streak)
    };
  }
}

export const journalRepository = new JournalRepository();