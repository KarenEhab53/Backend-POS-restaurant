const Joi = require('joi');

const productValidation = Joi.object({
  name: Joi.string().required().trim(),
  price: Joi.number().positive().required(),
  category: Joi.string().hex().length(24).required(),
  ingredients: Joi.array().items(
    Joi.object({
      ingredient: Joi.string().hex().length(24).required(),
      quantity: Joi.number().positive().required()
    })
  ).min(1).required()
});

module.exports = productValidation;
