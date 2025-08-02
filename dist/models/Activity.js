"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Activity = void 0;
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../config/database"));
exports.Activity = database_1.default.define('Activity', {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    userId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    type: {
        type: sequelize_1.DataTypes.STRING, // walking, running, gym
        allowNull: false
    },
    duration: {
        type: sequelize_1.DataTypes.FLOAT, // in minutes
        allowNull: false
    },
    caloriesBurned: {
        type: sequelize_1.DataTypes.FLOAT,
        allowNull: true
    },
    timestamp: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false
    }
});
