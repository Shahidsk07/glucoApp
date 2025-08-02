import { Router } from 'express';
import authRoutes from './authRoutes';
import glucoseRoutes from './glucoseRoutes';
import lifestyleRoutes from './lifestyleRoutes';



const router = Router();

router.use('/auth', authRoutes);
router.use('/glucose', glucoseRoutes);
router.use('/lifestyle', lifestyleRoutes);

export default router;
