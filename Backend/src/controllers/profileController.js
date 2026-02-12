const fs = require('fs');
const path = require('path');
const User = require('../models/User');

const getProfile = async (req, res) => {
  try {
    const userId = req.user.userId;
    const user = await User.findById(userId).select('-password -googleId');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json({ user });
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const updateProfile = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { bio, location, phone, socialLinks } = req.body;

    const update = {};
    if (bio !== undefined) update.bio = bio;
    if (location !== undefined) update.location = location;
    if (phone !== undefined) update.phone = phone;
    if (socialLinks !== undefined) update.socialLinks = socialLinks;

    const user = await User.findByIdAndUpdate(userId, { $set: update }, { new: true }).select('-password -googleId');
    res.json({ user });
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const uploadResume = async (req, res) => {
  try {
    const userId = req.user.userId;
    if (!req.file) return res.status(400).json({ message: 'No file uploaded' });

    const resumeEntry = {
      filename: req.file.filename,
      originalName: req.file.originalname,
      path: req.file.path.replace(/\\/g, '/'),
      uploadedAt: new Date(),
    };

    const user = await User.findByIdAndUpdate(
      userId,
      { $push: { resumes: resumeEntry } },
      { new: true }
    ).select('-password -googleId');

    res.status(201).json({ resumes: user.resumes });
  } catch (error) {
    console.error('Upload resume error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getProfile,
  updateProfile,
  uploadResume,
};
