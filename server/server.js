const path = require('path');
const publicPath = path.join(__dirname, '../public');
const configPath = path.join(__dirname, '../config');
const express = require('express');
const hbs = require('hbs');
const config = require(configPath + '/config.js');

const port = process.env.PORT;

var app = express();

// var logger = function(req, res, next) {
//   console.log(req.body);
//   next();
// }

app.use(express.static(publicPath));

app.listen(port, function() {
  console.log(`Server is up on ${port}`);
});
