const Joi = require('joi');
const categoryValidation = Joi.object({
    name: Joi.string().required().trim(),
})
module.exports = categoryValidation;