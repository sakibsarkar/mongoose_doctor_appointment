import { validationResult } from "express-validator";
import catchAsyncError from "../middlewares/catchAsyncErrors";
import Appointment from "../models/appointment.model";
import Doctor from "../models/doctor.model";
import Review from "../models/review.model";

export const createReviewController = catchAsyncError(
  async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const firstError = errors.array().map((error) => error.msg)[0];
      return res.status(422).json({
        errors: firstError,
      });
    }

    const { patient, doctor, rating, comment, appointment } = req.body;

    try {
      const existingAppointment = await Appointment.findById(appointment);

      if (!existingAppointment) {
        return res.status(404).json({ message: "Appointment not found" });
      }

      if (existingAppointment.patient.toString() !== patient) {
        return res.status(400).json({
          message: "The appointment does not belong to the patient",
        });
      }

      // Create the review
      const newReview = await Review.create({
        patient,
        doctor,
        rating,
        comment,
        appointment,
      });

      res.status(201).json(newReview);
    } catch (error) {
      res.status(500).json({ message: "Error creating review", error });
    }
  }
);

export const getReviewsForDoctorController = catchAsyncError(
  async (req, res, next) => {
    const { id } = req.params;

    try {
      const doctor = await Doctor.findById(id).populate("reviews");

      if (!doctor) {
        return res.status(404).json({ message: "Doctor not found" });
      }

      return res.status(200).json({
        success: true,
        reviews: doctor.reviews,
      });
    } catch (error) {
      return res
        .status(500)
        .json({ success: false, msg: "Error retrieving reviews.", error });
    }
  }
);

export const deleteReviewController = catchAsyncError(
  async (req, res, next) => {
    const { id } = req.params;

    try {
      const review = await Review.findByIdAndDelete(id);

      if (!review) {
        return res.status(404).json({ message: "Review not found" });
      }

      // await Doctor.findByIdAndUpdate(
      //   review.doctor,
      //   { $pull: { reviews: review._id } },
      //   { new: true }
      // );

      // await Patient.findByIdAndUpdate(
      //   review.patient,
      //   { $pull: { reviews: review._id } },
      //   { new: true }
      // );

      return res.status(200).json({
        success: true,
        msg: "Review deleted successfully.",
      });
    } catch (error) {
      return res
        .status(500)
        .json({ success: false, msg: "Error deleting review.", error });
    }
  }
);
