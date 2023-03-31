import errors from "../errors/index.js";
import doctorRepository from "../repositories/doctorRepository.js";

async function authDoctorValidation(req, res, next){
    const { authorization } = req.headers;
    const token = authorization?.replace("Bearer ", "");

    if (!token) return res.status(401).send("No token");

    try {
        const { rows: [session],} = await doctorRepository.findSessionByToken(token);
        if (!session) throw errors.unauthorizedError();

        const { rows: [user],} = await doctorRepository.findById(session.doctor_id);
        if (!user) throw errors.notFoundError();

        res.locals.user = user;
        next();
    } catch (err) {
        next(err);
    }
}

export default { authDoctorValidation };