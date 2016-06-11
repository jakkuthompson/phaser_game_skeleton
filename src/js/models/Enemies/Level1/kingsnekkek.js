const KingSnekkek = function (game) {
    this._game = game;
    this._boss = this._game.add.sprite(0, 0, 'kingsnekkek');
    this._game.physics.enable(this._boss, Phaser.Physics.ARCADE);
    //function snekheadSpawn() {
    //_snekhead = this.add.sprite(245, 225, 'snekhead');
    //this.physics.enable(_snekhead, Phaser.Physics.ARCADE);
    //_snekhead.body.velocity.y = 200;
    //_snekhead.body.velocity.x = 0;
    //}

};

module.exports = KingSnekkek;
KingSnekkek.prototype = {
    _timer: null,
    _snekhead: null,
    update() {
        if(this._boss.x < 200 && this._boss.y < 200) {
            this._game.physics.arcade.moveToXY(this._boss, 800, 800, 100);
        }
        else {
            this._game.physics.arcade.moveToXY(this._boss, 800, 2000, 100);
        }
        //this._timer = setTimeout(() => {
            //this.create();
        //}, 3000);

    }
};



