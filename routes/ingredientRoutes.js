const express = require('express');
const router = express.Router();
const { createIngredient, getAllIngredients, getIngredientById, updateIngredient, deleteIngredient, restockIngredient } = require('../Controllers/ingredientController');
const authMiddleware = require('../Middleware/authMiddleware');
const adminMiddleware = require('../Middleware/adminMiddleware');

router.post('/addIngredient', authMiddleware, adminMiddleware, createIngredient);
router.get('/getAllIngredients', getAllIngredients);
router.get('/getIngredient/:id', getIngredientById);
router.put('/updateIngredient/:id', authMiddleware, adminMiddleware, updateIngredient);
router.delete('/deleteIngredient/:id', authMiddleware, adminMiddleware, deleteIngredient);
router.patch('/restockIngredient/:id', authMiddleware, adminMiddleware, restockIngredient);

module.exports = router;
