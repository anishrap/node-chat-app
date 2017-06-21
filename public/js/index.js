var socket = io();
socket.on('connect', function () {
  console.log('Connected to the server');

});


socket.on('newMessage', function (message) {
  console.log('New Message', message);
  var li = jQuery('<li></li>');
  li.text(`${message.from}: ${message.text}`);

  jQuery('#messages').append(li);
});

socket.on('disconnect', function () {
  console.log('Disconnected from the server');
});

socket.on('newEmail', function (email) {
  console.log('New Email', email);
});


jQuery('#message-form').on('submit', function(e) {
  e.preventDefault();

  socket.emit('createMessage', {
    from: 'User',
    text: jQuery('[name=message]').val()
  }, function () {

  });
});
