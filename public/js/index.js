var socket = io();
socket.on('connect', function () {
  console.log('Connected to the server');

  socket.emit('createEmail', {
    "to": "jen@example.com",
    "text": "Here is a sample email"
  });

  socket.emit('createMessage', {
    "from": "anish@example.com",
    "text": "Hello yo"
  });
});

socket.on('newMessage', function (message) {
  console.log('New Message', message);
});

socket.on('disconnect', function () {
  console.log('Disconnected from the server');
});

socket.on('newEmail', function (email) {
  console.log('New Email', email);
});
