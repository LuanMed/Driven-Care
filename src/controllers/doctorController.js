import doctorService from "../services/doctorService.js";

async function signup(req, res){
    const { name, email, password, specialty, location, crm } = req.body;
    try {
        await doctorService.signup({ name, email, password, specialty, location, crm });
        return res.sendStatus(201);
    } catch (err) {
        return res.status(500).send(err.message);
    }
}

async function signin(req, res) {
    const { email, password } = req.body;
    try {
        const token = await doctorService.signin({ email, password });
        return res.send({ token });
    } catch (err) {
        return res.status(500).send(err.message);
    }
}

export default {
    signup,
    signin
}