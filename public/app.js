var socket = io.connect('http://localhost:3000');

var piano = new Wad({
    source : 'square', 
    env : {
        attack : .01, 
        decay : .005, 
        sustain : .2, 
        hold : .015, 
        release : .3
    }, 
    filter : {
        type : 'lowpass', 
        frequency : 1200, 
        q : 8.5, 
        env : {
            attack : .2, 
            frequency : 600
        }
    }
})

socket.on('message', function (data) {
  piano.play({ pitch : 'C5' })
  console.log(data.message)
});

