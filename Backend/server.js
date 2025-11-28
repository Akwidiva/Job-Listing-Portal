const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const session = require('express-session');
// const AppleStrategy = require('passport-apple');
const axios = require('axios');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Session middleware (required for Passport OAuth)
app.use(session({
  secret: process.env.JWT_SECRET || 'your_session_secret',
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false } // Set to true in production with HTTPS
}));

// Passport Google OAuth Configuration
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: `${process.env.BACKEND_URL}/api/auth/google/callback`
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
      // Check if user already exists
      let user = await User.findOne({ email: profile.emails[0].value });

      if (user) {
        // User exists, return user
        return done(null, user);
      } else {
        // Create new user
        const newUser = new User({
          username: profile.displayName,
          email: profile.emails[0].value,
          password: await bcrypt.hash(Math.random().toString(36), 12), // Random password for OAuth users
        });

        user = await newUser.save();
        return done(null, user);
      }
    } catch (error) {
      return done(error, null);
    }
  }
));

// Apple OAuth Strategy - Commented out (requires paid Apple Developer account)
// passport.use(new AppleStrategy({
//     clientID: process.env.APPLE_CLIENT_ID,
//     teamID: process.env.APPLE_TEAM_ID,
//     keyID: process.env.APPLE_KEY_ID,
//     privateKey: process.env.APPLE_CLIENT_SECRET,
//     callbackURL: "http://localhost:5000/api/auth/apple/callback",
//     scope: ["name", "email"]
//   },
//   async (accessToken, refreshToken, profile, done) => {
//     try {
//       // Check if user already exists
//       let user = await User.findOne({ email: profile.email });

//       if (user) {
//         return done(null, user);
//       } else {
//         // Create new user
//         const newUser = new User({
//           username: profile.displayName || profile.email.split('@')[0],
//           email: profile.email,
//           password: await bcrypt.hash(Math.random().toString(36), 12),
//         });

//         user = await newUser.save();
//         return done(null, user);
//       }
//     } catch (error) {
//       return done(error, null);
//     }
//   }
// ));

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

// Initialize Passport
app.use(passport.initialize());

// MongoDB User Schema
const userSchema = new mongoose.Schema({
  username: String,
  email: { type: String, unique: true },
  password: String,
  resetPasswordToken: String,
  resetPasswordExpires: Date
});

const User = mongoose.model('User', userSchema);

// JWT Middleware
const authenticateToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Access token required' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid or expired token' });
    }
    req.user = user;
    next();
  });
};

// Email Transporter - FIXED: createTransport (not createTransporter)
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// Test Route
app.get('/', (req, res) => {
  res.json({ message: 'Backend is working!' });
});

// Register Route
app.post('/api/auth/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create user
    const user = new User({
      username,
      email,
      password: hashedPassword
    });

    await user.save();

    res.json({
      success: true,
      message: 'User registered successfully'
    });

  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Registration failed' });
  }
});

// Login Route
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Compare password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Generate JWT
    const token = jwt.sign(
      { id: user._id, email: user.email, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.json({
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        email: user.email,
        username: user.username
      }
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Login failed' });
  }
});

// Forgot Password Route
app.post('/api/auth/forgot-password', async (req, res) => {
  try {
    const { email } = req.body;
    console.log('Forgot password request for:', email);

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      // Don't reveal if user exists for security
      return res.json({
        success: true,
        message: 'If an account with that email exists, a reset link has been sent'
      });
    }

    // Generate reset token
    const crypto = require('crypto');
    const resetToken = crypto.randomBytes(20).toString('hex');

    // Set token and expiry (1 hour)
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = Date.now() + 3600000;
    await user.save();

    // Create reset URL
    const resetUrl = `http://localhost:3000/reset-password/${resetToken}`;

    // Send email
    const mailOptions = {
      to: user.email,
      from: process.env.EMAIL_USER,
      subject: 'Password Reset Request - Job Portal',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #007bff;">Password Reset Request</h2>
          <p>You requested a password reset for your Job Portal account.</p>
          <p>Click the button below to reset your password:</p>
          <a href="${resetUrl}"
             style="background-color: #007bff; color: white; padding: 12px 24px;
                    text-decoration: none; border-radius: 5px; display: inline-block;
                    margin: 20px 0;">
            Reset Your Password
          </a>
          <p>This link will expire in 1 hour.</p>
          <p>If you didn't request this, please ignore this email.</p>
          <hr>
          <p style="color: #666; font-size: 12px;">
            Job Portal Team
          </p>
        </div>
      `
    };

    await transporter.sendMail(mailOptions);

    res.json({
      success: true,
      message: 'If an account with that email exists, a reset link has been sent'
    });

  } catch (error) {
    console.error('Forgot password error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during password reset request'
    });
  }
});

// Verify Reset Token
app.get('/api/auth/verify-reset-token/:token', async (req, res) => {
  try {
    const { token } = req.params;

    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() }
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: 'Password reset token is invalid or has expired'
      });
    }

    res.json({
      success: true,
      message: 'Token is valid',
      email: user.email
    });

  } catch (error) {
    console.error('Token verification error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during token verification'
    });
  }
});

// Reset Password
app.post('/api/auth/reset-password/:token', async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() }
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: 'Password reset token is invalid or has expired'
      });
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Update user and clear reset token
    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    res.json({
      success: true,
      message: 'Password has been reset successfully'
    });

  } catch (error) {
    console.error('Reset password error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error during password reset'
    });
  }
});

// Protected Profile Route
app.get('/api/auth/profile', authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password -resetPasswordToken -resetPasswordExpires');
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json({ user });
  } catch (error) {
    console.error('Profile error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Logout Route (client-side token removal, but endpoint for consistency)
app.post('/api/auth/logout', (req, res) => {
  res.json({ message: 'Logged out successfully' });
});

// Google OAuth Routes
app.get('/api/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

app.get('/api/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  (req, res) => {
    // Successful authentication, generate JWT and redirect to frontend
    const token = jwt.sign(
      { id: req.user._id, email: req.user.email, username: req.user.username },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    // Redirect to login page with token (for consistency with manual signup)
    res.redirect(`http://localhost:3000/login?token=${token}`);
  }
);

// Apple OAuth Routes - Commented out (requires paid Apple Developer account)
// app.get('/api/auth/apple',
//   passport.authenticate('apple')
// );

// app.post('/api/auth/apple/callback',
//   passport.authenticate('apple', { failureRedirect: '/login' }),
//   (req, res) => {
//     // Successful authentication, generate JWT and redirect to frontend
//     const token = jwt.sign(
//       { id: req.user._id, email: req.user.email, username: req.user.username },
//       process.env.JWT_SECRET,
//       { expiresIn: '1h' }
//     );

//     // Redirect to frontend with token
//     res.redirect(`http://localhost:3000/dashboard?token=${token}`);
//   }
// );

// MongoDB Connection (skip in test environment)
if (process.env.NODE_ENV !== 'test') {
  console.log('🔄 Attempting to connect to MongoDB...');
  console.log('📍 MongoDB URI:', process.env.MONGODB_URI ? 'Atlas URI configured' : 'Using localhost fallback');

  mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/jobportal', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
    socketTimeoutMS: 45000, // Close sockets after 45s of inactivity
  })
  .then(() => console.log('✅ MongoDB connected successfully'))
  .catch(err => {
    console.log('❌ MongoDB connection error:', err.message);
    console.log('❌ Error code:', err.code);
    console.log('❌ Error codeName:', err.codeName);
    if (err.reason) {
      console.log('❌ Connection reason:', err.reason);
    }
  });
}

const PORT = process.env.PORT || 5000;

// Export for testing
module.exports = { app, User };

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
    console.log(`📧 Email user: ${process.env.EMAIL_USER}`);
  });
}