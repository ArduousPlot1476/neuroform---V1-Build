import { BaseRepository } from '../../core/BaseRepository';
import { Task } from '../../../types';
import { 
  TaskFilters, 
  TaskStats, 
  CreateTaskData,
  UpdateTaskData 
} from './types';
import { QueryError } from '../../core/errors';

export class TaskRepository extends BaseRepository {
  async create(data: CreateTaskData): Promise<Task> {
    const query = `
      INSERT INTO tasks (user_id, title, category, priority)
      VALUES ($1, $2, $3, $4)
      RETURNING *
    `;
    
    const result = await this.executeQuery<Task>(
      query,
      [data.userId, data.title, data.category, data.priority]
    );

    if (!result.rows[0]) {
      throw new QueryError('Failed to create task');
    }

    return result.rows[0];
  }

  async findByUser(filters: TaskFilters): Promise<Task[]> {
    const conditions: string[] = ['user_id = $1'];
    const params: any[] = [filters.userId];
    let paramCount = 1;

    if (filters.category) {
      paramCount++;
      conditions.push(`category = $${paramCount}`);
      params.push(filters.category);
    }

    if (filters.priority) {
      paramCount++;
      conditions.push(`priority = $${paramCount}`);
      params.push(filters.priority);
    }

    if (filters.completed !== undefined) {
      paramCount++;
      conditions.push(`completed = $${paramCount}`);
      params.push(filters.completed);
    }

    if (filters.search) {
      paramCount++;
      conditions.push(`title ILIKE $${paramCount}`);
      params.push(`%${filters.search}%`);
    }

    const query = `
      SELECT * FROM tasks
      WHERE ${conditions.join(' AND ')}
      ORDER BY 
        CASE priority
          WHEN 'high' THEN 1
          WHEN 'medium' THEN 2
          WHEN 'low' THEN 3
        END,
        created_at DESC
    `;

    const result = await this.executeQuery<Task>(query, params);
    return result.rows;
  }

  async update(id: string, userId: string, data: UpdateTaskData): Promise<Task> {
    const updates: string[] = [];
    const values: any[] = [id, userId];
    let paramCount = 2;

    if (data.title !== undefined) {
      paramCount++;
      updates.push(`title = $${paramCount}`);
      values.push(data.title);
    }

    if (data.category !== undefined) {
      paramCount++;
      updates.push(`category = $${paramCount}`);
      values.push(data.category);
    }

    if (data.priority !== undefined) {
      paramCount++;
      updates.push(`priority = $${paramCount}`);
      values.push(data.priority);
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
      UPDATE tasks
      SET ${updates.join(', ')}, updated_at = CURRENT_TIMESTAMP
      WHERE id = $1 AND user_id = $2
      RETURNING *
    `;

    const result = await this.executeQuery<Task>(query, values);

    if (!result.rows[0]) {
      throw new QueryError('Task not found');
    }

    return result.rows[0];
  }

  async delete(id: string, userId: string): Promise<void> {
    const query = `
      DELETE FROM tasks
      WHERE id = $1 AND user_id = $2
    `;

    const result = await this.executeQuery(query, [id, userId]);

    if (result.rowCount === 0) {
      throw new QueryError('Task not found');
    }
  }

  async getStats(userId: string): Promise<TaskStats> {
    const query = `
      SELECT 
        COUNT(*) as total_tasks,
        COUNT(*) FILTER (WHERE completed = true) as completed_tasks,
        COUNT(*) FILTER (WHERE category = 'inbox') as inbox_tasks,
        COUNT(*) FILTER (WHERE category = 'next') as next_tasks,
        COUNT(*) FILTER (WHERE category = 'projects') as project_tasks,
        COUNT(*) FILTER (WHERE category = 'waiting') as waiting_tasks,
        COUNT(*) FILTER (WHERE category = 'someday') as someday_tasks,
        COUNT(*) FILTER (WHERE priority = 'high') as high_priority,
        COUNT(*) FILTER (WHERE priority = 'medium') as medium_priority,
        COUNT(*) FILTER (WHERE priority = 'low') as low_priority
      FROM tasks
      WHERE user_id = $1
    `;

    const result = await this.executeQuery<{
      total_tasks: string;
      completed_tasks: string;
      inbox_tasks: string;
      next_tasks: string;
      project_tasks: string;
      waiting_tasks: string;
      someday_tasks: string;
      high_priority: string;
      medium_priority: string;
      low_priority: string;
    }>(query, [userId]);

    if (!result.rows[0]) {
      return {
        totalTasks: 0,
        completedTasks: 0,
        tasksByCategory: {
          inbox: 0,
          next: 0,
          projects: 0,
          waiting: 0,
          someday: 0
        },
        tasksByPriority: {
          high: 0,
          medium: 0,
          low: 0
        },
        completionRate: 0
      };
    }

    const stats = result.rows[0];
    const totalTasks = Number(stats.total_tasks);

    return {
      totalTasks,
      completedTasks: Number(stats.completed_tasks),
      tasksByCategory: {
        inbox: Number(stats.inbox_tasks),
        next: Number(stats.next_tasks),
        projects: Number(stats.project_tasks),
        waiting: Number(stats.waiting_tasks),
        someday: Number(stats.someday_tasks)
      },
      tasksByPriority: {
        high: Number(stats.high_priority),
        medium: Number(stats.medium_priority),
        low: Number(stats.low_priority)
      },
      completionRate: totalTasks > 0 
        ? (Number(stats.completed_tasks) / totalTasks) * 100 
        : 0
    };
  }
}

export const taskRepository = new TaskRepository();