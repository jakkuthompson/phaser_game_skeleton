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
var knockedTo;

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
        this.room2 = this.add.sprite(0, 0, 'dungeon2');
        this.room2.visible = false;
        this.room3 = this.add.sprite(0, 0, 'dungeon3');
        this.room3.visible = false;
        this.hallway = this.add.sprite(0, 0, 'hallway');
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

        this.entrancedecor = this.add.tileSprite(0, 0, 3200, 3200, 'entrancedecor');
        this.warppad = this.add.sprite(864, 2688, 'warptile');
        this.physics.enable(this.warppad, Phaser.Physics.ARCADE);
        this.warppad.animations.add('flash', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 7, true);
        this.warppad.play('flash');
        this.warppad.visible = false;
        this.warppad1 = this.add.sprite(576, 2912, 'warptile');
        this.physics.enable(this.warppad1, Phaser.Physics.ARCADE);
        this.warppad1.animations.add('flash', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 7, true);
        this.warppad1.play('flash');
        this.warppad1.visible = false;
        this.warppad2 = this.add.sprite(864, 3136, 'warptile');
        this.physics.enable(this.warppad2, Phaser.Physics.ARCADE);
        this.warppad2.animations.add('flash', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 7, true);
        this.warppad2.play('flash');
        this.warppad2.visible = false;
        this.warppad3 = this.add.sprite(2944, 2784, 'warptile');
        this.physics.enable(this.warppad3, Phaser.Physics.ARCADE);
        this.warppad3.visible = false;
        this.warppad3.animations.add('flash', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 7, true);
        this.warppad3.play('flash');
        this.warppad4 = this.add.sprite(2752, 2944, 'warptile');
        this.physics.enable(this.warppad4, Phaser.Physics.ARCADE);
        this.warppad4.visible = false;
        this.warppad4.animations.add('flash', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 7, true);
        this.warppad4.play('flash');
        this.warppad5 = this.add.sprite(2944, 3136, 'warptile');
        this.physics.enable(this.warppad5, Phaser.Physics.ARCADE);
        this.warppad5.visible = false;
        this.warppad5.animations.add('flash', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 7, true);
        this.warppad5.play('flash');

        this.map.setTileIndexCallback(850, () => {
            this.asset.x = 1120;
            this.asset.y = 2912;
            this.room1.visible = false;
            this.room2.visible = true;
            this.warppad.visible = true;
            this.warppad1.visible = true;
            this.warppad2.visible = true;
            this.snekkek.kill();
            this.entrancedecor.visible = false;
        }, this.asset);

        this.map.setTileIndexCallback(1002, () => {
            this.asset.x = 1248;
            this.asset.y = 2912;
            this.room1.visible = true;
            this.entrancedecor.visible = true;
            this.snekkek.revive();
            snekkekhealth = 2;
            this.room2.visible = false;
            this.warppad.visible = false;
            this.warppad1.visible = false;
            this.warppad2.visible = false;
        }, this.asset);

        this.map.setTileIndexCallback(3009, () => {
            this.asset.x = 3136;
            this.asset.y = 2944;
            this.room2.visible = false;
            this.rightroom1.visible = true;
            this.warppad3.visible = true;
            this.warppad4.visible = true;
            this.warppad5.visible = true;
        }, this.asset);

        this.map.setTileIndexCallback(3012, () => {
        }, this.asset);

        this.map.setTileIndexCallback(961, () => {
            this.game.state.start('Game');
            this.music.pause();
        }, this.asset);

        this.collisionmanager = new CollisionManager(this, this.map);
        this.collisionmanager.bindCollisionToLayer(1193);

        this.asset = this.add.sprite(1568, 3136, 'zephyr');
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
        this.game.world.setBounds(0, 0, 3200, 3200);
        this.game.camera.follow(this.asset);

        this.snekkekGroup = this.game.add.group();
        this.snekkek = this.add.sprite(1568, 2816, 'snekkek');
        this.snekkekGroup.add(this.snekkek);
        this.physics.enable(this.snekkek, Phaser.Physics.ARCADE);
        this.snekkek.body.enable = true;

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
        this.game.physics.arcade.collide(this.asset, this.snekkek, heroattacked, null, this);
        this.game.physics.arcade.collide(this.layer, this.snekkek);
        this.game.physics.arcade.overlap(this.asset, this.warppad1, warpBack, null, this);
        this.game.physics.arcade.collide(this.asset, this.warppad2, warpBack, null, this);
        this.game.physics.arcade.collide(this.asset, this.warppad4, warpBack, null, this);
        this.game.physics.arcade.collide(this.asset, this.warppad5, warpBack, null, this);
        this.game.physics.arcade.overlap(this.asset, this.heart, heal, null, this);

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

        if (attackKey.isDown || spacebar.isDown) {
            if (this.asset.frame == 6 || this.asset.frame == 7 || this.asset.frame == 8) {
                this.sword.visible = true;
                this.sword.animations.play('swing', 13, false);
            }
            if (this.asset.frame == 3 || this.asset.frame == 4 || this.asset.frame == 5) {
                this.sword2.visible = true;
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

        //keep the sword by the main character
        this.sword.x = this.asset.x;
        this.sword.y = this.asset.y;
        this.sword2.x = this.asset.x - 20;
        this.sword2.y = this.asset.y;

        console.log(herohealth);

        //collision detection for hitting the enemies
        if (this.sword.animations.currentAnim.isPlaying == true && alreadyhit1 == 0) {
            this.game.physics.arcade.overlap(this.sword, this.snekkek, snekkekattacked1, null, this);
        }
        if (this.sword2.animations.currentAnim.isPlaying == true && alreadyhit1 == 0) {
            this.game.physics.arcade.overlap(this.sword2, this.snekkek, snekkekattacked2, null, this);
        }

        //check for enemy kill
        if (snekkekKilled == false) {
            if (this.asset.x < this.snekkek.x) {
                this.snekkek.body.velocity.x = -100;
            }
            if (this.asset.x > this.snekkek.x) {
                this.snekkek.body.velocity.x = 100;
            }
            if (this.asset.y < this.snekkek.y) {
                this.snekkek.body.velocity.y = -100;
            }
            if (this.asset.y > this.snekkek.y) {
                this.snekkek.body.velocity.y = 100;
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
            this.heart3.frame = 2;
            this.heart2.frame = 2;
            this.heart1.frame = 2;
            this.asset.kill();
        }

        if (snekkekhealth == 0) {
            this.physics.arcade.collide(this.sword, this.snekkek, snekkekKill, null, this);
            this.physics.arcade.collide(this.sword2, this.snekkek, snekkekKill, null, this);
        }
    }
//please push
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


function warp1 () {

}

function warp2 () {

}

function warp3 () {

}

function warp4 () {

}

function warp5 () {

}

function warp6 () {

}

function warp7 () {

}

function warp8 () {

}

function warpBack () {
    this.asset.x = 1568;
    this.asset.y = 2912;
    this.room1.visible = true;
    this.entrancedecor.visible = true;
    this.snekkek.revive();
    snekkekhealth = 2;
    this.room2.visible = false;
    this.warppad.visible = false;
    this.warppad1.visible = false;
    this.warppad2.visible = false;
    this.warppad3.visible = false;
    this.warppad4.visible = false;
    this.warppad5.visible = false;
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