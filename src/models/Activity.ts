import { DataTypes } from 'sequelize';
import  sequelize  from '../config/database';

export const Activity = sequelize.define('Activity', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  type: {
    type: DataTypes.STRING, // walking, running, gym
    allowNull: false
  },
  duration: {
    type: DataTypes.FLOAT, // in minutes
    allowNull: false
  },
  caloriesBurned: {
    type: DataTypes.FLOAT,
    allowNull: true
  },
  timestamp: {
    type: DataTypes.DATE,
    allowNull: false
  }
});
