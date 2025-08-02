import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';
import User from './User';

class Notification extends Model {
  public id!: number;
  public userId!: number;
  public message!: string;
  public status!: 'unread' | 'read';
}

Notification.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    userId: { type: DataTypes.INTEGER, allowNull: false },
    message: { type: DataTypes.STRING, allowNull: false },
    status: { type: DataTypes.ENUM('unread', 'read'), defaultValue: 'unread' }
  },
  {
    sequelize,
    modelName: 'Notification'
  }
);

User.hasMany(Notification, { foreignKey: 'userId', onDelete: 'CASCADE' });
Notification.belongsTo(User, { foreignKey: 'userId' });

export default Notification;
