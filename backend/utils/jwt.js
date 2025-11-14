const jwt = require('jsonwebtoken'); // imports the JWT library

const SECRET_KEY = 'temporary_secret_key'; // temporary key for signing tokens

function generateAuthToken(user) {
  const payload = {
    user_id: user.id,       // user ID to store in the token
    user_type: user.type,   // user's role, e.g., 'Job Seeker' or 'Employer'
  };

  return jwt.sign(payload, SECRET_KEY, { expiresIn: '1d' }); // sign the token, expires in 1 day
}

module.exports = { generateAuthToken }; // export so other files (like auth.js) can use it
