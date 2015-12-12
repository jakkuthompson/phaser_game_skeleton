var Splash = function (game, x, y) {
    Phaser.Sprite.call(this, game, x, y, 'logo');
    game.add.existing(this);
}

Splash.prototype = Object.create(Phaser.Sprite.prototype);
Splash.prototype.constructor = Splash;

Splash.prototype.update = function() {
};

module.exports = Splash;
