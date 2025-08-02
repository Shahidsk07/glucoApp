import { Request, Response } from 'express';
import {GlucoseReading} from '../models/GlucoseReading';
import Notification from '../models/Notification';

interface AuthRequest extends Request {
  user?: {
    id: number;
    email?: string;
    name?: string;
  };
}

// ✅ Add Glucose Reading
export const addGlucoseReading = async (req: AuthRequest, res: Response) => {
  try {
    const { value, timestamp } = req.body;

    if (!req.user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const reading = await GlucoseReading.create({
      userId: req.user.id,
      value,
      timestamp: timestamp || new Date(),
    });

    // Trigger notification if high glucose
    if (value > 180) {
      await Notification.create({
        userId: req.user.id,
        message: 'High glucose level detected!',
        type: 'alert',
        isRead: false,
      });
    }

    res.status(201).json({ message: 'Glucose reading added', reading });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error });
  }
};

// ✅ Get All Glucose Readings for Logged-in User
export const getGlucoseReadings = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const readings = await GlucoseReading.findAll({
      where: { userId: req.user.id },
      order: [['timestamp', 'DESC']],
    });

    res.json({ readings });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error });
  }
};

// ✅ Update Glucose Reading
export const updateGlucoseReading = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const { id } = req.params;
    const { value, timestamp } = req.body;

    const reading = await GlucoseReading.findOne({
      where: { id, userId: req.user.id },
    });

    if (!reading) {
      return res.status(404).json({ message: 'Reading not found' });
    }

    reading.set({
      value: value || reading.getDataValue('value'),
      timestamp: timestamp || reading.getDataValue('timestamp'),
    });

    await reading.save();

    res.json({ message: 'Glucose reading updated', reading });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error });
  }
};

// ✅ Delete Glucose Reading
export const deleteGlucoseReading = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: 'Unauthorized' });
    }

    const { id } = req.params;

    const reading = await GlucoseReading.findOne({
      where: { id, userId: req.user.id },
    });

    if (!reading) {
      return res.status(404).json({ message: 'Reading not found' });
    }

    await reading.destroy();

    res.json({ message: 'Glucose reading deleted' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error });
  }
};
