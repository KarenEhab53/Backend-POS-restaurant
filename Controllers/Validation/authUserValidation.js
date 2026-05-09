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

module.exports = {
    userLoginSchema,
    userRegisterSchema}