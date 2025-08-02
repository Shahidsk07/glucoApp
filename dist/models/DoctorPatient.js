"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const database_1 = __importDefault(require("../config/database"));
const User_1 = __importDefault(require("./User"));
class DoctorPatient extends sequelize_1.Model {
}
DoctorPatient.init({
    id: { type: sequelize_1.DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    doctorId: { type: sequelize_1.DataTypes.INTEGER, allowNull: false },
    patientId: { type: sequelize_1.DataTypes.INTEGER, allowNull: false }
}, {
    sequelize: database_1.default,
    modelName: 'DoctorPatient'
});
User_1.default.belongsToMany(User_1.default, {
    through: DoctorPatient,
    as: 'Patients',
    foreignKey: 'doctorId'
});
User_1.default.belongsToMany(User_1.default, {
    through: DoctorPatient,
    as: 'Doctors',
    foreignKey: 'patientId'
});
exports.default = DoctorPatient;
