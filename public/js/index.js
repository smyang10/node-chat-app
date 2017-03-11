var socket = io();
socket.on('connect', function () {
  console.log('connected to server');

  socket.emit('createMessage', {
    from: 'blap@man.com',
    text: 'yo waddap mane'
  });
  // socket.emit('createEmail', {
  //   to: 'blap@example.com',
  //   text:' hit me on my mobi'
  // });
});

socket.on('newMessage', function(message) {
  console.log('new message', message);
});

// socket.on('disconnect', function () {
//   console.log('disconnected from server');
// });
//
// socket.on('newEmail', function (email) {
//   console.log('new email', email);
// });
