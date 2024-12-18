import { Router } from 'express';
import authRoutes from './auth';
import taskRoutes from './tasks';
import journalRoutes from './journal';
import focusRoutes from './focus';
import mentorRoutes from './mentors';

const router = Router();

router.use('/auth', authRoutes);
router.use('/tasks', taskRoutes);
router.use('/journal', journalRoutes);
router.use('/focus', focusRoutes);
router.use('/mentors', mentorRoutes);

export default router;