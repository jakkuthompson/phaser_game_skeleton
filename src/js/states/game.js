var Game = function () {
  this.map = null;
  this.layer = null;
  this.cursors = null;
  this.music = null;
  this.background = null;
  this.background2 = null;
  this.sword = null;
  this.sword2 = null;
  this.gui = null;
  this.heart1 = null;
  this.heart2 = null;
  this.heart3 = null;
  this.coin = null;
  this.shine = null;
  this.pause = null;
  this.pauseMenu = null;
};

var GUI = require("../models/gui");
var Zephyr = require("../models/player");

var enemy1health = 3;
var enemy2health = 3;
var herohealth = 100;
var money = 0;
var alreadyhit1 = 0;
var alreadyhit2 = 0;
var counter = 0;
var enemy1x = 400;
var enemy1y = 250;
var walkmore = true;
var enemy2x = 200;
var enemy2y = 300;
var walkmore2 = true;




module.exports = Game;

Game.prototype = {

  create: function () {
    this.game.physics.startSystem(Phaser.Physics.ARCADE);
    this.game.physics.startSystem(Phaser.Physics.P2JS);

    this.game.world.setBounds(0, 0, 2304, 609);

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
      this.music.pause(); //bruh
    }, this.asset);
    this.map.setCollision(1193); //Barrier for D1

    this.background = this.add.tileSprite(0, 0, 2304, 609, 'hubimg');

    this.asset = this.add.sprite(128, 32, 'zephyr');
    this.asset.scale.x = .99;
    this.asset.animations.add('left', [3, 4, 5], 20, true);
    this.asset.animations.add('right', [6, 7, 8], 20, true);
    this.asset.animations.add('down', [0, 1, 2], 20, true);
    this.asset.animations.add('up', [9, 10, 11], 20, true);
    this.physics.enable(this.asset, Phaser.Physics.ARCADE);
    this.physics.enable(this.asset, Phaser.Physics.P2JS);
    this.asset.body.immovable = true;
    this.asset.body.collideWorldBounds = true;

    this.background2 = this.add.tileSprite(0, 0, 2304, 609, 'hubimg2');

    //enemy sprite 1
    this.enemy1 = this.add.sprite(enemy1x,enemy1y, 'enemy');
    this.game.physics.enable(this.enemy1, Phaser.Physics.ARCADE);
    //enemy sprite 2
    this.enemy2 = this.add.sprite(enemy2x,enemy2y, 'enemy');
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

    this.game.camera.follow(this.asset);

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

    this.coin = this.add.sprite(106, 3, 'coin');
    this.coin.fixedToCamera = true;
    this.coin.animations.add('shine');
    this.coin.animations.play('shine', 3, true);


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



    if(this.enemy1.x == 500 && this.enemy1.y == 250){
      console.log("Change Frame");
      this.enemy1.frame = 9;

    }
    if(this.enemy1.x == 500 && this.enemy1.y == 150){
      this.enemy1.frame = 5;

    }
    if(this.enemy1.x == 500 && this.enemy1.y == 150){
      this.enemy1.frame = 13;

    }
    if(this.enemy1.x == 400 && this.enemy1.y == 250){
      this.enemy1.frame = 1;

    }
    //enemy1 movement

    tween1 = this.game.add.tween(this.enemy1);
    tween1.to({x: [enemy1x + 100], y: [enemy1y]}, 500, "Linear");
    enemy1x = enemy1x + 100;

    tween3 = this.game.add.tween(this.enemy1);
    tween3.to({x: [enemy1x], y: [enemy1y - 100]}, 500, "Linear");
    enemy1y = enemy1y - 100;

    tween4 = this.game.add.tween(this.enemy1);
    tween4.to({x: [enemy1x - 100], y: [enemy1y]}, 500, "Linear");
    enemy1x = enemy1x - 100;

    tween5 = this.game.add.tween(this.enemy1);
    tween5.to({x: [enemy1x], y: [enemy1y + 100]}, 500, "Linear");
    enemy1y = enemy1y + 100;

    //enemy2 movement

    tween2 = this.game.add.tween(this.enemy2);
    tween2.to({x: [enemy2x], y: [enemy2y+100]}, 500, "Linear");
    enemy2y = enemy2y + 100;

    tween6 = this.game.add.tween(this.enemy2);
    tween6.to({x: [enemy2x - 100], y: [enemy2y]}, 500, "Linear");
    enemy2x = enemy2x - 100;

    tween7 = this.game.add.tween(this.enemy2);
    tween7.to({x: [enemy2x], y: [enemy2y-100]}, 500, "Linear");
    enemy2y = enemy2y - 100;

    tween8 = this.game.add.tween(this.enemy2);
    tween8.to({x: [enemy2x+100], y: [enemy2y]}, 500, "Linear");
    enemy2x = enemy2x + 100;
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
      this.game.physics.arcade.overlap(this.sword, this.enemy1, enemy1attacked, null, this);
    }
    if(this.sword2.animations.currentAnim.isPlaying == true && alreadyhit1 == 0) {
      this.game.physics.arcade.overlap(this.sword2, this.enemy1, enemy1attacked, null, this);
    }

    if(this.sword.animations.currentAnim.isPlaying == true && alreadyhit2 == 0) {
      this.game.physics.arcade.overlap(this.sword, this.enemy2, enemy2attacked, null, this);
    }
    if(this.sword2.animations.currentAnim.isPlaying == true && alreadyhit2 == 0) {
      this.game.physics.arcade.overlap(this.sword2, this.enemy2, enemy2attacked, null, this);
    }


    //check for enemy kill
    if(enemy1health == 0){
      this.enemy1.visible = false;
      money = money + 10;

    }

    if(enemy2health == 0){
      this.enemy2.visible = false;
      money = money + 10;
    }

    //collision detection for hero getting attacked
    this.game.physics.arcade.overlap(this.asset, this.enemy1, heroattacked, null, this);
    this.game.physics.arcade.overlap(this.asset, this.enemy2, heroattacked, null, this);




    //check for hero death
    if(herohealth == 0){
      console.log("Hero Died");
    }

    //enemy2 movement
    if(walkmore2 == true)  { walkmore2 = false;
      this.enemy2.frame = 1;
      tween2.start();
      tween2.onComplete.add(doSomething, this);
      function doSomething() {
        this.enemy2.frame = 13;
        tween6.start();
        tween6.onComplete.add(doSomething, this);
        function doSomething() {
          this.enemy2.frame = 5;tween7.start();
          tween7.onComplete.add(doSomething, this);
          function doSomething() {
            this.enemy2.frame = 9;tween8.start();
            tween8.onComplete.add(doSomething, this);
            function doSomething() {walkmore2 = true;
            }
          }
        }
      }
    }
    //enemy1 movement
    if(walkmore == true) {

      this.enemy1.frame = 9;
      tween1.start();
      walkmore = false;
      tween1.onComplete.add(doSomething2, this);
      function doSomething2() {
        this.enemy1.frame = 5;
        tween3.start();
        tween3.onComplete.add(doSomething2, this);
        function doSomething2() {
          this.enemy1.frame = 13;
          tween4.start();
          tween4.onComplete.add(doSomething2, this);
          function doSomething2() {
            this.enemy1.frame = 1;
            tween5.start();
            tween5.onComplete.add(doSomething2, this);
            function doSomething2() {
              walkmore = true;
            }
          }
        }
      }
    }






  }




};


function enemy1attacked () {
    enemy1health = enemy1health - 1;
    alreadyhit1 = 1;
  console.log(enemy1health);
}

function enemy2attacked (){
    enemy2health = enemy2health - 1;
    alreadyhit2 = 1;
  console.log(enemy2health);


}

function heroattacked (){
  if(this.sword2.animations.currentAnim.isPlaying == false && this.sword.animations.currentAnim.isPlaying == false){
    herohealth = herohealth - 1;

  }


}

function listenerPause () {

}

function enemy1move(){

}

function enemy2move(){


}

function listenerHearts () {
  if (herohealth = 0) {
    this.hearts.frame(2);
  }
}





