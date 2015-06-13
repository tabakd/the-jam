var express = require('express')
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var midi = require('midi');

app.use(express.static(__dirname + '/public'));

var input = new midi.input();

console.log(input.getPortCount())
console.log(input.getPortName(0))
input.openPort(1);

input.ignoreTypes(false, false, false);

io.on('connection', function (socket) {
  input.on('message', function(deltaTime, message) {
    socket.emit('message', { message: message, deltaTime: deltaTime })
  });
})


server.listen(3000, function(){
  var host = server.address().address;
  var port = server.address().port;
  console.log('Example app listening at http://%s:%s', host, port);
});


