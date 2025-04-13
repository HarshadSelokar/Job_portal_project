const express = require('express');
const router = express.Router();
const db = require('../db/db.js');


router.post('/apply', (req, res) => {
    const { job_id, seeker_id } = req.body;
    const application_date = new Date();
  
    const sql = `INSERT INTO applications (job_id, seeker_id, application_date) VALUES (?, ?, ?)`;
  
    db.query(sql, [job_id, seeker_id, application_date], (err, result) => {
      if (err) {
        res.status(500).json({ error: 'Application failed' });
      } else {
        res.json({ message: 'Application submitted successfully!'});
      }
    });
  });


  router.get('/applications/:job_id', (req, res) => {
    const { job_id } = req.params;
  
    const sql = `
      SELECT a.application_id, u.name AS applicant_name, a.application_date
      FROM applications a
      JOIN users u ON a.seeker_id = u.user_id
      WHERE a.job_id = ?
    `;
  
    db.query(sql, [job_id], (err, results) => {
      if (err) {
        res.status(500).json({ error: 'Failed to fetch applications' });
      } else {
        res.json(results);
      }
    });
  });







  router.get('/applicants/:employerId', (req, res) => {
    const employerId = req.params.employerId;
  
    const sql = `
      SELECT a.application_date, u.name, u.email, j.title AS job_title
      FROM applications a
      JOIN users u ON a.seeker_id = u.id
      JOIN jobs j ON a.job_id = j.id
      WHERE j.posted_by = ?
      ORDER BY a.application_date DESC
    `;
  
    db.query(sql, [employerId], (err, results) => {
      if (err) {
        console.error("Error fetching applicants:", err);
        res.status(500).json({ error: 'Failed to fetch applicants' });
      } else {
        res.json(results);
      }
    });
  });
  


  router.get('/my-applications/:seekerId', (req, res) => {
    const seekerId = req.params.seekerId;
  
    const sql = `
      SELECT j.title, j.company, j.location, a.application_date
      FROM applications a
      JOIN jobs j ON a.job_id = j.id
      WHERE a.seeker_id = ?
      ORDER BY a.application_date DESC
    `;
  
    db.query(sql, [seekerId], (err, results) => {
      if (err) {
        console.error("Error fetching my applications:", err);
        res.status(500).json({ error: 'Failed to fetch applications' });
      } else {
        res.json(results);
      }
    });
  });
  
  
  module.exports = router;