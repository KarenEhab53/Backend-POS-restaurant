const express = require('express');
const router=express.Router();
const {createCategory,getAllCategory,updateCategory,deleteCategory}=require('../Controllers/categoryController')
const adminMiddleware = require("../Middleware/adminMiddleware");
const  authMiddleware= require("../Middleware/authMiddleware");
router.post("/addCategory",authMiddleware, adminMiddleware, createCategory);
router.put("/getAllCategory/:id", authMiddleware, adminMiddleware, updateCategory);
router.get("/getAllCategory", getAllCategory);
router.delete("/deleteCategory/:id", authMiddleware, adminMiddleware, deleteCategory);
module.exports=router;