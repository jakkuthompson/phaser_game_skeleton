var Level1 = function () {

};

window.Game = require('../game.js');

module.exports = Level1;

Level1.prototype = {
    preload: function () {
        this.load.tileset('temporary', 'assets/game/Level1/temporary.json');
    },

    create: function () {
        this.add.tileset('temporary');
    },

    update: function () {

    }
};