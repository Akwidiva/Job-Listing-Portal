const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: function() {
      return !this.googleId; // Password required only if not using Google auth
    },
  },
  userType: {
    type: String,
    enum: ['job-seeker', 'employer'],
    required: true,
  },
  googleId: {
    type: String,
    sparse: true, // Allows null values but ensures uniqueness when present
  },
  avatar: {
    type: String,
  },
  bio: {
    type: String,
    default: ''
  },
  location: {
    type: String,
    default: ''
  },
  phone: {
    type: String,
    default: ''
  },
  socialLinks: {
    type: Object,
    default: {}
  },
  resumes: [{
    filename: String,
    originalName: String,
    path: String,
    uploadedAt: { type: Date, default: Date.now }
  }],
  // Employer-specific fields
  companyName: { type: String, default: '' },
  companyDescription: { type: String, default: '' },
  industry: { type: String, default: '' },
  companySize: { type: String, default: '' },
  founded: { type: String, default: '' },
  website: { type: String, default: '' },
  brandColor: { type: String, default: '#1B82F6' },
  isVerified: {
    type: Boolean,
    default: false,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('User', userSchema);