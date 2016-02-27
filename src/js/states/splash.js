var Splash = function () {

};


module.exports = Splash;

var tween;


Splash.prototype = {
   create: function () {

       this.asset = this.add.sprite(255, -200, 'logo');
       this.asset.scale.x = 1;
       this.asset.scale.y = 1;

        tween = this.add.tween(this.asset);

        tween.to({ y: 250 }, 3000, 'Linear', true, 0);

        this.game.time.events.add(Phaser.Timer.SECOND * 5, update, this);

        bwing = this.add.audio('bwing');

        if(Phaser.Timer.SECOND = 4) {
            bwing.play()
        }
  }

};

function update (){
    this.game.state.start('Menu');


}



