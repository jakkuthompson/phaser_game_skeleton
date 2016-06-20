var Shop = function () {
    this.background = null;
    this.item1 = null;
    this.item2 = null;
    this.item3 = null;
    this.cursors = null;
};

module.exports = Shop;

const GUI = require('../models/player_models/healthbar');

Shop.prototype = {
    preload: function () {
        this.load.image('shop', 'assets/game/shop/shop_beta_720.png');
        this.load.image('shopkeeperhappy', 'assets/game/shop/pirate_alphahappy_360.png');
        this.load.image('shopkeeperrlly', 'assets/game/shop/pirate_alpha_rlly__360.png');
        this.load.image('shopkeeper', 'assets/game/shop/pirate_alpha.png');
        this.load.image('shopkeeperhappy', 'assets/game/shop/pirate_alphaangery_360.png');
    },

    create: function () {
        this.background = this.add.tileSprite(0, 0, 720, 480, 'shop');
        this.background.scale.x = 1.2;
        this.background.scale.y = 1.3;

        this.shopkeeper = this.add.sprite(0, 65, 'shopkeeper');
        this.shopkeeper.scale.x = 2;
        this.shopkeeper.scale.y = 2;

        this.item1 = this.add.text(385, 55, "Some item.", {
            font: "30px Arial",
            fill: "#000"
        });
        this.item2 = this.add.text(385, 95, "Some item.", {
            font: "30px Arial",
            fill: "#000"
        });

        this.item3 = this.add.text(385, 135, "Some item.", {
            font: "30px Arial",
            fill: "#000"
        });

        this.GUI = new GUI(this.game);

        var back = this.add.button(730, 0, 'exitstore', backtogame, this, 1, 0, 2);
        back.scale.x = 0.7;
        back.scale.y = 0.7;
        this.GUI.update();
    }
};

function backtogame (){
    this.game.state.start('Game');

}
