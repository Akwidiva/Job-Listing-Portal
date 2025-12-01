const express = require('express');
const { register, login } = require('../controllers/authController');
const auth = require('../middleware/authMiddleware');
const passport = require('../config/passport');

const router = express.Router();

// Public routes
router.post('/register', register);
router.post('/login', login);

// Google OAuth routes
router.get('/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

router.get('/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  (req, res) => {
    // Create JWT token for the authenticated user
    const jwt = require('jsonwebtoken');
    const token = jwt.sign(
      { userId: req.user._id, email: req.user.email, userType: req.user.userType },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '7d' }
    );

    // Store token and user data in localStorage via redirect
    const userData = {
      id: req.user._id,
      name: req.user.name,
      email: req.user.email,
      userType: req.user.userType,
      avatar: req.user.avatar,
    };

    // Redirect to frontend with token and user data
    const redirectUrl = `${process.env.FRONTEND_URL || 'http://localhost:3000'}/login?token=${token}&user=${encodeURIComponent(JSON.stringify(userData))}`;
    res.redirect(redirectUrl);
  }
);

// Protected route example
router.get('/profile', auth, (req, res) => {
  res.json({ user: req.user });
});

module.exports = router;