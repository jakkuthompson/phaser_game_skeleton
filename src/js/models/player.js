var Player = function () {
};

var zephyr;

Player.prototype = {
    create: function() {
        zephyr = this.add.sprite(this.world.centerX,this.world.centerY, 'maincharacter');
        zephyr.scale.x = .99;
        zephyr.animations.add('left', [3, 4, 5], 20, true);
        zephyr.animations.add('right', [6, 7, 8], 20, true);
        zephyr.animations.add('down', [0, 1, 2], 20, true);
        zephyr.animations.add('up', [9, 10, 11], 20, true);
        this.physics.enable(zephyr, Phaser.Physics.ARCADE);
        this.physics.enable(zephyr, Phaser.Physics.P2JS);
        zephyr.body.immovable = true;
        zephyr.body.collideWorldBounds = true;

        this.sword = this.add.sprite(zephyr.x,zephyr.y, 'sword');
        this.sword.scale.x = 0.25;
        this.sword.scale.y = 0.25;
        this.sword.animations.add('swing');
        this.sword.visible = false;
        this.game.physics.enable(this.sword, Phaser.Physics.ARCADE);
        //sword two sprite
        this.sword2 = this.add.sprite(zephyr.x,zephyr.y,'sword2');
        this.sword2.scale.x = 0.25;
        this.sword2.scale.y = 0.25;
        this.sword2.animations.add('swingtwo');
        this.sword2.visible = false;
        this.game.physics.enable(this.sword2, Phaser.Physics.ARCADE);
    },

    update: function() {
        var attackKey = this.game.input.keyboard.addKey(Phaser.Keyboard.Z);



        this.physics.arcade.collide(zephyr, this.layer);
        this.physics.arcade.collide(this.enemy1, this.enemy2);
        this.physics.arcade.collide(this.enemy2, this.enemy1);

        //main character movement
        zephyr.body.velocity.set(0);

        if (this.cursors.left.isDown) {
            zephyr.body.velocity.x = -200;
            zephyr.play('left');
        }
        else if (this.cursors.right.isDown) {
            zephyr.body.velocity.x = 200;
            zephyr.play('right');
        }
        else if (this.cursors.up.isDown) {
            zephyr.body.velocity.y = -200;
            zephyr.play('up');
        }
        else if (this.cursors.down.isDown) {
            zephyr.body.velocity.y = 200;
            zephyr.play('down');
        }
        else {
            zephyr.animations.stop();
        }

        //sword attack
        if(attackKey.isDown){
            if(zephyr.frame == 8){
                this.sword.visible = true;
                this.sword.animations.play('swing', 13, false);
            }
            if(zephyr.frame == 4){
                this.sword2.visible = true;
                this.sword2.animations.play('swingtwo', 13, false);


            }

        }
//change

        this.sword.animations.currentAnim.onComplete.add(function () {	this.sword.visible = false; }, this);
        this.sword2.animations.currentAnim.onComplete.add(function () {	this.sword2.visible = false;}, this);


        //keep the sword by the main character
        this.sword.x = zephyr.x;
        this.sword.y = zephyr.y;
        this.sword2.x = zephyr.x - 20;
        this.sword2.y = zephyr.y;

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
