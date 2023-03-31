import { Router } from "express";
import appointmentController from "../controllers/appointmentController.js";
import authPatientMiddleware from "../middlewares/authPatientMiddleware.js";

const appointmentRoute = Router();

appointmentRoute.get('/doctors/:search', authPatientMiddleware.authPatientValidation, appointmentController.searchDoctor);
appointmentRoute.get('/schedules/:id', authPatientMiddleware.authPatientValidation, appointmentController.searchSchedules);
appointmentRoute.get('/', authPatientMiddleware.authPatientValidation, appointmentController.getAppointments); 
appointmentRoute.post('/schedules/:id', authPatientMiddleware.authPatientValidation, appointmentController.makeAppointment);

export default appointmentRoute;