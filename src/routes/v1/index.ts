import { Router } from "express";
const router = Router();

import appointment from "../v1/appointment.route";
import auth from "../v1/auth.route";
import billing from "../v1/billing.route";
import doctor from "../v1/doctor.route";
import patient from "../v1/patient.route";
import review from "../v1/reviews.route";

const routes = [
  {
    path: "/auth",
    route: auth,
  },
  {
    path: "/doctor",
    route: doctor,
  },
  {
    path: "/patient",
    route: patient,
  },
  {
    path: "/appointment",
    route: appointment,
  },
  {
    path: "/billing",
    route: billing,
  },
  {
    path: "/review",
    route: review,
  },
];

routes.forEach(({ path, route }) => router.use(path, route));

export default router;
