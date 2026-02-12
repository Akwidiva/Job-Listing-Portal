const Job = require('../models/Job');

// GET /api/jobs - list jobs with optional search/filter
const getJobs = async (req, res) => {
  try {
    const { keyword, location, type, minSalary, maxSalary, page = 1, limit = 10 } = req.query;
    const filter = {};

    if (keyword) {
      filter.$or = [
        { title: { $regex: keyword, $options: 'i' } },
        { company: { $regex: keyword, $options: 'i' } },
        { description: { $regex: keyword, $options: 'i' } },
      ];
    }
    if (location) filter.location = { $regex: location, $options: 'i' };
    if (type) filter.type = type;

    const jobs = await Job.find(filter)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));

    const total = await Job.countDocuments(filter);

    res.json({ jobs, total, page: Number(page), pages: Math.ceil(total / limit) });
  } catch (err) {
    console.error('getJobs error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// GET /api/jobs/:id - single job
const getJobById = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) return res.status(404).json({ message: 'Job not found' });
    res.json({ job });
  } catch (err) {
    console.error('getJobById error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// POST /api/jobs - create job (employer only)
const createJob = async (req, res) => {
  try {
    if (req.user.userType !== 'employer') {
      return res.status(403).json({ message: 'Only employers can create jobs' });
    }

    const { title, company, location, salaryRange, description, qualifications, responsibilities, type } = req.body;
    const job = new Job({
      title,
      company,
      location,
      salaryRange,
      description,
      qualifications,
      responsibilities,
      type,
      createdBy: req.user.userId,
    });
    await job.save();
    res.status(201).json({ job });
  } catch (err) {
    console.error('createJob error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// PUT /api/jobs/:id - update job (owner only)
const updateJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) return res.status(404).json({ message: 'Job not found' });
    if (job.createdBy.toString() !== req.user.userId) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    const updates = req.body;
    Object.assign(job, updates);
    await job.save();
    res.json({ job });
  } catch (err) {
    console.error('updateJob error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// DELETE /api/jobs/:id - delete job (owner only)
const deleteJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if (!job) return res.status(404).json({ message: 'Job not found' });
    if (job.createdBy.toString() !== req.user.userId) {
      return res.status(403).json({ message: 'Not authorized' });
    }
    await job.deleteOne();
    res.json({ message: 'Job deleted' });
  } catch (err) {
    console.error('deleteJob error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { getJobs, getJobById, createJob, updateJob, deleteJob };
