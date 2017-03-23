var socket = io();

var scrollToBottom = function () {
  // selectors
  var messages = jQuery('#messages');
  var newMessage = messages.children('li:last-child');
  // heights
  var clientHeight = messages.prop('clientHeight');
  var scrollTop = messages.prop('scrollTop');
  var scrollHeight = messages.prop('scrollHeight');
  var newMessageHeight = newMessage.innerHeight();
  var lastMessageHeight = newMessage.prev().innerHeight();

  if(clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight){
    messages.scrollTop(scrollHeight);
  }
}

socket.on('connect', function () {
  console.log('connected to server');

  var params = jQuery.deparam(window.location.search);

  socket.emit('join', params, function(error) {
    if(error){
      alert(error);
      window.location.href = "/";
    } else {
      console.log('no error');
    }
  });

  // socket.emit('createEmail', {
  //   to: 'blap@example.com',
  //   text:' hit me on my mobi'
  // });
});

socket.on('updateUserList', function(users) {
  // console.log('users list: ', users);

  var ol = jQuery("<ol></ol>");

  users.forEach(function(user) {
    ol.append(jQuery("<li></li>").text(user));
  });

  jQuery("#users").html(ol);


});

socket.on('newMessage', function(message) {
   var formattedTime = moment(message.createdAt).format('h:mm a');
  // console.log('new message', message);
  // var li = jQuery('<li></li>');
  // li.text(`${message.from} ${formattedTime}: ${message.text}`);
  // jQuery('#messages').append(li);


  var template = jQuery('#message-template').html();
  var html = Mustache.render(template, {
    text: message.text,
    from: message.from,
    createdAt: formattedTime
  });

  jQuery('#messages').append(html);
  scrollToBottom();
});

socket.on('newLocationMessage', function(message) {
  var formattedTime = moment(message.createdAt).format('h:mm a');
  // var li = jQuery('<li></li>');
  // var a = jQuery('<a target="_blank">My current location</a>')
  // li.text(`${message.from}: `);
  // a.attr('href', message.url);
  // li.append(a);
  //jQuery('#messages').append(li);

  var template = jQuery('#location-message-template').html();
  var html = Mustache.render(template, {
    from: message.from,
    createdAt: formattedTime,
    url: message.url
  });

  jQuery('#messages').append(html);
  scrollToBottom();
});

// socket.emit('createMessage', {
//   from: 'blep',
//   text: 'blap'
// }, function(data) {
//   console.log('Goteeeem', data);
// });
// socket.on('disconnect', function () {
//   console.log('disconnected from server');
// });
//
// socket.on('newEmail', function (email) {
//   console.log('new email', email);
// });

jQuery('#message-form').on('submit', function (e) {
  e.preventDefault();
  var messageTextBox = jQuery('[name=message]');

  socket.emit('createMessage', {
    text: messageTextBox.val()
  }, function () {
      messageTextBox.val('');
    });
});

var locationButton = jQuery('#send-location');

locationButton.on('click', function () {
  if(!navigator.geolocation){
    return alert('Geolocation not supported by your browser');
  }

  locationButton.text('Sending Location...');
  locationButton.prop('disabled', true);
  navigator.geolocation.getCurrentPosition(function (position) {
    console.log(position);
    socket.emit('createLocationMessage', {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
    });
    locationButton.text('Send Location');
    locationButton.prop('disabled', false);
  }, function () {
    alert('Cannot fetch location!');
    locationButton.text('Send Location');
    locationButton.prop('disabled', false);
  }, {
    timeout: 8000,
    maximumAge: 0
  });
});
