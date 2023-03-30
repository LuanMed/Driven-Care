import db from "../config/database.js";

async function findByEmail(email) {
    return await db.query(
        `    
      SELECT * FROM doctors WHERE email=$1
    `,
        [email]
    );
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

export default {
    findByEmail,
    signup
}