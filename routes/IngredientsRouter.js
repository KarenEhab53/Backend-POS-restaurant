const express = require("express");
const router = express.Router();
const authMiddleware = require("../Middleware/authMiddleware");
const isAdmin = require("../Middleware/adminMiddleware");
const {
  CreateIngredient,
  EditIngredient,
  FindIngredient,
  FindAllIngredients,
  DeleteIngredient,
} = require("../Controllers/IngredientsController");

router.post("/create", authMiddleware, CreateIngredient);
router.get("/findAll", authMiddleware, FindAllIngredients);
router.patch("/edit/:id", authMiddleware, EditIngredient);
router.get("/find/:id", authMiddleware, FindIngredient);
router.delete("/delete/:id", authMiddleware, isAdmin, DeleteIngredient);

module.exports = router;
