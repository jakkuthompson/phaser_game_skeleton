var Snekkek = function(game, x, y) {
    Phaser.Sprite.call(this, game, x, y, 'snekkek');
    this.health = 2;
};

Snekkek.prototype = Object.create(Phaser.Sprite.prototype);
Snekkek.prototype.constructor = Snekkek;

Snekkek.prototype.update = function() {
};

module.exports = Snekkek;
