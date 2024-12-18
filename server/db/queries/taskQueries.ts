import { pool } from '../pool';
import type { Task } from '../../types';

export const taskQueries = {
  async findByUser(userId: string) {
    const query = 'SELECT * FROM tasks WHERE user_id = $1 ORDER BY created_at DESC';
    const result = await pool.query(query, [userId]);
    return result.rows;
  },

  async create(task: Omit<Task, 'id'>) {
    const query = `
      INSERT INTO tasks (title, category, priority, user_id)
      VALUES ($1, $2, $3, $4)
      RETURNING *
    `;
    const values = [task.title, task.category, task.priority, task.userId];
    const result = await pool.query(query, values);
    return result.rows[0];
  },

  async updateStatus(id: string, completed: boolean) {
    const query = `
      UPDATE tasks 
      SET completed = $2, updated_at = CURRENT_TIMESTAMP
      WHERE id = $1
      RETURNING *
    `;
    const result = await pool.query(query, [id, completed]);
    return result.rows[0];
  }
};