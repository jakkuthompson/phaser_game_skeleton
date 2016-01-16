var Player = function (game, x, y) {
    Phaser.Sprite.call(this, game, x, y, 'maincharacter');
    game.add.existing(this);
};

Player.prototype = {
    run: function() {

    },
    update: function() {

    }
};

Player.prototype = Object.create(Phaser.Sprite.prototype);
Player.prototype.constructor = Player;

module.exports = Player;


var Player = require("../models/player");

var p = new Player();