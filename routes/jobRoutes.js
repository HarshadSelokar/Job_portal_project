const express = require('express');
const router = express.Router();
const db = require('../db/db');


router.post('/jobs', (req, res) => {
    const { employer_id, title, description, location, salary } = req.body;
  
    const sql = `INSERT INTO jobs (employer_id, title, description, location, salary) VALUES (?, ?, ?, ?, ?)`;
  
    db.query(sql, [employer_id, title, description, location, salary], (err, result) => {
      if (err) {
        res.status(500).json({ error: 'Job post failed' });
      } else {
        res.json({ message: 'Job posted successfully' });
      }
    });
  });



  router.get('/jobs', (req, res) => {
    db.query('SELECT * FROM jobs', (err, results) => {
      if (err) {
        res.status(500).json({ error: 'Failed to fetch jobs' });
      } else {
        res.json(results);
      }
    });
  });
  
  module.exports = router;