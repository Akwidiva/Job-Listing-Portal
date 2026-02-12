const express = require('express');
const auth = require('../middleware/authMiddleware');
const { getEmployerProfile, updateEmployerProfile } = require('../controllers/employerController');

const router = express.Router();

router.get('/profile', auth, getEmployerProfile);
router.put('/profile', auth, updateEmployerProfile);

module.exports = router;
