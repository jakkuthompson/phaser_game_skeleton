var Level1 = function () {
    this.map = null;
    this.layer = null;
    this.music = null;
    this.snekek = null;
    this.enemies = null;
};

module.exports = Level1;

var snekkek1x = 200;
var snekkek1y = 400;
var walkmore = true;
var alreadyhit1 = 0;
var snekkek1health = 2;
var coins = 0;
var snekkek2x = 400;
var snekkek2y = 200;
var snekkek2health = 2;
var alreadyhit2 = 0;




Level1.prototype = {
    create: function () {
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        this.game.physics.startSystem(Phaser.Physics.P2JS);

        this.music = this.add.audio('dungeon1theme');
        this.music.play();
        this.music.volume = .7;

        this.map = this.add.tilemap('dungeon1');
        this.map.addTilesetImage('t1', 'tileset');

        this.layer = this.map.createLayer('t1');
        this.map.setTileIndexCallback(961, () => {
            this.game.state.start('Game');
            this.music.pause();
        }, this.asset);
        this.map.setCollision(1193); //Barrier

        this.asset = this.add.sprite(384, 544, 'maincharacter');
        this.asset.scale.x = .99;
        this.asset.animations.add('left', [3, 4, 5], 20, true);
        this.asset.animations.add('right', [6, 7, 8], 20, true);
        this.asset.animations.add('down', [0, 1, 2], 20, true);
        this.asset.animations.add('up', [9, 10, 11], 20, true);
        this.physics.enable(this.asset, Phaser.Physics.ARCADE);
        this.physics.enable(this.asset, Phaser.Physics.P2JS);
        this.asset.body.immovable = true;
        this.asset.body.collideWorldBounds = true;
        this.game.world.setBounds(0, 0, 800, 608);

        this.snekek = this.add.sprite('snekek', this.world.centerX, this.world.centerY);
        this.snekek.animations.add('snekek1');
        this.snekek.play('snekek1', 3, true);

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

        this.game.camera.follow(this.asset);

        //adding snekkek enimies

        this.snekkek1 = this.add.sprite(snekkek1x,snekkek1y, 'snekkek');
        this.game.physics.enable(this.snekkek1, Phaser.Physics.ARCADE);
        this.snekkek1.scale.x = 1.25;
        this.snekkek1.scale.y = 1.25;
        this.snekkek1.animations.add('right', [0,1,0], 15, true);

        //adding snekkek enimies

        this.snekkek2 = this.add.sprite(snekkek2x,snekkek2y, 'snekkek');
        this.game.physics.enable(this.snekkek2, Phaser.Physics.ARCADE);
        this.snekkek2.scale.x = 1.25;
        this.snekkek2.scale.y = 1.25;
        this.snekkek2.animations.add('right', [0,1,0], 15, true);




        //keypad input detectors
        this.cursors = this.input.keyboard.createCursorKeys();

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




        //snekkek1 movement


    },

    update: function () {
        var attackKey = this.game.input.keyboard.addKey(Phaser.Keyboard.Z);
        var wKey = this.game.input.keyboard.addKey(Phaser.Keyboard.W);
        var sKey = this.game.input.keyboard.addKey(Phaser.Keyboard.S);
        var aKey = this.game.input.keyboard.addKey(Phaser.Keyboard.A);
        var dKey = this.game.input.keyboard.addKey(Phaser.Keyboard.D);
        var spacebar = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);

        this.physics.arcade.collide(this.asset, this.layer);

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

        //snekkek1 movement
        if(this.asset.x < this.snekkek1.x){
            this.snekkek1.x--;
        }
        if(this.asset.x > this.snekkek1.x){
            this.snekkek1.x++;
        }
        if(this.asset.y < this.snekkek1.y){
            this.snekkek1.y--;
        }
        if(this.asset.y > this.snekkek1.y){
            this.snekkek1.y++;
        }

        //snekkek2 movement
        if(this.asset.x < this.snekkek2.x){
            this.snekkek2.x--;
        }
        if(this.asset.x > this.snekkek2.x){
            this.snekkek2.x++;
        }
        if(this.asset.y < this.snekkek2.y){
            this.snekkek2.y--;
        }
        if(this.asset.y > this.snekkek2.y){
            this.snekkek2.y++;
        }


        //collision detection for hitting the enemies
        if(this.sword.animations.currentAnim.isPlaying == true && alreadyhit1 == 0) {
            this.game.physics.arcade.overlap(this.sword, this.snekkek1, snekkek1attacked, null, this);
        }
        if(this.sword2.animations.currentAnim.isPlaying == true && alreadyhit1 == 0) {
            this.game.physics.arcade.overlap(this.sword2, this.snekkek1, snekkek1attacked, null, this);
        }
        if(this.sword.animations.currentAnim.isPlaying == true && alreadyhit1 == 0) {
            this.game.physics.arcade.overlap(this.sword, this.snekkek2, snekkek2attacked, null, this);
        }
        if(this.sword2.animations.currentAnim.isPlaying == true && alreadyhit1 == 0) {
            this.game.physics.arcade.overlap(this.sword2, this.snekkek2, snekkek2attacked, null, this);
        }

        //check for enemy kill
        if(snekkek1health == 0){
            this.snekkek1.visible = false;
            coins = coins + 10;

        }
        if(snekkek2health == 0){
            this.snekkek2.visible = false;
            coins = coins + 10;

        }
    }

};

function listenerPause () {

}

function snekkek1attacked (){
    snekkek1health = snekkek1health - 1;
    alreadyhit1 = 1;
}

function snekkek2attacked (){
    snekkek2health = snekkek2health - 1;
    alreadyhit2 = 1;
}

