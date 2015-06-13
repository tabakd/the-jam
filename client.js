var socket = require('socket.io-client')('http://localhost:3000');
var midi = require('midi');
var inquirer = require("inquirer");
var _ = require('lodash')

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



input.openPort(1);
input.ignoreTypes(false, false, false);


socket.on('connect', function () {
  input.on('message', function(deltaTime, message) {
    console.log(message)
    socket.emit('message', { message: message, deltaTime: deltaTime, user: 'Daniel' })
  });
})
