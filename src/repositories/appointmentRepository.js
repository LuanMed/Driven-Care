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
    SELECT * FROM schedules WHERE id = $1
    `, [id]
    );
}

async function makeAppointment(schedule_id, patient_id) {
    await db.query(`
    INSERT INTO appointments (patient_id, schedule_id, state)
    VALUES ($1, $2, 'created')
    `, [patient_id, schedule_id]
    );
}

async function updateSchedule(id) {
    await db.query(`
        UPDATE schedules SET available = 'false' WHERE id = $1
    `, [id]
    );
}

export default {
    searchDoctor,
    searchSchedules,
    getSchedule,
    makeAppointment,
    updateSchedule
}