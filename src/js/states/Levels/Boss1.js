var Boss1 = function () {
    this.map = null;
    this.kingsnekkek = null;
};


module.exports = Boss1;

const LayerManager = require('../../common/tilemaps/layer_manager');


var bosshealth = 100;
var alreadyhit1 = 1;
var alreadyhit2 = 1;
var coins = 0;
var herohealth = 6;
var animplaying = false;


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

        // Adds the sword for swinging to the right
        this.sword = this.add.sprite(this.asset.x,this.asset.y, 'sword');
        this.sword.scale.x = 0.25;
        this.sword.scale.y = 0.25;
        this.sword.animations.add('swing');
        this.sword.visible = false;

        // Adds the sword for swinging to the left
        this.sword2 = this.add.sprite(this.asset.x,this.asset.y,'sword2');
        this.sword2.scale.x = 0.25;
        this.sword2.scale.y = 0.25;
        this.sword2.animations.add('swingtwo');
        this.sword2.visible = false;

        // Adds the sword for swinging up
        this.sword3 = this.add.sprite(this.asset.x,this.asset.y, 'sword3');
        this.sword3.scale.x = 0.25;
        this.sword3.scale.y = 0.25;
        // Creates the animation
        this.sword3.animations.add('swingthree');
        this.sword3.visible = false;
        this.world.swap(this.asset, this.sword3);

        // Adds the sword for swingin down
        this.sword4 = this.add.sprite(this.asset.x,this.asset.y,'sword4');
        this.sword4.scale.x = 0.25;
        this.sword4.scale.y = 0.25;
        // Creates the animation
        this.sword4.animations.add('swingfour');
        this.sword4.visible = false;

        this.kingsnekkek = this.add.sprite(799, 63, 'kingsnekkek');
        this.physics.enable(this.kingsnekkek, Phaser.Physics.ARCADE);
        this.kingsnekkek.anchor.setTo(.5, .5);
        this.kingsnekkek.animations.add('slither', [0, 1, 2, 3, 4], 5, true);
        this.kingsnekkek.body.immovable = true;
        this.kingsnekkek.play('slither');

        this.game.physics.enable(this.sword, Phaser.Physics.ARCADE);
        this.game.physics.enable(this.sword2, Phaser.Physics.ARCADE);
        this.game.physics.enable(this.sword3, Phaser.Physics.ARCADE);
        this.game.physics.enable(this.sword4, Phaser.Physics.ARCADE);

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
            this.kingsnekkek.body.moves = false;

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
                        this.asset.body.moves = true;
                        this.snekkek.body.moves = true;
                    });
                });
            }, this);
        });

        this.bosshealth = this.game.add.text(325, 0, "Boss Health");

        this.bosshealth.fixedToCamera = true;
    },

    update: function () {
        var attackKey = this.game.input.keyboard.addKey(Phaser.Keyboard.Z);
        var wKey = this.game.input.keyboard.addKey(Phaser.Keyboard.W);
        var sKey = this.game.input.keyboard.addKey(Phaser.Keyboard.S);
        var aKey = this.game.input.keyboard.addKey(Phaser.Keyboard.A);
        var dKey = this.game.input.keyboard.addKey(Phaser.Keyboard.D);
        var spacebar = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

        this.physics.arcade.collide(this.asset, this.layermanager.active);
        this.physics.arcade.collide(this.asset, this.kingsnekkek, heroattacked, null, this);
        this.physics.arcade.collide(this.sword, this.snekhead);
        this.physics.arcade.collide(this.sword2, this.snekhead);
        this.physics.arcade.collide(this.sword3, this.snekhead);
        this.physics.arcade.collide(this.sword4, this.snekhead);
        this.physics.arcade.collide(this.layermanager, this.kingsnekkek);

        this.asset.body.velocity.set(0);

        if (this.cursors.left.isDown || aKey.isDown) {
            this.asset.body.velocity.x = -200;
            this.sword2.body.velocity.x = -200;
            this.asset.play('left');
        }
        else if (this.cursors.right.isDown || dKey.isDown) {
            this.asset.body.velocity.x = 200;
            this.sword.body.velocity.x = 200;
            this.asset.play('right');
        }
        else if (this.cursors.up.isDown || wKey.isDown) {
            this.asset.body.velocity.y = -200;
            this.sword3.body.velocity.x = -200;
            this.asset.play('up');
        }
        else if (this.cursors.down.isDown || sKey.isDown) {
            this.asset.body.velocity.y = 200;
            this.sword4.body.velocity.x = -200;
            this.asset.play('down');
        }
        else {
            this.asset.animations.stop();
        }

        this.time.events.loop(6000, () => {
            this.snekhead = this.add.sprite(this.world.centerX, 768, 'snekhead');
            this.snekhead.scale.x = 2;
            this.snekhead.scale.y = 2;
            this.physics.enable(this.snekhead, Phaser.Physics.ARCADE);
        }, this);

        //sword attack
        if (attackKey.isDown || spacebar.isDown) {
            if(animplaying == false) {
                if (this.asset.frame == 6 || this.asset.frame == 7 || this.asset.frame == 8) {
                    this.sword.visible = true;
                    this.sword.animations.play('swing', 13, false);
                    animplaying = true;
                }
                if (this.asset.frame == 3 || this.asset.frame == 4 || this.asset.frame == 5) {
                    this.sword2.visible = true;
                    this.sword2.animations.play('swingtwo', 13, false);
                    animplaying = true;
                }
                if (this.asset.frame == 9 || this.asset.frame == 10 || this.asset.frame == 11) {
                    this.sword3.visible = true;
                    this.sword3.animations.play('swingthree', 13, false);
                    animplaying = true;
                }
                if (this.asset.frame == 0 || this.asset.frame == 1 || this.asset.frame == 2) {
                    this.sword4.visible = true;
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
            this.heart3.frame = 2;
            this.heart2.frame = 2;
            this.heart1.frame = 2;
            this.asset.kill();
        }

        //Boss movement
        if(this.kingsnekkek.x <= 800 && this.kingsnekkek.y <= 64) {
            this.physics.arcade.moveToXY(this.kingsnekkek, 384, 544, 100);
        }
        if (this.kingsnekkek.x <= 384 && this.kingsnekkek.y >= 544) {
            this.physics.arcade.moveToXY(this.kingsnekkek, 1216, 544, 100);
            this.kingsnekkek.scale.x = -1;
        }
        if (this.kingsnekkek.x >= 1216 && this.kingsnekkek.y >= 544) {
            this.physics.arcade.moveToXY(this.kingsnekkek, 800, 64, 100);
            this.kingsnekkek.scale.x = 1;
        }

        this.healthbar = this.game.add.sprite(200,-375,'healthbar');

        this.healthbar.scale.x = 4;
        this.healthbar.scale.y = 16;

        this.healthbar.smoothed = false;

        this.healthbar.fixedToCamera = true;

        this.healthbar.frame = Math.abs(bosshealth - 100);

        if(bosshealth >= 50){
            this.healthbar.tint = 0x00ff00;
        }
        else if(bosshealth >= 25 && bosshealth < 50){
            this.healthbar.tint = 0xffff00;
        }
        else{
            this.healthbar.tint = 0xff0000;
        }
    },

    render: function () {
        this.game.debug.body(this.kingsnekkek);
        this.kingsnekkek.debug.body = true;
        this.game.debug.body(this.sword);
        this.sword.debug.body = true;
        this.game.debug.body(this.sword2);
        this.sword2.debug.body = true;
        this.game.debug.body(this.sword3);
        this.sword3.debug.body = true;
        this.game.debug.body(this.sword4);
        this.sword4.debug.body = true;
    }
};

function heroattacked () {
}

function listenerPause () {

}

function listenerResume () {

}

function kingsnekkekAttacked () {

}

function snekheadMove () {
    if (this.sword.x < this.snekhead.x) {

    }
}
