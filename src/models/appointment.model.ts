import { Document, Schema, Types, model } from "mongoose";

export interface IAppointment extends Document {
  doctor: Types.ObjectId;
  patient: Types.ObjectId;
  date: Date;
  time: string;
  status: string;
}

const appointmentSchema = new Schema<IAppointment>(
  {
    doctor: {
      type: Schema.Types.ObjectId,
      ref: "Doctor",
      required: true,
    },
    patient: {
      type: Schema.Types.ObjectId,
      ref: "Patient",
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: ["booked", "completed", "canceled"],
      default: "booked",
    },
  },
  {
    timestamps: true,
  }
);

export default model<IAppointment>("Appointment", appointmentSchema);
