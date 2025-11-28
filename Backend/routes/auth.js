const express = require("express");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const User = require("../models/user");

const router = express.Router();

// ---------------- REGISTER ----------------
router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check user exists
    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ error: "Email already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    await newUser.save();
    res.json({ message: "Registration successful" });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

// ---------------- FORGOT PASSWORD ----------------
router.post("/forgot-password", async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.status(404).json({ message: "User not found" });

  // Generate random token
  const resetToken = crypto.randomBytes(32).toString("hex");
  const hashedToken = await bcrypt.hash(resetToken, 10);

  // Save hashed token and expiry
  user.resetPasswordToken = hashedToken;
  user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
  await user.save();

  // Send email
  const resetUrl = `http://localhost:3000/reset-password/${resetToken}?id=${user._id}`;

  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: { user: process.env.EMAIL, pass: process.env.EMAIL_PASS },
  });

  await transporter.sendMail({
    to: email,
    subject: "Reset Password Link",
    html: `<p>Click <a href="${resetUrl}">here</a> to reset your password. The link expires in 1 hour.</p>`,
  });

  res.json({ message: "Password reset link sent to your email." });
});

// ---------------- RESET PASSWORD ----------------
router.post("/reset-password/:token", async (req, res) => {
  const { token } = req.params;
  const { id } = req.query;
  const { newPassword } = req.body;

  const user = await User.findById(id);
  if (!user) return res.status(404).json({ message: "User not found" });

  if (Date.now() > user.resetPasswordExpires)
    return res.status(400).json({ message: "Token expired" });

  const isValid = await bcrypt.compare(token, user.resetPasswordToken);
  if (!isValid) return res.status(400).json({ message: "Invalid token" });

  // Hash new password
  user.password = await bcrypt.hash(newPassword, 10);
  user.resetPasswordToken = undefined;
  user.resetPasswordExpires = undefined;

  await user.save();
  res.json({ message: "Password updated successfully!" });
});

module.exports = router;
