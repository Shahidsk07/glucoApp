import { Router } from 'express';
import { getNotifications, markAsRead } from '../controllers/notificationController';
import { protect } from '../middleware/authMiddleware';

const router = Router();

router.get('/', protect, getNotifications);
router.put('/:id/read', protect, markAsRead);

export default router;
