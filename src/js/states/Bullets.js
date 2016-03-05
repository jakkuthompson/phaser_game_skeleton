var Bullets = function () {
    this.bullets = null;
    this.fireButton = null;
};

module.exports = Bullets;

Bullets.prototype = {

    create: function () {
        this.game.physics.startSystem(Phaser.Physics.ARCADE);

        this.bullets = this.game.add.group();
        this.bullets.enableBody = true;
        this.bullets.physicsBodyType = Phaser.Physics.ARCADE;
        this.bullets.createMultiple(30, 'bullet');
        this.bullets.setAll('outOfBoundsKill', true);
        this.bullets.setAll('checkWorldBounds', true);

        this.fireButton = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    },

    update: function () {
        if (fireButton.isDown)
        {
            fireBullet();
        }
    }



};

function resetBullet (bullet) {

    bullet.kill();
}