const Joi = require('joi');

const ingredientValidation = Joi.object({
  name: Joi.string().required().trim(),
  unit: Joi.string().required().trim(),
  stock: Joi.number().min(0).default(0)
});

module.exports = ingredientValidation;
