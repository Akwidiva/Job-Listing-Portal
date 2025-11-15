const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcryptjs');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// ------------------- DATABASE CONNECTION -------------------
const db = new sqlite3.Database('./users.db', (err) => {
    if (err) {
        console.error("❌ Error connecting to database:", err.message);
    } else {
        console.log("✅ Connected to SQLite database");
    }
});

// Create table
db.run(`
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
`);

// ------------------- REGISTER API -------------------
app.post('/register', async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ error: "All fields required" });
    }

    const hashed = await bcrypt.hash(password, 10);

    const sql = `INSERT INTO users (name, email, password) VALUES (?, ?, ?)`;

    db.run(sql, [name, email, hashed], function (err) {
        if (err) {
            if (err.message.includes("UNIQUE")) {
                return res.status(400).json({ error: "Email already exists" });
            }
            return res.status(500).json({ error: err.message });
        }

        res.status(201).json({ message: "User registered successfully!" });
    });
});

// ------------------- FORGOT PASSWORD (dummy) -------------------
app.post('/forgot-password', (req, res) => {
    res.json({ message: "Reset link sent (not implemented)" });
});

// ------------------- SERVER START -------------------
app.listen(5000, () => {
    console.log("🚀 Server running on http://localhost:5000");
});
