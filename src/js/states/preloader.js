var Preloader = function () {
  this.asset = null;
  this.ready = false;
};

module.exports = Preloader;

Preloader.prototype = {

  preload: function () {
    this.asset = this.add.sprite(320, 240, 'preloader');
    this.asset.anchor.setTo(0.5, 0.5);

    this.load.onLoadComplete.addOnce(this.onLoadComplete, this);
    this.load.setPreloadSprite(this.asset);
    this.load.image('testsprite', 'assets/test.png');
    this.load.image('logo', 'assets/TeamSkeltal.gif');
    this.load.image('menulogo', 'assets/gamelogo.png');
    this.load.image('menuback', 'assets/background-ruby.png');
    this.load.image('menuplay', 'assets/menu/button_un.png');
    this.load.image('menusettings', 'assets/menu/button_un_s.png');
    this.load.image('menucredits', 'assets/menu/button_un_c.png');
    this.load.audio('menutheme', 'assets/audio/Kawai Kitsune.mp3');
    this.load.image('menuplay-cl', 'assets/menu/Button_Press.png');


  },

  create: function () {
    this.asset.cropEnabled = false;
  },

  update: function () {
    if (!!this.ready) {
      this.game.state.start('Splash');
    }
  },

  onLoadComplete: function () {
    this.ready = true;
  }
};
