"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const database_1 = __importDefault(require("./config/database"));
require("./models/User");
require("./models/GlucoseReading");
require("./models/Meal");
require("./models/Activity");
require("./models/SleepLog");
require("./models/Notification");
require("./models/DoctorPatient");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const PORT = process.env.PORT || 5000;
(async () => {
    try {
        await database_1.default.authenticate();
        console.log('✅ Database connected successfully');
        app_1.default.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
    }
    catch (error) {
        console.error('❌ Database connection failed:', error);
    }
})();
