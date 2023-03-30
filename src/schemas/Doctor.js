import joi from "joi";

export const doctorSchemma = joi.object({
    name: joi.string().min(2).required(),
    email: joi.string().email().required(),
    password: joi.string().required(),
    specialty: joi.string().required(),
    location: joi.string().required(),
    crm: joi.string().required()
});