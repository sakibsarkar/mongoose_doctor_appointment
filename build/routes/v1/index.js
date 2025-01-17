"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const auth_route_1 = __importDefault(require("../v1/auth.route"));
const doctor_route_1 = __importDefault(require("../v1/doctor.route"));
const patient_route_1 = __importDefault(require("../v1/patient.route"));
const appointment_route_1 = __importDefault(require("../v1/appointment.route"));
const billing_route_1 = __importDefault(require("../v1/billing.route"));
const reviews_route_1 = __importDefault(require("../v1/reviews.route"));
router.use("/auth", auth_route_1.default);
router.use("/doctor", doctor_route_1.default);
router.use("/patient", patient_route_1.default);
router.use("/appointment", appointment_route_1.default);
router.use("/billing", billing_route_1.default);
router.use("/review", reviews_route_1.default);
exports.default = router;
