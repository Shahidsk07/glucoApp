import { Request, Response } from 'express';
import Notification from '../models/Notification';

interface AuthRequest extends Request {
  user?: { id: number }; // ✅ More specific type
}

// ✅ Get All Notifications
export const getNotifications = async (req: AuthRequest, res: Response) => {
  try {
    const notifications = await Notification.findAll({
      where: { userId: req.user?.id },
      order: [['createdAt', 'DESC']] // ✅ Use createdAt instead of timestamp if using Sequelize default
    });

    res.json({ notifications });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

// ✅ Mark as Read
export const markAsRead = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const notification = await Notification.findByPk(id);

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
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};
