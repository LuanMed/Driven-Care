import errors from "../errors/index.js";
import appointmentRepository from "../repositories/appointmentRepository.js";
import doctorRepository from "../repositories/doctorRepository.js";
import patientRepository from "../repositories/patientRepository.js";

async function searchDoctor(search){
    const { rows, rowCount } = await appointmentRepository.searchDoctor(search);
    if (!rowCount) throw errors.notFoundError();
    return rows;
}

async function searchSchedules(id){
    const { rows, rowCount } = await appointmentRepository.searchSchedules(id);
    if (!rowCount) throw errors.notFoundError();
    return rows;
}

async function getAppointments(id){
    const { rows, rowCount } = await appointmentRepository.getAppointments(id);
    if (!rowCount) throw errors.notFoundError();
    return rows;
}

async function getDoctorAppointments(id){
    const { rows, rowCount } = await appointmentRepository.getDoctorAppointments(id);
    if (!rowCount) throw errors.notFoundError();
    return rows;
}

async function getHistory(token){
    if (!token) throw errors.unauthorizedError();
    const { rows: [doctorSession],} = await doctorRepository.findSessionByToken(token);
    const { rows: [patientSession],} = await patientRepository.findSessionByToken(token);
    if (!patientSession && !doctorSession) throw errors.unauthorizedError();

    const { rows: history, rowCount } = await appointmentRepository.getHistory();
    if (!rowCount) throw errors.notFoundError();
    return history;
}

async function makeAppointment(id, patient){
    const { rows: [schedule], rowCount } = await appointmentRepository.getSchedule(id);
    if (!rowCount) throw errors.notFoundError();
    if (!schedule.available) throw errors.conflictError("Schedule isn't available");

    await appointmentRepository.makeAppointment(id, patient.id);
    await appointmentRepository.updateSchedule(id);
}

async function updateAppointments(id, state, doctor) {
    const { rows: [appointment], rowCount } = await appointmentRepository.getDoctorAppointment(id);
    if (!rowCount) throw errors.notFoundError();
    if (appointment.doctor_id !== doctor.id) throw errors.conflictError("This is not your appointment");
    if (appointment.state !== 'created') throw errors.conflictError("Already been confirmed, cancelled or done");

    await appointmentRepository.updateAppointments(id, state);
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