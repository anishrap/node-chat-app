const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;

var app = express();
var server = http.createServer(app);
var io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection', function (socket) {
  console.log('New User Connected!');

  socket.emit('newEmail', {
    "from": "Mike@example.com",
    "text": "Hey, what's going on",
    "createdAt": 123
  });

  socket.emit('newMessage', {
    "from": "anish@example.com",
    "text": "Hello",
    "createdAt": 155
  });

  socket.on('createEmail', function (email) {
    console.log('create Email', email);
  });

  socket.on('createMessage', function (message) {
    console.log('created Message', message);
  });

  socket.on('disconnect', function () {
    console.log('User was disconnected');
  });
});


server.listen(3000, () => {
  console.log(`Server is up on port ${port}`);
});
