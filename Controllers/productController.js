const Product = require('../models/Product');
const Ingredient = require('../models/Ingredient');
const productValidation = require('./Validation/productValidation');

const createProduct = async (req, res) => {
  try {
    const { error, value } = productValidation.validate(req.body, { abortEarly: false, stripUnknown: true });
    if (error) return res.status(400).json({ error: error.details[0].message });

    const product = new Product(value);
    await product.save();
    res.status(201).json({ message: 'Product created successfully', product });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};





const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find()
      .populate('category', 'name')
      .populate('ingredients.ingredient', 'name unit stock');
    res.status(200).json({ message: 'all products', products });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
      .populate('category', 'name')
      .populate('ingredients.ingredient', 'name unit stock');
    if (!product) return res.status(404).json({ error: 'product not found' });
    res.status(200).json({ product });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateProduct = async (req, res) => {
  try {
    const { error, value } = productValidation.validate(req.body, { abortEarly: false, stripUnknown: true });
    if (error) return res.status(400).json({ error: error.details[0].message });

    const product = await Product.findByIdAndUpdate(req.params.id, value, { new: true });
    if (!product) return res.status(404).json({ error: 'product not found' });
    res.status(200).json({ message: 'product updated successfully', product });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ error: 'product not found' });
    res.status(200).json({ message: 'product deleted successfully', product });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const purchaseProduct = async (req, res) => {
  try {
    const { quantity = 1 } = req.body;
    const product = await Product.findById(req.params.id).populate('ingredients.ingredient');
    if (!product) return res.status(404).json({ error: 'product not found' });

    
    for (const item of product.ingredients) {
      const required = item.quantity * quantity;
      if (item.ingredient.stock < required) {
        return res.status(400).json({
          error: `Insufficient stock for ingredient: ${item.ingredient.name}. Available: ${item.ingredient.stock}, Required: ${required}`
        });
      }
    }

    
    for (const item of product.ingredients) {
      await Ingredient.findByIdAndUpdate(item.ingredient._id, {
        $inc: { stock: -(item.quantity * quantity) }
      });
    }

    res.status(200).json({ message: `Product "${product.name}" purchased x${quantity}. Ingredient stock updated.` });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { createProduct, getAllProducts, getProductById, updateProduct, deleteProduct, purchaseProduct };
