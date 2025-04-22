const express = require("express");
const router = express.Router();
const db = require("../db/db.js");

// Admin stats
router.get("/stats", (req, res) => {
  const sql = `
    SELECT 
      (SELECT COUNT(*) FROM users) AS total_users,
      (SELECT COUNT(*) FROM jobs) AS total_jobs,
      (SELECT COUNT(*) FROM applications) AS total_applications
  `;

  db.query(sql, (err, results) => {
    if (err) {
      console.error("Error fetching admin stats:", err);
      res.status(500).json({ error: "Failed to fetch admin stats" });
    } else {
      res.json(results[0]);
    }
  });
});

// Get all users (except admin)
router.get("/users", (req, res) => {
  db.query("SELECT * FROM users WHERE user_type != 'admin'", (err, result) => {
    if (err) return res.status(500).json({ error: "Error fetching users" });
    res.json(result);
  });
});

// Delete user
router.delete('/users/:id', (req, res) => {
  const id = req.params.id;
  console.log('DELETE request for user ID:', id); // Log ID

  const sql = 'DELETE FROM users WHERE user_id = ?';
  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error('Error deleting user from DB:', err); // Log DB error
      return res.status(500).json({ error: 'Failed to delete user' });
    }

    console.log('Delete result:', result); // Log query result
    res.json({ message: 'User deleted successfully' });
  });
});



// Get all jobs
router.get("/jobs", (req, res) => {
  db.query("SELECT * FROM jobs", (err, result) => {
    if (err) return res.status(500).json({ error: "Error fetching jobs" });
    res.json(result);
  });
});

// Delete job
router.delete("/jobs/:id", (req, res) => {
  const id = req.params.id;
 
  const sql = "DELETE FROM jobs WHERE job_id = ?";

  db.query(sql, [id], (err, result) => {
    if (err) {
      console.error("Error deleting user:", err);
      res.status(500).json({ error: "Failed to delete user" });
    } else {
      res.json({ message: "User deleted successfully" });
    }
  });
});

module.exports = router;
