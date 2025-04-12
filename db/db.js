// db/db.js
const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'anuj@123', 
  database: 'online_job_portal'
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to DB:', err);
  } else {
    console.log('Connected to MySQL DB');
  }
});

module.exports = db;
