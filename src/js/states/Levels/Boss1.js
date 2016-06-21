var Boss1 = function () {
    this.map = null;
    this.kingsnekkek = null;
    this.healthbar = null;
};


module.exports = Boss1;

const LayerManager = require('../../common/tilemaps/layer_manager');
const GUI = require('../../models/player_models/healthbar');

var bosshealth = 100;
var alreadyhit1 = 0;
var alreadyhit2 = 0;
var herohealth = 6;

Boss1.prototype = {
    create: function () {
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        this.game.physics.startSystem(Phaser.Physics.P2JS);

        this.game.world.setBounds(0, 0, 1600, 1600);

        this.map = this.add.tilemap('boss-1');
        this.map.addTilesetImage('t1', 'tileset');

        this.layermanager = new LayerManager(this, this.map);
        this.layermanager.load('room');

        this.map.setCollision(1193);

        this.asset = this.add.sprite(this.world.centerX, this.world.centerY, 'zephyr');
        this.asset.scale.x = .99;
        this.asset.animations.add('left', [3, 4, 5], 20, true);
        this.asset.animations.add('right', [6, 7, 8], 20, true);
        this.asset.animations.add('down', [0, 1, 2], 20, true);
        this.asset.animations.add('up', [9, 10, 11], 20, true);
        this.asset.animations.add('warp', [9, 6, 3, 0], 4, true);
        this.physics.enable(this.asset, Phaser.Physics.ARCADE);
        this.physics.enable(this.asset, Phaser.Physics.P2JS);
        this.asset.body.immovable = true;
        this.asset.body.collideWorldBounds = true;
        this.game.camera.follow(this.asset);

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

            this.enemy1.body.moves = true;
            this.enemy2.body.moves = true;

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
                    this.options.destroy();
                    this.pause.revive();
                    this.pauseMenu.animations.play('spiralout');
                    this.time.events.add(1000, () => {
                        this.pauseMenu.destroy();
                        this.music.resume();
                        this.asset.body.moves = true;
                        this.enemy1.body.moves = true;
                        this.enemy2.body.moves = true;
                    });
                });
            }, this);
        });

        this.sword = this.add.sprite(this.asset.x,this.asset.y, 'sword');
        this.sword.scale.x = 0.25;
        this.sword.scale.y = 0.25;
        this.sword.animations.add('swing');
        this.sword.visible = false;
        this.game.physics.enable(this.sword, Phaser.Physics.ARCADE);
        //sword two sprite
        this.sword2 = this.add.sprite(this.asset.x,this.asset.y,'sword2');
        this.sword2.scale.x = 0.25;
        this.sword2.scale.y = 0.25;
        this.sword2.animations.add('swingtwo');
        this.sword2.visible = false;
        this.game.physics.enable(this.sword2, Phaser.Physics.ARCADE);
        this.game.physics.enable(this.sword2, Phaser.Physics.ARCADE);

        this.cursors = this.input.keyboard.createCursorKeys();

        this.kingsnekkek = this.add.sprite(this.world.centerX, 64, 'kingsnekkek');
        this.kingsnekkek.animations.add('slither', [0, 1, 2, 3, 4], 5, true);
        this.kingsnekkek.play('slither');

        this.healthbar = this.add.bitmapData(400, 20);
        this.healthbar.fixedToCamera = true;

        this.game.add.sprite(this.game.world.centerX - (this.healthbar.width * 0.5), this.game.world.centerY, this.healthbar);

        this.barProgress = bosshealth * 4;

        this.game.add.tween(this).to({barProgress: 0}, 2000, null, true, 0, Infinity);

        this.healthbar.fixedToCamera = true;
    },

    update: function () {
        var attackKey = this.game.input.keyboard.addKey(Phaser.Keyboard.Z);
        var wKey = this.game.input.keyboard.addKey(Phaser.Keyboard.W);
        var sKey = this.game.input.keyboard.addKey(Phaser.Keyboard.S);
        var aKey = this.game.input.keyboard.addKey(Phaser.Keyboard.A);
        var dKey = this.game.input.keyboard.addKey(Phaser.Keyboard.D);
        var spacebar = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

        this.physics.arcade.collide(this.asset, this.layermanager.active);

        this.asset.body.velocity.set(0);

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

        if (herohealth == 5) {
            this.heart3.frame = 1;
        }
        if (herohealth == 4) {
            this.heart3.frame = 2;
        }
        if (herohealth == 3) {
            this.heart2.frame = 1;
        }
        if (herohealth == 2) {
            this.heart2.frame = 2;
        }
        if (herohealth == 1) {
            this.heart1.frame = 1;
        }
        if (herohealth == 0) {
            this.heart1.frame = 2;
        }

        if (attackKey.isDown || spacebar.isDown) {
            if (this.asset.frame == 6 || this.asset.frame == 7 || this.asset.frame == 8) {
                this.sword.revive();
                this.sword.animations.play('swing', 13, false);
            }
            if (this.asset.frame == 3 || this.asset.frame == 4 || this.asset.frame == 5) {
                this.sword2.revive();
                this.sword2.animations.play('swingtwo', 13, false);
            }
        }
        this.sword.animations.currentAnim.onComplete.add(function () {
            this.sword.visible = false;
            alreadyhit1 = 0;
            alreadyhit2 = 0;
        }, this);
        this.sword2.animations.currentAnim.onComplete.add(function () {
            this.sword2.visible = false;
            alreadyhit1 = 0;
            alreadyhit2 = 0;
        }, this);

        this.sword.x = this.asset.x;
        this.sword.y = this.asset.y;
        this.sword2.x = this.asset.x - 20;
        this.sword2.y = this.asset.y;



        if (this.barProgress < 32) {
            this.healthbar.tint = '#f00';
        }
        else if (this.barProgress < 64) {
            this.healthbar.tint = '#ff0';
        }
        else {
            this.healthbar.tint = '#0f0';
        }

        // draw the bar
        this.healthbar.context.fillRect(0 , 0, this.barProgress, 20);



    }
};

function listenerPause () {
}

function listenerResume () {
}

function listenerOptions () {
}

function listenerExit () {
    this.game.state.start('Menu');
}

module.exports = Boss1;
