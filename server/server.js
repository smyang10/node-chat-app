const path = require('path');
const http = require('http');
const publicPath = path.join(__dirname, '../public');
const configPath = path.join(__dirname, '../config');
const express = require('express');
const socketIO = require('socket.io');

const hbs = require('hbs');
const bodyParser = require('body-parser');
const config = require(configPath + '/config.js');

const port = process.env.PORT;

var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));
app.use(bodyParser.json());


io.on('connection', (socket) => {
  console.log('new user connected');

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

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

server.listen(port, function() {
  console.log(`Server is up on ${port}`);
});
