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
exports.deleteDoctorController = exports.updateDoctorController = exports.getDoctorByIdController = exports.getAllDoctorsController = exports.createDoctorController = void 0;
const express_validator_1 = require("express-validator");
const catchAsyncErrors_1 = __importDefault(require("../middlewares/catchAsyncErrors"));
const appointment_model_1 = __importDefault(require("../models/appointment.model"));
const doctor_model_1 = __importDefault(require("../models/doctor.model"));
exports.createDoctorController = (0, catchAsyncErrors_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = (0, express_validator_1.validationResult)(req);
    const userId = req.user;
    if (!userId) {
        return res.status(422).json({
            errors: "Something went wrong",
        });
    }
    if (!errors.isEmpty()) {
        const firstError = errors.array().map((error) => error.msg)[0];
        return res.status(422).json({
            errors: firstError,
        });
    }
    const { name, specialization, phone, email, availability } = req.body;
    try {
        const existingDoctor = yield doctor_model_1.default.findOne({ email });
        if (existingDoctor) {
            return res
                .status(400)
                .json({ message: "Doctor with this email already exists" });
        }
        const newDoctor = yield doctor_model_1.default.create({
            name,
            specialization,
            phone,
            email,
            availability,
            userId: userId === null || userId === void 0 ? void 0 : userId._id,
        });
        res.status(201).json(newDoctor);
    }
    catch (error) {
        res.status(500).json({ message: "Error creating doctor", error });
    }
}));
exports.getAllDoctorsController = (0, catchAsyncErrors_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const doctors = yield doctor_model_1.default.find();
        return res.status(200).json({
            success: true,
            msg: "Doctors have been retrieved successfully.",
            doctors,
        });
    }
    catch (error) {
        return res
            .status(500)
            .json({ success: false, msg: "Error retrieving doctors.", error });
    }
}));
exports.getDoctorByIdController = (0, catchAsyncErrors_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const doctor = yield doctor_model_1.default.findById(id).populate("reviews");
        if (!doctor) {
            return res.status(404).json({ message: "Doctor not found" });
        }
        return res.status(200).json({
            success: true,
            msg: "Doctor retrieved successfully.",
            doctor,
        });
    }
    catch (error) {
        return res
            .status(500)
            .json({ success: false, msg: "Error retrieving doctor.", error });
    }
}));
exports.updateDoctorController = (0, catchAsyncErrors_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        const firstError = errors.array().map((error) => error.msg)[0];
        return res.status(422).json({
            errors: firstError,
        });
    }
    const { id } = req.params;
    const { name, specialization, phone, email, availability } = req.body;
    try {
        const doctor = yield doctor_model_1.default.findById(id);
        if (!doctor) {
            return res.status(404).json({ message: "Doctor not found" });
        }
        doctor.name = name || doctor.name;
        doctor.specialization = specialization || doctor.specialization;
        doctor.phone = phone || doctor.phone;
        doctor.email = email || doctor.email;
        doctor.availability = availability || doctor.availability;
        yield doctor.save();
        return res.status(200).json({
            success: true,
            msg: "Doctor updated successfully.",
            doctor,
        });
    }
    catch (error) {
        return res
            .status(500)
            .json({ success: false, msg: "Error updating doctor.", error });
    }
}));
exports.deleteDoctorController = (0, catchAsyncErrors_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const doctor = yield doctor_model_1.default.findByIdAndDelete(id);
        if (!doctor) {
            return res.status(404).json({ message: "Doctor not found" });
        }
        yield appointment_model_1.default.updateMany({ doctor: doctor._id, status: { $ne: "completed" } }, { status: "canceled" });
        return res.status(200).json({
            success: true,
            msg: "Doctor deleted successfully and associated appointments canceled.",
        });
    }
    catch (error) {
        return res
            .status(500)
            .json({ success: false, msg: "Error deleting doctor.", error });
    }
}));
