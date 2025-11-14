const rateLimit = require("express-rate-limit");
const jwt = require("jsonwebtoken");

// ---- Rate limiter for /login & /register ----
const loginLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 5,
  message: "Too many attempts. Try again in 1 minute."
});

// ---- JWT Auth Check ----
const authCheck = (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1];

  if (!token)
    return res.status(401).json({ message: "No token provided" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; 
    next();
  } catch (error) {
    return res.status(403).json({ message: "Invalid token" });
  }
};

module.exports = { loginLimiter, authCheck };
