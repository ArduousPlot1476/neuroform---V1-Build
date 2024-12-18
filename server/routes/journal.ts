import { Router } from 'express';
import { authenticate } from '../middleware/auth';
import { validateRequest } from '../middleware/validation';
import { rateLimit } from '../middleware/rateLimit';
import { schemas } from '../utils/validation';
import { journalController } from '../controllers/journalController';

const router = Router();

// Apply rate limiting - 100 requests per 15 minutes
const journalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: 'Too many journal requests, please try again later'
});

router.use(authenticate);
router.use(journalLimiter);

router.get('/', journalController.getEntries);
router.get('/streak', journalController.getStreak);
router.post('/', validateRequest(schemas.journal.create), journalController.createEntry);
router.put('/:id', validateRequest(schemas.journal.update), journalController.updateEntry);

export default router;