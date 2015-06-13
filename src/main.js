var Lobby = require('./lobby.js');

function main() {
  WebFontConfig = {
    google: { families: [ 'Montserrat:400,700:latin' ] }
  };
  (function() {
    var wf = document.createElement('script');
    wf.src = ('https:' == document.location.protocol ? 'https' : 'http') +
      '://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js';
    wf.type = 'text/javascript';
    wf.async = 'true';
    var s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(wf, s);
  })();


    var lobby = window.lobby = new Lobby({
        el: ".container"
    });
    lobby.render();
    lobby._visualizer.demo();

    // Listen for other clients, create a visualizer for them.
}
main();
