var Player = function () {
    Phaser.Sprite.call(this, game, x, y, 'zephyr');
};

Player.prototype = {

};

Player.prototype = Object.create(Phaser.Sprite.prototype);
Player.prototype.constructor = Player;

module.exports = Player;
