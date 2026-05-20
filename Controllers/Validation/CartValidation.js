const joi = require("joi");

const CartValidation = joi.object({
    productId: joi.string().hex().length(24).required().messages({
        "string.empty": "Product ID is required",
        "string.length": "Invalid Product ID format"
    }),
    
    quantity: joi.number().integer().min(1).default(1)
});

module.exports = CartValidation;