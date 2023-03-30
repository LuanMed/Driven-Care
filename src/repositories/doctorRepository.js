import db from "../config/database.js";

async function findByEmail(email) {
    return await db.query(
        `    
      SELECT * FROM doctors WHERE email=$1
    `,
        [email]
    );
}

async function getSessionsById(id) {
    return await db.query(
        `
    SELECT * FROM doctor_sessions WHERE doctor_id=$1;
    `,
        [id]);
}

async function signup({ name, email, password, specialty, location, crm }) {
    await db.query(
        `
        INSERT INTO doctors (name, email, password, specialty, location, crm)
        VALUES ($1, $2, $3, $4, $5, $6)
        `,
        [name, email, password, specialty, location, crm]
    );
}

async function signin({ doctor_token, doctor_id }) {
    await db.query(
        `
        INSERT INTO doctor_sessions (doctor_token, doctor_id)
        VALUES ($1, $2)
    `,
        [doctor_token, doctor_id]
    );
}

async function updateSession(doctor_token, doctor_id){
    return await db.query(`
        UPDATE doctor_sessions SET doctor_token=$1 WHERE id=$2;
    `, [doctor_token, doctor_id]);
}

export default {
    findByEmail,
    getSessionsById,
    signup,
    signin,
    updateSession
}