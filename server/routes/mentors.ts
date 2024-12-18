import { Router } from 'express';
import { authenticate } from '../middleware/auth';
import { validateRequest } from '../middleware/validation';
import { rateLimit } from '../middleware/rateLimit';
import { schemas } from '../utils/validation';
import { mentorController } from '../controllers/mentorController';

const router = Router();

const mentorLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: 'Too many mentor session requests'
});

router.use(authenticate);
router.use(mentorLimiter);

router.get('/sessions', mentorController.getSessions);
router.post('/sessions', validateRequest(schemas.mentor.schedule), mentorController.scheduleSession);
router.put('/sessions/:id', validateRequest(schemas.mentor.update), mentorController.updateSession);
router.delete('/sessions/:id', validateRequest(schemas.mentor.cancel), mentorController.cancelSession);
router.get('/availability', validateRequest(schemas.mentor.checkAvailability), mentorController.checkAvailability);

export default router;