const jwt = require("jsonwebtoken")
const joi = require ("joi")
const Ingredients = require ("../models/Ingredients")
const {ingredientSchema} = require ("./Validation/authUserValidation")


const CreateIngredient = async (req, res, next) => {
    try {
        const { error, value } = ingredientSchema.validate(req.body, { 
            abortEarly: false,
            stripUnknown: true 
        });

        if (error) {
            return res.status(400).json({
                success: false,
                msg: error.details.map((err) => err.message),
            });
        }

        const { name } = value;
        const existIngredient = await Ingredients.findOne({ name: name.trim() });

        if (existIngredient) {
            return res.status(400).json({
                success: false,
                msg: "This ingredient is already registered. Please update the quantity instead of adding a new one.",
            });
        }

        const newIngredient = await Ingredients.create(value);

        if (!newIngredient) {
            return res.status(500).json({
                success: false,
                msg: "Failed to create ingredient due to a server error.",
            });
        }

        return res.status(201).json({
            success: true,
            data: newIngredient,
        });

    } catch (error) {
        next(error);
    }
};

const EditIngredient = async(req,res,next) => {
    try{
         const { quantity, ...otherData } = req.body;
         const TheEdit = await Ingredients.findByIdAndUpdate(req.params.id,
            {$inc: {quantity: quantity || 0} , $set: otherData},
            { new:true , runValidators:true});

            if(!TheEdit){
            return res.status(400).json({
                success:false,
                msg:"Failed to Update ingredient. Please check your data."
        })};

            return res.status(201).json({
                success:true,
                data:TheEdit
            })

    }

    catch(error){
        next(error)
    }}


const FindIngredient = async(req,res,next) => {
    try{
        const Ingredient = await Ingredients.findById(req.params.id);

        if (!Ingredient) {
            return res.status(404).json({
                success: false,
                msg: "Ingredient not found."
            });
        } 

        res.status(200).json({
            success:true,
            data:Ingredient
        })

    }

    catch(error){
        next(error)
    }

}


const FindAllIngredients = async(req,res,next) => {
    try{
        const allIngredients = await Ingredients.find()
        if (allIngredients.length === 0) {
            return res.status(404).json({
                success: false,
                msg: "No ingredients found in the store."
            });
        } 

        res.status(201).json({
            success:true,
            data:allIngredients
        })
    }

    catch(error){
        next(error)
    }

}


const DeleteIngredient = async(req,res,next) => {
    try{
        const DeletedIngredient = await Ingredients.findByIdAndDelete(req.params.id)

        if (!DeletedIngredient) {
            return res.status(404).json({
                success: false,
                msg: "Ingredient not found or already deleted."
            });
        }
        res.status(200).json({
            success:true
        })
    }

    catch(error){
        next(error)
    }

}

module.exports = {
    CreateIngredient,
    EditIngredient,
    FindIngredient,
    FindAllIngredients,
    DeleteIngredient
}