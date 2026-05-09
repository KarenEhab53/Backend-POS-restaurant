const Category=require('../models/Category')
const categoryValidation=require('./Validation/CategoryValidation')

const createCategory=async (req,res) => {
    try {
        const { error, value } = categoryValidation.validate(req.body, {
          abortEarly: false,
          stripUnknown: true,
        });
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }
        const category = new Category(value);
        await category.save();
        res.status(201).json({ message: 'Category created successfully', category });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
const getAllCategory=async (req,res) =>{
    try {
        const category=await Category.find()
        res.status(200).json({
            msg:"All Category",
category:category
        })
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
const updateCategory=async (req,res) => {
    try {
        const { error, value } = categoryValidation.validate(req.body, {
          abortEarly: false,
          stripUnknown: true,
        });
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }
        const category = await Category.findByIdAndUpdate(req.params.id, value, { new: true });
        if (!category) {
            return res.status(404).json({ error: 'Category not found' });
        }
        res.status(200).json({ message: 'Category updated successfully', category });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
    
}
const deleteCategory=async (req,res) => {
    try {
        const category = await Category.findByIdAndDelete(req.params.id);
        if (!category) {
            return res.status(404).json({ error: 'Category not found' });
        }
        res.status(200).json({ message: 'Category deleted successfully', category });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
module.exports={createCategory, getAllCategory, updateCategory, deleteCategory};