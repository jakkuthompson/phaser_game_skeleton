var Shop = function () {
    this.background = null;
};

module.exports = Shop;

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
        this.asset = this.add.sprite(0, 65, 'shopkeeper');
        this.asset.scale.x = 2;
        this.asset.scale.y = 2;
    }

};
