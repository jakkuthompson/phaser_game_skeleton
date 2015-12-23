var Menu = function () {
  this.text = null;
};

module.exports = Menu;

Menu.prototype = {

  create: function () {
    this.asset = this.add.sprite(0, 0, 'menuback');
    this.asset.scale.x = 0.5;
    this.asset.scale.y = 0.5;

    this.asset = this.add.sprite(25, 25, 'menulogo');
    this.asset.scale.x = 2;
    this.asset.scale.y = 2;

    var play = this.add.sprite(564, 0, 'menuplay');
    play.scale.x = 0.7;
    play.scale.y = 0.7;
    play.inputEnabled = true;
    play.events.onInputDown.add(listenerPlay, this);

    this.asset = this.add.sprite(564, 150, 'menusettings');
    this.asset.scale.x = 0.7;
    this.asset.scale.y = 0.7;

    this.asset = this.add.sprite(564, 300, 'menucredits');
    this.asset.scale.x = 0.7;
    this.asset.scale.y = 0.7;
    music = this.add.audio('menutheme');
    music.play();
  },

  update: function () {

  },

  onDown: function () {
    this.game.state.start(playerState.currentLevel);
  }
};

  function listenerPlay () {
    this.game.state.start('Game');
    music.pause();
}