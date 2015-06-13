var $ = require('jquery');
var inherits = require('util').inherits;
var View = require('./view.js');
var keyTemplate = require('./templates/circle-key.html');

function CircleKey(opts) {
    opts = opts || {};
    View.apply(this, arguments);
    this.color = opts.color;
    this.note = opts.note;
    this.width = opts.width;

    this.$el.on('transitionend', function () {
        this.$el.remove();
    }.bind(this));
}
inherits(CircleKey, View);

CircleKey.prototype.render = function () {
    var html = keyTemplate.render({
        note: this.note
    }); 
    this.$el.html(html);
    
    //circleKeyEl.css('background-color', color);
    this.$el.find('.key-circle-velocity').css('background-color', this.color);
    this.$el.find('.key-circle-duration').css('background-color', this.color);

    this.$el.css({
        'width': this.width,
        'height': this.width,
        'border-radius': this.width/2
    });
    this.$el.children().css({
        'width': this.width,
        'height': this.width,
        'border-radius': this.width/2
    });

    setTimeout(function () {
        this.$el.addClass('key-circle-hold');
    }.bind(this), 100);
}

CircleKey.prototype.setPosition = function (x, y) {
    this.$el.css('transform', 'translate('+ x +'px,' + y + 'px)');
};

module.exports = CircleKey;
