import { BaseRepository } from '../../core/BaseRepository';
import { User } from '../../../types';
import { 
  UserFilters, 
  UserStats, 
  CreateUserData,
  UpdateUserData 
} from './types';
import { QueryError } from '../../core/errors';
import { hashPassword } from '../../../utils/security';

export class UserRepository extends BaseRepository {
  async create(data: CreateUserData): Promise<User> {
    const hashedPassword = await hashPassword(data.password);
    
    const query = `
      INSERT INTO users (email, name, password, avatar_url)
      VALUES ($1, $2, $3, $4)
      RETURNING *
    `;
    
    const result = await this.executeQuery<User>(
      query,
      [data.email, data.name, hashedPassword, data.avatarUrl]
    );

    if (!result.rows[0]) {
      throw new QueryError('Failed to create user');
    }

    return result.rows[0];
  }

  async findByEmail(email: string): Promise<User | null> {
    const query = `
      SELECT * FROM users
      WHERE email = $1
    `;
    
    const result = await this.executeQuery<User>(query, [email]);
    return result.rows[0] || null;
  }

  async update(id: string, data: UpdateUserData): Promise<User> {
    const updates: string[] = [];
    const values: any[] = [id];
    let paramCount = 1;

    if (data.name) {
      paramCount++;
      updates.push(`name = $${paramCount}`);
      values.push(data.name);
    }

    if (data.email) {
      paramCount++;
      updates.push(`email = $${paramCount}`);
      values.push(data.email);
    }

    if (data.password) {
      paramCount++;
      updates.push(`password = $${paramCount}`);
      values.push(await hashPassword(data.password));
    }

    if (data.avatarUrl) {
      paramCount++;
      updates.push(`avatar_url = $${paramCount}`);
      values.push(data.avatarUrl);
    }

    if (updates.length === 0) {
      throw new QueryError('No updates provided');
    }

    const query = `
      UPDATE users
      SET ${updates.join(', ')}, updated_at = CURRENT_TIMESTAMP
      WHERE id = $1
      RETURNING *
    `;

    const result = await this.executeQuery<User>(query, values);

    if (!result.rows[0]) {
      throw new QueryError('User not found');
    }

    return result.rows[0];
  }

  async delete(id: string): Promise<void> {
    const query = `
      DELETE FROM users
      WHERE id = $1
    `;

    const result = await this.executeQuery(query, [id]);

    if (result.rowCount === 0) {
      throw new QueryError('User not found');
    }
  }
}

export const userRepository = new UserRepository();