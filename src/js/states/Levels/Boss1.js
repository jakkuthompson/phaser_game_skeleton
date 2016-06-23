var Boss1 = function () {
    this.map = null;
    this.kingsnekkek = null;


};


module.exports = Boss1;

const LayerManager = require('../../common/tilemaps/layer_manager');


var bosshealth = 100;
var alreadyhit1 = 1;
var alreadyhit2 = 1;

var test = 0;




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

        // Adds the sword for swingin down
        this.sword4 = this.add.sprite(this.asset.x,this.asset.y,'sword4');
        this.sword4.scale.x = 0.25;
        this.sword4.scale.y = 0.25;
        // Creates the animation
        this.sword4.animations.add('swingfour');
        this.sword4.visible = false;





        this.game.physics.enable(this.sword2, Phaser.Physics.ARCADE);
        this.game.physics.enable(this.sword2, Phaser.Physics.ARCADE);

        this.cursors = this.input.keyboard.createCursorKeys();

        this.kingsnekkek = this.add.sprite(this.world.centerX, 64, 'kingsnekkek');
        this.kingsnekkek.animations.add('slither', [0, 1, 2, 3, 4], 5, true);
        this.kingsnekkek.play('slither');


        var bosstext = "Boss's Health: " + bosshealth;

        this.bosshealth = this.game.add.text(0, 0, bosstext);

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

        //sword attack
        if (attackKey.isDown || spacebar.isDown) {
            if (this.asset.frame == 6 || this.asset.frame == 7 || this.asset.frame == 8) {
                this.sword.visible = true;
                this.sword.animations.play('swing', 13, false);
            }
            if (this.asset.frame == 3 || this.asset.frame == 4 || this.asset.frame == 5) {
                this.sword2.visible = true;
                this.sword2.animations.play('swingtwo', 13, false);
            }
            if (this.asset.frame == 9 || this.asset.frame == 10 || this.asset.frame == 11) {
                this.sword3.visible = true;
                this.sword3.animations.play('swingthree', 13, false);
            }
            if (this.asset.frame == 0 || this.asset.frame == 1 || this.asset.frame == 2) {
                this.sword4.visible = true;
                this.sword4.animations.play('swingfour', 13, false);
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
        this.sword3.animations.currentAnim.onComplete.add(function () {
            this.sword3.visible = false;
            alreadyhit1 = 0;
            alreadyhit2 = 0;
        }, this);
        this.sword4.animations.currentAnim.onComplete.add(function () {
            this.sword4.visible = false;
            alreadyhit1 = 0;
            alreadyhit2 = 0;
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









    }
};

module.exports = Boss1;
