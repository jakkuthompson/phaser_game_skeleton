var Game = function () {
  this.map = null;
  this.layer = null;
  this.cursors = null;
};

module.exports = Game;
var layer;

Game.prototype = {

  create: function () {
    this.game.physics.startSystem(Phaser.Physics.ARCADE);

    this.map = this.add.tilemap('testroom');
    this.map.addTilesetImage('DungeonCrawl_ProjectUtumnoTileset', 'tileset');

    this.layer = this.map.createLayer('t1');
    this.layer.debug = true;
    this.layer.resizeWorld();
    this.map.setCollision(1048);




    this.asset = this.add.sprite(150, 150, 'maincharacter');
    this.asset.scale.x = 1.5;
    this.asset.scale.y = 1.5;
    this.asset.frame = 7; //going to the right
    this.asset.frame = 4;//going to the left
    this.physics.enable(this.asset, Phaser.Physics.ARCADE);
    this.asset.body.immovable = true;
    this.asset.body.collideWorldBounds = true;

    //enemy sprite 1
    this.enemy1 = this.add.sprite(400,250, 'enemy');
    this.physics.enable(this.enemy1, Phaser.Physics.ARCADE);
    //enemy sprite 2
    this.enemy2 = this.add.sprite(200,300, 'enemy');
    this.physics.enable(this.enemy2, Phaser.Physics.ARCADE);
    //enemy sprite 3
    this.enemy3 = this.add.sprite(310,300, 'enemy');
    this.physics.enable(this.enemy3, Phaser.Physics.ARCADE);

    var tween1;
    var tween2;
//test
    tween1 = this.game.add.tween(this.enemy1);
    tween1.to({x: [500, 500, 400, 400], y: [250, 150, 150, 250]}, 2000, "Linear").loop(true);
    tween1.start();


    tween2 = this.game.add.tween(this.enemy2);
    tween2.to({x: [200,100,100,200], y: [400,400,300,300]}, 2000, "Linear").loop(true);
    tween2.start();


    //keypad input detectors
    this.cursors = this.input.keyboard.createCursorKeys();


  },

  update: function () {
    console.log(this.physics.arcade.collide(this.asset, this.layer));
    this.physics.arcade.collide(this.asset, this.enemy1);
    this.physics.arcade.collide(this.asset, this.enemy2);
    this.physics.arcade.collide(this.asset, this.enemy3);
    this.physics.arcade.collide(this.enemy1, this.enemy2);
    this.physics.arcade.collide(this.enemy1, this.enemy3);
    this.physics.arcade.collide(this.enemy2, this.enemy1);
    this.physics.arcade.collide(this.enemy2, this.enemy3);

    this.asset.body.velocity.set(0);

    if (this.cursors.left.isDown)
    {
      this.asset.body.velocity.x = -100;
      this.asset.frame = 4;
    }
    else if (this.cursors.right.isDown)
    {
      this.asset.body.velocity.x = 100;
      this.asset.frame = 8;
    }
    else if (this.cursors.up.isDown)
    {
      this.asset.body.velocity.y = -100;
      this.asset.frame = 12;
    }
    else if (this.cursors.down.isDown)
    {
      this.asset.body.velocity.y = 100;
      this.asset.frame = 1;
    }
    else
    {
      this.asset.animations.stop();
    }

    this.game.debug.body(this.asset);
    this.game.debug.body(this.enemy1);
    this.game.debug.body(this.enemy2);
    this.game.debug.body(this.enemy3);



  }


};
