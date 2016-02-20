var Game = function () {
  this.map = null;
  this.background = null;
  this.house = null;
  this.layer = null;
  this.cursors = null;
  this.music = null;
};

module.exports = Game;

Game.prototype = {

  create: function () {
    this.game.physics.startSystem(Phaser.Physics.ARCADE);
    this.game.physics.startSystem(Phaser.Physics.P2JS);

    this.music = this.add.audio('overworld');
    this.music.play();

    this.map = this.add.tilemap('hub');
    this.map.addTilesetImage('t1', 'tileset');

    this.layer = this.map.createLayer('t1');
    this.map.setCollision(967);  //Edge Barrier
    this.map.setTileIndexCallback(979, () => {
        this.game.state.start('Level1');
    }, this.asset);
    this.map.setTileIndexCallback(1005, () => {
      this.game.state.start('Shop');
      this.music.pause();
    }, this.asset);
    this.map.setCollision(1193); //Barrier

    this.background = this.add.tileSprite(0, 0, 2304, 609, 'hubimg');

    this.asset = this.add.sprite(this.world.centerX, this.world.centerY, 'maincharacter');
    this.asset.scale.x = .99;
    this.asset.frame = 7; //going to the right
    this.asset.frame = 4;//going to the left
    this.physics.enable(this.asset, Phaser.Physics.ARCADE);
    this.physics.enable(this.asset, Phaser.Physics.P2JS);
    this.asset.body.immovable = true;
    this.game.world.setBounds(0, 0, 2304, 609);

    this.asset.body.setSize(29, 40, 0, 0);


    this.house = this.add.tileSprite(0, 0, 2304, 609, 'hubimg2');

    //enemy sprite 1
    this.enemy1 = this.add.sprite(400,250, 'enemy');
    this.physics.enable(this.enemy1, Phaser.Physics.ARCADE);
    //enemy sprite 2
    this.enemy2 = this.add.sprite(200,300, 'enemy');
    this.physics.enable(this.enemy2, Phaser.Physics.ARCADE);
    //enemy sprite 3
    this.enemy3 = this.add.sprite(310,-300, 'enemy');
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

    this.game.camera.follow(this.asset);

    //keypad input detectors
    this.cursors = this.input.keyboard.createCursorKeys();
  },

  update: function () {
    this.physics.arcade.collide(this.asset, this.layer);
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
      this.asset.body.velocity.x = -200;
      this.asset.frame = 4;
    }
    else if (this.cursors.right.isDown)
    {
      this.asset.body.velocity.x = 200;
      this.asset.frame = 8;
    }
    else if (this.cursors.up.isDown)
    {
      this.asset.body.velocity.y = -200;
        this.asset.frame = 12;
    }
    else if (this.cursors.down.isDown)
    {
      this.asset.body.velocity.y = 200;
        this.asset.frame = 1;
    }
    else
    {
      this.asset.animations.stop();
    }

    this.game.debug.body(this.asset);


  }


};
