const express = require("express");

const router = express.Router();

const { register, login, logout } = require("../Controllers/authUserController");


router.post("/register",  register);

router.post("/login", login);

router.get("/logout", logout);

module.exports = router;