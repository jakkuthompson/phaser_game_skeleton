

var Game = function () {

};

module.exports = Game;

Game.prototype = {



  create: function () {
    this.game.physics.startSystem(Phaser.Physics.ARCADE);

    map = this.add.tilemap('testroom');
    map.addTilesetImage('DungeonCrawl_ProjectUtumnoTileset', 'tileset');
    layer = map.createLayer('Tile Layer 1');
    layer.resizeWorld(); //remember to add collision = map.setCollisionBetween(1, 12);

    this.asset = this.add.sprite(150, 150, 'maincharacter');
    this.asset.scale.x = 0.5;
    this.asset.scale.y = 0.5;
    this.asset.frame = 0; //going to the right
    this.asset.frame = 1;//going to the left
    this.game.physics.enable(this.asset, Phaser.Physics.ARCADE);

    this.enemy = this.add.sprite(500,150, 'enemy');
    this.game.physics.enable(this.enemy, Phaser.Physics.ARCADE);





    //keypad input detectors
    upKey = this.game.input.keyboard.addKey(Phaser.Keyboard.UP);
    downKey = this.game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
    leftKey = this.game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
    rightKey = this.game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);



  },

  update: function () {
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




  }


};
