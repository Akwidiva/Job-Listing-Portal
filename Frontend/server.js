const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcryptjs');
const cors = require('cors');
const crypto = require('crypto');
const nodemailer = require("nodemailer");

const app = express();
app.use(cors());
app.use(express.json());

// ---------------- DATABASE ----------------
const db = new sqlite3.Database('./users.db', (err) => {
    if (err) console.error(err.message);
    else console.log("✅ Connected to SQLite database");
});

// Create USERS table
db.run(`
CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    email TEXT UNIQUE,
    password TEXT,
    reset_token TEXT,
    reset_token_expiry DATETIME,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
)
`);


// ---------------- REGISTER ----------------
app.post('/register', async (req, res) => {
    let { name, email, password } = req.body;

    // Remove "all fields required" error
    name = name || "";
    email = email || "";
    password = password || "";

    try {
        const hashed = password ? await bcrypt.hash(password, 8) : null;

        const sql = `INSERT INTO users (name, email, password) VALUES (?, ?, ?)`;
        db.run(sql, [name, email, hashed], function (err) {
            if (err) {
                if (err.message.includes("UNIQUE"))
                    return res.status(400).json({ error: "Email already exists" });
                return res.status(500).json({ error: err.message });
            }
            res.status(201).json({ message: "User registered successfully!" });
        });
    } catch (err) {
        res.status(500).json({ error: "Server error" });
    }
});


// ---------------- FORGOT PASSWORD (SEND EMAIL) ----------------
app.post('/forgot-password', (req, res) => {
    const { email } = req.body;

    if (!email) return res.status(400).json({ error: "Email required" });

    db.get("SELECT * FROM users WHERE email = ?", [email], (err, row) => {
        if (err) return res.status(500).json({ error: "Database error" });
        if (!row) return res.status(404).json({ error: "Email not found" });

        const token = crypto.randomBytes(20).toString('hex');
        const expiry = Date.now() + 3600000; // 1 hour

        db.run(
            "UPDATE users SET reset_token = ?, reset_token_expiry = ? WHERE email = ?",
            [token, expiry, email],
            function (err) {
                if (err) return res.status(500).json({ error: "Database error" });

                const resetLink = `http://localhost:5500/reset.html?token=${token}`;

                // Nodemailer setup
                const transporter = nodemailer.createTransport({
                    service: "gmail",
                    auth: {
                        user: "yourgmail@gmail.com",
                        pass: "your-app-password" // Gmail App Password
                    }
                });

                const mailOptions = {
                    from: "yourgmail@gmail.com",
                    to: email,
                    subject: "Reset Your Password",
                    html: `
                        <h3>Password Reset</h3>
                        <p>Click the button below to reset your password:</p>
                        <a href="${resetLink}" 
                           style="background:#0984e3; color:white; padding:10px 20px; 
                                  text-decoration:none; border-radius:6px;">Reset Password</a>
                        <br><br>
                        <p>This link will expire in 1 hour.</p>
                    `
                };

                transporter.sendMail(mailOptions, (err) => {
                    if (err) {
                        console.log(err);
                        return res.status(500).json({ error: "Email send failed" });
                    }

                    res.json({
                        message: "Reset link sent to email!",
                        resetLink
                    });
                });
            }
        );
    });
});


// ---------------- RESET PASSWORD ----------------
app.post('/reset-password', async (req, res) => {
    const { token, newPassword } = req.body;

    if (!token || !newPassword)
        return res.status(400).json({ error: "Token and new password required" });

    db.get(
        "SELECT id, reset_token_expiry FROM users WHERE reset_token = ?",
        [token],
        async (err, user) => {
            if (err) return res.status(500).json({ error: "Database error" });
            if (!user) return res.status(400).json({ error: "Invalid token" });

            if (Date.now() > user.reset_token_expiry)
                return res.status(400).json({ error: "Token expired" });

            try {
                const hashed = await bcrypt.hash(newPassword, 10);

                db.run(
                    "UPDATE users SET password = ?, reset_token = NULL, reset_token_expiry = NULL WHERE id = ?",
                    [hashed, user.id],
                    function (err) {
                        if (err) return res.status(500).json({ error: "Database error" });

                        res.json({ message: "Password successfully reset!" });
                    }
                );
            } catch (err) {
                res.status(500).json({ error: "Server error" });
            }
        }
    );
});


// ---------------- GET ALL USERS ----------------
app.get('/users', (req, res) => {
    db.all(
        "SELECT id, name, email, created_at FROM users",
        [],
        (err, rows) => {
            if (err) return res.status(500).json({ error: "Database error" });
            res.json(rows);
        }
    );
});


// ---------------- SERVER ----------------
app.listen(5000, () => {
    console.log("🚀 Server running on http://localhost:5000");
});
