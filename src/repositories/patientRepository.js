import db from "../config/database.js";

async function findByEmail(email) {
    return await db.query(
        `    
      SELECT * FROM patients WHERE email=$1
    `,
        [email]
    );
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

export default {
    findByEmail,
    signup
}