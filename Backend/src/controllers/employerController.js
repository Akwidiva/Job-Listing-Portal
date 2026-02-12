const User = require('../models/User');

// GET /api/employer/profile - get employer company profile
const getEmployerProfile = async (req, res) => {
  try {
    if (req.user.userType !== 'employer') {
      return res.status(403).json({ message: 'Not authorized' });
    }
    const user = await User.findById(req.user.userId).select('-password -googleId');
    res.json({ profile: user });
  } catch (err) {
    console.error('getEmployerProfile error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

// PUT /api/employer/profile - update employer company profile
const updateEmployerProfile = async (req, res) => {
  try {
    if (req.user.userType !== 'employer') {
      return res.status(403).json({ message: 'Not authorized' });
    }

    const { companyName, companyDescription, industry, companySize, founded, website, location, brandColor } = req.body;

    const update = {};
    if (companyName !== undefined) update.companyName = companyName;
    if (companyDescription !== undefined) update.companyDescription = companyDescription;
    if (industry !== undefined) update.industry = industry;
    if (companySize !== undefined) update.companySize = companySize;
    if (founded !== undefined) update.founded = founded;
    if (website !== undefined) update.website = website;
    if (location !== undefined) update.location = location;
    if (brandColor !== undefined) update.brandColor = brandColor;

    const user = await User.findByIdAndUpdate(req.user.userId, { $set: update }, { new: true }).select('-password -googleId');
    res.json({ profile: user });
  } catch (err) {
    console.error('updateEmployerProfile error:', err);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { getEmployerProfile, updateEmployerProfile };
