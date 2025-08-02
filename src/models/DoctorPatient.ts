import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/database';
import User from './User';

class DoctorPatient extends Model {
  public id!: number;
  public doctorId!: number;
  public patientId!: number;
}

DoctorPatient.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    doctorId: { type: DataTypes.INTEGER, allowNull: false },
    patientId: { type: DataTypes.INTEGER, allowNull: false }
  },
  {
    sequelize,
    modelName: 'DoctorPatient'
  }
);

User.belongsToMany(User, {
  through: DoctorPatient,
  as: 'Patients',
  foreignKey: 'doctorId'
});

User.belongsToMany(User, {
  through: DoctorPatient,
  as: 'Doctors',
  foreignKey: 'patientId'
});

export default DoctorPatient;
