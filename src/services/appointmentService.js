import errors from "../errors/index.js";
import appointmentRepository from "../repositories/appointmentRepository.js";

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

async function makeAppointment(id, patient){
    const { rows: [schedule], rowCount } = await appointmentRepository.getSchedule(id);
    if (!rowCount) throw errors.notFoundError();
    if (!schedule.available) throw errors.conflictError("Schedule isn't available");

    await appointmentRepository.makeAppointment(id, patient.id);
    await appointmentRepository.updateSchedule(id);
}

export default {
    searchDoctor,
    searchSchedules,
    makeAppointment
}