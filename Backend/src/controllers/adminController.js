const bcrypt = require('bcryptjs');
const User = require('../models/User');
const Job = require('../models/Job');

const seed = async (req, res) => {
  try {
    if (process.env.NODE_ENV === 'production') return res.status(403).json({ message: 'Forbidden' });

    // Clear sample data
    await User.deleteMany({ email: /@example.com$/ });
    await Job.deleteMany({ title: /Sample Job/ });

    const passwordHash = await bcrypt.hash('Password123!', 10);

    const employer = new User({
      name: 'Acme Corp',
      email: 'employer@example.com',
      password: passwordHash,
      userType: 'employer',
    });

    const seeker = new User({
      name: 'Jane Doe',
      email: 'seeker@example.com',
      password: passwordHash,
      userType: 'job-seeker',
    });

    await employer.save();
    await seeker.save();

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

    res.json({ message: 'Seeded sample users and jobs' });
  } catch (err) {
    console.error('Seed error:', err);
    res.status(500).json({ message: 'Seeding failed', error: err.message });
  }
};

module.exports = { seed };
