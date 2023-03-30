import bcrypt from "bcrypt";
import patientRepository from "../repositories/patientRepository.js";

async function signup ({name, email, password}) {
    const { rowCount } = await patientRepository.findByEmail(email);
    if (rowCount) throw new Error("User already exists");

    const hashPassword = await bcrypt.hash(password, 10);
    await patientRepository.signup({name, email, password: hashPassword});
}

export default {
    signup
}