var $ = require('jquery');

function View(opts) {
    opts = opts || {}; 
    var el = opts.el !== undefined ? $(opts.el) : $('<div></div>'); 
    this.setElement(el);
    this.className = "";
    this.rendered = false;
}

View.prototype.setElement = function (el) {
    this.$el = $(el);
    this.$el.addClass(this.className);
};

View.prototype.render = function () {
    this.rendered = true;
};


module.exports = View;
