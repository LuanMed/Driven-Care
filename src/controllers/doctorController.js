import doctorService from "../services/doctorService.js";

async function signup(req, res, next){
    const { name, email, password, specialty, location, crm } = req.body;
    try {
        await doctorService.signup({ name, email, password, specialty, location, crm });
        return res.sendStatus(201);
    } catch (err) {
        next(err);
    }
}

async function signin(req, res, next) {
    const { email, password } = req.body;
    try {
        const token = await doctorService.signin({ email, password });
        return res.send({ token });
    } catch (err) {
        next(err);
    }
}

export default {
    signup,
    signin
}