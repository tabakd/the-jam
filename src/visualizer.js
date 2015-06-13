var $ = require('jquery');
var inherits = require('util').inherits;
var keyTemplate = require('./templates/circle-key.html');
var View = require('./view.js');

function Visualizer(opts) {
    opts = opts || {}; 
    var el = opts.el !== undefined ? $(opts.el) : $('<div></div>'); 
    this.setElement(el);
    this.className = 'visualizer';

    View.apply(this, arguments);
}
inherits(Visualizer, View);

Visualizer.prototype.render = function () {
    View.prototype.render.apply(this, arguments);
};

Visualizer.prototype.onKeyPress = function (e) {
}

module.exports = Visualizer;
