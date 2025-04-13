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



  router.post('/', (req, res) => {
    const { title, company, description, location, salary, posted_by } = req.body;
  
    const sql = `INSERT INTO jobs (title, company, description, location, salary, posted_by)
                 VALUES (?, ?, ?, ?, ?, ?)`;
  
    db.query(sql, [title, company, description, location, salary, posted_by], (err, result) => {
      if (err) {
        console.error("Error in posting job:", err);
        res.status(500).json({ error: 'Failed to post job' });
      } else {
        res.json({ message: 'Job posted successfully' });
      }
    });
  });
  

  router.get('/', (req, res) => {
    const sql = `SELECT * FROM jobs`;
  
    db.query(sql, (err, results) => {
      if (err) {
        console.error("Error fetching jobs:", err);
        res.status(500).json({ error: 'Failed to fetch jobs' });
      } else {
        res.json(results);
      }
    });
  });
  
  
  module.exports = router;