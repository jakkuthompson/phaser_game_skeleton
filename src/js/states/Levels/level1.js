var Level1 = function () {
    this.map = null;
    this.layer = null;
    this.room1 = null;
    this.room2 = null;
    this.room3 = null;
    this.music = null;
    this.snekkek = null;
    this.snekkekGroup = null;
    this.enemies = null;
    this.ready = false;
};

module.exports = Level1;


const GUI = require('../../models/player_models/healthbar');
const CollisionManager = require('../../common/collisions/collision_manager');
const Snekkek = require('../../models/Enemies/Level1/snekkek');
var walkmore = true;
var alreadyhit1 = 0;
var snekkekhealth = 2;
var snekkekKilled = false;
var herohealth = 6;
var herodied = 0;
var coins = 0;
var enemykilled = -1;
var alreadyhit2 = 0;
var playerhit = 0;
var animplaying = false;
var worldScale = 1;
var playerdied = false;


Level1.prototype = {
    create: function () {
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        this.game.physics.startSystem(Phaser.Physics.P2JS);

        this.game.world.setBounds(0, 0, 3200, 3200);

        this.music = this.add.audio('dungeon1theme');
        this.music.play();
        this.music.volume = .7;
        this.map = this.add.tilemap('dungeon1-1');
        this.map.addTilesetImage('t1', 'tileset');

        this.layer = this.map.createLayer('entrance');
        this.layer.visible = false;

        this.room1 = this.add.sprite(0, 0, 'dungeon1');
        this.room1.alpha = 1;
        this.room2 = this.add.sprite(0, 0, 'dungeon2');
        this.room2.visible = false;
        this.room3 = this.add.sprite(0, 0, 'dungeon3');
        this.room3.visible = false;
        this.hallway = this.add.sprite(0, 0, 'hallway');
        this.hallway.alpha = 1;
        this.hallway.visible = false;
        this.rightroom1 = this.add.sprite(0, 0, 'rightroom1');
        this.rightroom1.visible = false;
        this.rightroom2 = this.add.sprite(0, 0, 'rightroom2');
        this.rightroom2.visible = false;
        this.rightroom3 = this.add.sprite(0, 0, 'rightroom3');
        this.rightroom3.visible = false;
        this.rightroom4 = this.add.sprite(0, 0, 'rightroom4');
        this.rightroom4.visible = false;
        this.rightroom5 = this.add.sprite(0, 0, 'rightroom5');
        this.rightroom5.visible = false;
        this.rightroom6 = this.add.sprite(0, 0, 'rightroom6');
        this.rightroom6.visible = false;
        this.rightroom7 = this.add.sprite(0, 0, 'rightroom7');
        this.rightroom7.visible = false;

        this.hallway = this.add.sprite(0, 0, 'hallway');
        this.hallway.visible = false;
        this.entrancedecor = this.add.sprite(1568, 2592, 'entrancedecor');
        this.entrancedecor.alpha = 1;
        this.physics.enable(this.entrancedecor, Phaser.Physics.ARCADE);
        this.entrancedecor.body.immovable = true;
        this.stairs = this.add.sprite(1216, 2912, 'stairs');
        this.stairs.alpha = 1;
        this.physics.enable(this.stairs, Phaser.Physics.ARCADE);
        this.stairs.body.immovable = true;
        this.warppad = this.add.sprite(864, 2688, 'warptile');
        this.physics.enable(this.warppad, Phaser.Physics.ARCADE);
        this.warppad.body.immovable = true;
        this.warppad.animations.add('flash', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 7, true);
        this.warppad.play('flash');
        this.warppad.kill();
        this.warppad1 = this.add.sprite(576, 2912, 'warptile');
        this.physics.enable(this.warppad1, Phaser.Physics.ARCADE);
        this.warppad1.body.immovable = true;
        this.warppad1.animations.add('flash', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 7, true);
        this.warppad1.play('flash');
        this.warppad1.kill();
        this.warppad2 = this.add.sprite(864, 3136, 'warptile');
        this.physics.enable(this.warppad2, Phaser.Physics.ARCADE);
        this.warppad2.body.immovable = true;
        this.warppad2.animations.add('flash', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 7, true);
        this.warppad2.play('flash');
        this.warppad2.kill();
        this.warppad3 = this.add.sprite(2944, 2784, 'warptile');
        this.physics.enable(this.warppad3, Phaser.Physics.ARCADE);
        this.warppad3.body.immovable = true;
        this.warppad3.kill();
        this.warppad3.animations.add('flash', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 7, true);
        this.warppad3.play('flash');
        this.warppad4 = this.add.sprite(2752, 2944, 'warptile');
        this.physics.enable(this.warppad4, Phaser.Physics.ARCADE);
        this.warppad4.body.immovable = true;
        this.warppad4.kill();
        this.warppad4.animations.add('flash', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 7, true);
        this.warppad4.play('flash');
        this.warppad5 = this.add.sprite(2944, 3136, 'warptile');
        this.physics.enable(this.warppad5, Phaser.Physics.ARCADE);
        this.warppad5.body.immovable = true;
        this.warppad5.kill();
        this.warppad5.animations.add('flash', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 7, true);
        this.warppad5.play('flash');
        this.warppad6 = this.add.sprite(2752, 2496, 'warptile');
        this.physics.enable(this.warppad6, Phaser.Physics.ARCADE);
        this.warppad6.body.immovable = true;
        this.warppad6.kill();
        this.warppad6.animations.add('flash', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 7, true);
        this.warppad6.play('flash');
        this.warppad7 = this.add.sprite(2944, 2720, 'warptile');
        this.physics.enable(this.warppad7, Phaser.Physics.ARCADE);
        this.warppad7.body.immovable = true;
        this.warppad7.kill();
        this.warppad7.animations.add('flash', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 7, true);
        this.warppad7.play('flash');
        this.warppad8 = this.add.sprite(3136, 2496, 'warptile');
        this.physics.enable(this.warppad8, Phaser.Physics.ARCADE);
        this.warppad8.body.immovable = true;
        this.warppad8.kill();
        this.warppad8.animations.add('flash', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 7, true);
        this.warppad8.play('flash');
        this.warppad9 = this.add.sprite(2944, 1920, 'warptile');
        this.physics.enable(this.warppad9, Phaser.Physics.ARCADE);
        this.warppad9.body.immovable = true;
        this.warppad9.animations.add('flash', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 7, true);
        this.warppad9.play('flash');
        this.warppad9.kill();
        this.warppad10 = this.add.sprite(2752, 2080, 'warptile');
        this.physics.enable(this.warppad10, Phaser.Physics.ARCADE);
        this.warppad10.body.immovable = true;
        this.warppad10.animations.add('flash', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 7, true);
        this.warppad10.play('flash');
        this.warppad10.kill();
        this.warppad11 = this.add.sprite(3136, 2080, 'warptile');
        this.physics.enable(this.warppad11, Phaser.Physics.ARCADE);
        this.warppad11.body.immovable = true;
        this.warppad11.animations.add('flash', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 7, true);
        this.warppad11.play('flash');
        this.warppad11.kill();
        this.warppad12 = this.add.sprite(2944, 1472, 'warptile');
        this.physics.enable(this.warppad12, Phaser.Physics.ARCADE);
        this.warppad12.body.immovable = true;
        this.warppad12.animations.add('flash', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 7, true);
        this.warppad12.play('flash');
        this.warppad12.kill();
        this.warppad13 = this.add.sprite(2944, 1856, 'warptile');
        this.physics.enable(this.warppad13, Phaser.Physics.ARCADE);
        this.warppad13.body.immovable = true;
        this.warppad13.animations.add('flash', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 7, true);
        this.warppad13.play('flash');
        this.warppad13.kill();
        this.warppad14 = this.add.sprite(3136, 1664, 'warptile');
        this.physics.enable(this.warppad14, Phaser.Physics.ARCADE);
        this.warppad14.body.immovable = true;
        this.warppad14.animations.add('flash', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 7, true);
        this.warppad14.play('flash');
        this.warppad14.kill();
        this.warppad15 = this.add.sprite(2752, 1152, 'warptile');
        this.physics.enable(this.warppad15, Phaser.Physics.ARCADE);
        this.warppad15.body.immovable = true;
        this.warppad15.animations.add('flash', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 7, true);
        this.warppad15.play('flash');
        this.warppad15.kill();
        this.warppad16 = this.add.sprite(2944, 1408, 'warptile');
        this.physics.enable(this.warppad16, Phaser.Physics.ARCADE);
        this.warppad16.body.immovable = true;
        this.warppad16.animations.add('flash', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 7, true);
        this.warppad16.play('flash');
        this.warppad16.kill();
        this.warppad17 = this.add.sprite(3136, 1152, 'warptile');
        this.physics.enable(this.warppad17, Phaser.Physics.ARCADE);
        this.warppad17.body.immovable = true;
        this.warppad17.animations.add('flash', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 7, true);
        this.warppad17.play('flash');
        this.warppad17.kill();
        this.warppad18 = this.add.sprite(2944, 512, 'warptile');
        this.physics.enable(this.warppad18, Phaser.Physics.ARCADE);
        this.warppad18.body.immovable = true;
        this.warppad18.animations.add('flash', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 7, true);
        this.warppad18.play('flash');
        this.warppad18.kill();
        this.warppad19 = this.add.sprite(2752, 704, 'warptile');
        this.physics.enable(this.warppad19, Phaser.Physics.ARCADE);
        this.warppad19.body.immovable = true;
        this.warppad19.animations.add('flash', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 7, true);
        this.warppad19.play('flash');
        this.warppad19.kill();
        this.warppad20 = this.add.sprite(3136, 704, 'warptile');
        this.physics.enable(this.warppad20, Phaser.Physics.ARCADE);
        this.warppad20.body.immovable = true;
        this.warppad20.animations.add('flash', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 7, true);
        this.warppad20.play('flash');
        this.warppad20.kill();
        this.warppad21 = this.add.sprite(2752, 32, 'warptile');
        this.physics.enable(this.warppad21, Phaser.Physics.ARCADE);
        this.warppad21.body.immovable = true;
        this.warppad21.animations.add('flash', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 7, true);
        this.warppad21.play('flash');
        this.warppad21.kill();
        this.warppad22 = this.add.sprite(2944, 32, 'warptile');
        this.physics.enable(this.warppad22, Phaser.Physics.ARCADE);
        this.warppad22.body.immovable = true;
        this.warppad22.animations.add('flash', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 7, true);
        this.warppad22.play('flash');
        this.warppad22.kill();
        this.warppad23 = this.add.sprite(3136, 32, 'warptile');
        this.physics.enable(this.warppad23, Phaser.Physics.ARCADE);
        this.warppad23.body.immovable = true;
        this.warppad23.animations.add('flash', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 7, true);
        this.warppad23.play('flash');
        this.warppad23.kill();
        this.warppad24 = this.add.sprite(2752, 224, 'warptile');
        this.physics.enable(this.warppad24, Phaser.Physics.ARCADE);
        this.warppad24.body.immovable = true;
        this.warppad24.animations.add('flash', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 7, true);
        this.warppad24.play('flash');
        this.warppad24.kill();
        this.warppad25 = this.add.sprite(3136, 224, 'warptile');
        this.physics.enable(this.warppad25, Phaser.Physics.ARCADE);
        this.warppad25.body.immovable = true;
        this.warppad25.animations.add('flash', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 7, true);
        this.warppad25.play('flash');
        this.warppad25.kill();
        this.warppad26 = this.add.sprite(2752, 448, 'warptile');
        this.physics.enable(this.warppad26, Phaser.Physics.ARCADE);
        this.warppad26.body.immovable = true;
        this.warppad26.animations.add('flash', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 7, true);
        this.warppad26.play('flash');
        this.warppad26.kill();
        this.warppad27 = this.add.sprite(2944, 448, 'warptile');
        this.physics.enable(this.warppad27, Phaser.Physics.ARCADE);
        this.warppad27.body.immovable = true;
        this.warppad27.animations.add('flash', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 7, true);
        this.warppad27.play('flash');
        this.warppad27.kill();
        this.warppad28 = this.add.sprite(3136, 448, 'warptile');
        this.physics.enable(this.warppad28, Phaser.Physics.ARCADE);
        this.warppad28.body.immovable = true;
        this.warppad28.animations.add('flash', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 7, true);
        this.warppad28.play('flash');
        this.warppad28.kill();
        this.bosspad = this.add.sprite(1568, 32, 'warptile');
        this.physics.enable(this.bosspad, Phaser.Physics.ARCADE);
        this.bosspad.body.immovable = true;
        this.bosspad.animations.add('flash', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 7, true);
        this.bosspad.play('flash');
        this.bosspad.kill();

        this.map.setTileIndexCallback(1002, () => {
            this.asset.x = 1248;
            this.asset.y = 2912;
            this.room1.visible = true;
            this.entrancedecor.revive();
            this.stairs.revive();
            this.snekkek.revive();
            snekkekhealth = 2;
            this.room2.visible = false;
            this.warppad.kill();
            this.warppad1.kill();
            this.warppad2.kill();
        }, this.asset);

        this.map.setTileIndexCallback(961, () => {
            this.music.pause();
            //this.s = this.game.add.tween(this.room1);
            //this.s.to({ alpha: 1 }, 500, null);
            //this.s1 = this.game.add.tween(this.entrancedecor);
            //this.s1.to({ alpha: 1 }, 500, null);
            //this.s2 = this.game.add.tween(this.stairs);
            //this.s2.to({ alpha: 1 }, 500, null);
            //this.s3 = this.game.add.tween(this.asset);
            //this.s3.to({ alpha: 1 }, 500, null);
            //this.s4 = this.game.add.tween(this.snekkek);
            //this.s4.to({ alpha: 1 }, 500, null);
            //this.asset.body.moves = false;
            //this.snekkek.body.moves = false;
            //this.preloadBar = this.add.sprite(this.world.centerX, this.world.centerY, 'loading');
            //this.preloadBar.animations.add('loading...', [0, 1, 2, 3], 4, true);
            //this.preloadBar.animations.play('loading...');

            //this.load.onLoadComplete.addOnce(this.onLoadComplete, this);

            //if(!!this.ready) {
                this.game.state.start('Game');
            //}
        }, this.asset);

        this.collisionmanager = new CollisionManager(this, this.map);
        this.collisionmanager.bindCollisionToLayer(1193);

        this.asset = this.add.sprite(1568, 3136, 'zephyr');
        this.asset.alpha = 1;
        this.asset.scale.x = .99;
        this.asset.animations.add('left', [3, 4, 5], 20, true);
        this.asset.animations.add('right', [6, 7, 8], 20, true);
        this.asset.animations.add('down', [0, 1, 2], 20, true);
        this.asset.animations.add('up', [9, 10, 11], 20, true);
        this.asset.animations.add('died', [9, 6, 3, 0, 9, 6, 3, 0, 9, 6, 3, 0], 10, true);
        this.physics.enable(this.asset, Phaser.Physics.ARCADE);
        this.physics.enable(this.asset, Phaser.Physics.P2JS);
        this.asset.body.immovable = true;
        this.asset.body.collideWorldBounds = true;
        this.game.world.setBounds(0, 0, 3200, 3200);
        this.game.camera.follow(this.asset);

        this.snekkekGroup = this.game.add.group();
        this.snekkek = this.add.sprite(1568, 2816, 'snekkek');
        this.snekkek.alpha = 1;
        this.snekkek.animations.add('down', [0, 1, 4, 5], 2, true);
        this.snekkek.animations.add('right', [8, 9], 2, true);
        this.snekkekGroup.add(this.snekkek);
        this.physics.enable(this.snekkek, Phaser.Physics.ARCADE);
        this.snekkek.body.enable = true;

        this.sword = this.add.sprite(this.asset.x,this.asset.y, 'sword');
        this.physics.enable(this.sword, Phaser.Physics.ARCADE);
        this.sword.scale.x = 0.25;
        this.sword.scale.y = 0.25;
        this.sword.animations.add('swing');
        this.sword.kill();

        // Adds the sword for swinging to the left
        this.sword2 = this.add.sprite(this.asset.x,this.asset.y,'sword2');
        this.physics.enable(this.sword2, Phaser.Physics.ARCADE);
        this.sword2.scale.x = 0.25;
        this.sword2.scale.y = 0.25;
        this.sword2.animations.add('swingtwo');
        this.sword2.kill();

        // Adds the sword for swinging up
        this.sword3 = this.add.sprite(this.asset.x,this.asset.y, 'sword3');
        this.physics.enable(this.sword3, Phaser.Physics.ARCADE);
        this.sword3.scale.x = 0.25;
        this.sword3.scale.y = 0.25;
        // Creates the animation
        this.sword3.animations.add('swingthree');
        this.sword3.kill();
        this.world.swap(this.asset, this.sword3);

        // Adds the sword for swinging down
        this.sword4 = this.add.sprite(this.asset.x,this.asset.y,'sword4');
        this.physics.enable(this.sword4, Phaser.Physics.ARCADE);
        this.sword4.scale.x = 0.25;
        this.sword4.scale.y = 0.25;
        // Creates the animation
        this.sword4.animations.add('swingfour');
        this.sword4.kill();

        //keypad input detectors
        this.cursors = this.input.keyboard.createCursorKeys();

        this.heart1 = this.game.add.sprite(0, 0, 'heart');
        this.heart1.fixedToCamera = true;

        this.heart2 = this.game.add.sprite(32, 0, 'heart');
        this.heart2.fixedToCamera = true;

        this.heart3 = this.game.add.sprite(64, 0, 'heart');
        this.heart3.fixedToCamera = true;

        this.coin = this.game.add.sprite(256, 2, 'coin');
        this.coin.animations.add('shine', [0, 1], 5, true);
        this.coin.play('shine');
        this.coin.fixedToCamera = true;

        this.text = this.add.text(290, 5, coins, {font: "20px Arial", fill: "#ffffff"});
        this.text.fixedToCamera = true;

        this.pause = this.add.button(775, 0, 'pause', listenerPause, this, 1, 0, 2);
        this.pause.fixedToCamera = true;
        this.pause.scale.x = .1;
        this.pause.scale.y = .1;
        this.pause.inputEnabled = true;

        this.pause.events.onInputUp.add(() => {
            this.pause.kill();

            this.asset.body.moves = false;

            this.snekkek.body.moves = false;
            this.music.pause();

            this.pauseMenu = this.add.sprite(0, 0, 'pausemenu');
            this.pauseMenu.animations.add('spiralin', [0, 1, 2, 3, 4, 5, 6, 7, 8], 10, false);
            this.pauseMenu.animations.add('spiralout', [8, 7, 6, 5, 4 ,3, 2, 1, 0], 10, false);
            this.pauseMenu.animations.play('spiralin');
            this.pauseMenu.fixedToCamera = true;

            this.time.events.add(1000, () => {
                this.resume = this.add.button(275, 0, 'resume', listenerResume(), true, 1, 0, 2);
                this.resume.fixedToCamera = true;
                this.resume.events.onInputUp.add(() => {
                    this.resume.destroy();
                    this.pause.revive();
                    this.pauseMenu.animations.play('spiralout');
                    this.time.events.add(1000, () => {
                        this.pauseMenu.destroy();
                        this.music.resume();
                        this.asset.body.moves = true;
                        this.snekkek.body.moves = true;
                    });
                });
            }, this);
        });
    },

    update: function () {
        var attackKey = this.game.input.keyboard.addKey(Phaser.Keyboard.Z);
        var wKey = this.game.input.keyboard.addKey(Phaser.Keyboard.W);
        var sKey = this.game.input.keyboard.addKey(Phaser.Keyboard.S);
        var aKey = this.game.input.keyboard.addKey(Phaser.Keyboard.A);
        var dKey = this.game.input.keyboard.addKey(Phaser.Keyboard.D);
        var spacebar = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

        // Only test collision on the active layer.
        this.game.physics.arcade.collide(this.asset, this.layer);
        this.game.physics.arcade.collide(this.asset, this.entrancedecor);
        this.game.physics.arcade.collide(this.asset, this.snekkek, heroattacked, null, this);
        this.game.physics.arcade.overlap(this.asset, this.stairs, stairs, null, this);
        this.game.physics.arcade.collide(this.asset, this.warppad, warp1, null, this);
        this.game.physics.arcade.collide(this.asset, this.warppad1, warpBack, null, this);
        this.game.physics.arcade.collide(this.asset, this.warppad2, warpBack, null, this);
        this.game.physics.arcade.collide(this.asset, this.warppad3, warp2, null, this);
        this.game.physics.arcade.collide(this.asset, this.warppad4, warpBack, null, this);
        this.game.physics.arcade.collide(this.asset, this.warppad5, warpBack, null, this);
        this.game.physics.arcade.collide(this.asset, this.warppad6, warpBack, null, this);
        this.game.physics.arcade.collide(this.asset, this.warppad7, warp3, null, this);
        this.game.physics.arcade.collide(this.asset, this.warppad8, warpBack, null, this);
        this.game.physics.arcade.collide(this.asset, this.warppad9, warpBack, null, this);
        this.game.physics.arcade.collide(this.asset, this.warppad10, warp4, null, this);
        this.game.physics.arcade.collide(this.asset, this.warppad11, warpBack, null, this);
        this.game.physics.arcade.collide(this.asset, this.warppad12, warp5, null, this);
        this.game.physics.arcade.collide(this.asset, this.warppad13, warpBack, null, this);
        this.game.physics.arcade.collide(this.asset, this.warppad14, warpBack, null, this);
        this.game.physics.arcade.collide(this.asset, this.warppad15, warpBack, null, this);
        this.game.physics.arcade.collide(this.asset, this.warppad16, warp6, null, this);
        this.game.physics.arcade.collide(this.asset, this.warppad17, warpBack, null, this);
        this.game.physics.arcade.collide(this.asset, this.warppad18, warp7, null, this);
        this.game.physics.arcade.collide(this.asset, this.warppad19, warpBack, null, this);
        this.game.physics.arcade.collide(this.asset, this.warppad20, warpBack, null, this);
        this.game.physics.arcade.collide(this.asset, this.warppad21, warpBack, null, this);
        this.game.physics.arcade.collide(this.asset, this.warppad22, warpBack, null, this);
        this.game.physics.arcade.collide(this.asset, this.warppad23, warpBack, null, this);
        this.game.physics.arcade.collide(this.asset, this.warppad24, warpBack, null, this);
        this.game.physics.arcade.collide(this.asset, this.warppad25, warpBack, null, this);
        this.game.physics.arcade.collide(this.asset, this.warppad26, warpBack, null, this);
        this.game.physics.arcade.collide(this.asset, this.warppad27, warpBack, null, this);
        this.game.physics.arcade.collide(this.asset, this.warppad28, warpBack, null, this);
        this.game.physics.arcade.collide(this.asset, this.bosspad, warpBoss, null, this);
        this.game.physics.arcade.overlap(this.asset, this.heart, heal, null, this);

        this.asset.body.velocity.set(0);
        if (playerdied == false) {
            if (this.cursors.left.isDown || aKey.isDown) {
                this.asset.body.velocity.x = -200;
                this.asset.play('left');
            }
            else if (this.cursors.right.isDown || dKey.isDown) {
                this.asset.body.velocity.x = 200;
                this.asset.play('right');
            }
            else if (this.cursors.up.isDown || wKey.isDown) {
                this.asset.body.velocity.y = -200;
                this.asset.play('up');
            }
            else if (this.cursors.down.isDown || sKey.isDown) {
                this.asset.body.velocity.y = 200;
                this.asset.play('down');
            }
            else {
                this.asset.animations.stop();
            }
        }
        if (attackKey.isDown || spacebar.isDown) {
            if(animplaying == false) {
                if (this.asset.frame == 6 || this.asset.frame == 7 || this.asset.frame == 8) {
                    this.sword.revive();
                    this.sword.animations.play('swing', 13, false);
                    animplaying = true;
                }
                if (this.asset.frame == 3 || this.asset.frame == 4 || this.asset.frame == 5) {
                    this.sword2.revive();
                    this.sword2.animations.play('swingtwo', 13, false);
                    animplaying = true;
                }
                if (this.asset.frame == 9 || this.asset.frame == 10 || this.asset.frame == 11) {
                    this.sword3.revive();
                    this.sword3.animations.play('swingthree', 13, false);
                    animplaying = true;
                }
                if (this.asset.frame == 0 || this.asset.frame == 1 || this.asset.frame == 2) {
                    this.sword4.revive();
                    this.sword4.animations.play('swingfour', 13, false);
                    animplaying = true;
                }
            }
        }

        this.sword.animations.currentAnim.onComplete.add(function () {
            this.sword.visible = false;
            alreadyhit1 = 0;
            alreadyhit2 = 0;
            animplaying = false;
        }, this);
        this.sword2.animations.currentAnim.onComplete.add(function () {
            this.sword2.visible = false;
            alreadyhit1 = 0;
            alreadyhit2 = 0;
            animplaying = false;
        }, this);
        this.sword3.animations.currentAnim.onComplete.add(function () {
            this.sword3.visible = false;
            alreadyhit1 = 0;
            alreadyhit2 = 0;
            animplaying = false;
        }, this);
        this.sword4.animations.currentAnim.onComplete.add(function () {
            this.sword4.visible = false;
            alreadyhit1 = 0;
            alreadyhit2 = 0;
            animplaying = false;
        }, this);

        //keep the sword by the main character
        this.sword.x = this.asset.x;
        this.sword.y = this.asset.y;
        this.sword2.x = this.asset.x - 20;
        this.sword2.y = this.asset.y;
        this.sword3.x = this.asset.x - 5;
        this.sword3.y = this.asset.y - 30;
        this.sword4.x = this.asset.x - 10;
        this.sword4.y = this.asset.y + 10;

        console.log(herohealth);

        //collision detection for hitting the enemies
        if (this.sword.animations.currentAnim.isPlaying == true && alreadyhit1 == 0) {
            this.game.physics.arcade.overlap(this.sword, this.snekkek, snekkekattacked1, null, this);
        }
        if (this.sword2.animations.currentAnim.isPlaying == true && alreadyhit1 == 0) {
            this.game.physics.arcade.overlap(this.sword2, this.snekkek, snekkekattacked2, null, this);
        }
        if (this.sword3.animations.currentAnim.isPlaying == true && alreadyhit1 == 0) {
            this.game.physics.arcade.overlap(this.sword2, this.snekkek, snekkekattacked3, null, this);
        }
        if (this.sword4.animations.currentAnim.isPlaying == true && alreadyhit1 == 0) {
            this.game.physics.arcade.overlap(this.sword2, this.snekkek, snekkekattacked4, null, this);
        }

        //check for enemy kill
        if (snekkekKilled == false) {
            if (this.asset.x <= this.snekkek.x) {
                this.snekkek.body.velocity.x = -100;
                this.snekkek.animations.play('down');
            }
            if (this.asset.x >= this.snekkek.x) {
                this.snekkek.body.velocity.x = 100;
                this.snekkek.animations.play('down');
            }
            if (this.asset.y <= this.snekkek.y) {
                this.snekkek.body.velocity.y = -100;
                this.snekkek.frame = 16;
            }
            if (this.asset.y >= this.snekkek.y) {
                this.snekkek.body.velocity.y = 100;
                this.snekkek.animations.play('down');
            }
        }

        if (herohealth == 6) {
            this.heart3.frame = 0;
            this.heart2.frame = 0;
            this.heart1.frame = 0;
        }
        if (herohealth == 5) {
            this.heart3.frame = 1;
            this.heart2.frame = 0;
            this.heart1.frame = 0;
        }
        if (herohealth == 4) {
            this.heart3.frame = 2;
            this.heart2.frame = 0;
            this.heart1.frame = 0;
        }
        if (herohealth == 3) {
            this.heart3.frame = 2;
            this.heart2.frame = 1;
            this.heart1.frame = 0;
        }
        if (herohealth == 2) {
            this.heart3.frame = 2;
            this.heart2.frame = 2;
            this.heart1.frame = 0;
        }
        if (herohealth == 1) {
            this.heart3.frame = 2;
            this.heart2.frame = 2;
            this.heart1.frame = 1;
        }
        if (herohealth == 0) {
            playerdied = true;
            this.heart3.frame = 2;
            this.heart2.frame = 2;
            this.heart1.frame = 2;
            this.snekkek.kill();
            this.heart1.kill();
            this.heart2.kill();
            this.heart3.kill();
            this.coin.kill();
            this.text.kill();
            this.pause.kill();
            this.music.pause();
            this.time.events.add(1000, () => {
                this.asset.animations.play('died');
            });
            this.time.events.add(3000, () => {
                this.asset.kill();
            });
            this.time.events.add(3500, () => {
                this.add.tween(this.camera).to( {alpha: 1}, 2000, Phaser.Easing.Linear.None, true, 0, 1000, false);
            });
            this.time.events.add(3800, () => {
                this.state.start('Menu');
                this.snekkek.revive();
                this.heart1.revive();
                this.heart2.revive();
                this.heart3.revive();
                this.coin.revive();
                this.text.revive();
                this.pause.revive();
                herohealth = 6;
                playerdied = false;
            });
        }

        this.world.scale.set(worldScale);

        if (snekkekhealth == 0) {
            this.physics.arcade.collide(this.sword, this.snekkek, snekkekKill, null, this);
            this.physics.arcade.collide(this.sword2, this.snekkek, snekkekKill, null, this);
            this.physics.arcade.collide(this.sword3, this.snekkek, snekkekKill, null, this);
            this.physics.arcade.collide(this.sword4, this.snekkek, snekkekKill, null, this);
        }
    },
    //render: function () {
        //this.game.debug.body(this.sword);
        //this.sword.debug.body = true;
        //this.game.debug.body(this.sword2);
        //this.sword2.debug.body = true;
        //this.game.debug.body(this.sword3);
        //this.sword3.debug.body = true;
        //this.game.debug.body(this.sword4);
        //this.sword4.debug.body = true;
        //this.game.debug.body(this.snekkek);
        //this.snekkek.debug.body = true;
    //}

    onLoadComplete: function () {
        this.ready = true;
    }
};

function snekkekattacked1 (){
    this.snekkek.x += 32;
    snekkekhealth = snekkekhealth - 1;
    alreadyhit1 = 1;
}

function snekkekattacked2 (){
    this.snekkek.x -= 32;
    snekkekhealth = snekkekhealth - 1;
    alreadyhit1 = 1;
}
function snekkekattacked3 (){
    this.snekkek.y -= 32;
    snekkekhealth = snekkekhealth - 1;
    alreadyhit1 = 1;
}
function snekkekattacked4 (){
    this.snekkek.y += 32;
    snekkekhealth = snekkekhealth - 1;
    alreadyhit1 = 1;
}

function snekkekKill () {
    coins += 10;
    this.text.setText(coins);
    var spawnchance = Math.ceil(Math.random() * 2);
    if (spawnchance == 1) {
        this.heart = this.add.sprite(this.snekkek.x, this.snekkek.y, 'heart');
        this.physics.enable(this.heart, Phaser.Physics.ARCADE);
        this.world.swap(this.asset, this.heart);
    }
    this.snekkek.kill();
}

function heroattacked () {
    herohealth--;
    if (this.asset.x < this.snekkek.x) {
        this.asset.x -= 32;
    }
    if (this.asset.x > this.snekkek.x) {
        this.asset.x += 32;
    }
    if (this.asset.y < this.snekkek.y) {
        this.asset.y -= 32;
    }
    if (this.asset.y > this.snekkek.y) {
        this.asset.y += 32;
    }

}

function heal () {
    if (herohealth == 3) {
        herohealth += 2;
        herohealth --;
    }
    if (herohealth < 5) {
        herohealth += 2;
        this.heart.kill();
    }
    if (herohealth == 5) {
        herohealth++;
        this.heart.kill();
    }
    else {
        this.heart.kill();
    }
}

function stairs () {
    this.asset.x = 1120;
    this.asset.y = 2912;
    this.room1.visible = false;
    this.room2.visible = true;
    this.warppad.revive();
    this.warppad1.revive();
    this.warppad2.revive();
    this.snekkek.kill();
    this.entrancedecor.kill();
    this.stairs.kill();
}

function warp1 () {
    this.asset.x = 3136;
    this.asset.y = 2944;
    this.room2.visible = false;
    this.rightroom1.visible = true;
    this.warppad3.revive();
    this.warppad4.revive();
    this.warppad5.revive();
}

function warp2 () {
    this.asset.x = 2944;
    this.asset.y = 2336;
    this.rightroom1.visible = false;
    this.rightroom2.visible = true;
    this.warppad3.kill();
    this.warppad4.kill();
    this.warppad5.kill();
    this.warppad6.revive();
    this.warppad7.revive();
    this.warppad8.revive();
}

function warp3 () {
    this.asset.x = 2944;
    this.asset.y = 2272;
    this.rightroom2.visible = false;
    this.rightroom3.visible = true;
    this.warppad6.kill();
    this.warppad7.kill();
    this.warppad8.kill();
    this.warppad9.revive();
    this.warppad10.revive();
    this.warppad11.revive();
}

function warp4 () {
    this.asset.x = 2752;
    this.asset.y = 1664;
    this.rightroom3.visible = false;
    this.rightroom4.visible = true;
    this.warppad9.kill();
    this.warppad10.kill();
    this.warppad11.kill();
    this.warppad12.revive();
    this.warppad13.revive();
    this.warppad14.revive();
}

function warp5 () {
    this.asset.x = 2944;
    this.asset.y = 960;
    this.rightroom4.visible = false;
    this.rightroom5.visible = true;
    this.warppad12.kill();
    this.warppad13.kill();
    this.warppad14.kill();
    this.warppad15.revive();
    this.warppad16.revive();
    this.warppad17.revive();
}

function warp6 () {
    this.asset.x = 2944;
    this.asset.y = 896;
    this.rightroom5.visible = false;
    this.rightroom6.visible = true;
    this.warppad15.kill();
    this.warppad16.kill();
    this.warppad17.kill();
    this.warppad18.revive();
    this.warppad19.revive();
    this.warppad20.revive();
}

function warp7 () {
    this.asset.x = 2944;
    this.asset.y = 224;
    this.rightroom6.visible = false;
    this.rightroom7.visible = true;
    this.warppad18.kill();
    this.warppad19.kill();
    this.warppad20.kill();
    this.warppad21.revive();
    this.warppad22.revive();
    this.warppad23.revive();
    this.warppad24.revive();
    this.warppad25.revive();
    this.warppad26.revive();
    this.warppad27.revive();
    this.warppad28.revive();
}
function warp8 () {
    this.asset.x = 1568;
    this.asset.y = 2912;
    this.room1.visible = true;
    this.stairs.revive();
}

function warpBack () {
    this.asset.x = 1568;
    this.asset.y = 2624;
    this.room1.visible = true;
    this.entrancedecor.revive();
    this.stairs.revive();
    this.snekkek.revive();
    snekkekhealth = 2;
    this.room2.visible = false;
    this.rightroom1.visible = false;
    this.rightroom2.visible = false;
    this.rightroom3.visible = false;
    this.rightroom4.visible = false;
    this.rightroom5.visible = false;
    this.rightroom6.visible = false;
    this.rightroom7.visible = false;
    this.hallway.visible = true;
    this.bosspad.revive();
    this.warppad.kill();
    this.warppad1.kill();
    this.warppad2.kill();
    this.warppad3.kill();
    this.warppad4.kill();
    this.warppad5.kill();
}

function warpBoss () {
    this.game.state.start('Boss1');
    this.music.pause();
}

function listenerPause () {
}

function listenerResume () {
}

function listenerOptions () {
}

function listenerExit () {
    this.game.state.start('Menu');
}