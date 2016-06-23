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
    this.load.audio('dungeon1theme', 'assets/audio/Cyborg Ninja.mp3');
    this.load.spritesheet('zephyr', 'assets/game/zephyr.png', 32, 32);
    this.load.spritesheet('pause', 'assets/game/shop/pause.png', 240, 240);
    this.load.spritesheet('pausemenu', '../assets/game/pausemenu.png', 800, 600);
    this.load.spritesheet('options', '../assets/game//GUI/options_720.png', 720, 720);
    this.load.image('play', 'assets/game/shop/play_360.png');
    this.load.spritesheet('resume', '../assets/game/GUI/resume__1__720.png', 240, 240);
    this.load.image('hubimg', 'assets/game/hub.png');
    this.load.image('hubimg2', 'assets/game/hub2.png');
    this.load.tilemap('hub', 'assets/game/hub.json', null, Phaser.Tilemap.TILED_JSON);
    this.load.image('tileset', 'assets/DungeonCrawl_ProjectUtumnoTileset_0.png');
    this.load.image('tileset1', 'assets/Hanzo-TownSet01VS-1.png');
    this.load.tilemap('dungeon1-1', 'assets/game/Level1/dungeon1.json', null, Phaser.Tilemap.TILED_JSON);
    this.load.image('dungeon1', 'assets/game/Level1/dungeon1.png');
    this.load.image('dungeon2', 'assets/game/Level1/dungeon2.png');
    this.load.image('dungeon3', 'assets/game/Level1/dungeon3.png');
    this.load.image('entrancedecor', 'assets/game/Level1/lockedroom.png');
    this.load.image('hallway', 'assets/game/Level1/hallway.png');
    this.load.image('rightroom1', 'assets/game/Level1/rightroom1.png');
    this.load.image('rightroom2', 'assets/game/Level1/rightroom2.png');
    this.load.image('rightroom3', 'assets/game/Level1/rightroom3.png');
    this.load.image('rightroom4', 'assets/game/Level1/rightroom4.png');
    this.load.image('rightroom5', 'assets/game/Level1/rightroom5.png');
    this.load.image('rightroom6', 'assets/game/Level1/rightroom6.png');
    this.load.image('rightroom7', 'assets/game/Level1/rightroom7.png');
    this.load.tilemap('boss-1', 'assets/game/Level1/boss1.json', null, Phaser.Tilemap.TILED_JSON);
    this.load.spritesheet('warptile', 'assets/game/gotoboss.png', 32, 32);
    this.load.spritesheet('kingsnekkek', 'assets/game/Level1/Enemies/King_Snekkek.png', 300, 300);
    this.load.spritesheet('enemy', 'assets/game/walk - vanilla.png', 64, 64);
    this.load.spritesheet('sword', 'assets/game/Sword.png', 192, 192, 7);
    this.load.spritesheet('sword2', 'assets/game/sword2.png', 192, 192, 7);
    this.load.spritesheet('exitstore', 'assets/game/shop/Exit.png');
    this.load.spritesheet('snekkek', 'assets/game/Level1/snekek.png', 32, 32);
    this.load.spritesheet('heart', '../assets/game/GUI/heart.png', 32, 32);
    this.load.spritesheet('coin', '../assets/game/GUI/coin.png', 32, 32);
    this.load.spritesheet('youlose', '../assets/game/youlose.png', 128, 128);
    this.load.spritesheet('skip', '../assets/game/GUI/skip__1__360.png', 32, 32);
    this.load.image('healthbar', '../assets/game/Level1/Boss/Healthbar.png');
    this.load.spritesheet('sword4', '/assets/game/sworddown.png', 192,192,12);
    this.load.spritesheet('sword3', 'assets/game/swordup.png', 192,192,12);



    this.game.time.advancedTiming = true;
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
