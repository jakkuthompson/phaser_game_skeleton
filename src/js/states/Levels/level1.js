var Level1 = function () {
    this.room1 = null;
    this.layer = null;
};

window.Game = require('../game.js');

module.exports = Level1;

Level1.prototype = {
    preload: function () {
        this.load.tilemap('room1', 'assets/game/Level1/room1.json');
    },

    create: function () {
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        this.game.physics.startSystem(Phaser.Physics.P2JS);

        this.room1 = this.add.tilemap('room1');
        this.room1.addTilesetImage('t1', 'tileset');

    },

    update: function () {

    }
};