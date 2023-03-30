import bcrypt from "bcrypt";
import doctorRepository from "../repositories/doctorRepository.js";
import { v4 as uuidV4 } from "uuid";

async function signup ({ name, email, password, specialty, location, crm }) {
    const { rowCount } = await doctorRepository.findByEmail(email);
    if (rowCount) throw new Error("User already exists");

    const hashPassword = await bcrypt.hash(password, 10);
    await doctorRepository.signup({name, email, password: hashPassword, specialty, location, crm});
}

async function signin ({ email, password }) {
    const { rowCount, rows: [user],} = await doctorRepository.findByEmail(email);
    if (!rowCount) throw new Error("Incorrect email or password");

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) throw new Error("Incorrect email or password");

    const token = uuidV4();

    const { rows: [logged],} = await doctorRepository.getSessionsById(user.id);
    if (logged) {
        await doctorRepository.updateSession(token, logged.doctor_id);
    } else {
        await doctorRepository.signin({ doctor_token: token, doctor_id: user.id });
    }

    return token;
}

export default {
    signup,
    signin
}