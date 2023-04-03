import { Router } from "express";
import appointmentController from "../controllers/appointmentController.js";
import authPatientMiddleware from "../middlewares/authPatientMiddleware.js";
import authDoctorMiddleware from "../middlewares/authDoctorMiddleware.js";

const appointmentRoute = Router();

appointmentRoute.get('/doctors/:search', authPatientMiddleware.authPatientValidation, appointmentController.searchDoctor);
appointmentRoute.get('/schedules/:id', authPatientMiddleware.authPatientValidation, appointmentController.searchSchedules);
appointmentRoute.get('/', authPatientMiddleware.authPatientValidation, appointmentController.getAppointments); 
appointmentRoute.get('/doctor', authDoctorMiddleware.authDoctorValidation, appointmentController.getDoctorAppointments);
appointmentRoute.get('/history', appointmentController.getHistory);
appointmentRoute.post('/schedules/:id', authPatientMiddleware.authPatientValidation, appointmentController.makeAppointment);
appointmentRoute.put('/doctor/:id', authDoctorMiddleware.authDoctorValidation, appointmentController.updateAppointments);

export default appointmentRoute;