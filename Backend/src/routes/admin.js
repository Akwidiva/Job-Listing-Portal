const express = require('express');
const { seed } = require('../controllers/adminController');

const router = express.Router();

// POST /api/admin/seed -> seeds DB in development only
router.post('/seed', seed);

module.exports = router;
