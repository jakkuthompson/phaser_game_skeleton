var Level1 = function () {
    this.map = null;
    this.layer = null;
    this.music = null;
    this.snekkek = null;
    this.snekkekGroup = null;
    this.enemies = null;
};

module.exports = Level1;

const Snekkek = require('../../models/Enemies/snekkek');
const LayerManager = require('../../common/tilemaps/layer_manager');
const CollisionManager = require('../../common/collisions/collision_manager');

var walkmore = true;
var alreadyhit1 = 0;
var snekkek1health = 2;
var herohealth = 6;
var coins = 0;
var snekkek2health = 2;
var alreadyhit2 = 0;

Level1.prototype = {
    create: function () {
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        this.game.physics.startSystem(Phaser.Physics.P2JS);

        this.music = this.add.audio('dungeon1theme');
        this.music.play();
        this.music.volume = .7;

        this.map = this.add.tilemap('dungeon1-1');
        this.map.addTilesetImage('t1', 'tileset');

        this.layermanager = new LayerManager(this, this.map);
        this.layermanager.bindTileToLayer(1003, "left-1", () => {
            this.asset.x = 1120;
            this.asset.y = 2912;
            this.world.bringToTop(this.asset);
        });
        
        this.layermanager.load('entrance');

        this.layermanager.bindTileToLayer(1002, "entrance", () => {
            this.asset.x = 1248;
            this.asset.y = 1632;
            this.world.bringToTop(this.asset);
        });

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
        this.physics.enable(this.asset, Phaser.Physics.ARCADE);
        this.asset.body.immovable = true;
        this.asset.body.collideWorldBounds = true;
        this.game.world.setBounds(0, 0, 3200, 3200);
        this.game.camera.follow(this.asset);

        this.snekkekGroup = this.game.add.group();
        this.snekkek = new Snekkek(this.game, this.world.centerX, this.world.centerY);
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

        this.heart1 = this.add.button(0, 0, 'heart', listenerHearts, this, 1, 0, 2);
        this.heart1.fixedToCamera = true;
        this.heart1.inputEnabled = true;

        this.heart2 = this.add.button(32, 0, 'heart', listenerHearts, this, 1, 0, 2);
        this.heart2.fixedToCamera = true;
        this.heart2.inputEnabled = true;

        this.heart3 = this.add.button(64, 0, 'heart', listenerHearts, this, 1, 0, 2);
        this.heart3.fixedToCamera = true;
        this.heart3.inputEnabled = true;

        this.coin = this.add.sprite('coin', 86, 0);

        this.pause = this.add.button(775, 0, 'pause', listenerPause, this, 1, 0, 2);
        this.pause.fixedToCamera = true;
        this.pause.scale.x = .1;
        this.pause.scale.y = .1;
        this.pause.inputEnabled = true;
        this.pause.events.onInputDown.add(() => {
            this.game.paused = true;
            this.music.pause();
        });

        this.game.input.onDown.add(() => {
            if(this.game.paused) {
                this.game.paused = false;
                this.music.resume();
            }
            else {
            }
        }, self);

    },

    update: function () {
        var attackKey = this.game.input.keyboard.addKey(Phaser.Keyboard.Z);
        var wKey = this.game.input.keyboard.addKey(Phaser.Keyboard.W);
        var sKey = this.game.input.keyboard.addKey(Phaser.Keyboard.S);
        var aKey = this.game.input.keyboard.addKey(Phaser.Keyboard.A);
        var dKey = this.game.input.keyboard.addKey(Phaser.Keyboard.D);
        var spacebar = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

        // Only test collision on the active layer.
        this.physics.arcade.collide(this.asset, this.layermanager.active);
        this.physics.arcade.collide(this.asset, this.snekkek);
        this.physics.arcade.collide(this.snekkek, this.layermanager.active);

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

        if(attackKey.isDown || spacebar.isDown){
            if(this.asset.frame == 6 || this.asset.frame == 7 || this.asset.frame == 8){
                this.sword.visible = true;
                this.sword.animations.play('swing', 13, false);
            }
            if(this.asset.frame == 3 || this.asset.frame == 4 || this.asset.frame == 5){
                this.sword2.visible = true;
                this.sword2.animations.play('swingtwo', 13, false);


            }

        }

        this.sword.animations.currentAnim.onComplete.add(function () {	this.sword.visible = false; alreadyhit1 = 0;
            alreadyhit2 = 0; }, this);
        this.sword2.animations.currentAnim.onComplete.add(function () {	this.sword2.visible = false; alreadyhit1 = 0;
            alreadyhit2 = 0;}, this);

        //keep the sword by the main character
        this.sword.x = this.asset.x;
        this.sword.y = this.asset.y;
        this.sword2.x = this.asset.x - 20;
        this.sword2.y = this.asset.y;

        //collision detection for hitting the enemies
        if(this.sword.animations.currentAnim.isPlaying == true && alreadyhit1 == 0) {
            this.game.physics.arcade.overlap(this.sword, this.snekkek, snekkek1attacked, null, this);
        }
        if(this.sword2.animations.currentAnim.isPlaying == true && alreadyhit1 == 0) {
            this.game.physics.arcade.overlap(this.sword2, this.snekkek, snekkek1attacked, null, this);
        }

        this.snekkek.body.velocity.set(0);

        if(this.asset.x < this.snekkek.x){
            this.snekkek.body.velocity.x = -100;
        }
        if(this.asset.x > this.snekkek.x){
            this.snekkek.body.velocity.x = 100;
        }
        if(this.asset.y < this.snekkek.y){
            this.snekkek.body.velocity.y = -100;
        }
        if(this.asset.y > this.snekkek.y){
            this.snekkek.body.velocity.y = 100;
        }

        if(this.health == 0){
            this.visible = false;
            coins = coins + 10;

        }

        //check for enemy kill
        if(snekkek1health == 0){
            this.snekkek.visible = false;
            coins = coins + 10;

        }
    }
//please push
};

function listenerPause () {

}

function snekkek1attacked (){
    snekkek1health = snekkek1health - 1;
    alreadyhit1 = 1;
}


function listenerHearts () {
    if (herohealth = 0) {
        this.hearts.frame(2);
    }
}