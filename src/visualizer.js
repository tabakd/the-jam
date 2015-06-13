var $ = require('jquery');
var inherits = require('util').inherits;
var keyTemplate = require('./templates/circle-key.html');
var View = require('./view.js');
var CircleKey = require('./circle-key.js');

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

// velocity > 0
Visualizer.prototype.onKeyPress = function (data) {
    var color = Visualizer.getRandomColor();
    var circleKey = new CircleKey({
        color: color
    });

    var containerWidth = this.$el.width();
    var containerHeight = this.$el.height();
    var circleWidth = circleKey.width();
    var x = Visualizer.getRandomFromRange(circleWidth, containerWidth - circleWidth);
    var y = Visualizer.getRandomFromRange(circleWidth,  containerHeight - circleWidth);

    circleKey.setPosition(x, y);
    this.$el.append(circleKey.$el);
    circleKey.render();
};

Visualizer.prototype.onKeyOff = function (data) {
}

// velocity == 0
// KeyOff

Visualizer.getRandomColor = function () {
    return '#'+Math.floor(Math.random()*16777215).toString(16);
};

Visualizer.getRandomFromRange = function (min, max) {
    return Math.random() * (max - min) + min;
}

module.exports = Visualizer;
