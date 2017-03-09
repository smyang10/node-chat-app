const path = require('path');
const publicPath = path.join(__dirname, '../public');
const configPath = path.join(__dirname, '../config');
const express = require('express');
const hbs = require('hbs');
const bodyParser = require('body-parser');
const config = require(configPath + '/config.js');

const port = process.env.PORT;

var app = express();

// var logger = function(req, res, next) {
//   console.log(req.body);
//   next();
// }

app.use(express.static(publicPath));
app.use(bodyParser.json());

app.post('/validate', (req, res) => {

  var validationRequest = req.body;
  var validationResponse;

  if(validationRequest.ticket.length % 2 === 0 ){

    if(validationRequest.direction === 'entry'){
      validationResponse = {
        'result': 'valid',
        'message': 'Node Entry'
      }
    } else {
      validationResponse = {
        'result': 'valid',
        'message': 'Node Exit'
      }
    }
  } else {
    validationResponse = {
      'result': 'invalid',
      'message': 'Node Denied'
    }
  }

  res.send(validationResponse);
});

app.listen(port, function() {
  console.log(`Server is up on ${port}`);
});
