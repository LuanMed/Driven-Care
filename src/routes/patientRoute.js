import { Router } from "express";
import patientController from "../controllers/patientController.js";
import { validateSchema } from "../middlewares/schemaValidationMiddleware.js";
import { patientSchemma } from "../schemas/Patient.js";


const patientRoute = Router();

patientRoute.post('/signup', validateSchema(patientSchemma), patientController.signup)

export default patientRoute;