"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const glucoseController_1 = require("../controllers/glucoseController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = (0, express_1.Router)();
// All routes are protected
router.post('/', authMiddleware_1.protect, glucoseController_1.addGlucoseReading);
router.get('/', authMiddleware_1.protect, glucoseController_1.getGlucoseReadings);
router.put('/:id', authMiddleware_1.protect, glucoseController_1.updateGlucoseReading);
router.delete('/:id', authMiddleware_1.protect, glucoseController_1.deleteGlucoseReading);
exports.default = router;
