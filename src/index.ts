import app from './app';
import sequelize from './config/database';
import './models/User';
import './models/GlucoseReading';
import './models/Meal';
import './models/Activity';
import './models/SleepLog';
import './models/Notification';
import './models/DoctorPatient';
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 5000;

(async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Database connected successfully');
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  } catch (error) {
    console.error('❌ Database connection failed:', error);
  }
})();
