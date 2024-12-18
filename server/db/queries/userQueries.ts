import { pool } from '../pool';
import type { User } from '../../types';

export const userQueries = {
  async findByEmail(email: string) {
    const query = 'SELECT * FROM users WHERE email = $1';
    const result = await pool.query(query, [email]);
    return result.rows[0];
  },

  async create(user: Omit<User, 'id'>) {
    const query = `
      INSERT INTO users (email, name, password, avatar_url)
      VALUES ($1, $2, $3, $4)
      RETURNING *
    `;
    const values = [user.email, user.name, user.password, user.avatarUrl];
    const result = await pool.query(query, values);
    return result.rows[0];
  },

  async update(id: string, updates: Partial<User>) {
    const setClause = Object.keys(updates)
      .map((key, i) => `${key} = $${i + 2}`)
      .join(', ');
    
    const query = `
      UPDATE users 
      SET ${setClause}, updated_at = CURRENT_TIMESTAMP
      WHERE id = $1
      RETURNING *
    `;
    
    const values = [id, ...Object.values(updates)];
    const result = await pool.query(query, values);
    return result.rows[0];
  }
};