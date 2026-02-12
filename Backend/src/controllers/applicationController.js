const Application = require('../models/Application');
const Job = require('../models/Job');

// POST /api/applications - job seeker applies to a job
const applyToJob = async (req, res) => {
  try {
    if (req.user.userType !== 'job-seeker') {
      return res.status(403).json({ message: 'Only job seekers can apply' });
    }

    const { jobId, coverLetter, resume } = req.body;
    const job = await Job.findById(jobId);
    if (!job) return res.status(404).json({ message: 'Job not found' });

    const existing = await Application.findOne({ job: jobId, applicant: req.user.userId });
    if (existing) return res.status(400).json({ message: 'Already applied' });

    const application = new Application({
      job: jobId,
      applicant: req.user.userId,
      coverLetter,
      resume,
    });
    await application.save();
    res.status(201).json({ application });
  } catch (err) {
    console.error('applyToJob error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// GET /api/applications - list applications (job seeker sees own, employer sees theirs)
const getApplications = async (req, res) => {
  try {
    let filter = {};
    if (req.user.userType === 'job-seeker') {
      filter.applicant = req.user.userId;
    } else if (req.user.userType === 'employer') {
      // Get jobs created by employer
      const jobs = await Job.find({ createdBy: req.user.userId }).select('_id');
      filter.job = { $in: jobs.map((j) => j._id) };
    }

    const applications = await Application.find(filter)
      .populate('job', 'title company location')
      .populate('applicant', 'name email')
      .sort({ createdAt: -1 });

    res.json({ applications });
  } catch (err) {
    console.error('getApplications error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// PUT /api/applications/:id - employer updates status
const updateApplicationStatus = async (req, res) => {
  try {
    const application = await Application.findById(req.params.id).populate('job');
    if (!application) return res.status(404).json({ message: 'Application not found' });

    if (application.job.createdBy.toString() !== req.user.userId) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    application.status = req.body.status || application.status;
    await application.save();
    res.json({ application });
  } catch (err) {
    console.error('updateApplicationStatus error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { applyToJob, getApplications, updateApplicationStatus };
