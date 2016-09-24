var GameOver = function () {

};

module.exports = GameOver;

GameOver.prototype = {
    create: function () {
        this.time.events.create(1000, () => {
            this.lol = this.add.sprite(this.world.centerX, this.world.centerY, 'youlose');
            this.lol.scale.x = 3;
            this.lol.scale.y = 3;
            this.lol.animations.add('gameover', [0, 1, 2, 3], 1, true);
            this.lol.animations.play('gameover');

            this.skip = this.add.button(0, 0, 'skip', listenerSkip, this, 1, 0, 2);
        });
    },

    update: function () {

    }
};

function listenerSkip () {
    this.game.state.start('Menu');
}