var Splash = function () {

};


module.exports = Splash;

var tween;


Splash.prototype = {
   create: function () {
       this.asset = this.add.sprite(255, -200, 'logo');
       this.asset.scale.x = 1;
       this.asset.scale.y = 1;

       this.add.tween(this.asset).to( { alpha: 1 }, 1000, "Linear", true);


       this.coderdojo = this.add.sprite(75, 250, 'coderdojotoledo');
       this.coderdojo.alpha = 0;

       tween = this.add.tween(this.asset);

       tween.to({ y: 250 }, 3000, 'Linear', true, 0);

       this.game.time.events.add(Phaser.Timer.SECOND * 10, update, this);

       bwing = this.add.audio('bwing');

       if(Phaser.Timer.SECOND = 4) {
            bwing.play()
       }

       this.add.tween(this.asset).to( { alpha: 0 }, 1000, "Linear", true, 5000);

       this.add.tween(this.coderdojo).to( { alpha: 1 }, 2000, "Linear", true, 6000);
   }

};

function update (){
    this.game.state.start('Menu');


}



