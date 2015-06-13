var express = require('express')
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

app.use(express.static(__dirname + '/public'));


var notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B']
io.on('connection', function (socket) {
  socket.on('message', function(data) {
    console.log(data)
    data.note = notes[data.message[1] % 12]
    io.emit('message', data)
  });
})

server.listen(3000, function(){
  var host = server.address().address;
  var port = server.address().port;
  console.log('Example app listening at http://%s:%s', host, port);
});


