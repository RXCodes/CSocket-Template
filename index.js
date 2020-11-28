var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var port = process.env.PORT || 3000;
var filter = require('./chatfilter');

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket) {
  socket.room = 'none';  
  
  socket.on('join', function(data) {
    socket.room = data;
    socket.join(data);
  });
  
  socket.on('chat', function(data) {
    let output = filter.process(data);
    io.in(socket.room).emit('chat', output);
  });
  
  socket.on('event', function(data) {
    io.in(socket.room).emit('event', data);
  });
  
  socket.on('move', function(data) {
    io.in(socket.room).emit('move', data);
  });
  
  socket.on('ping', function(data) {
    io.in(socket.room).emit('ping', data);
  });
  
  socket.on('words', function(data) {
    io.in(socket.room).emit('words', data);
  });
  
  socket.on('next', function(data) {
    io.in(socket.room).emit('next', data);
  });
  
  socket.on('room update', function(data) {
    io.emit('room update', data);
  });
  
  socket.on('clear canvas', function(data) {
    io.in(socket.room).emit('clear canvas', data);
  });
  
  socket.on('change bg color', function(data) {
    io.in(socket.room).emit('change bg color', data);
  });
  
  socket.on('room', function(data) {
    io.emit('room', data);
  });
  
  socket.on('draw', function(data) {
    io.in(socket.room).emit('draw', data);
  });

  socket.on('leave', function(data) {
    socket.leave(data);
    socket.room = 'none';
  });
});

http.listen(port, function() {
  console.log('listening on *:' + port);
});
