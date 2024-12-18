import { Router } from 'express';
import { authenticate } from '../middleware/auth';
import { validateRequest } from '../middleware/validation';
import { rateLimit } from '../middleware/rateLimit';
import { schemas } from '../utils/validation';
import { focusController } from '../controllers/focusController';

const router = Router();

const focusLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: 'Too many focus session requests'
});

router.use(authenticate);
router.use(focusLimiter);

router.get('/', focusController.getSessions);
router.get('/stats', focusController.getStats);
router.post('/', validateRequest(schemas.focus.create), focusController.startSession);
router.put('/:id/complete', validateRequest(schemas.focus.complete), focusController.completeSession);

export default router;