function errorHandler(err, req, res, next) {
  console.error("ERROR:", err.message);
  res.status(500).json({ message: "Server error occurred" });
}

module.exports = errorHandler;
