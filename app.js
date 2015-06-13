var express = require('express')
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var midi = require('midi');
var inquirer = require("inquirer");
var _ = require('lodash')

app.use(express.static(__dirname + '/public'));

var input = new midi.input();

//var inputs = _.range(input.getPortCount()).map(function(port){
//    return input.getPortName(port)
//})

//inquirer.prompt([{
//    input: "rawlist",
//    message: "Choose a MIDI input:",
//    name: "inputs",
//    choices: inputs
//  }], function(answers) {
//  console.log(answers)
//});


try {
input.openPort(1);
input.ignoreTypes(false, false, false);
} catch(e) {
}

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


