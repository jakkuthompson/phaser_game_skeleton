var GUI = function () {
    Phaser.Sprite.call(this, game, x, y, 'coin');
    Phaser.Sprite.call(this, game, x, y, 'hearts');
};

var coin;
var hearts;

GUI.prototype = {
    preload: function () {
        this.load.spritesheet('coin', '../assets/game/GUI/Coin.png');
    },

    create: function () {
        coin = this.add.spritesheet('coin');
        hearts = this.add.spritesheet('heart', 0, 0);

    }
}
;
