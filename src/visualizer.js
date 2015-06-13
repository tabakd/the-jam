var $ = require('jquery');
var inherits = require('util').inherits;
var View = require('./view.js');
var CircleKey = require('./circle-key.js');
var utils = require('./utils.js');

function Visualizer(opts) {
    opts = opts || {}; 
    var el = opts.el !== undefined ? $(opts.el) : $('<div></div>'); 
    this.setElement(el);
    this.className = 'visualizer';
    this.color = opts.color;
    this._keys = {};

    this._intervalId;

    View.apply(this, arguments);
}
inherits(Visualizer, View);

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
    var circleKey;

    if (!this._keys.hasOwnProperty(data.message[1])) {
        var color = this.color || utils.getRandomColor();
        var width = 100 + (data.message[2]); 
        this._keys[data.message[1]] = circleKey = new CircleKey({
            color: color,
            note: data.note,
            width:  width
        });
    } else {
        return;
    }

    var containerWidth = $(window).width();
    var containerHeight = $(window).height();
    var circleWidth = circleKey.width;
    var x = utils.getRandomFromRange(0, containerWidth - circleWidth);
    var y = utils.getRandomFromRange(0,  containerHeight - circleWidth);

    circleKey.setPosition(x, y);
    this.$el.append(circleKey.$el);
    circleKey.render();
};

// velocity == 0
// KeyOff
Visualizer.prototype.onKeyOff = function (data) {
   if (this._keys.hasOwnProperty(data.message[1])) {
        this._keys[data.message[1]].$el.remove();
        delete this._keys[data.message[1]];
    } 
}

module.exports = Visualizer;
