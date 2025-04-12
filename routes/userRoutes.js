const express = require("express");
const router = express.Router();
const db = require("../db/db.js");

router.post("/register", (req, res) => {
  const { name, email, password, user_type } = req.body;

  const sql = `INSERT INTO users (name, email, password, user_type) VALUES (?, ?, ?, ?)`;

  db.query(sql, [name, email, password, user_type], (err, result) => {
    if (err) {
      res.status(500).json({ error: "Registration failed" });
    } else {
      res.json({ message: "User registered successfully" });
    }
  });
});

router.post("/login", (req, res) => {
  const { email, password } = req.body;

  const sql = `SELECT * FROM users WHERE email = ? AND password = ?`;

  db.query(sql, [email, password], (err, results) => {
    if (err) {
      res.status(500).json({ error: "Login failed" });
    } else if (results.length > 0) {
      res.json({ message: "Login successful", user: results[0] });
    } else {
      res.status(401).json({ error: "Invalid credentials" });
    }
  });
});

module.exports = router;
