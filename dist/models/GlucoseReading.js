"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GlucoseReading = void 0;
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../config/database"));
exports.GlucoseReading = database_1.default.define('GlucoseReading', {
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    userId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false
    },
    value: {
        type: sequelize_1.DataTypes.FLOAT,
        allowNull: false
    },
    timestamp: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false
    }
});
