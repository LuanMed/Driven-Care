import bcrypt from "bcrypt";
import patientRepository from "../repositories/patientRepository.js";
import { v4 as uuidV4 } from "uuid";
import errors from "../errors/index.js";

async function signup ({name, email, password}) {
    const { rowCount } = await patientRepository.findByEmail(email);
    if (rowCount) throw errors.duplicatedEmailError(email);

    const hashPassword = await bcrypt.hash(password, 10);
    await patientRepository.signup({name, email, password: hashPassword});
}

async function signin ({ email, password }) {
    const { rowCount, rows: [user],} = await patientRepository.findByEmail(email);
    if (!rowCount) throw errors.invalidCredentialsError();

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) throw errors.invalidCredentialsError();

    const token = uuidV4();

    const { rows: [logged],} = await patientRepository.getSessionsById(user.id);
    if (logged) {
        await patientRepository.updateSession(token, logged.patient_id);
    } else {
        await patientRepository.signin({ patient_token: token, patient_id: user.id });
    }

    return token;
}

export default {
    signup,
    signin
}