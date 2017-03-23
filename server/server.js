const path = require('path');
const http = require('http');
const publicPath = path.join(__dirname, '../public');
const configPath = path.join(__dirname, '../config');
const express = require('express');
const socketIO = require('socket.io');
const {generateMessage, generateLocationMessage} = require('./utils/message');
const {isRealString} = require('./utils/validation');
const {Users} = require('./utils/users');

const hbs = require('hbs');
const bodyParser = require('body-parser');
const config = require(configPath + '/config.js');

const port = process.env.PORT;

var app = express();
var server = http.createServer(app);
var io = socketIO(server);
var users = new Users();

app.use(express.static(publicPath));
app.use(bodyParser.json());


io.on('connection', (socket) => {
  console.log('new user connected');

  socket.on('join', (params, callback) => {
    if(!(isRealString(params.name) && isRealString(params.room))){
      return callback('Name and room name are required!');
    }

    socket.join(params.room);
    users.removeUser(socket.id);
    users.addUser(socket.id, params.name, params.room);

    io.to(params.room).emit('updateUserList', users.getUserList(params.room));
    // socket.emit from admin 'welcome to chat app'
    socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app!'));
    // socket.broadcast.emit from admin 'new user joined'
    socket.broadcast.to(params.room).emit('newMessage',
      generateMessage('Admin', `${params.name} has joined.`));


    callback();
  });
  socket.on('createMessage', (message, callback) => {
    console.log(message);

    var user = users.getUser(socket.id);
    if(user && isRealString(message.text)){
      io.to(user.room).emit('newMessage', generateMessage(user.name, message.text));
    }

    callback();
  });

  socket.on('createLocationMessage', (coords) => {

    var user = users.getUser(socket.id);

    if(user){
      io.to(user.room).emit('newLocationMessage',
        generateLocationMessage(user.name, coords.latitude, coords.longitude));
    }

  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
    var user = users.removeUser(socket.id);

    if(user){
      io.to(user.room).emit('updateUserList', users.getUserList(user.room));
      io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} left the room.`));
    }

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
