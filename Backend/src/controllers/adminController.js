const bcrypt = require('bcryptjs');
const User = require('../models/User');
const Job = require('../models/Job');

const seed = async (req, res) => {
  try {
    if (process.env.NODE_ENV === 'production') return res.status(403).json({ message: 'Forbidden' });

    // Clear sample data
    await User.deleteMany({ email: /@example.com$/ });
    await Job.deleteMany({});

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

    const sampleJobs = [
      { title: 'Senior Software Engineer', company: 'TechCorp Inc', location: 'San Francisco, CA', type: 'Full-time', salaryRange: '$150,000 - $200,000', description: 'We are looking for an experienced Senior Software Engineer to join our growing team.', qualifications: ['5+ years experience', 'React', 'Node.js'], responsibilities: ['Lead development', 'Code reviews', 'Mentoring'] },
      { title: 'Product Manager', company: 'InnovateLabs', location: 'New York, NY', type: 'Full-time', salaryRange: '$120,000 - $160,000', description: 'Lead product strategy and development for our flagship platform.', qualifications: ['3+ years PM experience', 'Analytics', 'Leadership'], responsibilities: ['Product roadmap', 'Stakeholder management', 'User research'] },
      { title: 'UX/UI Designer', company: 'DesignStudio', location: 'Remote', type: 'Remote', salaryRange: '$90,000 - $130,000', description: 'Create beautiful and intuitive user experiences for web and mobile applications.', qualifications: ['Figma', 'UI Design', 'User Research'], responsibilities: ['Design systems', 'Prototyping', 'User testing'] },
      { title: 'Data Scientist', company: 'DataDriven Co', location: 'Boston, MA', type: 'Full-time', salaryRange: '$130,000 - $180,000', description: 'Analyze complex datasets and build machine learning models to drive business insights.', qualifications: ['Python', 'Machine Learning', 'SQL'], responsibilities: ['Data analysis', 'Model building', 'Reporting'] },
      { title: 'Marketing Manager', company: 'BrandBoost', location: 'Los Angeles, CA', type: 'Full-time', salaryRange: '$100,000 - $140,000', description: 'Develop and execute marketing strategies to grow our brand presence.', qualifications: ['Digital Marketing', 'Strategy', 'Analytics'], responsibilities: ['Campaign management', 'Brand strategy', 'Team leadership'] },
      { title: 'DevOps Engineer', company: 'CloudSystems', location: 'Seattle, WA', type: 'Full-time', salaryRange: '$140,000 - $190,000', description: 'Build and maintain cloud infrastructure and deployment pipelines.', qualifications: ['AWS', 'Kubernetes', 'CI/CD'], responsibilities: ['Infrastructure', 'Automation', 'Monitoring'] },
      { title: 'Frontend Developer', company: 'WebWorks', location: 'Austin, TX', type: 'Full-time', salaryRange: '$90,000 - $120,000', description: 'Build responsive and performant user interfaces using modern JavaScript frameworks.', qualifications: ['React', 'TypeScript', 'CSS'], responsibilities: ['UI development', 'Performance optimization', 'Testing'] },
      { title: 'Backend Developer', company: 'APIFirst', location: 'Denver, CO', type: 'Contract', salaryRange: '$100/hr', description: 'Design and implement scalable backend services and APIs.', qualifications: ['Node.js', 'PostgreSQL', 'REST APIs'], responsibilities: ['API design', 'Database design', 'Integration'] },
      { title: 'QA Engineer', company: 'QualityFirst', location: 'Chicago, IL', type: 'Full-time', salaryRange: '$80,000 - $110,000', description: 'Ensure product quality through comprehensive testing strategies.', qualifications: ['Test automation', 'Selenium', 'JIRA'], responsibilities: ['Test planning', 'Automation', 'Bug tracking'] },
      { title: 'Junior Developer Intern', company: 'StartupXYZ', location: 'Remote', type: 'Internship', salaryRange: '$25/hr', description: 'Learn and grow with our engineering team while contributing to real projects.', qualifications: ['CS student', 'Basic programming', 'Eager to learn'], responsibilities: ['Feature development', 'Bug fixes', 'Documentation'] },
    ];

    for (const jobData of sampleJobs) {
      const job = new Job({ ...jobData, createdBy: employer._id });
      await job.save();
    }

    res.json({ message: 'Seeded sample users and 10 jobs' });
  } catch (err) {
    console.error('Seed error:', err);
    res.status(500).json({ message: 'Seeding failed', error: err.message });
  }
};

module.exports = { seed };
