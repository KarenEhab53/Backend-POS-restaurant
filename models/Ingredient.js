const mongoose = require('mongoose');

const ingredientSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  unit: { type: String, required: true, trim: true },
  stock: { type: Number, required: true, default: 0 }
});

module.exports = mongoose.model('Ingredient', ingredientSchema);
