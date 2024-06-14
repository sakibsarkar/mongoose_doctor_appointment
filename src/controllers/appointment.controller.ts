import { validationResult } from "express-validator";
import catchAsyncError from "../middlewares/catchAsyncErrors";
import Appointment from "../models/appointment.model";
import Doctor from "../models/doctor.model";

export const createAppointmentIntoDB = catchAsyncError(
  async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const firstError = errors.array().map((error) => error.msg)[0];
      return res.status(422).json({
        errors: firstError,
      });
    }

    const data = req.body;

    try {
      const existDoctor = await Doctor.findById(data?.doctor);

      if (!existDoctor) {
        return res.status(404).json({ message: "Doctor not found" });
      }

      const newAppointment = await Appointment.create(data);

      res.status(201).json(newAppointment);
    } catch (error) {
      res.status(500).json({ message: "Error creating appointment", error });
    }
  }
);

export const getAllAppointments = catchAsyncError(async (req, res, next) => {
  try {
    const appointments = await Appointment.find()
      .populate("doctor", "name specialization")
      .populate("patient", "name email");

    return res.status(200).json({
      success: true,
      msg: "Appointments have been retrieved successfully.",
      appointments,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, msg: "Error retrieving appointments.", error });
  }
});

export const getAppointmentById = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;

  try {
    const appointment = await Appointment.findById(id)
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
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, msg: "Error retrieving appointment.", error });
  }
});

export const updateAppointmentById = catchAsyncError(async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const firstError = errors.array().map((error) => error.msg)[0];
    return res.status(422).json({
      errors: firstError,
    });
  }

  const { id } = req.params;
  const { doctor, patient, date, time, status } = req.body;

  try {
    const appointment = await Appointment.findById(id);

    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    appointment.doctor = doctor || appointment.doctor;
    appointment.patient = patient || appointment.patient;
    appointment.date = date || appointment.date;
    appointment.time = time || appointment.time;
    appointment.status = status || appointment.status;

    await appointment.save();

    return res.status(200).json({
      success: true,
      msg: "Appointment updated successfully.",
      appointment,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, msg: "Error updating appointment.", error });
  }
});

export const deleteAppointmentById = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;

  try {
    const appointment = await Appointment.findByIdAndDelete(id);

    if (!appointment) {
      return res.status(404).json({ message: "Appointment not found" });
    }

    return res.status(200).json({
      success: true,
      msg: "Appointment deleted successfully.",
    });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, msg: "Error deleting appointment.", error });
  }
});
