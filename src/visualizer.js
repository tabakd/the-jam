var $ = require('jquery');
var keyTemplate = require('./templates/circle-key.html');

function Visualizer(opts) {
    opts = opts || {}; 
    var el = opts.el !== undefined ? $(opts.el) : $('<div></div>'); 
    this.setElement(el);
}

Visualizer.prototype.setElement = function (el) {
    this.$el = $(el);
    this.$el.addClass('visualizer');
};

Visualizer.prototype.render = function () {
};

Visualizer.prototype.onKeyPress = function (e) {

}

module.exports = Visualizer;
