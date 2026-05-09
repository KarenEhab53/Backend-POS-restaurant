const Ingredient = require('../models/Ingredient');
const ingredientValidation = require('./Validation/ingredientValidation');

const createIngredient = async (req, res) => {
  try {
    const { error, value } = ingredientValidation.validate(req.body, { abortEarly: false, stripUnknown: true });
    if (error) return res.status(400).json({ error: error.details[0].message });

    const ingredient = new Ingredient(value);
    await ingredient.save();
    res.status(201).json({ message: 'ingredient created successfully', ingredient });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getAllIngredients = async (req, res) => {
  try {
    const ingredients = await Ingredient.find();
    res.status(200).json({ message: 'all Ingredients', ingredients });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getIngredientById = async (req, res) => {
  try {
    const ingredient = await Ingredient.findById(req.params.id);
    if (!ingredient) return res.status(404).json({ error: 'ingredient not found' });
    res.status(200).json({ ingredient });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateIngredient = async (req, res) => {
  try {
    const { error, value } = ingredientValidation.validate(req.body, { abortEarly: false, stripUnknown: true });
    if (error) return res.status(400).json({ error: error.details[0].message });

    const ingredient = await Ingredient.findByIdAndUpdate(req.params.id, value, { new: true });
    if (!ingredient) return res.status(404).json({ error: 'ingredient not found' });
    res.status(200).json({ message: 'ingredient updated successfully', ingredient });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deleteIngredient = async (req, res) => {
  try {
    const ingredient = await Ingredient.findByIdAndDelete(req.params.id);
    if (!ingredient) return res.status(404).json({ error: 'ingredient not found' });
    res.status(200).json({ message: 'ingredient deleted successfully', ingredient });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


const restockIngredient = async (req, res) => {
  try {
    const { amount } = req.body;
    if (!amount || amount <= 0) return res.status(400).json({ error: 'amount must be a positive number' });

    const ingredient = await Ingredient.findByIdAndUpdate(
      req.params.id,
      { $inc: { stock: amount } },
      { new: true }
    );
    if (!ingredient) return res.status(404).json({ error: 'Ingredient not found' });
    res.status(200).json({ message: 'stock updated successfully', ingredient });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { createIngredient, getAllIngredients, getIngredientById, updateIngredient, deleteIngredient, restockIngredient };
