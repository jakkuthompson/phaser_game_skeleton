var Boss1 = function () {
    this.map = null;
    this.kingsnekkek = null;
};


module.exports = Boss1;

const LayerManager = require('../../common/tilemaps/layer_manager');


var bosshealth = 100;
this.healthbar;

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
        }



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

module.exports = Boss1;
