import{Router} from "express";
import {
  createPatientController,
  deletePatientController,
  getAllPatientsController,
  getPatientByIdController,
  updatePatientController,
} from "../../controllers/patient.controller";
import { isAuthenticatedUser } from "../../middlewares/auth";
const router = Router();

router.post("/p/create", isAuthenticatedUser, createPatientController);
router.get("/p/get/all", getAllPatientsController);
router.get("/p/get/:id", getPatientByIdController);
router.patch("/p/update/:id", updatePatientController);
router.delete("/p/delete/:id", deletePatientController);

export default router;
