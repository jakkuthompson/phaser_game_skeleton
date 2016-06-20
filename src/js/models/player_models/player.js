var Player = function (game, cursors, herohealth) {
    this._game = game;
    this._player = Phaser.Sprite.call(this, game, x, y, 'zephyr');
};

Player.prototype = {
    update() {

    }
};

module.exports = Player;
