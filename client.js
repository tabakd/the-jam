var socket = require('socket.io-client')('http://localhost:3000');
var midi = require('midi');
var inquirer = require("inquirer");
var _ = require('lodash');

var input = new midi.input();

input.openPort(1);
input.ignoreTypes(false, false, false);

var user = Math.random().toString(36).substring(7);

socket.on('connect', function () {
  input.on('message', function(deltaTime, message) {
    console.log(message)
    socket.emit('message', { message: message, deltaTime: deltaTime, user: user });
  });
})
