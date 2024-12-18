import request from 'supertest';
import { app } from '../../app';
import { pool } from '../../db/pool';
import { createTestUser, generateAuthToken } from '../helpers';

describe('Focus API', () => {
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

  describe('POST /api/focus', () => {
    it('should start a new focus session', async () => {
      const response = await request(app)
        .post('/api/focus')
        .set('Authorization', `Bearer ${authToken}`)
        .send({
          duration: 25
        });

      expect(response.status).toBe(201);
      expect(response.body).toHaveProperty('id');
      expect(response.body.duration).toBe(25);
    });
  });

  // Add more test cases for other endpoints
});