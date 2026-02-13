const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  title: { type: String, required: true },
  company: { type: String, required: true },
  location: { type: String },
  type: { type: String, enum: ['Full-time', 'Part-time', 'Contract', 'Internship', 'Remote'], default: 'Full-time' },
  salaryRange: { type: String },
  description: { type: String },
  qualifications: [String],
  responsibilities: [String],
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
}, { timestamps: true });

module.exports = mongoose.model('Job', jobSchema);
