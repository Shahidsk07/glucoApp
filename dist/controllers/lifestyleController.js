"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addActivity = exports.addSleepLog = exports.getMeals = exports.addMeal = void 0;
const Meal_1 = require("../models/Meal");
const SleepLog_1 = require("../models/SleepLog");
const Activity_1 = require("../models/Activity");
// ✅ Add Meal
const addMeal = async (req, res) => {
    try {
        const { type, description, calories, timestamp } = req.body;
        const meal = await Meal_1.Meal.create({
            userId: req.user.id,
            type,
            description,
            calories,
            timestamp: timestamp || new Date()
        });
        res.status(201).json({ message: 'Meal added', meal });
    }
    catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};
exports.addMeal = addMeal;
// ✅ Get All Meals
const getMeals = async (req, res) => {
    try {
        const meals = await Meal_1.Meal.findAll({ where: { userId: req.user.id } });
        res.json({ meals });
    }
    catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};
exports.getMeals = getMeals;
const addSleepLog = async (req, res) => {
    try {
        const { sleepStart, sleepEnd } = req.body;
        const duration = (new Date(sleepEnd).getTime() - new Date(sleepStart).getTime()) / (1000 * 60 * 60);
        const log = await SleepLog_1.SleepLog.create({
            userId: req.user.id,
            sleepStart,
            sleepEnd,
            duration
        });
        res.status(201).json({ message: 'Sleep log added', log });
    }
    catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};
exports.addSleepLog = addSleepLog;
const addActivity = async (req, res) => {
    try {
        const { type, duration, caloriesBurned, timestamp } = req.body;
        const activity = await Activity_1.Activity.create({
            userId: req.user.id,
            type,
            duration,
            caloriesBurned,
            timestamp: timestamp || new Date()
        });
        res.status(201).json({ message: 'Activity added', activity });
    }
    catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};
exports.addActivity = addActivity;
