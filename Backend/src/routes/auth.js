const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const db = require("../config/db"); // Your DB connection

// ----------------------------
// TOKEN GENERATOR (M2 defines structure)
// ----------------------------
function generateToken(user) {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      role: user.role, // OPTIONAL (add if in schema)
    },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );
}

// ----------------------------
// LOGIN CONTROLLER (YOUR MAIN TASK)
// ----------------------------
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1️⃣ Validate input
    if (!email || !password) {
      return res
        .status(400)
        .json({ error: "Email and password are required" });
    }

    // 2️⃣ Check if user exists
    const [users] = await db.query("SELECT * FROM users WHERE email = ?", [
      email,
    ]);

    if (users.length === 0) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const user = users[0];

    // 3️⃣ Compare hashed passwords
    const passwordMatch = await bcrypt.compare(password, user.password_hash);

    if (!passwordMatch) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    // 4️⃣ Generate JWT
    const token = generateToken(user);

    // 5️⃣ Respond with user info + token
    res.json({
      message: "Login successful",
      token,
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("LOGIN ERROR:", error);
    res.status(500).json({ error: "Server error during login" });
  }
};

// ----------------------------
// TEMPORARY REGISTER (M1 will replace)
// ----------------------------
exports.register = async (req, res) => {
  res.json({ message: "Register endpoint working" });
};

module.exports.generateToken = generateToken;

