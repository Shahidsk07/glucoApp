import { DataTypes } from 'sequelize';
import  sequelize  from '../config/database';

export const SleepLog = sequelize.define('SleepLog', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  sleepStart: {
    type: DataTypes.DATE,
    allowNull: false
  },
  sleepEnd: {
    type: DataTypes.DATE,
    allowNull: false
  },
  duration: {
    type: DataTypes.FLOAT, // in hours
    allowNull: false
  }
});
