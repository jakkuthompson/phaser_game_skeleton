var Menu = function () {
  this.text = null;
};

module.exports = Menu;

Menu.prototype = {

  create: function () {
    this.asset = this.add.sprite(0,0, 'menuback');
    this.asset.scale.x = 0.5;
    this.asset.scale.y = 0.5;
    this.asset = this.add.sprite(25, 25, 'menulogo');
    this.asset.scale.x = 2;
    this.asset.scale.y = 2;


  },

  update: function () {
  },

  onDown: function () {
    this.game.state.start(playerState.currentLevel);
  }
};
