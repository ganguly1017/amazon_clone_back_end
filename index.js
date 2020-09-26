// library include
require('dotenv').config();

const express = require('express');
const app = express();
const cors = require('cors');
const morgan = require('morgan');
const port = process.env.PORT;
const database = require('./database');


// middleware
app.use(cors());
app.use(morgan('dev'));


// route
app.get('/', (req, res) => {
  return res.status(200).json({
    "status": true,
    "message" : "Amazon Clone REST API Home Page."
  });
});


// Start Server
app.listen(port, () => {
  console.log("Server running at port : " + port);
});