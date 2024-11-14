const Joi = require('joi');

const registerSchema = Joi.object({
    username: Joi.string().min(2).max(50).required(),
    password: Joi.string().min(2).required(),
}).options({abortEarly: false, stripUnknown: true});

const loginSchema = Joi.object({
    username: Joi.string().min(2).max(50).required(),
    password: Joi.string().min(2).required()
});

module.exports = {
    registerSchema,
    loginSchema
};