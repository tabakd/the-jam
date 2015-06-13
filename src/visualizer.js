var $ = require('jquery');
var inherits = require('util').inherits;
var keyTemplate = require('./templates/circle-key.html');
var View = require('./view.js');

function Visualizer(opts) {
    opts = opts || {}; 
    var el = opts.el !== undefined ? $(opts.el) : $('<div></div>'); 
    this.setElement(el);
    this.className = 'visualizer';

    this._intervalId;

    View.apply(this, arguments);
}
inherits(Visualizer, View);

Visualizer.prototype.render = function () {
    View.prototype.render.apply(this, arguments);
};

Visualizer.prototype.demo = function () {
    this._intervalId = setInterval(function () {
        this.onKeyPress({});
    }.bind(this), 2000);
};

Visualizer.prototype.stop = function () {
    clearInterval(this._intervalId);
};

Visualizer.prototype.onKeyPress = function (data) {
    var color = Visualizer.getRandomColor();
    var html = keyTemplate.render({
       color: color
    }); 
    var circleKeyEl = $(html);
    circleKeyEl.css('background-color', color);
    this.$el.append(circleKeyEl);
};

Visualizer.getRandomColor = function () {
    return '#'+Math.floor(Math.random()*16777215).toString(16);
};

module.exports = Visualizer;
