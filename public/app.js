var socket = io.connect('http://' + location.host);

var piano = new Wad({
    source : 'square', 
    env : {
        attack : .01, 
        decay : 1, 
        sustain : 1.0, 
        hold : 1.0, 
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

var notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B']

var keyboard = "qawsedrftgyhujikolp"

document.addEventListener("keydown", function(e){
  console.log(String.fromCharCode(e.keyCode))
  console.log(keyboard.indexOf(String.fromCharCode(e.keyCode).toLowerCase()))
  socket.emit('message', {
    user: 'Daniel',
    message: [144, 44 + keyboard.indexOf(String.fromCharCode(e.keyCode).toLowerCase()), 100]
  })
})

socket.on('message', function (data) {
  if(data.message[2] != 0){
    piano.play({ pitch : notes[data.message[1] % 12] + 4 })
  }
});
