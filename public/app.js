var socket = io.connect('http://' + location.host);

var piano = new Wad({
    source : 'square', 
    env : {
        attack : .01, 
        decay : 1, 
        sustain : 1.0, 
        hold : 4.0, 
        release : .3
    }, 
//    filter : {
//        type : 'lowpass', 
//        frequency : 1200, 
//        q : 5, 
//        env : {
//            attack : 0, 
//            frequency : 1200
//        }
//    }
})


var keyboard = "qawsedrftgyhujikolp"
var user = Math.random().toString(36).substring(7)

document.addEventListener("keydown", function(e){
  socket.emit('message', {
    user: user,
    message: [144, 44 + keyboard.indexOf(String.fromCharCode(e.keyCode).toLowerCase()), 100]
  })
})

document.addEventListener("keyup", function(e){
  socket.emit('message', {
    user: user,
    message: [144, 44 + keyboard.indexOf(String.fromCharCode(e.keyCode).toLowerCase()), 0]
  })
})

var notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B']


var square   = new Wad({ source : 'square' })


socket.on('message', function (data) {
  if(data.message[2] != 0){
  square.play({pitch: notes[data.message[1] % 12]+4})
  }else{
  square.stop()
  }
});

