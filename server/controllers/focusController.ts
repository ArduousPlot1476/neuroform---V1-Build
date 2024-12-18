import { Request, Response, NextFunction } from 'express';
import { focusQueries } from '../db/queries/focusQueries';
import { ApiError } from '../utils/errors';

export const focusController = {
  async getSessions(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user.id;
      const sessions = await focusQueries.findByUser(userId);
      res.json(sessions);
    } catch (error) {
      next(error);
    }
  },

  async startSession(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user.id;
      const session = await focusQueries.create({
        ...req.body,
        userId,
        startTime: new Date(),
      });
      res.status(201).json(session);
    } catch (error) {
      next(error);
    }
  },

  async completeSession(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const session = await focusQueries.complete(id);
      
      if (!session) {
        throw new ApiError(404, 'Focus session not found');
      }
      
      res.json(session);
    } catch (error) {
      next(error);
    }
  },

  async getStats(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user.id;
      const startDate = new Date();
      startDate.setDate(startDate.getDate() - 7);
      
      const stats = await focusQueries.getStats(userId, startDate, new Date());
      res.json(stats);
    } catch (error) {
      next(error);
    }
  },
};