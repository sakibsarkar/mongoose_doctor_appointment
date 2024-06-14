"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const appointment_controller_1 = require("../../controllers/appointment.controller");
const router = express_1.default.Router();
router.post("/create", appointment_controller_1.createAppointmentIntoDB);
router.get("/get/all", appointment_controller_1.getAllAppointments);
router.get("/get/:id", appointment_controller_1.getAppointmentById);
router.put("/update/:id", appointment_controller_1.updateAppointmentById);
router.delete("/delete/:id", appointment_controller_1.deleteAppointmentById);
exports.default = router;
