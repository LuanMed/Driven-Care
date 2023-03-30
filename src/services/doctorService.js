import bcrypt from "bcrypt";
import doctorRepository from "../repositories/doctorRepository.js";

async function signup ({ name, email, password, specialty, location, crm }) {
    const { rowCount } = await doctorRepository.findByEmail(email);
    if (rowCount) throw new Error("User already exists");

    const hashPassword = await bcrypt.hash(password, 10);
    await doctorRepository.signup({name, email, password: hashPassword, specialty, location, crm});
}

export default {
    signup
}