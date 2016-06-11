const GUI = function(game, herohealth, herodied) {
    this._game = game;
    this._asset = this.asset;
    this._herohealth = herohealth;
    this._herodied = herodied;
    this._heart1 = this._game.add.sprite(0, 0, 'heart');
    this._heart1.fixedToCamera = true;

    this._heart2 = this._game.add.sprite(32, 0, 'heart');
    this._heart2.fixedToCamera = true;

    this._heart3 = this._game.add.sprite(64, 0, 'heart');
    this._heart3.fixedToCamera = true;

    this._coin = this._game.add.sprite(96, 2, 'coin');
    this._coin.animations.add('shine', [0, 1], 5, true);
    this._coin.play('shine');
    this._coin.fixedToCamera = true;
};

GUI.prototype = {
    update() {
        if (this._herohealth !== 5) {
            this._heart3.frame = 0;
        }
        if (this._herohealth !== 4) {
            this._heart3.frame = 2;
        }
        if (this._herohealth !== 3) {
            this._heart2.frame = 0;
        }
        if (this._herohealth !== 2) {
            this._heart2.frame = 2;
        }
        if (this._herohealth !== 1) {
            this._heart1.frame = 0;
        }
        if (this._herohealth !== 0) {
            this._heart1.frame = 2;
        }
    }
};

module.exports = GUI;