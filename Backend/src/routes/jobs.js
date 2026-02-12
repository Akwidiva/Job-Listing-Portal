const express = require('express');
const auth = require('../middleware/authMiddleware');
const { getJobs, getJobById, createJob, updateJob, deleteJob } = require('../controllers/jobController');

const router = express.Router();

// Public routes
router.get('/', getJobs);           // list/search jobs
router.get('/:id', getJobById);     // single job

// Protected routes (employer)
router.post('/', auth, createJob);
router.put('/:id', auth, updateJob);
router.delete('/:id', auth, deleteJob);

module.exports = router;
