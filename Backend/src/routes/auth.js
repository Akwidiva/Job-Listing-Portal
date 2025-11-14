const express = require("express");
const router = express.Router();

const { loginLimiter, authCheck } = require("../middleware/authMiddleware");
const { login, register } = require("../controllers/authController");

// Public Routes with Rate Limiting
router.post("/login", loginLimiter, login);
router.post("/register", loginLimiter, register);

// Example Protected Route
router.get("/profile", authCheck, (req, res) => {
  res.json({ message: "Access granted", user: req.user });
});

module.exports = router;
