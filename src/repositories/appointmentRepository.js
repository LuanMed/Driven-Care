import db from "../config/database.js";

async function searchDoctor(search) {
    return await db.query(`
        SELECT id, name, specialty, location, crm
        FROM doctors WHERE name = $1 OR specialty = $1 OR location = $1;
    `, [search]
    );
}

async function searchSchedules(id) {
    return await db.query(`
        SELECT s.id, s.time, s.date,
        s.available, d.name as doctor,
        d.specialty, d.location
        FROM schedules s
        JOIN doctors d ON s.doctor_id = d.id
        WHERE d.id = $1;
    `, [id]
    )
}

async function getSchedule(id) {
    return await db.query(`
        SELECT * FROM schedules WHERE id = $1;
    `, [id]
    );
}

async function getAppointments(id) {
    return await db.query(`
        SELECT a.id, s.time, s.date, d.name doctor, d.specialty
        FROM appointments a
        JOIN schedules s ON a.schedule_id = s.id
        JOIN doctors d ON s.doctor_id = d.id
        WHERE a.patient_id = $1;
    `, [id]
    );
}

async function getDoctorAppointments(id) {
    return await db.query(`
        SELECT a.id, s.time, s.date, p.name patient, d.specialty
        FROM appointments a
        JOIN schedules s ON a.schedule_id = s.id
        JOIN patients p ON a.patient_id = p.id
        JOIN doctors d ON d.id = s.doctor_id
        WHERE s.doctor_id = $1;
    `, [id]
    );
}

async function getDoctorAppointment(id){ 
    return await db.query(`
        SELECT a.id, s.doctor_id, a.state
        FROM appointments a
        JOIN schedules s ON a.schedule_id = s.id
        WHERE a.id = $1;
    `, [id])
}

async function getHistory() {
    return await db.query(`
        SELECT a.id, s.time, s.date, p.name patient,
        d.name doctor, d.specialty, a.state
        FROM appointments a
        JOIN schedules s ON a.schedule_id = s.id
        JOIN patients p ON a.patient_id = p.id
        JOIN doctors d ON d.id = s.doctor_id
        WHERE a.state = 'done';
    `)
}

async function makeAppointment(schedule_id, patient_id) {
    await db.query(`
        INSERT INTO appointments (patient_id, schedule_id, state)
        VALUES ($1, $2, 'created');
    `, [patient_id, schedule_id]
    );
}

async function updateSchedule(id) {
    await db.query(`
        UPDATE schedules SET available = 'false' WHERE id = $1
    `, [id]
    );
}

async function updateAppointments(id, state) {
    await db.query(`
        UPDATE appointments SET state = $1 WHERE id = $2
    `, [state, id]
    );
}

export default {
    searchDoctor,
    searchSchedules,
    getSchedule,
    getAppointments,
    getDoctorAppointments,
    getDoctorAppointment,
    getHistory,
    makeAppointment,
    updateSchedule,
    updateAppointments
}