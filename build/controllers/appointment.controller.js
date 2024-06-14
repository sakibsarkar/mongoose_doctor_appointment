"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteAppointmentById = exports.updateAppointmentById = exports.getAppointmentById = exports.getAllAppointments = exports.createAppointmentIntoDB = void 0;
const express_validator_1 = require("express-validator");
const catchAsyncErrors_1 = __importDefault(require("../middlewares/catchAsyncErrors"));
const appointment_model_1 = __importDefault(require("../models/appointment.model"));
const doctor_model_1 = __importDefault(require("../models/doctor.model"));
exports.createAppointmentIntoDB = (0, catchAsyncErrors_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        const firstError = errors.array().map((error) => error.msg)[0];
        return res.status(422).json({
            errors: firstError,
        });
    }
    const data = req.body;
    try {
        const existDoctor = yield doctor_model_1.default.findById(data === null || data === void 0 ? void 0 : data.doctor);
        if (!existDoctor) {
            return res.status(404).json({ message: "Doctor not found" });
        }
        const newAppointment = yield appointment_model_1.default.create(data);
        res.status(201).json(newAppointment);
    }
    catch (error) {
        res.status(500).json({ message: "Error creating appointment", error });
    }
}));
exports.getAllAppointments = (0, catchAsyncErrors_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const appointments = yield appointment_model_1.default.find()
            .populate("doctor", "name specialization")
            .populate("patient", "name email");
        return res.status(200).json({
            success: true,
            msg: "Appointments have been retrieved successfully.",
            appointments,
        });
    }
    catch (error) {
        return res
            .status(500)
            .json({ success: false, msg: "Error retrieving appointments.", error });
    }
}));
exports.getAppointmentById = (0, catchAsyncErrors_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const appointment = yield appointment_model_1.default.findById(id)
            .populate("doctor", "name specialization")
            .populate("patient", "name email");
        if (!appointment) {
            return res.status(404).json({ message: "Appointment not found" });
        }
        return res.status(200).json({
            success: true,
            msg: "Appointment retrieved successfully.",
            appointment,
        });
    }
    catch (error) {
        return res
            .status(500)
            .json({ success: false, msg: "Error retrieving appointment.", error });
    }
}));
exports.updateAppointmentById = (0, catchAsyncErrors_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        const firstError = errors.array().map((error) => error.msg)[0];
        return res.status(422).json({
            errors: firstError,
        });
    }
    const { id } = req.params;
    const { doctor, patient, date, time, status } = req.body;
    try {
        const appointment = yield appointment_model_1.default.findById(id);
        if (!appointment) {
            return res.status(404).json({ message: "Appointment not found" });
        }
        appointment.doctor = doctor || appointment.doctor;
        appointment.patient = patient || appointment.patient;
        appointment.date = date || appointment.date;
        appointment.time = time || appointment.time;
        appointment.status = status || appointment.status;
        yield appointment.save();
        return res.status(200).json({
            success: true,
            msg: "Appointment updated successfully.",
            appointment,
        });
    }
    catch (error) {
        return res
            .status(500)
            .json({ success: false, msg: "Error updating appointment.", error });
    }
}));
exports.deleteAppointmentById = (0, catchAsyncErrors_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const appointment = yield appointment_model_1.default.findByIdAndDelete(id);
        if (!appointment) {
            return res.status(404).json({ message: "Appointment not found" });
        }
        return res.status(200).json({
            success: true,
            msg: "Appointment deleted successfully.",
        });
    }
    catch (error) {
        return res
            .status(500)
            .json({ success: false, msg: "Error deleting appointment.", error });
    }
}));
