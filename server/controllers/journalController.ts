import { Request, Response, NextFunction } from 'express';
import { journalQueries } from '../db/queries/journalQueries';
import { ApiError } from '../utils/errors';

export const journalController = {
  async getEntries(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user.id;
      const entries = await journalQueries.findByUser(userId);
      res.json(entries);
    } catch (error) {
      next(error);
    }
  },

  async createEntry(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user.id;
      const entry = await journalQueries.create({
        ...req.body,
        userId,
      });
      res.status(201).json(entry);
    } catch (error) {
      next(error);
    }
  },

  async updateEntry(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const { content } = req.body;
      const entry = await journalQueries.update(id, content);
      
      if (!entry) {
        throw new ApiError(404, 'Journal entry not found');
      }
      
      res.json(entry);
    } catch (error) {
      next(error);
    }
  },

  async getStreak(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = req.user.id;
      const streak = await journalQueries.getStreak(userId);
      res.json({ streak });
    } catch (error) {
      next(error);
    }
  },
};