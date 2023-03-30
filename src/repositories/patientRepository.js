import db from "../config/database.js";

async function findByEmail(email) {
    return await db.query(
        `    
      SELECT * FROM patients WHERE email=$1
    `,
        [email]
    );
}

async function getSessionsById(id) {
    return await db.query(
        `
    SELECT * FROM patient_sessions WHERE patient_id=$1;
    `,
        [id]);
}

async function signup({ name, email, password }) {
    await db.query(
        `
        INSERT INTO patients (name, email, password)
        VALUES ($1, $2, $3)
        `,
        [name, email, password]
    );
}

async function signin({ patient_token, patient_id }) {
    await db.query(
        `
        INSERT INTO patient_sessions (patient_token, patient_id)
        VALUES ($1, $2)
    `,
        [patient_token, patient_id]
    );
}

async function updateSession(patient_token, patient_id){
    return await db.query(`
        UPDATE patient_sessions SET patient_token=$1 WHERE id=$2;
    `, [patient_token, patient_id]);
}

export default {
    findByEmail,
    getSessionsById,
    signup,
    signin,
    updateSession
}