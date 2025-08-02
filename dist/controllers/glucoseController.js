"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteGlucoseReading = exports.updateGlucoseReading = exports.getGlucoseReadings = exports.addGlucoseReading = void 0;
const GlucoseReading_1 = require("../models/GlucoseReading");
const Notification_1 = __importDefault(require("../models/Notification"));
// ✅ Add Glucose Reading
const addGlucoseReading = async (req, res) => {
    try {
        const { value, timestamp } = req.body;
        if (!req.user) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        const reading = await GlucoseReading_1.GlucoseReading.create({
            userId: req.user.id,
            value,
            timestamp: timestamp || new Date(),
        });
        // Trigger notification if high glucose
        if (value > 180) {
            await Notification_1.default.create({
                userId: req.user.id,
                message: 'High glucose level detected!',
                type: 'alert',
                isRead: false,
            });
        }
        res.status(201).json({ message: 'Glucose reading added', reading });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error });
    }
};
exports.addGlucoseReading = addGlucoseReading;
// ✅ Get All Glucose Readings for Logged-in User
const getGlucoseReadings = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        const readings = await GlucoseReading_1.GlucoseReading.findAll({
            where: { userId: req.user.id },
            order: [['timestamp', 'DESC']],
        });
        res.json({ readings });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error });
    }
};
exports.getGlucoseReadings = getGlucoseReadings;
// ✅ Update Glucose Reading
const updateGlucoseReading = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        const { id } = req.params;
        const { value, timestamp } = req.body;
        const reading = await GlucoseReading_1.GlucoseReading.findOne({
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
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error });
    }
};
exports.updateGlucoseReading = updateGlucoseReading;
// ✅ Delete Glucose Reading
const deleteGlucoseReading = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        const { id } = req.params;
        const reading = await GlucoseReading_1.GlucoseReading.findOne({
            where: { id, userId: req.user.id },
        });
        if (!reading) {
            return res.status(404).json({ message: 'Reading not found' });
        }
        await reading.destroy();
        res.json({ message: 'Glucose reading deleted' });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error });
    }
};
exports.deleteGlucoseReading = deleteGlucoseReading;
