require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const Job = require('../models/Job');

const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/jobportal';

async function seed() {
  try {
    await mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('Connected to Mongo for seeding:', mongoURI);

    // Clear sample data (be careful!)
    await User.deleteMany({ email: /@example.com$/ });
    await Job.deleteMany({ title: /Sample Job/ });

    // Create sample users
    const passwordHash = await bcrypt.hash('Password123!', 10);

    const employer = new User({
      name: 'Acme Corp',
      email: 'employer@example.com',
      password: passwordHash,
      userType: 'employer',
      companyName: 'Acme Corporation',
      companyDescription: 'Leading technology solutions provider specializing in cloud infrastructure, enterprise software development, and innovative digital solutions for businesses worldwide.',
      industry: 'Technology',
      companySize: '500-1000',
      founded: '2010',
      website: 'https://acmecorp.example.com',
      location: '123 Tech Street, San Francisco, CA 94105',
      brandColor: '#1B82F6',
    });

    const seeker = new User({
      name: 'Jane Doe',
      email: 'seeker@example.com',
      password: passwordHash,
      userType: 'job-seeker',
    });

    await employer.save();
    await seeker.save();

    // Create sample job
    const job = new Job({
      title: 'Sample Job - Frontend Engineer',
      company: 'Acme Corp',
      location: 'Remote',
      salaryRange: '$60k - $90k',
      description: 'A sample frontend engineering role for testing purposes.',
      qualifications: ['3+ years JS', 'React'],
      responsibilities: ['Build UIs', 'Collaborate with team'],
      createdBy: employer._id,
    });

    await job.save();

    console.log('Seeding complete. Created users and a sample job.');
    process.exit(0);
  } catch (err) {
    console.error('Seeding error:', err);
    process.exit(1);
  }
}

seed();
