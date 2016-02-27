var Game = function () {
  this.map = null;
  this.layer = null;
  this.cursors = null;
  this.music = null;
  this.background = null;
  this.background2 = null;
  this.sword = null;
  this.sword2 = null;
  this.pause = null;
  this.pauseMenu = null;
};

var Game = require("../models/player");

var enemy1health = 66;
var enemy2health = 66;
var herohealth = 100;


module.exports = Game;

Game.prototype = {

  create: function () {
    this.game.physics.startSystem(Phaser.Physics.ARCADE);
    this.game.physics.startSystem(Phaser.Physics.P2JS);

    this.music = this.add.audio('overworld');
    this.music.play();

    //tilemap
    this.map = this.add.tilemap('hub');
    this.map.addTilesetImage('t1', 'tileset');

    this.layer = this.map.createLayer('t1');
    this.map.setCollision(967);  //Edge Barrier
    this.map.setTileIndexCallback(979, () => {
      this.game.state.start('Level1');
      this.music.pause();
    }, this.asset);
    this.map.setTileIndexCallback(1005, () => {
      this.game.state.start('Shop');
      this.music.pause();
    }, this.asset);
    this.map.setCollision(1193); //Barrier

    this.background = this.add.tileSprite(0, 0, 2304, 609, 'hubimg');

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
    this.game.world.setBounds(0, 0, 2304, 609);



    this.background2 = this.add.tileSprite(0, 0, 2304, 609, 'hubimg2');

    //enemy sprite 1
    this.enemy1 = this.add.sprite(400,250, 'enemy');
    this.game.physics.enable(this.enemy1, Phaser.Physics.ARCADE);
    //enemy sprite 2
    this.enemy2 = this.add.sprite(200,300, 'enemy');
    this.game.physics.enable(this.enemy2, Phaser.Physics.ARCADE);


    //sword sprite
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

    //enemy path
    var tween1;
    var tween2;


    tween1 = this.game.add.tween(this.enemy1);
    tween1.to({x: [500, 500, 400, 400], y: [250, 150, 150, 250]}, 2000, "Linear").loop(true);
    tween1.start();


    tween2 = this.game.add.tween(this.enemy2);
    tween2.to({x: [200,100,100,200], y: [400,400,300,300]}, 2000, "Linear").loop(true);
    tween2.start();

    this.game.camera.follow(this.asset);

    //keypad input detectors
    this.cursors = this.input.keyboard.createCursorKeys();

    this.pause = this.add.image(764, 0, 'pause');
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


    this.physics.arcade.collide(this.asset, this.layer);
    this.physics.arcade.collide(this.enemy1, this.enemy2);
    this.physics.arcade.collide(this.enemy2, this.enemy1);

    //main character movement
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


    this.sword.animations.currentAnim.onComplete.add(function () {	this.sword.visible = false; }, this);
    this.sword2.animations.currentAnim.onComplete.add(function () {	this.sword2.visible = false;}, this);


    //keep the sword by the main character
    this.sword.x = this.asset.x;
    this.sword.y = this.asset.y;
    this.sword2.x = this.asset.x - 20;
    this.sword2.y = this.asset.y;

    //collision detection for hitting the enemies
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



    //check for enemy kill
    if(enemy1health == 0){
      this.enemy1.visible = false;

    }

    if(enemy2health == 0){
      this.enemy2.visible = false;

    }

    //collision detection for hero getting attacked
    this.game.physics.arcade.overlap(this.asset, this.enemy1, heroattacked, null, this);
    this.game.physics.arcade.overlap(this.asset, this.enemy2, heroattacked, null, this);







  }



};


function enemy1attacked (){

  enemy1health = enemy1health - 1;


}

function enemy2attacked (){

  enemy2health = enemy2health - 1;


}

function heroattacked (){

}

