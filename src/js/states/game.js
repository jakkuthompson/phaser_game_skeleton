

var Game = function () {

};

module.exports = Game;

Game.prototype = {



  create: function () {
    this.game.physics.startSystem(Phaser.Physics.ARCADE);
    //added tilesheet
    map = this.add.tilemap('testroom');
    map.addTilesetImage('DungeonCrawl_ProjectUtumnoTileset', 'tileset');
    map.setCollision(1048);

    layer = map.createLayer('Tile Layer 1');
    layer.debug = true;

    this.asset = this.add.sprite(150, 150, 'maincharacter');
    this.asset.scale.x = 0.5;
    this.asset.scale.y = 0.5;
    this.asset.frame = 0; //going to the right
    this.asset.frame = 1;//going to the left
    this.game.physics.enable(this.asset, Phaser.Physics.ARCADE);
    //enemy sprite 1
    this.enemy1 = this.add.sprite(500,150, 'enemy');
    this.game.physics.enable(this.enemy1, Phaser.Physics.ARCADE);
    //enemy sprite 2
    this.enemy2 = this.add.sprite(100,500, 'enemy');
    this.game.physics.enable(this.enemy2, Phaser.Physics.ARCADE);
    //enemy sprite 3
    this.enemy3 = this.add.sprite(400,400, 'enemy');
    this.game.physics.enable(this.enemy3, Phaser.Physics.ARCADE);






    //keypad input detectors
    upKey = this.game.input.keyboard.addKey(Phaser.Keyboard.UP);
    downKey = this.game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
    leftKey = this.game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
    rightKey = this.game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);



  },

  update: function () {
    game.physics.arcade.collide(p, layer);



    //makes the character move down
    if (upKey.isDown) {
      this.asset.y = this.asset.y - 2;
    }
    //makes the character move up
    else if (downKey.isDown) {
      this.asset.y = this.asset.y + 2;
    }
    //makes the character move left
    if (leftKey.isDown) {
      this.asset.frame = 1;
      this.asset.x = this.asset.x - 2;
    }
    //makes the character move right
    else if (rightKey.isDown) {
      this.asset.frame = 0;
      this.asset.x = this.asset.x + 2;
    }
    this.game.debug.body(this.asset);
    //enemy one follow
    var radiansone = this.game.physics.arcade.angleBetween(this.enemy1, this.asset);
    var degreesone = radiansone * (180/Math.PI);
    this.game.physics.arcade.velocityFromAngle(degreesone, 60, this.enemy1.body.velocity);
    //enemy two follow
    var radianstwo = this.game.physics.arcade.angleBetween(this.enemy2, this.asset);
    var degreestwo = radianstwo * (180/Math.PI);
    this.game.physics.arcade.velocityFromAngle(degreestwo, 60, this.enemy2.body.velocity);
    //enemy three follow
    var radiansthree = this.game.physics.arcade.angleBetween(this.enemy3, this.asset);
    var degreesthree = radiansthree * (180/Math.PI);
    this.game.physics.arcade.velocityFromAngle(degreesthree, 60, this.enemy3.body.velocity);



  }


};
