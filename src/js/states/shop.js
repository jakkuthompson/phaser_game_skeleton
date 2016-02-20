var Shop = function () {

};

Shop.prototype = {
    preloader: function () {
        this.load.spritesheet('shopkeeper');
    },

    create: function () {
        this.add.spritesheet('shopkeeper');
    }

};
