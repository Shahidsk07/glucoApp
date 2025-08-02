import { Router, Request, Response } from 'express';
import { register, login } from '../controllers/authController';
import { protect } from '../middleware/authMiddleware';

interface AuthRequest extends Request {
  user?: any;
}

const router = Router();

router.post('/register', register);
router.post('/login', login);

// ✅ Add protect middleware
router.get('/me', protect, (req: AuthRequest, res: Response) => {
  res.json(req.user);
});

export default router;
