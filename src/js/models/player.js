var Player = function (game, x, y) {
    Phaser.Sprite.call(this, game, x, y, 'maincharacter');
    this.asset.scale.x = 0.5;
    this.asset.scale.y = 0.5;
    this.asset.frame = 0; //going to the right
    this.asset.frame = 1;//going to the left
    game.add.existing(this);
};

Player.prototype = {
    create: function() {
        upKey = this.game.input.keyboard.addKey(Phaser.Keyboard.UP);
        downKey = this.game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
        leftKey = this.game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
        rightKey = this.game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
    }

};

Player.prototype = Object.create(Phaser.Sprite.prototype);
Player.prototype.constructor = Player;

module.exports = Player;

var Player = require("../models/player");