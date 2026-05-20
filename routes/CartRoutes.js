const express = require ("express")

const router = express.Router()

const authMiddleware = require("../Middleware/authMiddleware");
const {CreateCart,ReadCart,EditCart,DeleteCart}= require("../Controllers/CartController")


router.post("/CreateCart", authMiddleware, CreateCart);    
router.get("/ReadCart", authMiddleware, ReadCart);      
router.put("/EditCart", authMiddleware, EditCart);      
router.delete("/DeleteCart", authMiddleware, DeleteCart);  

module.exports = router