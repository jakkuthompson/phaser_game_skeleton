var Splash = function () {

};


module.exports = Splash;




Splash.prototype = {
   create: function () {

       this.asset = this.add.sprite(240, 240, 'logo');
        this.asset.scale.x = 4;
        this.asset.scale.y = 4;

        this.asset.alpha = 0;

        this.game.add.tween(this.asset).to( { alpha: 1 }, 2000, Phaser.Easing.Linear.None, true, 0, 1000, true);

        this.game.time.events.add(Phaser.Timer.SECOND * 4, update, this);
  }

};

function update (){
    this.game.state.start('Menu');


}



