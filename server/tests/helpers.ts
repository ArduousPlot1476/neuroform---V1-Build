import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { pool } from '../db/pool';
import { config } from '../config';

export const createTestUser = async () => {
  const hashedPassword = await bcrypt.hash('testpassword', 10);
  
  const result = await pool.query(`
    INSERT INTO users (email, name, password)
    VALUES ($1, $2, $3)
    RETURNING *
  `, ['test@example.com', 'Test User', hashedPassword]);

  return result.rows[0];
};

export const generateAuthToken = (user: any) => {
  return jwt.sign(
    { id: user.id, email: user.email },
    config.jwt.secret,
    { expiresIn: '1h' }
  );
};

export const cleanupDatabase = async () => {
  await pool.query('DELETE FROM users WHERE email = $1', ['test@example.com']);
};