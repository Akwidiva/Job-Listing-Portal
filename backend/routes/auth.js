const express = require('express');
const router = express.Router();
const { generateAuthToken } = require('../utils/jwt');

router.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Mock verification logic
  if (username === 'jobseeker' && password === '123456') {
    const user = { id: 'sample_id_123', type: 'Job Seeker' }; // MOCK DATA
    const token = generateAuthToken(user); // generate JWT

    return res.json({
      success: true,
      token, // send JWT to frontend
      user: { id: user.id, type: user.type }, // send non-sensitive user info
    });
  }

  return res.status(401).json({ success: false, message: 'Invalid credentials' });
});

module.exports = router;
