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

    play = this.add.button(564, 0, 'menuplay', listenerPlay, this, 1, 0, 2);
    play.scale.x = 0.7;
    play.scale.y = 0.7;

    var settings = this.add.button(564, 150, 'menusettings', listenerSet, this, 1, 0, 2);
    settings.scale.x = 0.7;
    settings.scale.y = 0.7;

    var credits = this.add.button(564, 300, 'menucredits', listenerCredit, this, 1, 0, 2);
    credits.scale.x = 0.7;
    credits.scale.y = 0.7;

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

  function listenerSet () {
    this.game.state.start('Preloader');
    music.pause();
  }

  function listenerCredit () {
    this.game.state.start('Splash');
    music.pause();
  }
