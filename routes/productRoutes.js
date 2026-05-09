const express = require('express');
const router = express.Router();
const { createProduct, getAllProducts, getProductById, updateProduct, deleteProduct, purchaseProduct } = require('../Controllers/productController');
const authMiddleware = require('../Middleware/authMiddleware');
const adminMiddleware = require('../Middleware/adminMiddleware');

router.post('/addProduct', authMiddleware, adminMiddleware, createProduct);
router.get('/getAllProducts', getAllProducts);
router.get('/getProduct/:id', getProductById);
router.put('/updateProduct/:id', authMiddleware, adminMiddleware, updateProduct);
router.delete('/deleteProduct/:id', authMiddleware, adminMiddleware, deleteProduct);
router.post('/purchaseProduct/:id', authMiddleware, purchaseProduct);

module.exports = router;
