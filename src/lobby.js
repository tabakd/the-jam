var $ = require('jquery');
var inherits = require('util').inherits;
var View = require('./view.js');
var Visualizer = require('./visualizer.js');
var template = require('./templates/lobby.html');

function Lobby(opts) {
    opts = opts || {}; 
    var el = opts.el !== undefined ? $(opts.el) : $('<div></div>'); 
    this.setElement(el);
    this.className = 'lobby';

    View.apply(this, arguments);
}
inherits(Lobby, View);

Lobby.prototype.render = function () {
    View.prototype.render.apply(this, arguments);
    var context = {};
    var html = template.render();
    this.$el.html(html);
};

module.exports = Lobby;
