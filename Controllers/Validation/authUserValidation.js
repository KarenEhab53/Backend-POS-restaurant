const joi = require("joi");
const { model } = require("mongoose");

const userRegisterSchema = joi.object({
    userName:joi.string().min(3).max(30).required(),
    email:joi.string().required().email().lowercase().trim(),
    password: joi.string().min(8).max(30).required(),
    role: joi.string().valid("cashier","admin").default("cashier")
})

const userLoginSchema = joi.object({
    email:joi.string().required().email().lowercase().trim(),
    password: joi.string().min(8).max(30).required()
})



const ingredientSchema = joi.object({
    name: joi.string().trim().required(),
    quantity: joi.number().min(0).default(0).required(),
    unit: joi.string().valid('kg', 'g', 'liter', 'piece').required(),
    creditSystem: joi.number().required()
});



module.exports = {
    userLoginSchema,
    userRegisterSchema ,
    ingredientSchema}