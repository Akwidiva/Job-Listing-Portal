const express = require('express');
const path = require('path');
const fs = require('fs');
const multer = require('multer');
const auth = require('../middleware/authMiddleware');
const { getProfile, updateProfile, uploadResume } = require('../controllers/profileController');

const router = express.Router();

// Ensure upload directory exists
const uploadsDir = path.join(__dirname, '..', '..', 'uploads', 'resumes');
fs.mkdirSync(uploadsDir, { recursive: true });

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadsDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + '-' + file.originalname.replace(/\s+/g, '_'));
  }
});

const upload = multer({ storage, limits: { fileSize: 5 * 1024 * 1024 } }); // 5MB limit

// GET /api/profile
router.get('/', auth, getProfile);

// PUT /api/profile
router.put('/', auth, updateProfile);

// POST /api/profile/resume
router.post('/resume', auth, upload.single('resume'), uploadResume);

module.exports = router;
