const express = require('express');
const auth = require('../middleware/authMiddleware');
const { applyToJob, getApplications, updateApplicationStatus } = require('../controllers/applicationController');

const router = express.Router();

// All routes require authentication
router.post('/', auth, applyToJob);
router.get('/', auth, getApplications);
router.put('/:id', auth, updateApplicationStatus);

module.exports = router;
