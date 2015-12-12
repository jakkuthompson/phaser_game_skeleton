var Splash = require('../models/splash');
var Splash = function () {

};


module.exports = Splash;

Splash.prototype = {
  create: function () {
    this.asset = this.add.sprite(260, 240, 'logo');
    this.asset.scale.x = 4;
    this.asset.scale.y = 4;
    this.asset.alpha = 0;

    game.add.tween(this.asset).to( { alpha: 1 }, 2000, Phaser.Easing.Linear.None, true, 0, 1000, true);
  },
};
