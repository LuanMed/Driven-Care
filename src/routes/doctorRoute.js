import { Router } from "express";
import doctorController from "../controllers/doctorController.js";
import { validateSchema } from "../middlewares/schemaValidationMiddleware.js";
import { doctorSchemma } from "../schemas/Doctor.js";

const doctorRoute = Router();

doctorRoute.post('/signup', validateSchema(doctorSchemma), doctorController.signup)

export default doctorRoute;