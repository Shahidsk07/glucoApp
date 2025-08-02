"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SleepLog = void 0;
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../config/database"));
exports.SleepLog = database_1.default.define('SleepLog', {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    userId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    sleepStart: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false
    },
    sleepEnd: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false
    },
    duration: {
        type: sequelize_1.DataTypes.FLOAT, // in hours
        allowNull: false
    }
});
