import { Router } from "express";
import appointmentRoute from "./appointmentRoute.js";
import doctorRoute from "./doctorRoute.js";
import patientRoute from "./patientRoute.js";

const routes = Router();

routes.use("/patients", patientRoute);
routes.use("/doctors", doctorRoute);
routes.use("/appointments", appointmentRoute);

export default routes;