const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

// my responsibility) ---
app.use(cors({
  origin: ["http://localhost:3000"], 
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));

app.use(express.json());

// Load routes
const authRoutes = require("./routes/auth");
app.use("/api", authRoutes);

module.exports = app;
