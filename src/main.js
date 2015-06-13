var Visualizer = require('./visualizer.js');
var keyTemplate = require('./templates/circle-key.html');

function main() {
    var visualizer = new Visualizer({
        el: ".container"
    });
    visualizer.render();

    // Listen for other clients, create a visualizer for them.
}
main();
