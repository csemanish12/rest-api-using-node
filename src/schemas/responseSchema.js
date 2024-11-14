const Joi = require('joi');

const userResponseSchema =  Joi.object({
    id: Joi.string().required(),
    username: Joi.string().required(),
    email: Joi.string().optional()
});

const userListResponseSchema = Joi.array().items(userResponseSchema);

module.exports = {
    userResponseSchema,
    userListResponseSchema 
};
