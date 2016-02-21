var Preloader = function () {
  this.asset = null;
  this.ready = false;
};

module.exports = Preloader;


Preloader.prototype = {

  preload: function () {
    this.asset = this.add.sprite(this.world.centerX, this.world.centerY, 'preloader');
    this.asset.anchor.setTo(0.5, 0.5);

    this.load.onLoadComplete.addOnce(this.onLoadComplete, this);
    this.load.setPreloadSprite(this.asset);
    this.load.image('testsprite', 'assets/test.png');
    this.load.image('logo', 'assets/TeamSkeltal.png');
    this.load.image('menulogo', 'assets/menu/shatteredfates.png');
    this.load.image('menuback', 'assets/background-ruby.png');
    this.load.spritesheet('menuplay', 'assets/menu/playbutton.png', 338, 170);
    this.load.spritesheet('menusettings', 'assets/menu/settingsbutton.png', 338, 170);
    this.load.spritesheet('menucredits', 'assets/menu/creditsbutton.png', 338, 170);
    this.load.audio('bwing', 'assets/audio/bwing.mp3');
    this.load.audio('menutheme', 'assets/audio/Kawai Kitsune.mp3');
    this.load.audio('overworld', 'assets/audio/overworld.mp3');
    this.load.spritesheet('maincharacter', 'assets/game/zephyr.png', 32, 32);
    this.load.image('hubimg', 'assets/game/hub.png');
    this.load.image('hubimg2', 'assets/game/hub2.png');
    this.load.tilemap('hub', 'assets/game/hub.json', null, Phaser.Tilemap.TILED_JSON);
    this.load.image('tileset', 'assets/DungeonCrawl_ProjectUtumnoTileset.png');
    this.load.image('tileset1', 'assets/Hanzo-TownSet01VS-1.png');
    this.load.spritesheet('enemy', 'assets/game/walk - vanilla.png', 64,64);
    this.load.spritesheet('sword', 'assets/game/Sword.png',192,192,7)
    this.load.spritesheet('sword2', 'assets/game/sword2.png',192,192,7)

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
