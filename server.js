const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require("./db/db");
const userRoutes = require('./routes/userRoutes.js');
const jobRoutes = require('./routes/jobRoutes.js');
const applicationRoutes = require('./routes/applicationRoutes.js');

const app = express();
const PORT = 5500;



app.use('/api', userRoutes);
app.use('/api', jobRoutes);
app.use('/api', applicationRoutes);

app.use(cors());
app.use(bodyParser.json());
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.send("Welcome to the Online Job Portal Backend");
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
