import { Router } from 'express';
import { addGlucoseReading, getGlucoseReadings, updateGlucoseReading, deleteGlucoseReading } from '../controllers/glucoseController';
import { protect } from '../middleware/authMiddleware';

const router = Router();

// All routes are protected
router.post('/', protect, addGlucoseReading);
router.get('/', protect, getGlucoseReadings);
router.put('/:id', protect, updateGlucoseReading);
router.delete('/:id', protect, deleteGlucoseReading);

export default router;
