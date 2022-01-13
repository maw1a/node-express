// Refers to /user routes
const express = require("express");
const router = express.Router();
const { register, login, profile } = require("../controllers/userController");
const { auth } = require("../middlewares/auth");

// User Routes
// Register
router.post("/register", register);
// Login
router.post("/login", login);
// Profile
router.get("/me", auth, profile);

module.exports = router;
