const express = require('express');
const router = express.Router();
const db = require('../db');

// Admin stats
router.get('/stats', (req, res) => {
  const sql = `
    SELECT 
      (SELECT COUNT(*) FROM users) AS total_users,
      (SELECT COUNT(*) FROM jobs) AS total_jobs,
      (SELECT COUNT(*) FROM applications) AS total_applications
  `;

  db.query(sql, (err, results) => {
    if (err) {
      console.error('Error fetching admin stats:', err);
      res.status(500).json({ error: 'Failed to fetch admin stats' });
    } else {
      res.json(results[0]);
    }
  });
});


// Get all users (except admin)
router.get('/users', (req, res) => {
    db.query("SELECT * FROM users WHERE user_type != 'admin'", (err, result) => {
      if (err) return res.status(500).json({ error: 'Error fetching users' });
      res.json(result);
    });
  });
  
  // Delete user
  router.delete('/users/:id', (req, res) => {
    const id = req.params.id;
    db.query("DELETE FROM users WHERE id = ?", [id], (err) => {
      if (err) return res.status(500).json({ error: 'Error deleting user' });
      res.sendStatus(200);
    });
  });
  
  // Get all jobs
  router.get('/jobs', (req, res) => {
    db.query("SELECT * FROM jobs", (err, result) => {
      if (err) return res.status(500).json({ error: 'Error fetching jobs' });
      res.json(result);
    });
  });
  
  // Delete job
  router.delete('/jobs/:id', (req, res) => {
    const id = req.params.id;
    db.query("DELETE FROM jobs WHERE id = ?", [id], (err) => {
      if (err) return res.status(500).json({ error: 'Error deleting job' });
      res.sendStatus(200);
    });
  });
  

module.exports = router;
