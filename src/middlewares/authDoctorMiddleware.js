import doctorRepository from "../repositories/doctorRepository.js";

async function authDoctorValidation(req, res, next){
    const { authorization } = req.headers;
    const token = authorization?.replace("Bearer ", "");

    if (!token) return res.status(401).send("No token");

    try {
        const { rows: [session],} = await doctorRepository.findSessionByToken(token);
        if (!session) return res.status(401).send("Session not found");

        const { rows: [user],} = await doctorRepository.findById(session.userId);
        if (!user) return res.status(401).send("User not found");

        res.locals.user = user;
        next();
    } catch (err) {
        res.status(500).send(err.message);
    }
}

export default { authDoctorValidation };