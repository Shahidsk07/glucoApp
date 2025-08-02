import { Request, Response } from 'express';
import { Meal } from '../models/Meal';
import { SleepLog } from '../models/SleepLog';
import { Activity } from '../models/Activity';

interface AuthRequest extends Request {
  user?: any;
}

// ✅ Add Meal
export const addMeal = async (req: AuthRequest, res: Response) => {
  try {
    const { type, description, calories, timestamp } = req.body;

    const meal = await Meal.create({
      userId: req.user.id,
      type,
      description,
      calories,
      timestamp: timestamp || new Date()
    });

    res.status(201).json({ message: 'Meal added', meal });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// ✅ Get All Meals
export const getMeals = async (req: AuthRequest, res: Response) => {
  try {
    const meals = await Meal.findAll({ where: { userId: req.user.id } });
    res.json({ meals });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};
export const addSleepLog = async (req: AuthRequest, res: Response) => {
  try {
    const { sleepStart, sleepEnd } = req.body;
    const duration = (new Date(sleepEnd).getTime() - new Date(sleepStart).getTime()) / (1000 * 60 * 60);

    const log = await SleepLog.create({
      userId: req.user.id,
      sleepStart,
      sleepEnd,
      duration
    });

    res.status(201).json({ message: 'Sleep log added', log });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};
export const addActivity = async (req: AuthRequest, res: Response) => {
  try {
    const { type, duration, caloriesBurned, timestamp } = req.body;

    const activity = await Activity.create({
      userId: req.user.id,
      type,
      duration,
      caloriesBurned,
      timestamp: timestamp || new Date()
    });

    res.status(201).json({ message: 'Activity added', activity });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};
