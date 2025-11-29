const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  username: { type: String, required: true },  // or 'name' if you prefer
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  userType: { type: String, required: true, enum: ['job-seeker', 'employer'] },
  resetPasswordToken: String,      // hashed token for password reset
  resetPasswordExpires: Date       // token expiry time
});

module.exports = mongoose.model("User", UserSchema);
