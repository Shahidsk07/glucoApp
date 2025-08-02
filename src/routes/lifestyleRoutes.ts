import { Router } from 'express';
import { addMeal, getMeals, addSleepLog, addActivity } from '../controllers/lifestyleController';
import { protect } from '../middleware/authMiddleware';

const router = Router();

router.post('/meal', protect, addMeal);
router.get('/meal', protect, getMeals);

router.post('/sleep', protect, addSleepLog);
router.post('/activity', protect, addActivity);

export default router;
