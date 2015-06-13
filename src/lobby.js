var $ = require('jquery');
var inherits = require('util').inherits;
var View = require('./view.js');
var Visualizer = require('./visualizer.js');
var template = require('./templates/lobby.html');
var utils = require('./utils.js');

function Lobby(opts) {
    opts = opts || {}; 
    var el = opts.el !== undefined ? $(opts.el) : $('<div></div>'); 
    this.setElement(el);
    this.className = 'lobby';

    this._visualizers = {};

    View.apply(this, arguments);

    socket.on('message', Lobby.onMessage.bind(this));
}
inherits(Lobby, View);

Lobby.onMessage = function (data) {
    if (data.message[0] !== 144) {
        return;
    }

    // Register or fetch visualizer based on user
    var visualizer;
    if (!this._visualizers.hasOwnProperty(data.user)) {
        visualizer = this._visualizers[data.user] = new Visualizer({
            id: data.user,
            color: utils.getRandomColor()
        });
    } else {
        visualizer = this._visualizers[data.user];
    }
    if (!visualizer.rendered) {
        this.$el.append(visualizer.$el);
        visualizer.render();
    }

    if (data.message[2] != 0) {
        // Key pressed
        visualizer.onKeyPress(data);
    } else if (data.message[2] == 0) {
        // Key off
        visualizer.onKeyOff(data);
    }
}

Lobby.prototype.render = function () {
    View.prototype.render.apply(this, arguments);
    var context = {};
    var html = template.render();
    this.$el.html(html);
    //this.$el.append(this._visualizer.$el);
};

module.exports = Lobby;
