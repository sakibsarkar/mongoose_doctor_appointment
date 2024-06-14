import {Router} from "express";
import {
  createAppointmentIntoDB,
  deleteAppointmentById,
  getAllAppointments,
  getAppointmentById,
  updateAppointmentById,
} from "../../controllers/appointment.controller";
const router = Router();

router.post("/create", createAppointmentIntoDB);
router.get("/get/all", getAllAppointments);
router.get("/get/:id", getAppointmentById);
router.put("/update/:id", updateAppointmentById);
router.delete("/delete/:id", deleteAppointmentById);

export default router;
