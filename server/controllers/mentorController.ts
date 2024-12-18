import { Request, Response, NextFunction } from 'express';
import { mentorQueries } from '../db/queries/mentorQueries';
import { ApiError } from '../utils/errors';

export const mentorController = {
  async getSessions(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user.id;
      const sessions = await mentorQueries.findByUser(userId);
      res.json(sessions);
    } catch (error) {
      next(error);
    }
  },

  async scheduleSession(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user.id;
      const { mentorId, startTime, duration } = req.body;

      const isAvailable = await mentorQueries.checkAvailability(
        mentorId,
        new Date(startTime),
        duration
      );

      if (!isAvailable) {
        throw new ApiError(400, 'Mentor is not available at this time');
      }

      const session = await mentorQueries.schedule({
        ...req.body,
        userId,
      });
      
      res.status(201).json(session);
    } catch (error) {
      next(error);
    }
  },

  async updateSession(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const session = await mentorQueries.update(id, req.body);
      
      if (!session) {
        throw new ApiError(404, 'Mentor session not found');
      }
      
      res.json(session);
    } catch (error) {
      next(error);
    }
  },

  async cancelSession(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const session = await mentorQueries.cancel(id);
      
      if (!session) {
        throw new ApiError(404, 'Mentor session not found');
      }
      
      res.json({ message: 'Session cancelled successfully' });
    } catch (error) {
      next(error);
    }
  },

  async checkAvailability(req: Request, res: Response, next: NextFunction) {
    try {
      const { mentorId, startTime, duration } = req.query;
      const isAvailable = await mentorQueries.checkAvailability(
        mentorId as string,
        new Date(startTime as string),
        parseInt(duration as string, 10)
      );
      
      res.json({ available: isAvailable });
    } catch (error) {
      next(error);
    }
  },
};