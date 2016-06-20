var Snekkek = function (game, player) {
    this._game = game;
    this._player = player;
    this._snekkek = this._game.add.sprite(1568, 2816, 'snekkek');
    this._game.physics.enable(this._snekkek, Phaser.Physics.ARCADE);
    this._snekkek.body.enable = true;
};

module.exports = Snekkek;
Snekkek.prototype = {
    update() {
        if (this._player.x < this._snekkek.x) {
            this._snekkek.body.velocity.x = -100;
        }
        if (this._player.x > this._snekkek.x) {
            this._snekkek.body.velocity.x = 100;
        }
        if (this._player.y < this._snekkek.y) {
            this._snekkek.body.velocity.y = -100;
        }
        if (this._player.y > this._snekkek.y) {
            this._snekkek.body.velocity.y = 100;
        }
    }
};
