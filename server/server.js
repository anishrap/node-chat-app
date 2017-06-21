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

  socket.emit('newMessage', {
    from: 'Admin',
    text: 'Welcome to the Chat App!'
  });

  socket.broadcast.emit('newMessage', {
    from: 'Admin',
    text: 'New User Joined'
  });

  socket.on('createMessage', function (message) {
    console.log('created Message', message);

    io.emit('newMessage', {
      from: message.from,
      text: message.text,
      createdAt: new Date().getTime()
    });
  });

  socket.on('disconnect', function () {
    console.log('User was disconnected');
  });
});


server.listen(3000, () => {
  console.log(`Server is up on port ${port}`);
});
