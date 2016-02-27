var Player = function () {
    this.cursors = null;
};

Player.prototype = {
    create: function() {
        this.asset = this.add.sprite(this.world.centerX,this.world.centerY, 'maincharacter');
        this.asset.scale.x = .99;
        this.asset.animations.add('left', [3, 4, 5], 20, true);
        this.asset.animations.add('right', [6, 7, 8], 20, true);
        this.asset.animations.add('down', [0, 1, 2], 20, true);
        this.asset.animations.add('up', [9, 10, 11], 20, true);
        this.physics.enable(this.asset, Phaser.Physics.ARCADE);
        this.physics.enable(this.asset, Phaser.Physics.P2JS);
        this.asset.body.immovable = true;
        this.asset.body.collideWorldBounds = true;

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
    },

    update: function() {
        var attackKey = this.game.input.keyboard.addKey(Phaser.Keyboard.Z);



        this.physics.arcade.collide(this.asset, this.layer);
        this.physics.arcade.collide(this.enemy1, this.enemy2);
        this.physics.arcade.collide(this.enemy2, this.enemy1);

        //main character movement
        this.asset.body.velocity.set(0);

        if (this.cursors.left.isDown) {
            this.asset.body.velocity.x = -200;
            this.asset.play('left');
        }
        else if (this.cursors.right.isDown) {
            this.asset.body.velocity.x = 200;
            this.asset.play('right');
        }
        else if (this.cursors.up.isDown) {
            this.asset.body.velocity.y = -200;
            this.asset.play('up');
        }
        else if (this.cursors.down.isDown) {
            this.asset.body.velocity.y = 200;
            this.asset.play('down');
        }
        else {
            this.asset.animations.stop();
        }

        //sword attack
        if(attackKey.isDown){
            if(this.asset.frame == 8){
                this.sword.visible = true;
                this.sword.animations.play('swing', 13, false);
            }
            if(this.asset.frame == 4){
                this.sword2.visible = true;
                this.sword2.animations.play('swingtwo', 13, false);


            }

        }
//change

        this.sword.animations.currentAnim.onComplete.add(function () {	this.sword.visible = false; }, this);
        this.sword2.animations.currentAnim.onComplete.add(function () {	this.sword2.visible = false;}, this);


        //keep the sword by the main character
        this.sword.x = this.asset.x;
        this.sword.y = this.asset.y;
        this.sword2.x = this.asset.x - 20;
        this.sword2.y = this.asset.y;

        if(this.sword.animations.currentAnim.isPlaying == true) {
            this.game.physics.arcade.overlap(this.sword, this.enemy1, enemy1attacked, null, this);
        }
        if(this.sword2.animations.currentAnim.isPlaying == true) {
            this.game.physics.arcade.overlap(this.sword2, this.enemy1, enemy1attacked, null, this);
        }

        if(this.sword.animations.currentAnim.isPlaying == true) {
            this.game.physics.arcade.overlap(this.sword, this.enemy2, enemy2attacked, null, this);
        }
        if(this.sword2.animations.currentAnim.isPlaying == true) {
            this.game.physics.arcade.overlap(this.sword2, this.enemy2, enemy2attacked, null, this);
        }
    }

};

Player.prototype = Object.create(Phaser.Sprite.prototype);
Player.prototype.constructor = Player;

module.exports = Player;

var Player = require("../models/player");