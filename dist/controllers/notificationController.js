"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.markAsRead = exports.getNotifications = void 0;
const Notification_1 = __importDefault(require("../models/Notification"));
// ✅ Get All Notifications
const getNotifications = async (req, res) => {
    try {
        const notifications = await Notification_1.default.findAll({
            where: { userId: req.user?.id },
            order: [['createdAt', 'DESC']] // ✅ Use createdAt instead of timestamp if using Sequelize default
        });
        res.json({ notifications });
    }
    catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};
exports.getNotifications = getNotifications;
// ✅ Mark as Read
const markAsRead = async (req, res) => {
    try {
        const { id } = req.params;
        const notification = await Notification_1.default.findByPk(id);
        if (!notification) {
            return res.status(404).json({ message: 'Notification not found' });
        }
        if (notification.userId !== req.user?.id) {
            return res.status(403).json({ message: 'Not authorized' });
        }
        // ✅ Use `set` or direct assignment with type assertion
        notification.set({ isRead: true });
        await notification.save();
        res.json({ message: 'Notification marked as read', notification });
    }
    catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};
exports.markAsRead = markAsRead;
