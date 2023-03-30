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

export default {
    signup
}