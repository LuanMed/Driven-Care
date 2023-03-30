import { Router } from "express";
import doctorRoute from "./doctorRoute.js";
import patientRoute from "./patientRoute.js";

const routes = Router();

routes.use("/patients", patientRoute);
routes.use("/doctors", doctorRoute);

export default routes;