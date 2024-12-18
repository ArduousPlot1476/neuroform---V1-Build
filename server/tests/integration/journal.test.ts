import request from 'supertest';
import { app } from '../../app';
import { pool } from '../../db/pool';
import { createTestUser, generateAuthToken } from '../helpers';

describe('Journal API', () => {
  let authToken: string;
  let userId: string;

  beforeAll(async () => {
    const user = await createTestUser();
    userId = user.id;
    authToken = generateAuthToken(user);
  });

  afterAll(async () => {
    await pool.end();
  });

  describe('POST /api/journal', () => {
    it('should create a new journal entry', async () => {
      const response = await request(app)
        .post('/api/journal')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          type: 'morning',
          content: 'Test journal entry'
        });

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('id');
      expect(response.body.content).toBe('Test journal entry');
    });

    it('should validate journal entry data', async () => {
      const response = await request(app)
        .post('/api/journal')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          type: 'invalid',
          content: ''
        });

      expect(response.status).toBe(400);
    });
  });

  // Add more test cases for other endpoints
});