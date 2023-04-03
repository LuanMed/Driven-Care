import appointmentService from "../services/appointmentService.js";

async function searchDoctor(req, res, next) {
    const { search } = req.params;
    try {
        const doctors = await appointmentService.searchDoctor(search);
        res.status(200).send(doctors)
    } catch (err) {
        next(err)
    }
}

async function searchSchedules(req, res, next){
    const { id } = req.params;
    try {
        const schedules = await appointmentService.searchSchedules(id);
        res.status(200).send(schedules)
    } catch (err) {
        next(err)
    }
}

async function getAppointments(req, res, next){
    const { id } = res.locals.user;
    try {
        const appointments = await appointmentService.getAppointments(id);
        res.status(200).send(appointments)
    } catch (err) {
        next(err)
    }
}

async function getDoctorAppointments(req, res, next){
    const { id } = res.locals.user;
    try {
        const appointments = await appointmentService.getDoctorAppointments(id);
        res.status(200).send(appointments)
    } catch (err) {
        next(err)
    }
}

async function getHistory(req, res, next){
    const { authorization } = req.headers;
    const token = authorization?.replace("Bearer ", "");
    try {
        const history = await appointmentService.getHistory(token);
        res.status(200).send(history)
    } catch (err) {
        next(err)
    }
}

async function makeAppointment(req, res, next){
    const { id } = req.params;
    const patient = res.locals.user;

    try {
        await appointmentService.makeAppointment(id, patient);
        res.sendStatus(201);
    } catch (err) {
        next(err)
    }
}

async function updateAppointments(req, res, next) {
    const { id } = req.params;
    const { state } = req.body;
    const doctor = res.locals.user;

    try {
        await appointmentService.updateAppointments(id, state, doctor);
        res.sendStatus(200);
    } catch (err) {
        next(err);
    }
}

export default {
    searchDoctor,
    searchSchedules,
    getAppointments,
    getDoctorAppointments,
    getHistory,
    makeAppointment,
    updateAppointments
}